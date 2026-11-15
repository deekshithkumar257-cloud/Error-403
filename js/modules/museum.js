/**
 * NASA: ECHOES BEYOND EARTH - Solar System Museum Module
 * "SOLAR SYSTEM MUSEUM – Explore the Forgotten Machines"
 * 
 * Interactive 2D orbital canvas showing The Sun, Earth, The Moon, Mars, and the Deep Space Zone.
 * Smooth camera zoom & pan, interactive reticles, destination spotlight panel,
 * artifact showcase cards, verified historical achievement callouts, and direct
 * navigation to Artifact Explorer, Mission Story Mode, and Mission Timeline.
 */

export class SolarSystemMuseum {
  constructor({
    missionsData = [],
    destinationsData = [],
    timelineData = [],
    storiesData = [],
    audioEngine = null,
    onOpenArtifact = null,
    onOpenStory = null,
    onOpenTimeline = null,
    onNavigateTo = null
  }) {
    this.missions = missionsData;
    this.destinations = destinationsData;
    this.timeline = timelineData;
    this.stories = storiesData;
    this.audio = audioEngine;

    this.onOpenArtifact = onOpenArtifact;
    this.onOpenStory = onOpenStory;
    this.onOpenTimeline = onOpenTimeline;
    this.onNavigateTo = onNavigateTo;

    this.activeDestinationId = 'moon'; // 'moon', 'mars', 'deep-space', 'sun-earth'
    this.animId = null;
    this.canvas = null;
    this.ctx = null;

    // Orbital camera & motion state
    this.isMotionActive = true;
    this.orbitAngle = 0; // Earth & Mars orbital angle progress
    this.moonAngle = 0;
    this.voyagerPulse = 0;

    // Camera transform (Pan & Zoom)
    this.scale = 1.0;
    this.targetScale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.targetPanX = 0;
    this.targetPanY = 0;

    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.hoveredBody = null;

    // 3D Solar System State (Phase 4)
    this.threeAvailable = typeof window.THREE !== 'undefined';
    this.is3DMode = this.threeAvailable;
    this.threeRenderer = null;
    this.threeScene = null;
    this.threeCamera = null;
    this.threeCanvasWrap = null;
    this.threeAnimId = null;
    this.bodies3D = {};
    this.orbitAngle3D = 0;
    this.moonAngle3D = 0;
    this.camSpherical = { radius: 760, theta: Math.PI / 4, phi: Math.PI / 3 };
    this.targetSpherical = { radius: 760, theta: Math.PI / 4, phi: Math.PI / 3 };
    this.camLookTarget = null;
    this.curLookTarget = null;
    this.focusBodyKey = null;
    this.raycaster3D = null;
    this.mouse3D = null;
    this.hoveredObject3D = null;
    this.isDragging3D = false;
    this.prevDrag3DX = 0;
    this.prevDrag3DY = 0;
    this.isGrandTourActive = false;
    this.grandTourTimeout = null;

    // Body definition parameters (scaled illustratively for educational museum viewing)
    this.bodies = {
      sun: {
        id: 'sun-earth',
        name: 'The Sun',
        subtitle: 'Cosmic Engine (0 AU)',
        distAU: 0,
        radius: 28,
        color: '#ffb703',
        glowColor: 'rgba(255, 183, 3, 0.45)',
        orbitalRadius: 0
      },
      earth: {
        id: 'sun-earth',
        name: 'Earth',
        subtitle: 'Human Cradle (1.0 AU)',
        distAU: 1.0,
        radius: 13,
        color: '#38bdf8',
        glowColor: 'rgba(56, 189, 248, 0.4)',
        orbitalRadius: 155
      },
      moon: {
        id: 'moon',
        name: 'The Moon',
        subtitle: 'Tranquility Base (0.00257 AU)',
        distAU: 1.0,
        radius: 6.5,
        color: '#cbd5e1',
        glowColor: 'rgba(203, 213, 225, 0.45)',
        orbitalRadius: 28 // Relative to Earth
      },
      mars: {
        id: 'mars',
        name: 'Mars',
        subtitle: 'The Red Planet (1.52 AU)',
        distAU: 1.52,
        radius: 10,
        color: '#f97316',
        glowColor: 'rgba(249, 115, 22, 0.4)',
        orbitalRadius: 250
      },
      deepSpace: {
        id: 'deep-space',
        name: 'Deep Space Zone',
        subtitle: 'Voyager 1 (~163+ AU)',
        distAU: 163,
        radius: 14,
        color: '#818cf8',
        glowColor: 'rgba(129, 140, 248, 0.45)',
        orbitalRadius: 380
      }
    };
  }

  init() {
    this.canvas = document.getElementById('museum-canvas');
    this.canvasWrap = document.querySelector('.museum-canvas-wrap');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.setupCanvasDPI();
    this.setupEventListeners();
    this.setupQuickSelectTabs();
    this.setupCameraControls();
    this.renderDetailPanel();

    if (this.threeAvailable) {
      this.initThree3D();
    } else {
      this.is3DMode = false;
      this.startLoop();
    }

    // Resize handling
    window.addEventListener('resize', () => {
      if (this.is3DMode && this.threeRenderer && this.threeCamera) {
        this.onResize3D();
      } else {
        this.setupCanvasDPI();
      }
    });
  }

