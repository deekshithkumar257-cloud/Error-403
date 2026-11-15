/**
 * NASA: ECHOES BEYOND EARTH - Audio Engine
 * Uses the Web Audio API for procedural space ambiance & NASA UI soundscapes.
 * Uses Web Speech API for voice narrations.
 * 100% self-contained: Requires zero external audio files.
 */

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.lfoNode = null;
    this.analyser = null;
    this.visualizerCanvas = null;
    this.visualizerAnimId = null;
    this.isAmbientPlaying = false;
    this.volume = 0.7;

    // Web Speech API
    this.speechSynth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.selectedVoice = null;

    this.initSpeechVoices();
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initSpeechVoices() {
    if (!this.speechSynth) return;
    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      // Prefer crisp natural English voices
      this.selectedVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('Arthur')) && v.lang.startsWith('en')) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];
    };
    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  // Toggle ambient space drone
  toggleAmbient() {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (!this.ctx || this.isAmbientPlaying) return;

    // Master ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(Math.max(0.001, this.volume * 0.15), this.ctx.currentTime + 3);
    
    if (this.analyser) {
      this.ambientGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      this.ambientGain.connect(this.ctx.destination);
    }

    // Filtered low rumble: Oscillator 1 (55Hz, Sub-bass)
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Oscillator 2 (110Hz, Warm 5th harmony at 82.5Hz)
    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = 'triangle';
    this.ambientOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

    // Lowpass filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);

    // Subtle LFO sweep for gentle cosmic respiration
    this.lfoNode = this.ctx.createOscillator();
    this.lfoNode.type = 'sine';
    this.lfoNode.frequency.setValueAtTime(0.15, this.ctx.currentTime); // 0.15 Hz sweep
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(40, this.ctx.currentTime);
    this.lfoNode.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);

    // Cosmic radio noise generator (Pink/Bandpass noise)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ambientGain);

    // Connect oscillators to filter & master
    this.ambientOsc1.connect(this.filterNode);
    this.ambientOsc2.connect(this.filterNode);
    this.filterNode.connect(this.ambientGain);

    this.ambientOsc1.start();
    this.ambientOsc2.start();
    this.lfoNode.start();
    this.noiseNode.start();

    this.isAmbientPlaying = true;
  }

  stopAmbient() {
    if (!this.ctx || !this.isAmbientPlaying) return;
    try {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          if (this.ambientOsc1) { this.ambientOsc1.stop(); this.ambientOsc1.disconnect(); }
          if (this.ambientOsc2) { this.ambientOsc2.stop(); this.ambientOsc2.disconnect(); }
          if (this.lfoNode) { this.lfoNode.stop(); this.lfoNode.disconnect(); }
          if (this.noiseNode) { this.noiseNode.stop(); this.noiseNode.disconnect(); }
          this.isAmbientPlaying = false;
        }, 1300);
      } else {
        this.isAmbientPlaying = false;
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  setVolume(percent) {
    this.volume = Math.max(0, Math.min(1, percent / 100));
    if (this.ambientGain && this.ctx && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    }
  }

  attachVisualizer(canvas) {
    if (!canvas) return;
    this.visualizerCanvas = canvas;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser ? this.analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      this.visualizerAnimId = requestAnimationFrame(render);
      if (!this.visualizerCanvas) return;

      const width = this.visualizerCanvas.width;
      const height = this.visualizerCanvas.height;
      ctx.clearRect(0, 0, width, height);

      if (this.analyser && this.isAmbientPlaying) {
        this.analyser.getByteFrequencyData(dataArray);
      } else {
        dataArray.fill(0);
      }

      const barCount = 10;
      const barWidth = 3;
      const gap = 3;

      for (let i = 0; i < barCount; i++) {
        const val = this.isAmbientPlaying ? dataArray[i * 2] || 10 : 2;
        const barHeight = Math.max(2, (val / 255) * height);
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        ctx.fillStyle = this.isAmbientPlaying ? '#00e5ff' : 'rgba(255,255,255,0.2)';
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    render();
  }

  // Quindar Tone: NASA Apollo comms tone (2524 Hz)
  playQuindar() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2524, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  // High-tech UI click chirp
  playChirp() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Correct answer chime (ascending chord C5 -> E5 -> G5)
  playCorrect() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (i * 0.08));

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime + (i * 0.08));
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + (i * 0.08) + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + (i * 0.08));
      osc.stop(this.ctx.currentTime + (i * 0.08) + 0.35);
    });
  }

  // Incorrect answer tone (low buzz)
  playIncorrect() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Web Speech API Voice Narrator
  speakStory(text, onStart, onEnd) {
    if (!this.speechSynth) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    this.stopSpeaking();
    this.playQuindar();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.95; // Steady, calm space communicator pace
    utterance.pitch = 0.95;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.playQuindar();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechSynth && (this.speechSynth.speaking || this.isSpeaking)) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
  }

  toggleSpeech(text, onStart, onEnd) {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.stopSpeaking();
      if (onEnd) onEnd();
      return false;
    } else {
      this.speakStory(text, onStart, onEnd);
      return true;
    }
  }
}

