/**
 * NASA: ECHOES BEYOND EARTH - Main Application Controller
 * Coordinates audio, celestial Three.js scenes, artifact explorer, story mode,
 * timeline, science discoveries, and knowledge quiz.
 */

import { AudioEngine } from './modules/audioEngine.js';
import { CelestialScene } from './modules/celestialScene.js';
import { ArtifactExplorer } from './modules/artifactExplorer.js';
import { StoryMode } from './modules/storyMode.js';
import { Timeline } from './modules/timeline.js';
import { ScienceMode } from './modules/scienceMode.js';
import { QuizEngine } from './modules/quizEngine.js';
import { SolarSystemMuseum } from './modules/museum.js';
import { ParticleText } from './modules/particleText.js';
import { FALLBACK_DATA } from './data/fallbackData.js';

class App {
  constructor() {
    this.audio = new AudioEngine();
    this.celestial = new CelestialScene();

    this.missionsData = [];
    this.artifactsData = [];
    this.destinationsData = [];
    this.storiesData = [];
    this.timelineData = [];
    this.discoveriesData = [];
    this.quizData = [];
    this.blueprintsData = [];

    this.activeDestinationId = 'moon';
    this.destinationDisplayMode = 'globe';
    this.heroParticleText = null;
    this.destParticleText = null;
  }