  setupCanvasDPI() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = rect.width || 800;
    const displayHeight = rect.height || 480;

    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;

    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.dpr = dpr;

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      this.ctx.scale(dpr, dpr);
    }
  }

  // -------------------------------------------------------------
  // USER INTERACTION LISTENERS (PAN, ZOOM, HOVER, CLICK)
  // -------------------------------------------------------------
  setupEventListeners() {
    if (!this.canvas) return;

    // Mouse Move (Hover & Drag)
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isDragging) {
        const dx = mouseX - this.dragStartX;
        const dy = mouseY - this.dragStartY;
        this.panX += dx;
        this.panY += dy;
        this.targetPanX = this.panX;
        this.targetPanY = this.panY;
        this.dragStartX = mouseX;
        this.dragStartY = mouseY;
        return;
      }

      // Check proximity to celestial bodies
      const hovered = this.hitTest(mouseX, mouseY);
      if (hovered !== this.hoveredBody) {
        this.hoveredBody = hovered;
        this.canvas.style.cursor = hovered ? 'pointer' : 'grab';
        if (hovered && this.audio) {
          this.audio.playChirp();
        }
      }
    });

    // Mouse Down (Start Drag)
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.isDragging = true;
      this.dragStartX = e.clientX - rect.left;
      this.dragStartY = e.clientY - rect.top;
      this.canvas.style.cursor = 'grabbing';
    });

    // Mouse Up (Select Body or End Drag)
    window.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      if (this.canvas) {
        this.canvas.style.cursor = this.hoveredBody ? 'pointer' : 'grab';
      }
    });

    // Click on Body
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const clicked = this.hitTest(mouseX, mouseY);

      if (clicked) {
        if (this.audio) this.audio.playQuindar();
        this.selectDestination(clicked.id, true);
      }
    });

    // Wheel Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
      this.targetScale = Math.max(0.65, Math.min(2.4, this.targetScale * zoomFactor));
    }, { passive: false });

    // Touch Support for Mobile / Tablets
    let touchStartDist = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.isDragging = true;
        this.dragStartX = touch.clientX - rect.left;
        this.dragStartY = touch.clientY - rect.top;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const curX = touch.clientX - rect.left;
        const curY = touch.clientY - rect.top;
        this.panX += curX - this.dragStartX;
        this.panY += curY - this.dragStartY;
        this.targetPanX = this.panX;
        this.targetPanY = this.panY;
        this.dragStartX = curX;
        this.dragStartY = curY;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = dist / (touchStartDist || dist);
        this.targetScale = Math.max(0.65, Math.min(2.4, this.targetScale * (factor > 1 ? 1.03 : 0.97)));
        touchStartDist = dist;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setupQuickSelectTabs() {
    const tabBtns = document.querySelectorAll('.museum-dest-tab');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const destId = btn.dataset.dest;
        this.selectDestination(destId, true);
      });
    });
  }

  setupCameraControls() {
    const zoomInBtn = document.getElementById('museum-zoom-in');
    const zoomOutBtn = document.getElementById('museum-zoom-out');
    const resetBtn = document.getElementById('museum-reset-cam');
    const pauseBtn = document.getElementById('museum-pause-motion');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.targetScale = Math.min(2.4, this.targetScale * 1.25);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.targetScale = Math.max(0.65, this.targetScale * 0.8);
      });
    }

    const view3DBtn = document.getElementById('museum-view-3d-btn');
    const view2DBtn = document.getElementById('museum-view-2d-btn');

    if (view3DBtn) {
      view3DBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.switchMode(true);
      });
    }

    if (view2DBtn) {
      view2DBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.switchMode(false);
      });
    }

    const tourBtn = document.getElementById('museum-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        this.toggleGrandTour();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.isGrandTourActive) this.stopGrandTour();
        if (this.audio) this.audio.playChirp();
        this.resetCamera();
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.isMotionActive = !this.isMotionActive;
        pauseBtn.innerHTML = this.isMotionActive 
          ? '<span>⏸ Freeze Orbit</span>' 
          : '<span>▶ Resume Orbit</span>';
        if (this.audio) this.audio.playChirp();
      });
    }
  }

  resetCamera() {
    this.targetScale = 1.0;
    this.targetPanX = 0;
    this.targetPanY = 0;
    if (this.is3DMode) {
      this.focusBodyKey = null;
      this.targetSpherical = { radius: 760, theta: Math.PI / 4, phi: Math.PI / 3 };
      if (this.camLookTarget) this.camLookTarget.set(0, 0, 0);
    }
  }

  toggleGrandTour() {
    if (this.isGrandTourActive) {
      this.stopGrandTour();
    } else {
      this.startGrandTour();
    }
  }

  startGrandTour() {
    this.isGrandTourActive = true;
    if (!this.is3DMode) {
      this.switchMode(true);
    }

    const tourBtn = document.getElementById('museum-tour-btn');
    if (tourBtn) {
      tourBtn.classList.add('active');
      tourBtn.innerHTML = '<span>⏹ Stop Tour</span>';
      tourBtn.style.borderColor = 'var(--cyan-glow)';
      tourBtn.style.color = '#fff';
      tourBtn.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.45)';
    }

    const stops = [
      { id: 'sun-earth', duration: 4200, label: 'Overview: Sun & Inner Solar System' },
      { id: 'moon', duration: 5200, label: 'Destination: The Moon (Apollo Relics)' },
      { id: 'mars', duration: 5200, label: 'Destination: Mars (Viking 1 & Pathfinder)' },
      { id: 'deep-space', duration: 5200, label: 'Destination: Deep Space (Voyager 1 Interstellar)' },
      { id: 'sun-earth', duration: 4000, label: 'Cosmic Heliopause Vista: Return to Overview' }
    ];

    let currentStep = 0;
    const executeStep = () => {
      if (!this.isGrandTourActive) return;
      if (currentStep >= stops.length) {
        this.stopGrandTour();
        return;
      }

      const stop = stops[currentStep];
      this.selectDestination(stop.id, true);

      const titleEl = document.getElementById('museum-mode-title');
      if (titleEl) {
        titleEl.textContent = `GRAND TOUR // ${stop.label.toUpperCase()}`;
      }

      if (this.audio) this.audio.playChirp();
      currentStep++;
      this.grandTourTimeout = setTimeout(executeStep, stop.duration);
    };

    executeStep();
  }

  stopGrandTour() {
    this.isGrandTourActive = false;
    if (this.grandTourTimeout) {
      clearTimeout(this.grandTourTimeout);
      this.grandTourTimeout = null;
    }

    const tourBtn = document.getElementById('museum-tour-btn');
    if (tourBtn) {
      tourBtn.classList.remove('active');
      tourBtn.innerHTML = '<span>🚀 Grand Tour</span>';
      tourBtn.style.borderColor = '';
      tourBtn.style.color = '';
      tourBtn.style.boxShadow = '';
    }

    const titleEl = document.getElementById('museum-mode-title');
    if (titleEl) {
      titleEl.textContent = this.is3DMode 
        ? 'SOLAR SYSTEM // INTERACTIVE 3D SIMULATOR' 
        : 'ORBITAL SIMULATOR // INTERACTIVE 2D';
    }
  }

  switchMode(is3D) {
    if (!this.threeAvailable && is3D) return;
    this.is3DMode = is3D;

    const view3DBtn = document.getElementById('museum-view-3d-btn');
    const view2DBtn = document.getElementById('museum-view-2d-btn');
    const titleEl = document.getElementById('museum-mode-title');

    if (is3D) {
      if (view3DBtn) view3DBtn.classList.add('active');
      if (view2DBtn) view2DBtn.classList.remove('active');
      if (titleEl) titleEl.textContent = 'SOLAR SYSTEM // INTERACTIVE 3D SIMULATOR';
      if (this.canvas) this.canvas.style.display = 'none';
      if (this.threeRenderer) this.threeRenderer.domElement.style.display = 'block';
    } else {
      if (view3DBtn) view3DBtn.classList.remove('active');
      if (view2DBtn) view2DBtn.classList.add('active');
      if (titleEl) titleEl.textContent = 'ORBITAL SIMULATOR // INTERACTIVE 2D';
      if (this.canvas) this.canvas.style.display = 'block';
      if (this.threeRenderer) this.threeRenderer.domElement.style.display = 'none';
      if (!this.animId) this.startLoop();
    }
  }

  focusOnDestination(destId) {
    const coords = this.getScreenCoordinates();
    let target = null;
    if (destId === 'moon') target = coords.moon;
    else if (destId === 'mars') target = coords.mars;
    else if (destId === 'deep-space') target = coords.deepSpace;
    else target = coords.sun;

    if (target) {
      const centerX = this.displayWidth / 2;
      const centerY = this.displayHeight / 2;
      // Center the camera smoothly on target
      this.targetPanX = (centerX - target.rawX) * this.scale * 0.5;
      this.targetPanY = (centerY - target.rawY) * this.scale * 0.5;
      this.targetScale = destId === 'moon' ? 1.35 : destId === 'deep-space' ? 0.95 : 1.2;
    }
  }

  selectDestination(destId, autoFocus = false) {
    this.activeDestinationId = destId;

    // Update active tab button styles
    const tabBtns = document.querySelectorAll('.museum-dest-tab');
    tabBtns.forEach(btn => {
      if (btn.dataset.dest === destId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (this.is3DMode) {
      this.flyCameraToDestination3D(destId);
    } else if (autoFocus) {
      this.focusOnDestination(destId);
    }

    this.renderDetailPanel();
  }

  // -------------------------------------------------------------
  // HIT TESTING FOR CLICK & HOVER
  // -------------------------------------------------------------
  hitTest(screenX, screenY) {
    const coords = this.getScreenCoordinates();
    const testList = [
      { key: 'moon', ...coords.moon, hitR: 20 },
      { key: 'mars', ...coords.mars, hitR: 22 },
      { key: 'deepSpace', ...coords.deepSpace, hitR: 26 },
      { key: 'earth', ...coords.earth, hitR: 22 },
      { key: 'sun', ...coords.sun, hitR: 34 }
    ];

    for (const item of testList) {
      const dist = Math.hypot(screenX - item.x, screenY - item.y);
      if (dist <= item.hitR * this.scale) {
        return {
          id: item.id,
          name: item.name,
          key: item.key,
          x: item.x,
          y: item.y
        };
      }
    }
    return null;
  }

  // -------------------------------------------------------------
  // CALCULATE CELESTIAL POSITIONS
  // -------------------------------------------------------------
  getScreenCoordinates() {
    const originX = (this.displayWidth / 2) + this.panX;
    const originY = (this.displayHeight / 2) + this.panY;

    // Earth orbital position
    const earthR = this.bodies.earth.orbitalRadius * this.scale;
    const earthRawX = (this.displayWidth / 2) + Math.cos(this.orbitAngle) * earthR;
    const earthRawY = (this.displayHeight / 2) + Math.sin(this.orbitAngle) * (earthR * 0.72); // slightly elliptical perspective

    const earthX = originX + Math.cos(this.orbitAngle) * earthR;
    const earthY = originY + Math.sin(this.orbitAngle) * (earthR * 0.72);

    // Moon orbital position around Earth
    const moonR = this.bodies.moon.orbitalRadius * this.scale;
    const moonRawX = earthRawX + Math.cos(this.moonAngle) * moonR;
    const moonRawY = earthRawY + Math.sin(this.moonAngle) * (moonR * 0.85);

    const moonX = earthX + Math.cos(this.moonAngle) * moonR;
    const moonY = earthY + Math.sin(this.moonAngle) * (moonR * 0.85);

    // Mars orbital position around Sun
    const marsR = this.bodies.mars.orbitalRadius * this.scale;
    const marsAngle = this.orbitAngle * 0.53 + 1.2; // Mars takes ~1.88 Earth years
    const marsRawX = (this.displayWidth / 2) + Math.cos(marsAngle) * marsR;
    const marsRawY = (this.displayHeight / 2) + Math.sin(marsAngle) * (marsR * 0.72);

    const marsX = originX + Math.cos(marsAngle) * marsR;
    const marsY = originY + Math.sin(marsAngle) * (marsR * 0.72);

    // Deep Space Zone (Voyager 1 heading toward 35° north of the ecliptic)
    const dsR = this.bodies.deepSpace.orbitalRadius * this.scale;
    const dsRawX = (this.displayWidth / 2) + Math.cos(-0.65) * dsR;
    const dsRawY = (this.displayHeight / 2) + Math.sin(-0.65) * (dsR * 0.65);

    const dsX = originX + Math.cos(-0.65) * dsR;
    const dsY = originY + Math.sin(-0.65) * (dsR * 0.65);

    return {
      sun: {
        id: this.bodies.sun.id,
        name: this.bodies.sun.name,
        x: originX,
        y: originY,
        rawX: this.displayWidth / 2,
        rawY: this.displayHeight / 2
      },
      earth: {
        id: this.bodies.earth.id,
        name: this.bodies.earth.name,
        x: earthX,
        y: earthY,
        rawX: earthRawX,
        rawY: earthRawY
      },
      moon: {
        id: this.bodies.moon.id,
        name: this.bodies.moon.name,
        x: moonX,
        y: moonY,
        rawX: moonRawX,
        rawY: moonRawY
      },
      mars: {
        id: this.bodies.mars.id,
        name: this.bodies.mars.name,
        x: marsX,
        y: marsY,
        rawX: marsRawX,
        rawY: marsRawY
      },
      deepSpace: {
        id: this.bodies.deepSpace.id,
        name: this.bodies.deepSpace.name,
        x: dsX,
        y: dsY,
        rawX: dsRawX,
        rawY: dsRawY
      }
    };
  }

  // -------------------------------------------------------------
  // MAIN RENDER LOOP (60 FPS)
  // -------------------------------------------------------------
  startLoop() {
    const loop = () => {
      this.animId = requestAnimationFrame(loop);

      // Smooth camera interpolation
      this.scale += (this.targetScale - this.scale) * 0.08;
      this.panX += (this.targetPanX - this.panX) * 0.08;
      this.panY += (this.targetPanY - this.panY) * 0.08;

      // Advance celestial orbital motion
      if (this.isMotionActive) {
        this.orbitAngle += 0.0035;
        this.moonAngle += 0.024;
        this.voyagerPulse = (this.voyagerPulse + 0.04) % (Math.PI * 2);
      }

      this.renderCanvas();
    };
    loop();
  }

  renderCanvas() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    // Clear background
    ctx.clearRect(0, 0, w, h);

    // Deep cosmic space background fill
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w * 0.7);
    bgGrad.addColorStop(0, '#0a142c');
    bgGrad.addColorStop(0.5, '#050b18');
    bgGrad.addColorStop(1, '#02040a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle coordinate grid lines
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 40; y < h; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    const coords = this.getScreenCoordinates();
    const originX = coords.sun.x;
    const originY = coords.sun.y;

    // 1. Draw Orbital Tracks
    this.drawOrbitEllipse(ctx, originX, originY, this.bodies.earth.orbitalRadius * this.scale, 'rgba(56, 189, 248, 0.16)', [3, 4]);
    this.drawOrbitEllipse(ctx, originX, originY, this.bodies.mars.orbitalRadius * this.scale, 'rgba(249, 115, 22, 0.16)', [3, 4]);
    
    // Moon orbit around Earth
    this.drawOrbitEllipse(ctx, coords.earth.x, coords.earth.y, this.bodies.moon.orbitalRadius * this.scale, 'rgba(203, 213, 225, 0.22)', [2, 3]);

    // Asteroid Belt illustrative dust ring (between Mars and Deep Space)
    this.drawAsteroidBelt(ctx, originX, originY, 305 * this.scale);

    // Heliopause Shock Boundary (121 AU Interstellar Barrier)
    this.drawHeliopauseBoundary(ctx, originX, originY, 360 * this.scale);

    // Voyager 1 Trajectory Vector Arrow
    this.drawVoyagerTrajectory(ctx, coords.earth.x, coords.earth.y, coords.deepSpace.x, coords.deepSpace.y);

    // 2. Draw Celestial Bodies
    // SUN
    this.drawSun(ctx, coords.sun.x, coords.sun.y);

    // EARTH
    this.drawEarth(ctx, coords.earth.x, coords.earth.y);

    // MOON
    this.drawMoon(ctx, coords.moon.x, coords.moon.y);

    // MARS
    this.drawMars(ctx, coords.mars.x, coords.mars.y);

    // DEEP SPACE ZONE / VOYAGER 1
    this.drawDeepSpaceMarker(ctx, coords.deepSpace.x, coords.deepSpace.y);

    // 3. Draw Active Selection Holographic Reticle
    this.drawActiveSelection(ctx, coords);

    // 4. Draw Hover Telemetry Badge
    if (this.hoveredBody) {
      this.drawHoverBadge(ctx, this.hoveredBody);
    }
  }

  drawOrbitEllipse(ctx, cx, cy, radius, strokeStyle, dash = []) {
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawAsteroidBelt(ctx, cx, cy, radius) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 183, 3, 0.09)';
    ctx.lineWidth = 14 * this.scale;
    ctx.setLineDash([2, 8]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 183, 3, 0.3)';
    ctx.font = '8px JetBrains Mono';
    ctx.fillText('ASTEROID BELT // 2.7 AU', cx + radius * 0.65, cy - radius * 0.45);
    ctx.restore();
  }

  drawHeliopauseBoundary(ctx, cx, cy, radius) {
    ctx.save();
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.72, -0.2, -Math.PI * 0.45, Math.PI * 0.15);
    ctx.stroke();

    ctx.fillStyle = '#818cf8';
    ctx.font = '8px JetBrains Mono';
    ctx.fillText('HELIOPAUSE (121.6 AU) // TERMINATION SHOCK', cx + radius * 0.45, cy - radius * 0.52);
    ctx.restore();
  }

  drawVoyagerTrajectory(ctx, ex, ey, vx, vy) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(vx, vy);
    ctx.stroke();

    // Pulse wave traveling outward
    const pulseOffset = (this.voyagerPulse / (Math.PI * 2));
    const pulseX = ex + (vx - ex) * pulseOffset;
    const pulseY = ey + (vy - ey) * pulseOffset;

    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawSun(ctx, x, y) {
    const r = this.bodies.sun.radius * this.scale;

    // Solar outer coronal rays
    const coronaGrad = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 2.8);
    coronaGrad.addColorStop(0, 'rgba(255, 183, 3, 0.7)');
    coronaGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.25)');
    coronaGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Sun core
    const coreGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.35, '#ffea79');
    coreGrad.addColorStop(0.8, '#ffb703');
    coreGrad.addColorStop(1, '#f97316');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#ffedd5';
    ctx.font = 'bold 10px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE SUN', x, y + r + 14);
  }

  drawEarth(ctx, x, y) {
    const r = this.bodies.earth.radius * this.scale;

    // Atmospheric glow
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;

    // Body
    const earthGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
    earthGrad.addColorStop(0, '#60a5fa');
    earthGrad.addColorStop(0.4, '#1d4ed8');
    earthGrad.addColorStop(0.8, '#0f224a');
    earthGrad.addColorStop(1, '#020617');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Swirling continents
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(x - r * 0.2, y - r * 0.1, r * 0.4, r * 0.28, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + r * 0.25, y + r * 0.2, r * 0.3, r * 0.2, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#bae6fd';
    ctx.font = '9px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('Earth (1.0 AU)', x, y + r + 12);
  }

  drawMoon(ctx, x, y) {
    const r = this.bodies.moon.radius * this.scale;

    // Lunar body
    const moonGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
    moonGrad.addColorStop(0, '#f8fafc');
    moonGrad.addColorStop(0.5, '#cbd5e1');
    moonGrad.addColorStop(0.85, '#64748b');
    moonGrad.addColorStop(1, '#334155');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Dark lunar maria crater
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(x + r * 0.15, y - r * 0.15, r * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 9px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('Moon (Tranquility Base)', x, y - r - 6);

    // Relic Badge Pin
    this.drawRelicCountPill(ctx, x, y + r + 11, '2 NASA Relics', '#00e5ff');
  }

  drawMars(ctx, x, y) {
    const r = this.bodies.mars.radius * this.scale;

    // Mars glow
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 8;

    // Body
    const marsGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
    marsGrad.addColorStop(0, '#fed7aa');
    marsGrad.addColorStop(0.4, '#ea580c');
    marsGrad.addColorStop(0.85, '#9a3412');
    marsGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = marsGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // White Polar Ice Cap
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y - r * 0.72, r * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Dark volcanic terrain
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.ellipse(x + r * 0.1, y + r * 0.2, r * 0.5, r * 0.22, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#fed7aa';
    ctx.font = 'bold 9px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('Mars (1.52 AU)', x, y - r - 6);

    // Relic Badge Pin
    this.drawRelicCountPill(ctx, x, y + r + 11, '3 NASA Landers', '#f97316');
  }

  drawDeepSpaceMarker(ctx, x, y) {
    // Voyager 1 Spacecraft Schematic Icon
    ctx.save();
    ctx.translate(x, y);

    // Pulsing radar ring
    const pulseR = 12 + Math.sin(this.voyagerPulse) * 5;
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
    ctx.stroke();

    // High Gain Antenna Dish (Gold Parabola)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, 0, 7, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fill();

    // Central Feed Horn & Magnetometer Boom Line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, -8);
    ctx.stroke();

    // RTG Power generator boom
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-6, 6);
    ctx.stroke();

    ctx.restore();

    // Label
    ctx.fillStyle = '#c7d2fe';
    ctx.font = 'bold 9px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('Voyager 1 (163+ AU)', x, y - 18);

    // Status Pill
    this.drawRelicCountPill(ctx, x, y + 16, 'Active // Travelling', '#38bdf8');
  }

  drawRelicCountPill(ctx, x, y, text, color) {
    ctx.save();
    ctx.font = '8px JetBrains Mono';
    const textWidth = ctx.measureText(text).width;
    const pad = 6;
    const h = 13;

    ctx.fillStyle = 'rgba(10, 22, 48, 0.88)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x - (textWidth / 2) - pad, y - (h / 2), textWidth + pad * 2, h, 3);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawActiveSelection(ctx, coords) {
    let target = null;
    let label = '';
    let color = '#00e5ff';

    if (this.activeDestinationId === 'moon') {
      target = coords.moon;
      label = 'SELECTED: THE MOON';
      color = '#00e5ff';
    } else if (this.activeDestinationId === 'mars') {
      target = coords.mars;
      label = 'SELECTED: MARS';
      color = '#f97316';
    } else if (this.activeDestinationId === 'deep-space') {
      target = coords.deepSpace;
      label = 'SELECTED: DEEP SPACE (VOYAGER 1)';
      color = '#818cf8';
    } else {
      target = coords.sun;
      label = 'SELECTED: SOLAR ORIGIN';
      color = '#ffb703';
    }

    if (!target) return;

    ctx.save();
    const boxSize = 36 * this.scale;
    const half = boxSize / 2;

    // Rotating Corner Brackets
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // 4 Corner Brackets
    const cornerLen = 7;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(target.x - half, target.y - half + cornerLen);
    ctx.lineTo(target.x - half, target.y - half);
    ctx.lineTo(target.x - half + cornerLen, target.y - half);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(target.x + half - cornerLen, target.y - half);
    ctx.lineTo(target.x + half, target.y - half);
    ctx.lineTo(target.x + half, target.y - half + cornerLen);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(target.x - half, target.y + half - cornerLen);
    ctx.lineTo(target.x - half, target.y + half);
    ctx.lineTo(target.x - half + cornerLen, target.y + half);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(target.x + half - cornerLen, target.y + half);
    ctx.lineTo(target.x + half, target.y + half);
    ctx.lineTo(target.x + half, target.y + half - cornerLen);
    ctx.stroke();

    ctx.restore();
  }

  drawHoverBadge(ctx, item) {
    ctx.save();
    const badgeText = `${item.name.toUpperCase()} (Click to Inspect)`;
    ctx.font = 'bold 9px JetBrains Mono';
    const textWidth = ctx.measureText(badgeText).width;
    const boxW = textWidth + 18;
    const boxH = 22;
    const bx = item.x - boxW / 2;
    const by = item.y - 36;

    ctx.fillStyle = 'rgba(5, 11, 24, 0.95)';
    ctx.strokeStyle = 'var(--cyan-glow, #00e5ff)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00e5ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, item.x, by + boxH / 2);

    ctx.restore();
  }

  // -------------------------------------------------------------
  // MUSEUM SPOTLIGHT DETAIL PANEL (DOM RENDERING)
  // -------------------------------------------------------------
  renderDetailPanel() {
    const detailContainer = document.getElementById('museum-detail-panel');
    if (!detailContainer) return;

    const destId = this.activeDestinationId;
    let relevantMissions = [];
    let title = '';
    let intro = '';
    let badgeText = '';
    let historicalAchievements = [];
    let disclaimerNote = '';

    if (destId === 'moon') {
      badgeText = 'CELESTIAL ARCHIVE // 384,400 KM FROM HOME';
      title = '🌕 The Moon: The Airless Lunar Museum';
      intro = 'Because the Moon has no atmosphere, liquid rain, or wind, mechanical erosion is virtually non-existent. The landing hardware left by Apollo astronauts remains pristine and permanently preserved in the lunar vacuum.';
      disclaimerNote = 'Illustrative astronomical perspective. Historical coordinates reflect authentic NASA landing sites: Apollo 11 at Tranquility Base (0.67° N, 23.47° E) and Apollo 15 at Hadley-Apennine (26.13° N, 3.63° E). These machines are inactive and permanently resting on the lunar surface.';
      
      historicalAchievements = [
        'First human landing on another celestial body (July 20, 1969).',
        'Lunar Laser Ranging experiment retroreflectors that are still pinged with Earth lasers today.',
        'Deployment of the first wheeled human vehicle on an extraterrestrial surface (Apollo 15 LRV-1).'
      ];

      relevantMissions = this.missions.filter(m => 
        m.destinationSlug === 'moon' || m.destination.toLowerCase() === 'the moon'
      );
    } else if (destId === 'mars') {
      badgeText = 'THE RED PLANET // 225 MILLION KM AVERAGE';
      title = '🔴 Mars: The Rusted Frontiers of Robotic Exploration';
      intro = 'Mars presents an extreme, freeze-dried desert environment with a thin carbon dioxide atmosphere and fierce dust storms. NASA landers and rovers here overcame violent entries and terrifying descents to search for signs of past water and life.';
      disclaimerNote = 'Illustrative scale projection. Landing locations reflect official NASA cartography: Viking 1 Lander at Chryse Planitia (22.7° N, 48.0° W) and Mars Pathfinder / Sojourner at Ares Vallis (19.33° N, 33.55° W). These machines completed their historical scientific missions and are silent.';
      
      historicalAchievements = [
        'First successful long-duration U.S. robotic surface mission on Mars (Viking 1 Lander, 1976).',
        'First high-resolution panoramic color photographs and meteorology logs from the Martian surface.',
        'First robotic mobile rover on Mars (Sojourner, 1997) proving the legendary Rocker-Bogie suspension.'
      ];

      relevantMissions = this.missions.filter(m => 
        m.destinationSlug === 'mars' || m.destination.toLowerCase() === 'mars'
      );
    } else if (destId === 'deep-space') {
      badgeText = 'INTERSTELLAR SPACE // 24+ BILLION KM (~163 AU)';
      title = '🌌 Deep Space: The Solitary Interstellar Voyage';
      intro = 'Unlike planetary landers resting on alien soil, Voyager 1 is actively traversing interstellar space. Having crossed the solar termination shock and heliopause in 2012, it is currently the farthest human-made object from Earth, hurtling at roughly 38,000 miles per hour.';
      disclaimerNote = 'Important Distinction: Voyager 1 is a moving spacecraft travelling through interstellar space beyond our solar system, not an abandoned machine sitting on a planetary surface. Telemetry reflects its ongoing flight corridor outward from the solar system.';
      
      historicalAchievements = [
        'Explored Jupiter\'s Great Red Spot and discovered volcanic activity on Jupiter\'s moon Io (1979).',
        'Detailed flyby of Saturn and its complex ring systems (1980).',
        'Became the first human spacecraft in history to cross into interstellar space (confirmed by NASA in August 2012).',
        'Carrying the gold-plated copper Voyager Golden Record conveying Earth\'s music, greetings, and sounds.'
      ];

      relevantMissions = this.missions.filter(m => 
        m.destinationSlug === 'deep-space' || m.destination.toLowerCase().includes('deep')
      );
    } else {
      // Sun & Earth
      badgeText = 'SOLAR SYSTEM ORIGIN // 1.0 AU';
      title = '☀️ Sun & Earth: The Cosmic Anchor';
      intro = 'The Sun generates the radiant energy and gravitational grip that balances all planetary orbits, while Earth serves as the cradle where every NASA rocket, lander, rover, and computer was envisioned, engineered, and launched.';
      disclaimerNote = 'Reference cosmic bodies serving as the starting point for all human deep space missions.';
      
      historicalAchievements = [
        'Cradle of all six historic NASA expeditions featured in Echoes Beyond Earth.',
        'Continuous deep space communication network (NASA Deep Space Network dishes in California, Spain, and Australia) communicating across billions of kilometers.'
      ];

      relevantMissions = [];
    }

    // Generate Artifact Cards HTML
    let artifactCardsHTML = '';
    if (relevantMissions.length > 0) {
      artifactCardsHTML = relevantMissions.map(m => `
        <div class="museum-artifact-card glass-hud">
          <div class="museum-art-thumb-wrap">
            <img class="museum-art-thumb" src="${m.image}" alt="${m.name}" onerror="this.src='${m.imageThumb}'" />
            <span class="status-pill ${m.status === 'Still Travelling' ? 'travelling' : m.status.toLowerCase()}">
              ${m.status.toUpperCase()}
            </span>
          </div>

          <div class="museum-art-info">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-glow); margin-bottom: 0.25rem;">
              MISSION: ${m.missionName} (${m.missionYear})
            </div>
            
            <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700; margin-bottom: 0.4rem;">
              ${m.name}
            </h4>

            <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
              <strong style="color: #e2e8f0;">Location:</strong> ${m.landingSite || m.currentLocation}
            </div>

            <p style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.5; margin-bottom: 1.1rem;">
              ${m.scientificDiscovery || m.tagline}
            </p>

            <div class="museum-card-actions">
              <button class="btn-primary museum-open-artifact-btn" data-id="${m.id}" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;">
                <span>Inspect Details ❯</span>
              </button>
              <button class="btn-secondary museum-open-story-btn" data-id="${m.id}" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;">
                <span>Story Log 📖</span>
              </button>
              <button class="hud-btn museum-open-timeline-btn" data-year="${m.missionYear}" style="padding: 0.45rem 0.85rem; font-size: 0.75rem;">
                <span>Timeline ⏱️</span>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      artifactCardsHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; background: rgba(10, 22, 48, 0.4); border-radius: var(--border-radius-sm); border: 1px dashed rgba(255,255,255,0.15);">
          <p style="font-family: var(--font-mono); color: var(--text-muted); font-size: 0.95rem;">
            Select <strong>The Moon</strong>, <strong>Mars</strong>, or <strong>Deep Space</strong> above to inspect the specific NASA hardware permanently stationed in those domains.
          </p>
        </div>
      `;
    }

    // Achievements List HTML
    const achievementsHTML = historicalAchievements.map(ach => `
      <li style="display: flex; gap: 0.6rem; align-items: flex-start; margin-bottom: 0.65rem; font-size: 0.92rem; color: var(--text-main); line-height: 1.55;">
        <span style="color: var(--cyan-glow); font-size: 1rem; flex-shrink: 0;">✓</span>
        <span>${ach}</span>
      </li>
    `).join('');

    detailContainer.innerHTML = `
      <div class="museum-spotlight-content animate-fade-in-up">
        <!-- Header & Environmental Overview -->
        <div class="museum-dest-header">
          <span class="telemetry-tag" style="margin-bottom: 0.5rem;">
            <span class="telemetry-dot"></span> ${badgeText}
          </span>
          <h3 style="font-family: var(--font-display); font-size: clamp(1.4rem, 2.5vw, 2.1rem); font-weight: 800; color: #fff; margin-bottom: 0.65rem;">
            ${title}
          </h3>
          <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.65; max-width: 860px;">
            ${intro}
          </p>
        </div>

        <!-- Historical Achievements Callout Box -->
        <div style="background: rgba(11, 61, 145, 0.2); border: 1px solid rgba(0, 229, 255, 0.25); border-radius: var(--border-radius-sm); padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem 0;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 1px;">
            🏆 KEY HISTORICAL SCIENTIFIC ACHIEVEMENTS
          </div>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${achievementsHTML}
          </ul>
        </div>

        <!-- Preserved NASA Hardware Section -->
        <div style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.1rem; flex-wrap: wrap; gap: 0.5rem;">
            <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700; text-transform: uppercase;">
              PRESENCE IN THIS DOMAIN // PRESERVED MACHINES
            </h4>
            <span class="telemetry-tag">
              ${relevantMissions.length} NASA Artifact${relevantMissions.length === 1 ? '' : 's'}
            </span>
          </div>

          <div class="museum-artifacts-grid">
            ${artifactCardsHTML}
          </div>
        </div>

        <!-- Authenticity & Educational Disclaimer Box -->
        <div class="museum-disclaimer-box" style="background: rgba(15, 23, 42, 0.65); border-left: 3px solid var(--solar-gold); padding: 1rem 1.25rem; border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0; margin-bottom: 2rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--solar-gold); font-weight: 600; text-transform: uppercase;">
            ⓘ HISTORICAL AUTHENTICITY NOTE
          </div>
          <p style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.6; margin-top: 0.35rem;">
            ${disclaimerNote}
          </p>
        </div>

        <!-- Museum Cross-Navigation Hub -->
        <div class="museum-nav-hub glass-hud" style="padding: 1.25rem 1.5rem; border-radius: var(--border-radius-sm); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow); text-transform: uppercase;">
              MUSEUM NAVIGATION HUB
            </div>
            <div style="font-size: 0.95rem; color: #fff; font-weight: 600; margin-top: 0.2rem;">
              Continue your educational exploration beyond the museum:
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button class="btn-secondary museum-nav-btn" data-target="artifacts">
              <span>Full Artifact Explorer ❯</span>
            </button>
            <button class="btn-secondary museum-nav-btn" data-target="story">
              <span>Voices from Space ❯</span>
            </button>
            <button class="btn-secondary museum-nav-btn" data-target="timeline">
              <span>Mission Timeline ❯</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind Artifact Detail Click Handlers
    detailContainer.querySelectorAll('.museum-open-artifact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const artId = btn.dataset.id;
        if (this.onOpenArtifact) this.onOpenArtifact(artId);
      });
    });

    // Bind Story Mode Click Handlers
    detailContainer.querySelectorAll('.museum-open-story-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const artId = btn.dataset.id;
        if (this.onOpenStory) this.onOpenStory(artId);
      });
    });

    // Bind Timeline Click Handlers
    detailContainer.querySelectorAll('.museum-open-timeline-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const year = btn.dataset.year;
        if (this.onOpenTimeline) this.onOpenTimeline(year);
      });
    });

    // Bind Museum Nav Hub Click Handlers
    detailContainer.querySelectorAll('.museum-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        if (this.onNavigateTo) this.onNavigateTo(targetId);
      });
    });
  }

  destroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
  }

  // =============================================================
  // INTERACTIVE THREE.JS 3D SOLAR SYSTEM (Phase 4)
  // =============================================================
  initThree3D() {
    if (!this.canvasWrap) return;
    const width = this.canvasWrap.clientWidth || 800;
    const height = this.canvasWrap.clientHeight || 480;

    // 1. Scene, Camera, Renderer
    this.threeScene = new THREE.Scene();
    this.threeCamera = new THREE.PerspectiveCamera(45, width / height, 1, 6000);
    this.threeCamera.position.set(0, 360, 680);

    this.camLookTarget = new THREE.Vector3(0, 0, 0);
    this.curLookTarget = new THREE.Vector3(0, 0, 0);

    this.threeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.threeRenderer.setSize(width, height);
    this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.threeRenderer.domElement.style.position = 'absolute';
    this.threeRenderer.domElement.style.top = '0';
    this.threeRenderer.domElement.style.left = '0';
    this.threeRenderer.domElement.style.width = '100%';
    this.threeRenderer.domElement.style.height = '100%';
    this.threeRenderer.domElement.style.zIndex = '0';
    this.canvasWrap.appendChild(this.threeRenderer.domElement);

    // Hide 2D canvas initially
    if (this.canvas) this.canvas.style.display = 'none';

    // 2. Celestial Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1a38, 0.65);
    this.threeScene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xfff2aa, 3.2, 4000);
    sunPointLight.position.set(0, 0, 0);
    this.threeScene.add(sunPointLight);

    // 3. Starfield & Cosmic Dust
    this.create3DStarfield();

    // 4. Planetary System
    this.create3DPlanets();

    // 5. 3D Interaction Listeners
    this.raycaster3D = new THREE.Raycaster();
    this.mouse3D = new THREE.Vector2();
    this.setup3DInteraction();

    // 6. Start 3D Loop
    this.animateThree3D();
  }

  create3DStarfield() {
    const starCount = 1400;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 3200;
      pos[i + 1] = (Math.random() - 0.5) * 3200;
      pos[i + 2] = (Math.random() - 0.5) * 2600;

      const tint = Math.random();
      if (tint > 0.8) {
        col[i] = 0.0; col[i + 1] = 0.9; col[i + 2] = 1.0;
      } else if (tint > 0.6) {
        col[i] = 1.0; col[i + 1] = 0.8; col[i + 2] = 0.4;
      } else {
        col[i] = 0.9; col[i + 1] = 0.95; col[i + 2] = 1.0;
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.8,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(geom, mat);
    this.threeScene.add(starPoints);
  }

  create3DPlanets() {
    // ---------------- SUN ----------------
    const sunGeom = new THREE.SphereGeometry(32, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffcc00
    });
    this.sun3DMesh = new THREE.Mesh(sunGeom, sunMat);
    this.sun3DMesh.userData = { id: 'sun-earth', name: 'The Sun' };
    this.threeScene.add(this.sun3DMesh);

    // Sun Corona Glow
    const coronaGeom = new THREE.SphereGeometry(39, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeom, coronaMat);
    this.threeScene.add(coronaMesh);

    // ---------------- ORBIT RINGS ----------------
    this.create3DOrbitRing(210, 0x00e5ff, 0.22); // Earth
    this.create3DOrbitRing(340, 0xf97316, 0.22); // Mars

    // Asteroid Belt illustrative ring (between Mars & Deep Space)
    this.create3DOrbitRing(420, 0xfbbf24, 0.12, true);

    // Heliopause Shock Boundary (Deep Space frontier)
    this.create3DOrbitRing(540, 0x818cf8, 0.28);

    // ---------------- EARTH & MOON SYSTEM ----------------
    this.earth3DGroup = new THREE.Group();
    const earthGeom = new THREE.SphereGeometry(14, 32, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.65,
      metalness: 0.1
    });
    this.earth3DMesh = new THREE.Mesh(earthGeom, earthMat);
    this.earth3DMesh.userData = { id: 'sun-earth', name: 'Earth' };
    this.earth3DGroup.add(this.earth3DMesh);

    // Earth Atmosphere Halo
    const earthAtmo = new THREE.Mesh(
      new THREE.SphereGeometry(15.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.BackSide, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending })
    );
    this.earth3DGroup.add(earthAtmo);

    // Moon
    const moonGeom = new THREE.SphereGeometry(5.2, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.9,
      metalness: 0.05
    });
    this.moon3DMesh = new THREE.Mesh(moonGeom, moonMat);
    this.moon3DMesh.userData = { id: 'moon', name: 'The Moon' };
    this.moon3DMesh.position.set(38, 6, 0);
    this.earth3DGroup.add(this.moon3DMesh);

    // Moon Orbit Line around Earth
    const moonOrbitGeom = new THREE.BufferGeometry();
    const moonPts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      moonPts.push(new THREE.Vector3(Math.cos(a) * 38, 0, Math.sin(a) * 38));
    }
    moonOrbitGeom.setFromPoints(moonPts);
    const moonOrbitLine = new THREE.Line(moonOrbitGeom, new THREE.LineBasicMaterial({ color: 0xcbd5e1, transparent: true, opacity: 0.2 }));
    this.earth3DGroup.add(moonOrbitLine);

    this.threeScene.add(this.earth3DGroup);

    // ---------------- MARS SYSTEM ----------------
    this.mars3DGroup = new THREE.Group();
    const marsGeom = new THREE.SphereGeometry(9.6, 32, 32);
    const marsMat = new THREE.MeshStandardMaterial({
      color: 0xdd4b1a,
      roughness: 0.85,
      metalness: 0.05
    });
    this.mars3DMesh = new THREE.Mesh(marsGeom, marsMat);
    this.mars3DMesh.userData = { id: 'mars', name: 'Mars' };
    this.mars3DGroup.add(this.mars3DMesh);

    // Mars Atmospheric Haze
    const marsAtmo = new THREE.Mesh(
      new THREE.SphereGeometry(10.6, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.BackSide, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending })
    );
    this.mars3DGroup.add(marsAtmo);

    this.threeScene.add(this.mars3DGroup);

    // ---------------- DEEP SPACE & VOYAGER 1 ----------------
    this.voyager3DGroup = new THREE.Group();
    this.voyager3DGroup.position.set(460, 130, -310);

    // High-Gain Cassegrain Parabolic Antenna Dish
    const dishGeom = new THREE.CylinderGeometry(11, 2, 3, 24);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.2 });
    const dishMesh = new THREE.Mesh(dishGeom, dishMat);
    dishMesh.rotation.x = Math.PI / 2.2;
    this.voyager3DGroup.add(dishMesh);

    // Spacecraft Central Equipment Bus
    const busGeom = new THREE.BoxGeometry(6.5, 5, 4.5);
    const busMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.5 });
    const busMesh = new THREE.Mesh(busGeom, busMat);
    busMesh.position.z = -3;
    this.voyager3DGroup.add(busMesh);

    // Golden Record Disc on the side
    const recordGeom = new THREE.CylinderGeometry(3.5, 3.5, 0.4, 32);
    const recordMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.2, metalness: 0.95 });
    const recordMesh = new THREE.Mesh(recordGeom, recordMat);
    recordMesh.position.set(3.5, 0, -3);
    recordMesh.rotation.z = Math.PI / 2;
    this.voyager3DGroup.add(recordMesh);

    // RTG Power Canisters Boom
    const rtgGeom = new THREE.CylinderGeometry(1, 1, 14, 12);
    const rtgMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });
    const rtgMesh = new THREE.Mesh(rtgGeom, rtgMat);
    rtgMesh.position.set(-8, -4, -3);
    rtgMesh.rotation.z = Math.PI / 3;
    this.voyager3DGroup.add(rtgMesh);

    // Magnetometer Boom
    const magGeom = new THREE.CylinderGeometry(0.4, 0.4, 28, 8);
    const magMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const magMesh = new THREE.Mesh(magGeom, magMat);
    magMesh.position.set(10, 10, -3);
    magMesh.rotation.z = -Math.PI / 4;
    this.voyager3DGroup.add(magMesh);

    // Clickable hit sphere
    const hitSphereGeom = new THREE.SphereGeometry(18, 16, 16);
    const hitSphereMat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.08 });
    this.voyagerHitSphere = new THREE.Mesh(hitSphereGeom, hitSphereMat);
    this.voyagerHitSphere.userData = { id: 'deep-space', name: 'Voyager 1 (Deep Space)' };
    this.voyager3DGroup.add(this.voyagerHitSphere);

    this.threeScene.add(this.voyager3DGroup);

    // Interactive clickable meshes array for raycasting
    this.clickableMeshes3D = [
      this.sun3DMesh,
      this.earth3DMesh,
      this.moon3DMesh,
      this.mars3DMesh,
      this.voyagerHitSphere
    ];
  }

  create3DOrbitRing(radius, color, opacity, isDashed = false) {
    const segments = 128;
    const geom = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    geom.setFromPoints(pts);

    let mat;
    if (isDashed) {
      mat = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 10,
        gapSize: 6,
        transparent: true,
        opacity: opacity
      });
    } else {
      mat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity
      });
    }

    const line = new THREE.Line(geom, mat);
    if (isDashed) line.computeLineDistances();
    this.threeScene.add(line);
  }

  setup3DInteraction() {
    const dom = this.threeRenderer.domElement;

    dom.addEventListener('pointerdown', (e) => {
      if (this.isGrandTourActive) this.stopGrandTour();
      this.isDragging3D = true;
      this.prevDrag3DX = e.clientX;
      this.prevDrag3DY = e.clientY;
      dom.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      this.isDragging3D = false;
      if (dom) dom.style.cursor = this.hoveredObject3D ? 'pointer' : 'grab';
    });

    dom.addEventListener('pointermove', (e) => {
      const rect = dom.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.mouse3D.x = (mouseX / rect.width) * 2 - 1;
      this.mouse3D.y = -(mouseY / rect.height) * 2 + 1;

      if (this.isDragging3D) {
        const dx = e.clientX - this.prevDrag3DX;
        const dy = e.clientY - this.prevDrag3DY;
        this.prevDrag3DX = e.clientX;
        this.prevDrag3DY = e.clientY;

        this.targetSpherical.theta -= dx * 0.006;
        this.targetSpherical.phi = Math.max(0.15, Math.min(Math.PI / 2.05, this.targetSpherical.phi - dy * 0.005));
        return;
      }

      // Raycast hover check
      this.raycaster3D.setFromCamera(this.mouse3D, this.threeCamera);
      const intersects = this.raycaster3D.intersectObjects(this.clickableMeshes3D, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit !== this.hoveredObject3D) {
          this.hoveredObject3D = hit;
          dom.style.cursor = 'pointer';
          if (this.audio) this.audio.playChirp();
        }
      } else {
        if (this.hoveredObject3D) {
          this.hoveredObject3D = null;
          dom.style.cursor = 'grab';
        }
      }
    });

    dom.addEventListener('click', (e) => {
      const rect = dom.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.mouse3D.x = (mouseX / rect.width) * 2 - 1;
      this.mouse3D.y = -(mouseY / rect.height) * 2 + 1;

      this.raycaster3D.setFromCamera(this.mouse3D, this.threeCamera);
      const intersects = this.raycaster3D.intersectObjects(this.clickableMeshes3D, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const destId = hit.userData?.id;
        if (destId) {
          if (this.audio) this.audio.playQuindar();
          this.selectDestination(destId, true);
        }
      }
    });

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.88 : 1.12;
      this.targetSpherical.radius = Math.max(90, Math.min(1400, this.targetSpherical.radius * factor));
    }, { passive: false });
  }

  flyCameraToDestination3D(destId) {
    if (!this.camLookTarget) return;

    if (destId === 'moon') {
      this.focusBodyKey = 'moon';
      this.targetSpherical.radius = 110;
      this.targetSpherical.phi = Math.PI / 3.2;
    } else if (destId === 'mars') {
      this.focusBodyKey = 'mars';
      this.targetSpherical.radius = 95;
      this.targetSpherical.phi = Math.PI / 3.4;
    } else if (destId === 'deep-space') {
      this.focusBodyKey = 'voyager';
      this.targetSpherical.radius = 115;
      this.targetSpherical.phi = Math.PI / 3.6;
    } else {
      // Solar System Overview / Sun
      this.focusBodyKey = null;
      this.camLookTarget.set(0, 0, 0);
      this.targetSpherical.radius = 760;
      this.targetSpherical.phi = Math.PI / 3;
    }
  }

  animateThree3D() {
    this.threeAnimId = requestAnimationFrame(() => this.animateThree3D());

    if (!this.is3DMode) return;

    // 1. Orbital Motion (unless frozen)
    if (this.isMotionActive) {
      this.orbitAngle3D += 0.003;
      this.moonAngle3D += 0.015;

      if (this.earth3DGroup) {
        this.earth3DGroup.position.x = Math.cos(this.orbitAngle3D) * 210;
        this.earth3DGroup.position.z = Math.sin(this.orbitAngle3D) * 210;
      }

      if (this.moon3DMesh) {
        this.moon3DMesh.position.x = Math.cos(this.moonAngle3D) * 38;
        this.moon3DMesh.position.z = Math.sin(this.moonAngle3D) * 38;
      }

      if (this.mars3DGroup) {
        const marsAngle = this.orbitAngle3D * 0.53 + 1.2;
        this.mars3DGroup.position.x = Math.cos(marsAngle) * 340;
        this.mars3DGroup.position.z = Math.sin(marsAngle) * 340;
      }

      if (this.sun3DMesh) this.sun3DMesh.rotation.y += 0.001;
      if (this.earth3DMesh) this.earth3DMesh.rotation.y += 0.006;
      if (this.mars3DMesh) this.mars3DMesh.rotation.y += 0.005;
      if (this.voyager3DGroup) this.voyager3DGroup.rotation.y += 0.002;
    }

    // 2. Camera Focus Tracking
    if (this.focusBodyKey === 'moon' && this.earth3DGroup && this.moon3DMesh) {
      const worldMoonPos = new THREE.Vector3();
      this.moon3DMesh.getWorldPosition(worldMoonPos);
      this.camLookTarget.copy(worldMoonPos);
    } else if (this.focusBodyKey === 'mars' && this.mars3DGroup) {
      this.camLookTarget.copy(this.mars3DGroup.position);
    } else if (this.focusBodyKey === 'voyager' && this.voyager3DGroup) {
      this.camLookTarget.copy(this.voyager3DGroup.position);
    }

    // 3. Smooth Camera Interpolation (Spherical coordinates around target)
    this.camSpherical.radius += (this.targetSpherical.radius - this.camSpherical.radius) * 0.065;
    this.camSpherical.theta += (this.targetSpherical.theta - this.camSpherical.theta) * 0.065;
    this.camSpherical.phi += (this.targetSpherical.phi - this.camSpherical.phi) * 0.065;

    this.curLookTarget.lerp(this.camLookTarget, 0.07);

    const r = this.camSpherical.radius;
    const sinPhi = Math.sin(this.camSpherical.phi);
    const cosPhi = Math.cos(this.camSpherical.phi);
    const sinTheta = Math.sin(this.camSpherical.theta);
    const cosTheta = Math.cos(this.camSpherical.theta);

    this.threeCamera.position.x = this.curLookTarget.x + r * sinPhi * sinTheta;
    this.threeCamera.position.y = this.curLookTarget.y + r * cosPhi;
    this.threeCamera.position.z = this.curLookTarget.z + r * sinPhi * cosTheta;

    this.threeCamera.lookAt(this.curLookTarget);

    // 4. Render
    if (this.threeRenderer && this.threeScene && this.threeCamera) {
      this.threeRenderer.render(this.threeScene, this.threeCamera);
    }
  }

  onResize3D() {
    if (!this.canvasWrap || !this.threeCamera || !this.threeRenderer) return;
    const width = this.canvasWrap.clientWidth || 800;
    const height = this.canvasWrap.clientHeight || 480;
    this.threeCamera.aspect = width / height;
    this.threeCamera.updateProjectionMatrix();
    this.threeRenderer.setSize(width, height);
  }

}
