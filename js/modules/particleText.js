/**
 * NASA: ECHOES BEYOND EARTH - ParticleText Module
 * High-performance Canvas Particle Text engine inspired by React Bits ParticleText.
 * 
 * Features:
 * - Text rasterization & pixel sampling with configurable density
 * - Gather/scatter intro transitions with configurable stagger and easing
 * - Motion-reactive highlight color blending
 * - Interactive pointer repulsion physics with smooth spring-damping return
 * - Radial click shockwave burst
 * - Subtle harmonic idle drift
 * - Full responsive auto-scaling (never clips on mobile, tablet, or widescreen)
 * - Accessibility: prefers-reduced-motion compliance
 * - Battery-friendly: IntersectionObserver RAF pausing when offscreen
 */

export class ParticleText {
  constructor(container, options = {}) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }

    if (!this.container) {
      console.warn("ParticleText: container not found");
      return;
    }

    // Default configuration matching React Bits ParticleText
    this.options = {
      text: options.text || 'ECHOES BEYOND EARTH',
      intro: options.intro || 'gather',
      trigger: options.trigger || 'mount',
      shape: options.shape || 'circle',
      highlightMode: options.highlightMode || 'motion',
      particleSize: options.particleSize !== undefined ? options.particleSize : 2,
      density: options.density !== undefined ? options.density : 4,
      highlightColor: options.highlightColor || '#69BFFF',
      color: options.color || '#EAF4FF',
      gatherDuration: options.gatherDuration !== undefined ? options.gatherDuration : 2000,
      scatter: options.scatter !== undefined ? options.scatter : 220,
      stagger: options.stagger !== undefined ? options.stagger : 450,
      pointerRepel: options.pointerRepel !== undefined ? options.pointerRepel : 30,
      repelRadius: options.repelRadius !== undefined ? options.repelRadius : 130,
      idleDrift: options.idleDrift !== undefined ? options.idleDrift : 0.35,
      clickBurst: options.clickBurst !== undefined ? options.clickBurst : true,
      fontWeight: options.fontWeight || 800,
      fontFamily: options.fontFamily || "'Orbitron', 'Space Grotesk', -apple-system, sans-serif",
      textAlign: options.textAlign || 'center',
      glow: options.glow !== undefined ? options.glow : true,
      glowBlur: options.glowBlur || 8,
      maxFontSize: options.maxFontSize || 64,
      minFontSize: options.minFontSize || 26
    };

    // Color RGB tuples for fast lerp
    this.colorRgb = this.hexToRgb(this.options.color);
    this.highlightRgb = this.hexToRgb(this.options.highlightColor);

    // Canvas & context
    this.canvas = null;
    this.ctx = null;
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });

    // State
    this.particles = [];
    this.animId = null;
    this.startTime = null;
    this.isGathering = this.options.intro === 'gather';
    this.isVisible = true;
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse / Pointer
    this.mouse = { x: -9999, y: -9999, isInside: false };
    this.activeBursts = [];

    // Accessibility check
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) {
      this.options.gatherDuration = 0;
      this.options.idleDrift = 0;
      this.options.scatter = 0;
      this.options.stagger = 0;
      this.options.pointerRepel = 0;
      this.options.clickBurst = false;
      this.isGathering = false;
    }

    // Bindings
    this.handlePointerMove = this.onPointerMove.bind(this);
    this.handlePointerLeave = this.onPointerLeave.bind(this);
    this.handleClick = this.onClick.bind(this);
    this.handleResize = this.debounce(this.onResize.bind(this), 150);

    this.init();
  }

  async init() {
    this.createCanvas();
    this.setupEventListeners();
    this.setupIntersectionObserver();

    // Ensure web fonts are fully loaded before rasterizing text
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (e) {
        // Fallback gracefully
      }
    }

    this.updateDimensions();
    this.generateParticles();
    this.startLoop();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particle-text-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'auto';

    // Clear any previous canvas inside container
    const oldCanvas = this.container.querySelector('canvas.particle-text-canvas');
    if (oldCanvas) oldCanvas.remove();

    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  setupEventListeners() {
    if (!this.canvas) return;

    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
    if (this.options.clickBurst && !this.reducedMotion) {
      this.canvas.addEventListener('click', this.handleClick);
    }
    window.addEventListener('resize', this.handleResize);
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animId) {
          this.startLoop();
        }
      });
    }, { threshold: 0.05 });

    this.observer.observe(this.container);
  }

  updateDimensions() {
    if (!this.container || !this.canvas) return;

    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(rect.width || 800, 320);
    this.height = Math.max(rect.height || 120, 80);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  calculateOptimalFontSize(text, maxWidth, maxHeight) {
    const minSize = this.options.minFontSize;
    const maxSize = this.options.maxFontSize;

    // Use offscreen context to measure text
    let low = minSize;
    let high = maxSize;
    let optimal = minSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      this.offscreenCtx.font = `${this.options.fontWeight} ${mid}px ${this.options.fontFamily}`;
      const metrics = this.offscreenCtx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = mid * 1.15;

      const availWidth = this.options.textAlign === 'left' ? maxWidth * 0.96 : maxWidth * 0.92;
      if (textWidth <= availWidth && textHeight <= maxHeight * 0.92) {
        optimal = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return optimal;
  }

  generateParticles() {
    const text = this.options.text;
    const width = this.width;
    const height = this.height;

    // Set offscreen canvas size
    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;
    const octx = this.offscreenCtx;

    octx.clearRect(0, 0, width, height);

    // Compute optimal responsive font size
    const fontSize = this.calculateOptimalFontSize(text, width, height);
    const isLeft = this.options.textAlign === 'left';

    octx.font = `${this.options.fontWeight} ${fontSize}px ${this.options.fontFamily}`;
    octx.fillStyle = '#ffffff';
    octx.textAlign = isLeft ? 'left' : 'center';
    octx.textBaseline = 'middle';
    octx.letterSpacing = '2px';

    // Position text: left-aligned with small margin or centered
    const textX = isLeft ? Math.max(4, Math.floor(width * 0.015)) : width / 2;
    octx.fillText(text, textX, height / 2);

    // Scan pixel data
    const imgData = octx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const step = Math.max(2, this.options.density);
    const targetPoints = [];

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 120) {
          targetPoints.push({ x, y });
        }
      }
    }

    // Reuse or recreate particles smoothly
    const newParticles = [];
    const isIntro = this.options.intro === 'gather' && !this.reducedMotion;
    const scatterDist = this.options.scatter;
    const maxStagger = this.options.stagger;

    for (let i = 0; i < targetPoints.length; i++) {
      const pt = targetPoints[i];
      let p = this.particles[i];

      if (!p) {
        // Create new particle
        const angle = Math.random() * Math.PI * 2;
        const dist = scatterDist * (0.35 + Math.random() * 0.65);
        const originX = isIntro ? pt.x + Math.cos(angle) * dist : pt.x;
        const originY = isIntro ? pt.y + Math.sin(angle) * dist : pt.y;

        p = {
          targetX: pt.x,
          targetY: pt.y,
          originX: originX,
          originY: originY,
          x: originX,
          y: originY,
          vx: 0,
          vy: 0,
          delay: Math.random() * maxStagger,
          idlePhase: Math.random() * Math.PI * 2,
          idleSpeed: 0.6 + Math.random() * 0.6,
          size: this.options.particleSize,
          highlightAlpha: 0
        };
      } else {
        // Reuse existing particle smoothly
        p.targetX = pt.x;
        p.targetY = pt.y;
        p.originX = Number.isFinite(p.x) ? p.x : pt.x;
        p.originY = Number.isFinite(p.y) ? p.y : pt.y;
        p.x = p.originX;
        p.y = p.originY;
        p.vx = 0;
        p.vy = 0;
      }

      newParticles.push(p);
    }

    this.particles = newParticles;
    this.startTime = performance.now();
    this.isGathering = isIntro;
  }

  onPointerMove(e) {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.isInside = true;
  }

  onPointerLeave() {
    this.mouse.isInside = false;
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  onClick(e) {
    if (!this.options.clickBurst || this.reducedMotion || !this.canvas) return;
    const rect = this.canvas.getBoundingClientRect ? this.canvas.getBoundingClientRect() : { left: 0, top: 0 };
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    this.activeBursts.push({
      x: clickX,
      y: clickY,
      time: performance.now(),
      radius: 180,
      force: 24
    });

    // Keep max 3 bursts
    if (this.activeBursts.length > 3) this.activeBursts.shift();
  }

  onResize() {
    this.updateDimensions();
    this.generateParticles();
  }

  startLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.startTime = performance.now();

    const loop = (now) => {
      this.animId = requestAnimationFrame(loop);

      if (!this.isVisible) return;

      this.updatePhysics(now || performance.now());
      this.render();
    };

    this.animId = requestAnimationFrame(loop);
  }

  updatePhysics(now) {
    if (!this.startTime) this.startTime = now;
    const elapsed = Math.max(0, now - this.startTime);
    const gatherDuration = Math.max(1, this.options.gatherDuration);
    const springK = 0.082;
    const damping = 0.81;
    const repelRadius = this.options.repelRadius;
    const pointerRepel = this.options.pointerRepel;
    const idleDrift = this.options.idleDrift;

    // Clean up expired bursts (> 600ms)
    this.activeBursts = this.activeBursts.filter(b => now - b.time < 600);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // 1. Initial Gather Progression
      if (this.isGathering) {
        if (elapsed < p.delay) {
          // Still waiting for stagger delay
          continue;
        }

        const gatherProgress = Math.min(1, Math.max(0, (elapsed - p.delay) / gatherDuration));
        // Cubic ease out
        const ease = 1 - Math.pow(1 - gatherProgress, 3);

        const currentAnchorX = p.originX + (p.targetX - p.originX) * ease;
        const currentAnchorY = p.originY + (p.targetY - p.originY) * ease;

        p.x = currentAnchorX;
        p.y = currentAnchorY;

        if (gatherProgress >= 1) {
          p.x = p.targetX;
          p.y = p.targetY;
        }
        continue;
      }

      // 2. Idle Harmonic Drift
      let anchorX = p.targetX;
      let anchorY = p.targetY;

      if (idleDrift > 0 && !this.reducedMotion) {
        anchorX += Math.sin(now * 0.0016 * p.idleSpeed + p.idlePhase) * idleDrift;
        anchorY += Math.cos(now * 0.0012 * p.idleSpeed + p.idlePhase) * idleDrift;
      }

      // 3. Pointer Repulsion Force
      if (this.mouse.isInside && pointerRepel > 0 && !this.reducedMotion) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < repelRadius && dist > 0.1) {
          const force = Math.pow(1 - dist / repelRadius, 2) * pointerRepel * 0.22;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // 4. Click Burst Shockwave
      for (let b = 0; b < this.activeBursts.length; b++) {
        const burst = this.activeBursts[b];
        const age = now - burst.time;
        if (age < 350) {
          const bdx = p.x - burst.x;
          const bdy = p.y - burst.y;
          const bdist = Math.hypot(bdx, bdy);

          if (bdist < burst.radius && bdist > 0.1) {
            const bforce = (1 - bdist / burst.radius) * burst.force * (1 - age / 350);
            p.vx += (bdx / bdist) * bforce;
            p.vy += (bdy / bdist) * bforce;
          }
        }
      }

      // 5. Spring Return to Target Anchor
      const springX = (anchorX - p.x) * springK;
      const springY = (anchorY - p.y) * springK;

      p.vx = (p.vx + springX) * damping;
      p.vy = (p.vy + springY) * damping;

      p.x += p.vx;
      p.y += p.vy;

      // 6. Highlight Mode Blending ('motion')
      const speed = Math.hypot(p.vx, p.vy);
      const targetHighlight = Math.min(1, Math.max(0, (speed - 0.25) / 3.0));
      p.highlightAlpha += (targetHighlight - p.highlightAlpha) * 0.12;
    }

    // Check if gather phase is complete for all particles
    if (this.isGathering && elapsed >= gatherDuration + this.options.stagger) {
      this.isGathering = false;
    }
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const isCircle = this.options.shape === 'circle';
    const radius = this.options.particleSize;
    const hasGlow = this.options.glow;
    const highlightColor = this.options.highlightColor;

    // Optional glow pass for motion particles
    if (hasGlow && !this.reducedMotion) {
      ctx.shadowBlur = this.options.glowBlur;
      ctx.shadowColor = highlightColor;
    } else {
      ctx.shadowBlur = 0;
    }

    const c1 = this.colorRgb;
    const c2 = this.highlightRgb;

    // Render particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const h = p.highlightAlpha || 0;

      // Color interpolation between base color and highlightColor
      const r = Math.round(c1.r + (c2.r - c1.r) * h);
      const g = Math.round(c1.g + (c2.g - c1.g) * h);
      const b = Math.round(c1.b + (c2.b - c1.b) * h);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      if (isCircle) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
      }
    }
  }

  setText(newText, newOptions = {}) {
    if (this.options.text === newText && !newOptions.color && !newOptions.highlightColor) return;
    this.options.text = newText;

    if (newOptions.color) {
      this.options.color = newOptions.color;
      this.colorRgb = this.hexToRgb(newOptions.color);
    }
    if (newOptions.highlightColor) {
      this.options.highlightColor = newOptions.highlightColor;
      this.highlightRgb = this.hexToRgb(newOptions.highlightColor);
    }
    if (newOptions.gatherDuration !== undefined) {
      this.options.gatherDuration = newOptions.gatherDuration;
    }

    this.generateParticles();
  }

  hexToRgb(hex) {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.observer) this.observer.disconnect();

    if (this.canvas) {
      this.canvas.removeEventListener('pointermove', this.handlePointerMove);
      this.canvas.removeEventListener('pointerleave', this.handlePointerLeave);
      this.canvas.removeEventListener('click', this.handleClick);
      if (typeof this.canvas.remove === 'function') {
        this.canvas.remove();
      } else if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }

    window.removeEventListener('resize', this.handleResize);
    this.particles = [];
  }
}