  async init() {
    console.log("🚀 Initializing NASA: ECHOES BEYOND EARTH...");
    await this.loadAllData();

    // 1. Initialize Celestial Three.js background
    this.celestial.initBackground('celestial-canvas-container');

    // 2. Setup Header Navigation & Audio Controls
    this.initHeaderControls();

    // 3. Setup Artifact Explorer (Mission Explorer with 3D Spacecraft Viewer)
    this.artifactExplorer = new ArtifactExplorer(
      this.missionsData,
      this.audio,
      (artifactId) => {
        this.openStoryForArtifact(artifactId);
      },
      this.blueprintsData
    );
    this.artifactExplorer.init();

    // 4. Setup Solar System Museum (Interactive 2D space environment)
    this.museum = new SolarSystemMuseum({
      missionsData: this.missionsData,
      destinationsData: this.destinationsData,
      timelineData: this.timelineData,
      storiesData: this.storiesData,
      audioEngine: this.audio,
      onOpenArtifact: (artifactId) => {
        if (this.artifactExplorer) {
          this.artifactExplorer.openById(artifactId);
        }
      },
      onOpenStory: (artifactId) => {
        this.openStoryForArtifact(artifactId);
      },
      onOpenTimeline: (year) => {
        const timeSection = document.getElementById('timeline');
        if (timeSection) timeSection.scrollIntoView({ behavior: 'smooth' });
      },
      onNavigateTo: (sectionId) => {
        if (this.audio) this.audio.playChirp();
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
    this.museum.init();

    // 5. Setup Destination Explorer (links with Artifact Explorer)
    this.initDestinationExplorer();

    // 6. Setup Story Mode
    this.storyMode = new StoryMode(this.storiesData, this.missionsData, this.audio);
    this.storyMode.init();

    // 7. Setup Mission Timeline (The Journey Through Time)
    this.timeline = new Timeline(
      this.timelineData,
      this.audio,
      (artId) => {
        const card = document.querySelector(`.artifact-card[data-id="${artId}"]`);
        if (card) card.click();
      },
      (artId) => {
        this.openStoryForArtifact(artId);
      }
    );
    this.timeline.init();

    // 8. Setup Science Discoveries & Comparative Matrix
    this.scienceMode = new ScienceMode(
      this.discoveriesData,
      this.audio,
      this.missionsData,
      (artId) => {
        if (this.artifactExplorer) this.artifactExplorer.openById(artId);
      }
    );
    this.scienceMode.init();

    // 9. Setup Knowledge Quiz
    this.quiz = new QuizEngine(this.quizData, this.audio);
    this.quiz.init();

    // 10. Setup Global UI Interactions
    this.initScrollSpy();

    // 11. Setup Accessibility & Keyboard Navigation
    this.initAccessibility();
    this.initKeyboardNavigation();

    // 12. Dismiss Preloader
    this.dismissPreloader();

    // 13. Initialize Hero ParticleText Component (React Bits ParticleText)
    this.initHeroParticleText();
    this.initDestParticleText();

    // 14. Register Offline PWA Service Worker
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }

    console.log("🛰️ NASA: ECHOES BEYOND EARTH Ready for Exploration.");
  }

  // Robust data loader: Attempts fetch, falls back to inline storage if local file protocol blocks fetch
  async loadAllData() {
    try {
      const [missionsRes, destinationsRes, storiesRes, timelineRes, discoveriesRes, quizRes, blueprintsRes] = await Promise.all([
        fetch('data/missions.json'),
        fetch('js/data/destinations.json'),
        fetch('data/stories.json'),
        fetch('data/timeline.json'),
        fetch('js/data/discoveries.json'),
        fetch('data/quiz.json'),
        fetch('data/blueprints.json')
      ]);

      this.missionsData = await missionsRes.json();
      this.destinationsData = await destinationsRes.json();
      this.storiesData = await storiesRes.json();
      this.timelineData = await timelineRes.json();
      this.discoveriesData = await discoveriesRes.json();
      this.quizData = await quizRes.json();
      this.blueprintsData = await blueprintsRes.json();
      this.artifactsData = this.missionsData;
    } catch (e) {
      console.warn("Notice: Fetching JSON files directly encountered restrictions (likely running under file:// URI). Using fallback mission data structures.", e);
      if (FALLBACK_DATA) {
        this.missionsData = FALLBACK_DATA.missions || FALLBACK_DATA.artifacts || [];
        this.artifactsData = this.missionsData;
        this.destinationsData = FALLBACK_DATA.destinations || [];
        this.storiesData = FALLBACK_DATA.stories || [];
        this.timelineData = FALLBACK_DATA.timeline || [];
        this.discoveriesData = FALLBACK_DATA.discoveries || [];
        this.quizData = FALLBACK_DATA.quiz || [];
        this.blueprintsData = FALLBACK_DATA.blueprints || [];
      }
    }
  }

  initHeaderControls() {
    // Ambient space soundscape toggle
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const audioPulse = document.querySelector('.audio-pulse');
    const audioLabel = document.getElementById('audio-status-label');
    const visualizerCanvas = document.getElementById('audio-visualizer-canvas');

    if (visualizerCanvas && this.audio) {
      this.audio.attachVisualizer(visualizerCanvas);
    }

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        const isPlaying = this.audio.toggleAmbient();
        if (isPlaying) {
          audioPulse.classList.add('playing');
          audioLabel.textContent = 'SOUND: ON';
          audioToggleBtn.classList.add('active');
        } else {
          audioPulse.classList.remove('playing');
          audioLabel.textContent = 'SOUND: OFF';
          audioToggleBtn.classList.remove('active');
        }
      });
    }

    // Mobile nav hamburger toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });

      // Close mobile menu when link clicked
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          if (this.audio) this.audio.playChirp();
        });
      });
    }

    // Hero Museum button smooth scroll
    const heroMuseumBtn = document.getElementById('hero-museum-btn');
    if (heroMuseumBtn) {
      heroMuseumBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const museumSection = document.getElementById('museum');
        if (museumSection) museumSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Hero Explore button smooth scroll
    const exploreBtn = document.getElementById('hero-explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const destSection = document.getElementById('destinations');
        if (destSection) destSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const heroArtifactsBtn = document.getElementById('hero-artifacts-btn');
    if (heroArtifactsBtn) {
      heroArtifactsBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const artSection = document.getElementById('artifacts');
        if (artSection) artSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const heroTimelineBtn = document.getElementById('hero-timeline-btn');
    if (heroTimelineBtn) {
      heroTimelineBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const timeSection = document.getElementById('timeline');
        if (timeSection) timeSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Hero Featured Chips (Quick open artifact detail modal)
    document.querySelectorAll('.hero-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const artId = chip.dataset.art;
        if (this.artifactExplorer) {
          this.artifactExplorer.openById(artId);
        }
      });
    });
  }

  initHeroParticleText() {
    const container = document.getElementById('hero-particle-text-container');
    if (!container) return;

    this.heroParticleText = new ParticleText(container, {
      text: 'ECHOES BEYOND EARTH',
      intro: 'gather',
      trigger: 'mount',
      shape: 'circle',
      highlightMode: 'motion',
      particleSize: 2,
      density: 4,
      highlightColor: '#69BFFF',
      color: '#EAF4FF',
      gatherDuration: 2000,
      scatter: 220,
      stagger: 450,
      pointerRepel: 30,
      repelRadius: 130,
      idleDrift: 0.35,
      clickBurst: true,
      fontWeight: 800,
      glow: true
    });
  }

  initDestParticleText() {
    const container = document.getElementById('dest-particle-text-container');
    if (!container) return;

    this.destParticleText = new ParticleText(container, {
      text: 'MOON',
      intro: 'gather',
      trigger: 'mount',
      shape: 'circle',
      highlightMode: 'motion',
      particleSize: 1.6,
      density: 3,
      highlightColor: '#69BFFF',
      color: '#EAF4FF',
      gatherDuration: 1100,
      scatter: 80,
      stagger: 200,
      pointerRepel: 18,
      repelRadius: 80,
      idleDrift: 0.2,
      clickBurst: true,
      fontWeight: 800,
      glow: true,
      glowBlur: 6,
      maxFontSize: 34,
      minFontSize: 20,
      textAlign: 'left'
    });
  }

  dismissPreloader() {
    const preloader = document.getElementById('app-preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 600);
      }, 500);
    }
  }

  initAccessibility() {
    // Accessibility modal toggle
    const a11yToggleBtn = document.getElementById('a11y-toggle-btn');
    const a11yModal = document.getElementById('a11y-modal');
    const a11yCloseBtn = document.getElementById('a11y-close-btn');

    if (a11yToggleBtn && a11yModal) {
      a11yToggleBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        a11yModal.classList.add('open');
      });
    }

    if (a11yCloseBtn && a11yModal) {
      a11yCloseBtn.addEventListener('click', () => {
        a11yModal.classList.remove('open');
      });
    }

    if (a11yModal) {
      a11yModal.addEventListener('click', (e) => {
        if (e.target === a11yModal) a11yModal.classList.remove('open');
      });
    }

    // Text Size adjustment
    const textSizeBtns = document.querySelectorAll('#text-size-controls .a11y-opt-btn');
    textSizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        textSizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const size = btn.dataset.size;
        document.documentElement.dataset.textSize = size;
      });
    });

    // High Contrast toggle
    const contrastBtn = document.getElementById('toggle-contrast-btn');
    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const isHigh = document.documentElement.dataset.contrast === 'high';
        if (isHigh) {
          document.documentElement.dataset.contrast = 'normal';
          contrastBtn.textContent = 'High Contrast: OFF';
          contrastBtn.classList.remove('active');
        } else {
          document.documentElement.dataset.contrast = 'high';
          contrastBtn.textContent = 'High Contrast: ON';
          contrastBtn.classList.add('active');
        }
      });
    }

    // Reduced Motion toggle
    const motionBtn = document.getElementById('toggle-motion-btn');
    if (motionBtn) {
      motionBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const isReduced = document.documentElement.dataset.reducedMotion === 'true';
        if (isReduced) {
          document.documentElement.dataset.reducedMotion = 'false';
          motionBtn.textContent = 'Reduced Motion: OFF';
          motionBtn.classList.remove('active');
        } else {
          document.documentElement.dataset.reducedMotion = 'true';
          motionBtn.textContent = 'Reduced Motion: ON';
          motionBtn.classList.add('active');
        }
      });
    }

    // Sound Volume slider
    const volSlider = document.getElementById('audio-volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (this.audio) this.audio.setVolume(val);
      });
    }

    // Test Quindar Beep
    const quindarTestBtn = document.getElementById('test-quindar-btn');
    if (quindarTestBtn) {
      quindarTestBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
      });
    }

    // Floating Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      });
    }
  }

  cycleTextSize() {
    const sizes = ['normal', 'large', 'xlarge'];
    const current = document.documentElement.dataset.textSize || 'normal';
    const nextIdx = (sizes.indexOf(current) + 1) % sizes.length;
    const nextSize = sizes[nextIdx];
    document.documentElement.dataset.textSize = nextSize;

    const textSizeBtns = document.querySelectorAll('#text-size-controls .a11y-opt-btn');
    textSizeBtns.forEach(btn => {
      if (btn.dataset.size === nextSize) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  initKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'Escape') {
        const a11yModal = document.getElementById('a11y-modal');
        if (a11yModal && a11yModal.classList.contains('open')) {
          a11yModal.classList.remove('open');
        }
        if (this.artifactExplorer) this.artifactExplorer.closeModal();
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        const a11yModal = document.getElementById('a11y-modal');
        if (a11yModal) {
          a11yModal.classList.toggle('open');
          if (this.audio) this.audio.playChirp();
        }
        return;
      }

      // Quick jumps: 1 through 8
      if (e.key === '1') document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '2') document.getElementById('museum')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '3') document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '4') document.getElementById('artifacts')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '5') document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '6') document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '7') document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
      if (e.key === '8') document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });

      // Audio toggle
      if (e.key.toLowerCase() === 'm') {
        const audioBtn = document.getElementById('audio-toggle-btn');
        if (audioBtn) audioBtn.click();
      }

      // Text size cycle
      if (e.key.toLowerCase() === 't') {
        this.cycleTextSize();
      }

      // High contrast toggle
      if (e.key.toLowerCase() === 'c') {
        const contrastBtn = document.getElementById('toggle-contrast-btn');
        if (contrastBtn) contrastBtn.click();
      }
    });
  }

  // -------------------------------------------------------------
  // DESTINATION EXPLORER LOGIC
  // -------------------------------------------------------------
  initDestinationExplorer() {
    const tabs = document.querySelectorAll('.destination-tabs .dest-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const destId = tab.dataset.destination;
        this.switchDestination(destId);
      });
    });

    // View toggle: 3D Globe vs 2D Landing Map
    const globeBtn = document.getElementById('dest-view-globe-btn');
    const surfaceBtn = document.getElementById('dest-view-surface-btn');
    const mapBtn = document.getElementById('dest-view-map-btn');

    if (globeBtn) {
      globeBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.setDestinationViewMode('globe');
      });
    }

    if (surfaceBtn) {
      surfaceBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.setDestinationViewMode('surface');
      });
    }

    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.setDestinationViewMode('map');
      });
    }

    const exploreDestRelicsBtn = document.getElementById('dest-view-artifacts-btn');
    if (exploreDestRelicsBtn) {
      exploreDestRelicsBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        if (this.artifactExplorer) {
          this.artifactExplorer.setDestination(this.activeDestinationId);
        }
        const artSection = document.getElementById('artifacts');
        if (artSection) artSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Initial render for default destination ('moon')
    this.switchDestination('moon');
  }

  setDestinationViewMode(mode) {
    this.destinationDisplayMode = mode;
    const globeBtn = document.getElementById('dest-view-globe-btn');
    const surfaceBtn = document.getElementById('dest-view-surface-btn');
    const mapBtn = document.getElementById('dest-view-map-btn');
    const globeContainer = document.getElementById('destination-globe-viewport');
    const surfaceContainer = document.getElementById('destination-surface-viewport');
    const mapContainer = document.getElementById('destination-map-viewport');
    const hintEl = document.getElementById('dest-viewport-hint');

    [globeBtn, surfaceBtn, mapBtn].forEach(b => b && b.classList.remove('active'));
    [globeContainer, surfaceContainer, mapContainer].forEach(c => c && (c.style.display = 'none'));

    if (mode === 'surface') {
      if (surfaceBtn) surfaceBtn.classList.add('active');
      if (surfaceContainer) {
        surfaceContainer.style.display = 'block';
        this.celestial.renderPlanetarySurface(surfaceContainer, this.activeDestinationId, (targetId) => {
          if (targetId && this.artifactExplorer) {
            this.artifactExplorer.openById(targetId);
          }
        });
      }
      if (hintEl) hintEl.innerHTML = '<span>🖱️ Drag to orbit 3D terrain • Click relic pin to inspect</span>';
    } else if (mode === 'map') {
      if (mapBtn) mapBtn.classList.add('active');
      if (mapContainer) {
        mapContainer.style.display = 'block';
        this.celestial.renderPlanetaryMap(mapContainer, this.activeDestinationId, (targetId) => {
          if (targetId && this.artifactExplorer) {
            this.artifactExplorer.openById(targetId);
          }
        });
      }
      if (hintEl) hintEl.innerHTML = '<span>📍 Click any landing site pin to inspect hardware</span>';
    } else {
      if (globeBtn) globeBtn.classList.add('active');
      if (globeContainer) {
        globeContainer.style.display = 'block';
        this.celestial.renderDestinationGlobe(globeContainer, this.activeDestinationId);
      }
      if (hintEl) hintEl.innerHTML = '<span>🖱️ Click & Drag to rotate 3D sphere</span>';
    }

    this.updateSurfaceSitesBar();
  }

  switchDestination(destId) {
    this.activeDestinationId = destId;
    const dest = this.destinationsData.find(d => d.id === destId) || this.destinationsData[0];
    if (!dest) return;

    // Update text elements
    const nameEl = document.getElementById('dest-name-display');
    const taglineEl = document.getElementById('dest-tagline-display');
    const overviewEl = document.getElementById('dest-overview-display');
    const distEl = document.getElementById('dest-dist-val');
    const gravEl = document.getElementById('dest-grav-val');
    const tempEl = document.getElementById('dest-temp-val');
    const atmoEl = document.getElementById('dest-atmo-val');
    const countEl = document.getElementById('dest-count-val');
    const quoteEl = document.getElementById('dest-quote-display');

    if (nameEl) nameEl.textContent = dest.name;
    if (taglineEl) taglineEl.textContent = dest.tagline;

    // Update Destination Heading with ParticleText
    if (this.destParticleText) {
      let title = 'MOON';
      let color = '#EAF4FF';
      let highlightColor = '#69BFFF';

      if (destId === 'mars') {
        title = 'MARS';
        color = '#FFE4D6';
        highlightColor = '#FF6E40';
      } else if (destId === 'deep-space') {
        title = 'DEEP SPACE';
        color = '#E0E7FF';
        highlightColor = '#818CF8';
      }

      this.destParticleText.setText(title, { color, highlightColor });
    }
    if (overviewEl) overviewEl.textContent = dest.description;
    if (distEl) distEl.textContent = dest.distance;
    if (gravEl) gravEl.textContent = dest.gravity;
    if (tempEl) tempEl.textContent = dest.temperature;
    if (atmoEl) atmoEl.textContent = dest.atmosphere;
    if (countEl) countEl.textContent = `${dest.artifactsCount} Documented Relics`;
    if (quoteEl) quoteEl.textContent = dest.quote;

    // Render active display mode (Globe, Surface, or Landing Map)
    const globeContainer = document.getElementById('destination-globe-viewport');
    const surfaceContainer = document.getElementById('destination-surface-viewport');
    const mapContainer = document.getElementById('destination-map-viewport');

    [globeContainer, surfaceContainer, mapContainer].forEach(c => c && (c.style.display = 'none'));

    if (this.destinationDisplayMode === 'surface') {
      if (surfaceContainer) {
        surfaceContainer.style.display = 'block';
        this.celestial.renderPlanetarySurface(surfaceContainer, destId, (targetId) => {
          if (targetId && this.artifactExplorer) {
            this.artifactExplorer.openById(targetId);
          }
        });
      }
    } else if (this.destinationDisplayMode === 'map') {
      if (mapContainer) {
        mapContainer.style.display = 'block';
        this.celestial.renderPlanetaryMap(mapContainer, destId, (targetId) => {
          if (targetId && this.artifactExplorer) {
            this.artifactExplorer.openById(targetId);
          }
        });
      }
    } else {
      if (globeContainer) {
        globeContainer.style.display = 'block';
        this.celestial.renderDestinationGlobe(globeContainer, destId);
      }
    }

    // Synchronize artifact explorer cards with the selected destination
    if (this.artifactExplorer) {
      this.artifactExplorer.setDestination(destId);
    }

    this.updateSurfaceSitesBar();
  }

  updateSurfaceSitesBar() {
    const bar = document.getElementById('dest-sites-bar');
    if (!bar) return;

    if (this.destinationDisplayMode !== 'surface') {
      bar.style.display = 'none';
      bar.innerHTML = '';
      return;
    }

    bar.style.display = 'flex';
    let sites = [];
    if (this.activeDestinationId === 'moon') {
      sites = [
        { id: 'all', label: '🌐 Lunar Overview', desc: 'Full landscape view' },
        { id: 'apollo-11', label: '📍 Mare Tranquillitatis (Apollo 11 LM)', desc: '0.674° N, 23.473° E • Footsteps only (No rover)' },
        { id: 'apollo-lrv', label: '📍 Hadley-Apennine (Apollo LRV)', desc: '26.132° N, 3.634° E • First Lunar Rover (Apollo 15)' }
      ];
    } else if (this.activeDestinationId === 'mars') {
      sites = [
        { id: 'all', label: '🌐 Martian Overview', desc: 'Full red planet landscape view' },
        { id: 'viking-1', label: '📍 Chryse Planitia (Viking 1)', desc: '22.27° N, 47.95° W • Landed 1976' },
        { id: 'ares-vallis', label: '📍 Ares Vallis (Pathfinder & Sojourner)', desc: '19.13° N, 33.22° W • 830 km southeast of Viking 1' }
      ];
    } else if (this.activeDestinationId === 'deep-space') {
      sites = [
        { id: 'all', label: '🌐 Cosmic Void', desc: 'Interstellar expanse view' },
        { id: 'voyager-craft', label: '📡 Voyager 1 Spacecraft', desc: '>163 AU • Golden Record & Scientific Booms' }
      ];
    }

    bar.innerHTML = sites.map((s, idx) => `
      <button class="site-btn ${idx === 0 ? 'active' : ''}" data-site="${s.id}" title="${s.desc}" style="padding: 0.25rem 0.65rem; font-size: 0.7rem; font-family: var(--font-mono); background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.25); color: #cbd5e1; border-radius: 4px; cursor: pointer; transition: all 0.2s ease;">
        ${s.label}
      </button>
    `).join('');

    bar.querySelectorAll('.site-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.site-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'rgba(0, 229, 255, 0.08)';
          b.style.borderColor = 'rgba(0, 229, 255, 0.25)';
          b.style.color = '#cbd5e1';
          b.style.boxShadow = '';
        });
        btn.classList.add('active');
        btn.style.background = 'rgba(0, 229, 255, 0.25)';
        btn.style.borderColor = 'var(--cyan-glow)';
        btn.style.color = '#fff';
        btn.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.4)';

        if (this.audio) this.audio.playChirp();
        const siteId = btn.dataset.site;
        if (this.celestial) {
          this.celestial.focusSurfaceSite(siteId);
        }
      });
    });
  }

  openStoryForArtifact(artifactId) {
    const story = this.storiesData.find(s => 
      s.artifactId === artifactId || 
      s.id === artifactId || 
      (artifactId.includes('apollo-11') && s.id.includes('apollo-11'))
    );
    const storyId = story ? story.id : 'apollo-11-lm';

    const storySection = document.getElementById('story');
    if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });

    if (this.storyMode) {
      this.storyMode.loadStory(storyId);
    }
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.app-header');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      if (header) {
        if (scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
