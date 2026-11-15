/**
 * NASA: ECHOES BEYOND EARTH - Celestial 3D & Canvas Engine
 * Integrates Three.js for solar system background parallax & destination globe viewer.
 * Provides resilient procedural HTML5 canvas fallback if WebGL is unavailable.
 */

export class CelestialScene {
  constructor() {
    this.threeAvailable = typeof window.THREE !== 'undefined';
    this.bgScene = null;
    this.bgCamera = null;
    this.bgRenderer = null;
    this.bgParticles = null;
    this.bgOrbits = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Destination globe visualizer
    this.destRenderer = null;
    this.destScene = null;
    this.destCamera = null;
    this.destMesh = null;
    this.destGlowMesh = null;
    this.destAnimId = null;
    this.isDraggingGlobe = false;
    this.prevPointerX = 0;
    this.prevPointerY = 0;

    // Cinematic 3D Earth Hero System
    this.heroEarthGroup = null;
    this.heroEarthMesh = null;
    this.heroCloudMesh = null;
    this.heroAtmoMesh = null;
    this.heroMoonMesh = null;
    this.moonOrbitAngle = 0;
    this.userEarthDragRotY = 0;
    this.userEarthDragRotX = 0;
    this.targetEarthDragRotY = 0;
    this.targetEarthDragRotX = 0;
    this.isDraggingHeroEarth = false;
    this.prevHeroDragX = 0;
    this.prevHeroDragY = 0;
  }

  initBackground(containerId = 'celestial-canvas-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (this.threeAvailable) {
      this.initThreeBackground(container);
    } else {
      this.initCanvasFallback(container);
    }

    // Mouse movement parallax listener
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize handling
    window.addEventListener('resize', () => {
      this.onResize(container);
    });
  }

  initThreeBackground(container) {
    try {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.bgScene = new THREE.Scene();
      this.bgCamera = new THREE.PerspectiveCamera(55, width / height, 0.1, 3000);
      this.bgCamera.position.set(0, 0, 750);

      this.bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      this.bgRenderer.setSize(width, height);
      this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (THREE.ACESFilmicToneMapping) {
        this.bgRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.bgRenderer.toneMappingExposure = 1.15;
      }
      if (THREE.sRGBEncoding) {
        this.bgRenderer.outputEncoding = THREE.sRGBEncoding;
      }
      container.appendChild(this.bgRenderer.domElement);

      // Celestial Lighting
      const ambientLight = new THREE.AmbientLight(0x0a162e, 0.55);
      this.bgScene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
      sunLight.position.set(600, 300, 450);
      this.bgScene.add(sunLight);

      // Deep Space Starfield (2800 stars with stellar temperature colors)
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 2800;
      const starPositions = new Float32Array(starsCount * 3);
      const starColors = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 2600;
        starPositions[i + 1] = (Math.random() - 0.5) * 2600;
        starPositions[i + 2] = (Math.random() - 0.5) * 1800;

        const tint = Math.random();
        if (tint > 0.85) {
          starColors[i] = 0.0; starColors[i + 1] = 0.9; starColors[i + 2] = 1.0; // Cyan
        } else if (tint > 0.7) {
          starColors[i] = 1.0; starColors[i + 1] = 0.82; starColors[i + 2] = 0.45; // Solar Gold
        } else if (tint > 0.5) {
          starColors[i] = 0.8; starColors[i + 1] = 0.85; starColors[i + 2] = 1.0; // Blue-white
        } else {
          starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0; // Pure white
        }
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starCanvas = document.createElement('canvas');
      starCanvas.width = 16;
      starCanvas.height = 16;
      const sCtx = starCanvas.getContext('2d');
      const grad = sCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.6)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 16, 16);
      const starTexture = new THREE.CanvasTexture(starCanvas);

      const starsMaterial = new THREE.PointsMaterial({
        size: 3.5,
        map: starTexture,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      this.bgParticles = new THREE.Points(starsGeometry, starsMaterial);
      this.bgScene.add(this.bgParticles);

      // Orbital Rings (Earth, Moon, Mars orbits)
      this.createOrbitRing(320, 0x00e5ff, 0.14, Math.PI / 6);
      this.createOrbitRing(500, 0xf97316, 0.16, Math.PI / 4.5);
      this.createOrbitRing(760, 0x818cf8, 0.12, Math.PI / 8);

      // Deep space vector lines (representing Voyager 1 escape trajectory)
      const lineGeom = new THREE.BufferGeometry();
      const linePoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(220, 110, -120),
        new THREE.Vector3(460, 200, -320),
        new THREE.Vector3(950, 480, -850)
      ];
      lineGeom.setFromPoints(linePoints);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0x00e5ff,
        dashSize: 18,
        gapSize: 12,
        opacity: 0.35,
        transparent: true
      });
      const trajLine = new THREE.Line(lineGeom, lineMat);
      trajLine.computeLineDistances();
      this.bgScene.add(trajLine);

      // Create Full-Scale Cinematic 3D Earth System
      this.createHeroEarthSystem();
      this.setupHeroEarthInteraction();

      // Start Master Render loop
      this.animateBackground();
    } catch (e) {
      console.warn("WebGL background initialization failed, falling back to 2D canvas:", e);
      this.initCanvasFallback(container);
    }
  }

  // -------------------------------------------------------------
  // CINEMATIC 3D EARTH HERO SYSTEM (Phase 3)
  // -------------------------------------------------------------
  createHeroEarthSystem() {
    this.heroEarthGroup = new THREE.Group();
    this.heroEarthGroup.position.set(0, -35, 250);

    // 1. Earth Primary Mesh with PBR Textures (Day, Bump, Specular)
    const earthGeom = new THREE.SphereGeometry(140, 64, 64);
    const earthTexture = this.generateProceduralEarthTexture();
    const earthBumpMap = this.generateProceduralEarthBumpMap();
    const earthRoughnessMap = this.generateProceduralEarthRoughnessMap();

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 3.5,
      roughnessMap: earthRoughnessMap,
      roughness: 0.7,
      metalness: 0.08
    });
    this.heroEarthMesh = new THREE.Mesh(earthGeom, earthMat);
    this.heroEarthGroup.add(this.heroEarthMesh);

    // 2. Swirling Atmospheric Cloud Layer
    const cloudGeom = new THREE.SphereGeometry(143.5, 64, 64);
    const cloudTexture = this.generateProceduralCloudsTexture();
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    this.heroCloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
    this.heroEarthGroup.add(this.heroCloudMesh);

    // 3. Physically-Based Rayleigh Atmospheric Rim Scattering Shader (Phase B)
    const atmoGeom = new THREE.SphereGeometry(148.5, 64, 64);
    const atmoShaderMat = this.createRayleighAtmosphereMaterial();
    this.heroAtmoMesh = new THREE.Mesh(atmoGeom, atmoShaderMat);
    this.heroEarthGroup.add(this.heroAtmoMesh);

    // 4. Orbiting Moon
    const moonGeom = new THREE.SphereGeometry(36, 48, 48);
    const moonTexture = this.generateProceduralMoonTexture();
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.92,
      metalness: 0.04
    });
    this.heroMoonMesh = new THREE.Mesh(moonGeom, moonMat);
    this.heroMoonMesh.position.set(380, 65, -120);
    this.heroEarthGroup.add(this.heroMoonMesh);

    this.bgScene.add(this.heroEarthGroup);
  }

  // Interactive mouse/pointer drag rotation on Earth
  setupHeroEarthInteraction() {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    heroEl.style.cursor = 'grab';

    heroEl.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking buttons or interactive links
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.hero-stat-card') || e.target.closest('.hero-matters-card')) {
        return;
      }
      this.isDraggingHeroEarth = true;
      this.prevHeroDragX = e.clientX;
      this.prevHeroDragY = e.clientY;
      heroEl.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      if (this.isDraggingHeroEarth) {
        this.isDraggingHeroEarth = false;
        if (heroEl) heroEl.style.cursor = 'grab';
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDraggingHeroEarth) return;
      const deltaX = e.clientX - this.prevHeroDragX;
      const deltaY = e.clientY - this.prevHeroDragY;
      this.prevHeroDragX = e.clientX;
      this.prevHeroDragY = e.clientY;

      this.targetEarthDragRotY += deltaX * 0.006;
      this.targetEarthDragRotX += deltaY * 0.004;
      // Clamp vertical pitch tilt to prevent inversion
      this.targetEarthDragRotX = Math.max(-0.6, Math.min(0.6, this.targetEarthDragRotX));
    });
  }


  // High-Resolution Procedural Elevation Bump Map for Earth Mountain Ridges & Continental Rims
  generateProceduralEarthBumpMap() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Oceans are flat (black)
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1024, 512);

    // Continental Plateaus (medium grey)
    ctx.fillStyle = '#555555';
    // North America
    ctx.beginPath(); ctx.ellipse(190, 170, 110, 80, 0, 0, Math.PI * 2); ctx.fill();
    // South America
    ctx.beginPath(); ctx.ellipse(280, 360, 80, 110, 0.2, 0, Math.PI * 2); ctx.fill();
    // Eurasia
    ctx.beginPath(); ctx.ellipse(650, 160, 200, 90, 0, 0, Math.PI * 2); ctx.fill();
    // Africa
    ctx.beginPath(); ctx.ellipse(530, 290, 100, 120, 0, 0, Math.PI * 2); ctx.fill();
    // Australia
    ctx.beginPath(); ctx.ellipse(840, 380, 80, 50, 0, 0, Math.PI * 2); ctx.fill();

    // High Elevation Mountain Chains (Himalayas, Andes, Rockies) in Bright White
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14;
    // Himalayas
    ctx.beginPath(); ctx.moveTo(680, 190); ctx.lineTo(760, 180); ctx.stroke();
    // Andes
    ctx.beginPath(); ctx.moveTo(240, 300); ctx.lineTo(235, 460); ctx.stroke();
    // Rockies
    ctx.beginPath(); ctx.moveTo(130, 110); ctx.lineTo(165, 230); ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  // Oceanic Specular & Continental Roughness Map (Water is glossy, land is diffuse)
  generateProceduralEarthRoughnessMap() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Oceans: Low roughness / high specularity (Dark grey/black in roughness map)
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, 1024, 512);

    // Continents: High roughness / diffuse scattering (Light grey in roughness map)
    ctx.fillStyle = '#d4d4d4';
    ctx.beginPath(); ctx.ellipse(190, 170, 110, 80, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(280, 360, 80, 110, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(650, 160, 200, 90, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(530, 290, 100, 120, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(840, 380, 80, 50, 0, 0, Math.PI * 2); ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  // Custom Atmospheric Rayleigh Scattering Shader (Fresnel optical limb scattering)
  createRayleighAtmosphereMaterial() {
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        vec3 normal = normalize(vNormal);
        
        // Fresnel rim intensity increases toward limb
        float fresnel = dot(viewDir, normal);
        fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
        float intensity = pow(fresnel, 3.2);

        // Directional Sun lighting mask (light coming from positive X/Z)
        vec3 sunDir = normalize(vec3(0.8, 0.4, 0.6));
        float sunDot = max(0.0, dot(normal, sunDir) + 0.35);

        // True Rayleigh Cyan-Blue scattering color vector
        vec3 atmosphereColor = vec3(0.0, 0.88, 1.0) * intensity * sunDot * 1.6;
        gl_FragColor = vec4(atmosphereColor, intensity * sunDot * 0.85);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
  }

  // High-Resolution Procedural Earth Surface Texture Generator (Continents, Oceans, Polar Caps & Night Lights)
  generateProceduralEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Deep Ocean Gradient with Bathymetry
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#04142d');
    oceanGrad.addColorStop(0.5, '#092a54');
    oceanGrad.addColorStop(1, '#04142d');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Oceanic Continental Shelves (Shallower cyan-blue waters)
    ctx.fillStyle = 'rgba(14, 75, 133, 0.55)';
    const shelves = [
      { x: 380, y: 340, rx: 220, ry: 150 }, // North American shelf
      { x: 620, y: 640, rx: 180, ry: 200 }, // South American shelf
      { x: 1060, y: 280, rx: 220, ry: 120 }, // Eurasian shelf
      { x: 1040, y: 560, rx: 200, ry: 220 }, // African shelf
      { x: 1600, y: 380, rx: 240, ry: 180 }, // Asian shelf
      { x: 1640, y: 720, rx: 170, ry: 120 }  // Australian shelf
    ];
    shelves.forEach(s => {
      ctx.beginPath();
      ctx.ellipse(s.x, s.y, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Continental Landmasses & Vegetation
    ctx.fillStyle = '#22522c'; // Temperate Green

    // North America
    ctx.beginPath();
    ctx.moveTo(220, 200);
    ctx.bezierCurveTo(280, 160, 420, 180, 480, 240);
    ctx.bezierCurveTo(520, 310, 450, 420, 380, 430);
    ctx.bezierCurveTo(340, 430, 310, 380, 260, 360);
    ctx.bezierCurveTo(200, 330, 180, 260, 220, 200);
    ctx.fill();

    // Central America bridge
    ctx.beginPath();
    ctx.moveTo(380, 430);
    ctx.lineTo(440, 520);
    ctx.lineTo(470, 530);
    ctx.lineTo(410, 440);
    ctx.fill();

    // South America
    ctx.beginPath();
    ctx.moveTo(460, 520);
    ctx.bezierCurveTo(560, 520, 680, 580, 640, 700);
    ctx.bezierCurveTo(600, 800, 520, 900, 480, 920);
    ctx.bezierCurveTo(450, 900, 470, 750, 460, 640);
    ctx.closePath();
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.moveTo(960, 220);
    ctx.bezierCurveTo(1060, 180, 1150, 240, 1140, 330);
    ctx.bezierCurveTo(1080, 370, 1000, 360, 960, 320);
    ctx.closePath();
    ctx.fill();

    // Africa
    ctx.beginPath();
    ctx.moveTo(960, 360);
    ctx.bezierCurveTo(1120, 350, 1220, 460, 1180, 620);
    ctx.bezierCurveTo(1140, 760, 1040, 820, 1020, 820);
    ctx.bezierCurveTo(960, 780, 940, 620, 920, 500);
    ctx.bezierCurveTo(900, 420, 920, 370, 960, 360);
    ctx.fill();

    // Sahara Desert belt in Africa
    ctx.fillStyle = '#9e7943';
    ctx.beginPath();
    ctx.ellipse(1040, 440, 140, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia & Middle East
    ctx.fillStyle = '#2a5e35';
    ctx.beginPath();
    ctx.moveTo(1140, 220);
    ctx.bezierCurveTo(1340, 160, 1680, 180, 1820, 280);
    ctx.bezierCurveTo(1880, 380, 1750, 520, 1620, 520);
    ctx.bezierCurveTo(1520, 520, 1450, 440, 1360, 420);
    ctx.bezierCurveTo(1260, 480, 1200, 380, 1140, 320);
    ctx.closePath();
    ctx.fill();

    // Arabian & Central Asian arid belts
    ctx.fillStyle = '#a6824a';
    ctx.beginPath();
    ctx.ellipse(1260, 420, 80, 45, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // India Subcontinent
    ctx.fillStyle = '#285830';
    ctx.beginPath();
    ctx.moveTo(1360, 420);
    ctx.lineTo(1420, 560);
    ctx.lineTo(1460, 430);
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.beginPath();
    ctx.moveTo(1580, 680);
    ctx.bezierCurveTo(1720, 660, 1780, 720, 1760, 820);
    ctx.bezierCurveTo(1700, 860, 1600, 850, 1560, 780);
    ctx.closePath();
    ctx.fill();

    // Australian red-ochre outback
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(1660, 760, 70, 40, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mountain snowcaps (Himalayas, Andes, Rockies)
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.ellipse(1420, 360, 80, 14, 0.1, 0, Math.PI * 2); // Himalayas
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(490, 680, 14, 90, 0.2, 0, Math.PI * 2); // Andes
    ctx.fill();

    // 3. Polar Ice Caps (Arctic and Antarctic)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 2048, 55); // North pole
    ctx.fillRect(0, 960, 2048, 64); // Antarctica

    // 4. Night-side City Light Clusters (Warm Golden Speckles)
    ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
    const cityHubs = [
      // North America
      { x: 380, y: 320 }, { x: 440, y: 330 }, { x: 320, y: 340 }, { x: 410, y: 370 },
      // Europe
      { x: 990, y: 280 }, { x: 1040, y: 290 }, { x: 1080, y: 270 }, { x: 1020, y: 330 },
      // Asia & India
      { x: 1400, y: 460 }, { x: 1660, y: 360 }, { x: 1720, y: 380 }, { x: 1750, y: 350 },
      // South America & Australia
      { x: 580, y: 720 }, { x: 550, y: 760 }, { x: 1720, y: 810 }
    ];
    cityHubs.forEach(c => {
      for (let i = 0; i < 12; i++) {
        const ox = (Math.random() - 0.5) * 45;
        const oy = (Math.random() - 0.5) * 35;
        ctx.fillRect(c.x + ox, c.y + oy, 2, 2);
      }
    });

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // Dynamic Procedural Atmospheric Clouds Texture Generator
  generateProceduralCloudsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1024, 512);

    // Swirling Cloud Bands & Cyclones
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const rx = Math.random() * 60 + 20;
      const ry = Math.random() * 20 + 8;
      const rot = (Math.random() - 0.5) * 0.4;
      const alpha = Math.random() * 0.45 + 0.15;

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
      ctx.fill();
    }

    // Equatorial Intertropical Convergence Zone (ITCZ band)
    for (let x = 0; x < 1024; x += 30) {
      const y = 256 + Math.sin(x * 0.02) * 25 + (Math.random() - 0.5) * 20;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      ctx.beginPath();
      ctx.ellipse(x, y, 45, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  createOrbitRing(radius, color, opacity, tilt) {
    const segments = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 3);

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = Math.sin(theta) * radius * Math.cos(tilt);
      positions[i * 3 + 2] = Math.sin(theta) * radius * Math.sin(tilt);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending
    });

    const orbit = new THREE.Line(geometry, material);
    this.bgScene.add(orbit);
    this.bgOrbits.push(orbit);
  }

  animateBackground() {
    requestAnimationFrame(() => this.animateBackground());

    // Mouse parallax dampening
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.035;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.035;

    // Inertial user drag rotation on Earth
    this.userEarthDragRotY += (this.targetEarthDragRotY - this.userEarthDragRotY) * 0.08;
    this.userEarthDragRotX += (this.targetEarthDragRotX - this.userEarthDragRotX) * 0.08;

    if (this.bgCamera) {
      this.bgCamera.position.x = this.mouseX * 60;
      this.bgCamera.position.y = this.mouseY * 40;
      this.bgCamera.lookAt(0, 0, 0);
    }

    if (this.bgParticles) {
      this.bgParticles.rotation.y += 0.00025;
      this.bgParticles.rotation.x += 0.00008;
    }

    this.bgOrbits.forEach((orbit, index) => {
      orbit.rotation.z += 0.00018 * (index + 1);
    });

    // 3D Earth Dynamics (Phase 3)
    if (this.heroEarthMesh) {
      this.heroEarthMesh.rotation.y += 0.0007;
    }
    if (this.heroCloudMesh) {
      this.heroCloudMesh.rotation.y += 0.00105;
      this.heroCloudMesh.rotation.x += 0.00005;
    }

    // Orbiting Moon
    if (this.heroMoonMesh) {
      this.moonOrbitAngle += 0.00035;
      this.heroMoonMesh.position.x = Math.cos(this.moonOrbitAngle) * 420;
      this.heroMoonMesh.position.z = Math.sin(this.moonOrbitAngle) * 240 - 60;
      this.heroMoonMesh.position.y = Math.sin(this.moonOrbitAngle * 0.7) * 70 + 35;
      this.heroMoonMesh.rotation.y += 0.00035;
    }

    // Scroll-based cinematic camera transition:
    // Earth smoothly recedes into deep space as user scrolls into the Solar System Museum
    if (this.heroEarthGroup) {
      const scrollY = window.scrollY || 0;
      const scrollProgress = Math.min(scrollY / 750, 1);

      this.heroEarthGroup.position.y = -35 - scrollProgress * 220;
      this.heroEarthGroup.position.z = 250 - scrollProgress * 380;
      this.heroEarthGroup.scale.setScalar(1 - scrollProgress * 0.55);

      this.heroEarthGroup.rotation.x = this.mouseY * 0.12 + this.userEarthDragRotX;
      this.heroEarthGroup.rotation.y = (this.mouseX * 0.22) + this.userEarthDragRotY;
    }

    if (this.bgRenderer && this.bgScene && this.bgCamera) {
      this.bgRenderer.render(this.bgScene, this.bgCamera);
    }
  }

  // 2D Canvas Procedural Starfield Fallback
  initCanvasFallback(container) {
    const canvas = document.createElement('canvas');
    canvas.id = 'celestial-canvas';
    container.innerHTML = '';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.05 + 0.02
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark radial space glow
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
      grad.addColorStop(0, 'rgba(11, 23, 50, 0.4)');
      grad.addColorStop(1, 'rgba(2, 4, 10, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Orbit circles
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width * 0.35, height * 0.2, Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(230, 92, 0, 0.08)';
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, width * 0.5, height * 0.28, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Render stars
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    render();
  }

  onResize(container) {
    if (this.bgRenderer && this.bgCamera) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.bgCamera.aspect = width / height;
      this.bgCamera.updateProjectionMatrix();
      this.bgRenderer.setSize(width, height);
    }
  }

  // -------------------------------------------------------------
  // DESTINATION GLOBE VIEWER (Moon, Mars, Deep Space)
  // -------------------------------------------------------------
  renderDestinationGlobe(canvasContainer, destinationId) {
    if (!canvasContainer) return;
    canvasContainer.innerHTML = '';

    if (!this.threeAvailable) {
      this.renderDestination2DFallback(canvasContainer, destinationId);
      return;
    }

    try {
      const width = canvasContainer.clientWidth || 400;
      const height = canvasContainer.clientHeight || 400;

      if (this.destAnimId) cancelAnimationFrame(this.destAnimId);

      this.destScene = new THREE.Scene();
      this.destCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      this.destCamera.position.z = 3.2;

      this.destRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      this.destRenderer.setSize(width, height);
      this.destRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvasContainer.appendChild(this.destRenderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
      this.destScene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
      sunLight.position.set(4, 2, 3);
      this.destScene.add(sunLight);

      // Create procedural textures for each destination
      const sphereGeom = new THREE.SphereGeometry(1, 64, 64);
      let sphereMaterial;

      if (destinationId === 'moon') {
        const moonTexture = this.generateProceduralMoonTexture();
        sphereMaterial = new THREE.MeshStandardMaterial({
          map: moonTexture,
          roughness: 0.88,
          metalness: 0.05
        });
      } else if (destinationId === 'mars') {
        const marsTexture = this.generateProceduralMarsTexture();
        sphereMaterial = new THREE.MeshStandardMaterial({
          map: marsTexture,
          roughness: 0.82,
          metalness: 0.02
        });

        // Atmospheric halo
        const haloGeom = new THREE.SphereGeometry(1.05, 32, 32);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xff6622,
          transparent: true,
          opacity: 0.18,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        const halo = new THREE.Mesh(haloGeom, haloMat);
        this.destScene.add(halo);
      } else {
        // Deep Space: Cosmic Stellar Beacon / Heliopause Horizon
        const deepTexture = this.generateProceduralDeepSpaceTexture();
        sphereMaterial = new THREE.MeshStandardMaterial({
          map: deepTexture,
          roughness: 0.4,
          metalness: 0.6,
          emissive: 0x221155,
          emissiveIntensity: 0.4
        });

        // Heliopause shock ring
        const ringGeom = new THREE.RingGeometry(1.25, 1.35, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x818cf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2.5;
        this.destScene.add(ring);
      }

      this.destMesh = new THREE.Mesh(sphereGeom, sphereMaterial);
      this.destScene.add(this.destMesh);

      // Interactive Drag to Rotate
      const dom = this.destRenderer.domElement;
      let isPointerDown = false;
      let prevX = 0, prevY = 0;

      dom.style.cursor = 'grab';

      dom.addEventListener('pointerdown', (e) => {
        isPointerDown = true;
        prevX = e.clientX;
        prevY = e.clientY;
        dom.style.cursor = 'grabbing';
      });

      window.addEventListener('pointerup', () => {
        isPointerDown = false;
        dom.style.cursor = 'grab';
      });

      window.addEventListener('pointermove', (e) => {
        if (!isPointerDown || !this.destMesh) return;
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        this.destMesh.rotation.y += deltaX * 0.008;
        this.destMesh.rotation.x += deltaY * 0.008;
      });

      // Animate rotation
      const animateGlobe = () => {
        this.destAnimId = requestAnimationFrame(animateGlobe);
        if (this.destMesh && !isPointerDown) {
          this.destMesh.rotation.y += 0.0025;
        }
        if (this.destRenderer && this.destScene && this.destCamera) {
          this.destRenderer.render(this.destScene, this.destCamera);
        }
      };

      animateGlobe();
    } catch (err) {
      console.warn("3D globe rendering error, fallback to 2D:", err);
      this.renderDestination2DFallback(canvasContainer, destinationId);
    }
  }

  // Procedural Canvas Textures for realistic planetary surface mapping
  generateProceduralMoonTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base lunar gray
    ctx.fillStyle = '#8e9aaf';
    ctx.fillRect(0, 0, 1024, 512);

    // Dark lunar maria (Sea of Tranquility, Oceanus Procellarum)
    ctx.fillStyle = '#475569';
    const maria = [
      { x: 300, y: 220, rx: 140, ry: 90 },
      { x: 420, y: 260, rx: 90, ry: 70 },
      { x: 750, y: 200, rx: 120, ry: 80 }
    ];
    maria.forEach(m => {
      ctx.beginPath();
      ctx.ellipse(m.x, m.y, m.rx, m.ry, Math.PI / 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // Craters and regolith noise
    for (let i = 0; i < 400; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 512;
      const r = Math.random() * 8 + 1;
      ctx.fillStyle = Math.random() > 0.5 ? '#cbd5e1' : '#334155';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  generateProceduralMarsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Martian ochre/rust base
    ctx.fillStyle = '#b94723';
    ctx.fillRect(0, 0, 1024, 512);

    // Dark volcanic basalt regions (Syrtis Major, Acidalia)
    ctx.fillStyle = '#6e2b17';
    ctx.beginPath();
    ctx.ellipse(450, 260, 160, 90, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(220, 240, 120, 70, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Valles Marineris canyon scratch
    ctx.strokeStyle = '#3d160c';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(350, 270);
    ctx.lineTo(600, 280);
    ctx.stroke();

    // Polar Ice Caps (North & South dry ice)
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(512, 18, 160, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(512, 495, 130, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
  }

  generateProceduralDeepSpaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep cosmic indigo
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#312e81');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Nebula dust streaks
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = Math.random() > 0.7 ? 'rgba(0, 229, 255, 0.4)' : 'rgba(168, 85, 247, 0.3)';
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  // 2D Fallback if Three.js fails
  renderDestination2DFallback(canvasContainer, destinationId) {
    canvasContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 360;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    canvas.style.maxWidth = '100%';
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const colors = {
      'moon': { main: '#94a3b8', shade: '#475569', glow: 'rgba(148, 163, 184, 0.4)' },
      'mars': { main: '#c2410c', shade: '#7c2d12', glow: 'rgba(234, 88, 12, 0.5)' },
      'deep-space': { main: '#4f46e5', shade: '#1e1b4b', glow: 'rgba(99, 102, 241, 0.6)' }
    };
    const c = colors[destinationId] || colors['moon'];

    // Outer glow
    const glowGrad = ctx.createRadialGradient(180, 180, 110, 180, 180, 160);
    glowGrad.addColorStop(0, c.glow);
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(180, 180, 160, 0, Math.PI * 2);
    ctx.fill();

    // Planet body
    const planetGrad = ctx.createRadialGradient(150, 140, 20, 180, 180, 120);
    planetGrad.addColorStop(0, '#ffffff');
    planetGrad.addColorStop(0.3, c.main);
    planetGrad.addColorStop(1, c.shade);
    ctx.fillStyle = planetGrad;
    ctx.beginPath();
    ctx.arc(180, 180, 120, 0, Math.PI * 2);
    ctx.fill();
  }

  // -------------------------------------------------------------
  // PLANETARY SURFACE LANDING MAP (Moon, Mars, Deep Space)
  // -------------------------------------------------------------
  renderPlanetaryMap(canvasContainer, destinationId, onPinClick) {
    if (!canvasContainer) return;
    canvasContainer.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.width = canvasContainer.clientWidth || 440;
    canvas.height = canvasContainer.clientHeight || 420;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Define interactive landing site pins
    let sites = [];
    if (destinationId === 'moon') {
      sites = [
        { name: 'Apollo 11 (Eagle)', x: width * 0.58, y: height * 0.48, coords: '0.67° N, 23.47° E', targetId: 'apollo-11-lm-descent', date: 'July 20, 1969', color: '#00e5ff' },
        { name: 'Apollo 15 (LRV-1)', x: width * 0.46, y: height * 0.32, coords: '26.13° N, 3.63° E', targetId: 'apollo-lrv', date: 'July 30, 1971', color: '#38bdf8' },
        { name: 'Apollo 17 (LRV-3)', x: width * 0.62, y: height * 0.36, coords: '20.19° N, 30.77° E', targetId: 'apollo-lrv', date: 'Dec 11, 1972', color: '#ffb703' }
      ];
    } else if (destinationId === 'mars') {
      sites = [
        { name: 'Viking 1 Lander', x: width * 0.38, y: height * 0.38, coords: '22.7° N, 48.0° W', targetId: 'viking-1-lander', date: 'July 20, 1976', color: '#fbbf24' },
        { name: 'Pathfinder & Sojourner', x: width * 0.48, y: height * 0.46, coords: '19.33° N, 33.55° W', targetId: 'sojourner-rover', date: 'July 4, 1997', color: '#00e5ff' },
        { name: 'Curiosity (Ref)', x: width * 0.76, y: height * 0.56, coords: '4.6° S, 137.4° E', targetId: null, date: 'Aug 6, 2012', color: '#94a3b8' },
        { name: 'Perseverance (Ref)', x: width * 0.68, y: height * 0.42, coords: '18.4° N, 77.7° E', targetId: null, date: 'Feb 18, 2021', color: '#94a3b8' }
      ];
    } else {
      // Deep Space Trajectory
      sites = [
        { name: 'Sun & Earth', x: width * 0.15, y: height * 0.75, coords: '0 - 1.0 AU', targetId: null, date: 'Sept 5, 1977', color: '#ffb703' },
        { name: 'Jupiter Flyby', x: width * 0.32, y: height * 0.60, coords: '5.2 AU', targetId: null, date: 'March 1979', color: '#fb923c' },
        { name: 'Saturn Flyby', x: width * 0.48, y: height * 0.48, coords: '9.5 AU', targetId: null, date: 'Nov 1980', color: '#a78bfa' },
        { name: 'Heliopause Crossed', x: width * 0.72, y: height * 0.32, coords: '121.6 AU', targetId: null, date: 'Aug 25, 2012', color: '#818cf8' },
        { name: 'Voyager 1 (Current)', x: width * 0.86, y: height * 0.20, coords: '163+ AU (Interstellar)', targetId: 'voyager-1', date: 'Present Flight', color: '#00e5ff' }
      ];
    }

    let hoveredIndex = -1;
    let pulseAlpha = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cartographic background
      if (destinationId === 'moon') {
        // Lunar topographical surface
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, width, height);

        // Maria shading
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(width * 0.55, height * 0.45, width * 0.24, height * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(width * 0.35, height * 0.35, width * 0.18, height * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Maria labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('Mare Tranquillitatis', width * 0.46, height * 0.52);
        ctx.fillText('Mare Imbrium', width * 0.28, height * 0.32);
      } else if (destinationId === 'mars') {
        // Mars topographical surface
        ctx.fillStyle = '#7c2d12';
        ctx.fillRect(0, 0, width, height);

        // Dark volcanic regions & Chryse Planitia
        ctx.fillStyle = '#451a03';
        ctx.beginPath();
        ctx.ellipse(width * 0.45, height * 0.44, width * 0.3, height * 0.18, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Valles Marineris canyon
        ctx.strokeStyle = '#290e02';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(width * 0.35, height * 0.58);
        ctx.lineTo(width * 0.68, height * 0.62);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText('Chryse Planitia', width * 0.32, height * 0.34);
        ctx.fillText('Valles Marineris', width * 0.42, height * 0.68);
      } else {
        // Deep Space Trajectory Grid
        ctx.fillStyle = '#090d20';
        ctx.fillRect(0, 0, width, height);

        // Trajectory vector line
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(width * 0.15, height * 0.75);
        ctx.lineTo(width * 0.86, height * 0.20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Heliopause boundary barrier
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.45)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.72, 20);
        ctx.lineTo(width * 0.72, height - 20);
        ctx.stroke();

        ctx.fillStyle = '#818cf8';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText('HELIOPAUSE (121.6 AU)', width * 0.62, 35);
      }

      // Draw latitude / longitude grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 60; x < width; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 60; y < height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Pulse animation
      pulseAlpha = (pulseAlpha + 0.04) % (Math.PI * 2);
      const pulseRadius = 10 + Math.sin(pulseAlpha) * 4;

      // Draw landing site pins
      sites.forEach((site, idx) => {
        const isHovered = (idx === hoveredIndex);

        // Outer radar pulse ring
        ctx.strokeStyle = site.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(site.x, site.y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Pin central dot
        ctx.fillStyle = isHovered ? '#ffffff' : site.color;
        ctx.beginPath();
        ctx.arc(site.x, site.y, isHovered ? 6 : 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Pin label
        ctx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0';
        ctx.font = isHovered ? 'bold 11px JetBrains Mono' : '10px JetBrains Mono';
        ctx.fillText(site.name, site.x + 12, site.y - 4);

        if (isHovered) {
          ctx.fillStyle = 'var(--cyan-glow, #00e5ff)';
          ctx.font = '9px JetBrains Mono';
          ctx.fillText(`📍 ${site.coords} • ${site.date}`, site.x + 12, site.y + 10);
        }
      });
    };

    render();
    const animId = setInterval(render, 50);

    // Mouse hover listener
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found = -1;
      sites.forEach((s, idx) => {
        const dist = Math.hypot(mx - s.x, my - s.y);
        if (dist < 18) {
          found = idx;
        }
      });

      hoveredIndex = found;
      canvas.style.cursor = found >= 0 ? 'pointer' : 'default';
    });

    // Mouse click on pin
    canvas.addEventListener('click', () => {
      if (hoveredIndex >= 0) {
        const site = sites[hoveredIndex];
        if (site.targetId && onPinClick) {
          onPinClick(site.targetId);
        }
      }
    });

    canvas._mapCleanup = () => clearInterval(animId);
  }

  // -------------------------------------------------------------
  // INTERACTIVE 3D PLANETARY SURFACE EXPLORER (Phase 5)
  // -------------------------------------------------------------
  renderPlanetarySurface(canvasContainer, destinationId, onPinClick) {
    if (!canvasContainer) return;
    canvasContainer.innerHTML = '';

    if (!this.threeAvailable) {
      this.renderPlanetaryMap(canvasContainer, destinationId, onPinClick);
      return;
    }

    try {
      if (this.surfaceAnimId) cancelAnimationFrame(this.surfaceAnimId);

      const width = canvasContainer.clientWidth || 440;
      const height = canvasContainer.clientHeight || 420;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1500);
      camera.position.set(0, 35, 75);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      canvasContainer.appendChild(renderer.domElement);

      // Lighting
      const ambient = new THREE.AmbientLight(destinationId === 'mars' ? 0x4a2010 : 0x111c38, 0.7);
      scene.add(ambient);

      const sun = new THREE.DirectionalLight(0xffffff, 2.2);
      sun.position.set(60, 80, 50);
      scene.add(sun);

      const clickableObjects = [];

      // Build destination-specific terrain and hardware
      if (destinationId === 'moon') {
        // Lunar Terrain
        const terrainGeom = new THREE.PlaneGeometry(160, 160, 32, 32);
        const pos = terrainGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          const craterDist1 = Math.hypot(vx + 20, vy - 15);
          const craterDist2 = Math.hypot(vx - 25, vy + 20);
          let z = Math.sin(vx * 0.08) * Math.cos(vy * 0.08) * 2.5;
          if (craterDist1 < 25) z -= Math.cos((craterDist1 / 25) * Math.PI) * 4 + 2;
          if (craterDist2 < 18) z -= Math.cos((craterDist2 / 18) * Math.PI) * 3 + 1.5;
          pos.setZ(i, z);
        }
        terrainGeom.computeVertexNormals();

        const terrainMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.95 });
        const terrain = new THREE.Mesh(terrainGeom, terrainMat);
        terrain.rotation.x = -Math.PI / 2;
        scene.add(terrain);

        // Distant Earth in Sky
        const earthSky = new THREE.Mesh(
          new THREE.SphereGeometry(7, 24, 24),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        earthSky.position.set(45, 55, -60);
        scene.add(earthSky);

        // 1. Apollo 11 Descent Stage Model
        const apolloGroup = new THREE.Group();
        apolloGroup.position.set(-22, 3.5, 0);

        // Octagonal Body
        const lmBody = new THREE.Mesh(
          new THREE.CylinderGeometry(5.5, 6, 4, 8),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.85 })
        );
        apolloGroup.add(lmBody);

        // DPS Nozzle
        const nozzle = new THREE.Mesh(
          new THREE.CylinderGeometry(1.5, 2.5, 2.2, 16),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
        );
        nozzle.position.y = -2.5;
        apolloGroup.add(nozzle);

        // 4 Landing Struts
        for (let i = 0; i < 4; i++) {
          const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 7, 8),
            new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.7 })
          );
          const angle = (i * Math.PI) / 2;
          leg.position.set(Math.cos(angle) * 6, -2, Math.sin(angle) * 6);
          leg.rotation.z = Math.cos(angle) * 0.45;
          leg.rotation.x = -Math.sin(angle) * 0.45;
          apolloGroup.add(leg);

          // Footpad
          const pad = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0xfbbf24 }));
          pad.position.set(Math.cos(angle) * 8.5, -4.5, Math.sin(angle) * 8.5);
          apolloGroup.add(pad);
        }

        // Beacon Pin
        const pin1 = this.createSurfaceBeacon(0x00e5ff, 'Apollo 11 LM Descent Stage');
        pin1.position.y = 8;
        apolloGroup.add(pin1);
        apolloGroup.userData = { targetId: 'apollo-11-lm-descent' };
        scene.add(apolloGroup);
        clickableObjects.push(pin1);

        // 2. Apollo Lunar Roving Vehicle Model
        const lrvGroup = new THREE.Group();
        lrvGroup.position.set(22, 2.2, 8);

        // Chassis & Seats
        const lrvChassis = new THREE.Mesh(new THREE.BoxGeometry(7, 0.8, 4.5), new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.6 }));
        lrvGroup.add(lrvChassis);
        const lrvSeats = new THREE.Mesh(new THREE.BoxGeometry(2, 2.5, 3.5), new THREE.MeshStandardMaterial({ color: 0x475569 }));
        lrvSeats.position.set(0, 1.5, 0);
        lrvGroup.add(lrvSeats);

        // 4 Mesh Wheels
        const wheelGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.8, 16);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5, metalness: 0.6 });
        const wCoords = [[-3, -0.6, -2.5], [3, -0.6, -2.5], [-3, -0.6, 2.5], [3, -0.6, 2.5]];
        wCoords.forEach(c => {
          const w = new THREE.Mesh(wheelGeom, wheelMat);
          w.position.set(...c);
          w.rotation.x = Math.PI / 2;
          lrvGroup.add(w);
        });

        // Umbrella High-Gain Dish
        const lrvDish = new THREE.Mesh(new THREE.ConeGeometry(2.5, 0.8, 16), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
        lrvDish.position.set(2.5, 3.5, 1.5);
        lrvDish.rotation.z = -0.5;
        lrvGroup.add(lrvDish);

        const pin2 = this.createSurfaceBeacon(0x00e5ff, 'Apollo Lunar Rover');
        pin2.position.y = 7;
        lrvGroup.add(pin2);
        lrvGroup.userData = { targetId: 'apollo-lrv' };
        scene.add(lrvGroup);
        clickableObjects.push(pin2);

      } else if (destinationId === 'mars') {
        // Martian Red Terrain
        const terrainGeom = new THREE.PlaneGeometry(160, 160, 32, 32);
        const pos = terrainGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          pos.setZ(i, Math.sin(vx * 0.06) * 3 + Math.cos(vy * 0.05) * 2.5);
        }
        terrainGeom.computeVertexNormals();
        const terrainMat = new THREE.MeshStandardMaterial({ color: 0xbd4a22, roughness: 0.9 });
        const terrain = new THREE.Mesh(terrainGeom, terrainMat);
        terrain.rotation.x = -Math.PI / 2;
        scene.add(terrain);

        // Boulders scattered on Mars
        for (let b = 0; b < 18; b++) {
          const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(Math.random() * 1.5 + 0.6), new THREE.MeshStandardMaterial({ color: 0x692b15, roughness: 0.95 }));
          rock.position.set((Math.random() - 0.5) * 90, 0.5, (Math.random() - 0.5) * 90);
          scene.add(rock);
        }

        // 1. Viking 1 Lander
        const vGroup = new THREE.Group();
        vGroup.position.set(-26, 3, -8);
        const vBody = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 5, 2.5, 6), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5 }));
        vGroup.add(vBody);
        const vBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
        vBoom.position.set(2, 4.5, 0);
        vGroup.add(vBoom);

        const pinV = this.createSurfaceBeacon(0xf97316, 'Viking 1 Lander');
        pinV.position.y = 8;
        vGroup.add(pinV);
        vGroup.userData = { targetId: 'viking-1-lander' };
        scene.add(vGroup);
        clickableObjects.push(pinV);

        // 2. Mars Pathfinder Lander Station
        const pfGroup = new THREE.Group();
        pfGroup.position.set(16, 2, -15);
        const pfBody = new THREE.Mesh(new THREE.ConeGeometry(5.5, 2.2, 3), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 }));
        pfGroup.add(pfBody);
        const pfMast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 6, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
        pfMast.position.y = 3.5;
        pfGroup.add(pfMast);

        const pinPF = this.createSurfaceBeacon(0xf97316, 'Mars Pathfinder');
        pinPF.position.y = 8;
        pfGroup.add(pinPF);
        pfGroup.userData = { targetId: 'mars-pathfinder-lander' };
        scene.add(pfGroup);
        clickableObjects.push(pinPF);

        // 3. Sojourner Rover
        const sjGroup = new THREE.Group();
        sjGroup.position.set(24, 1.5, 5);
        const sjBody = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.2, 2.5), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, metalness: 0.7 }));
        sjGroup.add(sjBody);
        const pinSJ = this.createSurfaceBeacon(0xf97316, 'Sojourner Rover');
        pinSJ.position.y = 5;
        sjGroup.add(pinSJ);
        sjGroup.userData = { targetId: 'sojourner-rover' };
        scene.add(sjGroup);
        clickableObjects.push(pinSJ);

      } else {
        // Deep Space (Interstellar Heliopause Void & Voyager 1)
        const starGeom = new THREE.BufferGeometry();
        const starPos = new Float32Array(600 * 3);
        for (let i = 0; i < 600 * 3; i += 3) {
          starPos[i] = (Math.random() - 0.5) * 300;
          starPos[i + 1] = (Math.random() - 0.5) * 300;
          starPos[i + 2] = (Math.random() - 0.5) * 300;
        }
        starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starGeom, new THREE.PointsMaterial({ size: 2.2, color: 0x818cf8, transparent: true, opacity: 0.8 }));
        scene.add(stars);

        // Full Voyager 1 Spacecraft Model
        const voyGroup = new THREE.Group();
        voyGroup.position.set(0, 0, 0);

        // Dish
        const dish = new THREE.Mesh(new THREE.CylinderGeometry(14, 2.5, 3.5, 32), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }));
        dish.rotation.x = Math.PI / 2.2;
        voyGroup.add(dish);

        // Golden Record
        const rec = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 0.4, 32), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.15, metalness: 0.95 }));
        rec.position.set(4, 0, -3.5);
        rec.rotation.z = Math.PI / 2;
        voyGroup.add(rec);

        // RTG & Mag Booms
        const rtg = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 18, 12), new THREE.MeshStandardMaterial({ color: 0x475569 }));
        rtg.position.set(-10, -5, -3.5);
        rtg.rotation.z = Math.PI / 3;
        voyGroup.add(rtg);

        const pinVoy = this.createSurfaceBeacon(0x818cf8, 'Voyager 1 (Interstellar Space)');
        pinVoy.position.set(0, 16, 0);
        voyGroup.add(pinVoy);
        voyGroup.userData = { targetId: 'voyager-1' };
        scene.add(voyGroup);
        clickableObjects.push(pinVoy);
      }

      // Drag Orbit Camera Controls & Focal Target
      let isDragging = false;
      let prevX = 0, prevY = 0;
      let camTheta = Math.PI / 2, camPhi = Math.PI / 3.4, camDist = destinationId === 'deep-space' ? 45 : 75;
      let targetTheta = camTheta, targetPhi = camPhi, targetDist = camDist;
      const targetLook = new THREE.Vector3(0, 0, 0);
      const curLook = new THREE.Vector3(0, 0, 0);

      // Register controller for programmatic camera site targeting
      this.surfaceController = {
        focusSite: (siteId) => {
          if (destinationId === 'moon') {
            if (siteId === 'apollo-11') {
              // Mare Tranquillitatis (Apollo 11 LM)
              targetLook.set(-22, 3.5, 0);
              targetDist = 32;
              targetPhi = Math.PI / 3.6;
              targetTheta = Math.PI / 2.05;
            } else if (siteId === 'apollo-lrv') {
              // Hadley-Apennine / Apollo LRV Expedition
              targetLook.set(22, 2.2, 8);
              targetDist = 28;
              targetPhi = Math.PI / 3.6;
              targetTheta = Math.PI / 2.3;
            } else {
              // Global Lunar Panorama
              targetLook.set(0, 0, 0);
              targetDist = 75;
              targetPhi = Math.PI / 3.4;
              targetTheta = Math.PI / 2;
            }
          } else if (destinationId === 'mars') {
            if (siteId === 'viking-1') {
              // Chryse Planitia (Viking 1 Lander)
              targetLook.set(-26, 3, -8);
              targetDist = 30;
              targetPhi = Math.PI / 3.5;
              targetTheta = Math.PI / 1.85;
            } else if (siteId === 'ares-vallis') {
              // Ares Vallis (~830 km southeast of Viking 1: Pathfinder & Sojourner)
              targetLook.set(20, 2, -5);
              targetDist = 34;
              targetPhi = Math.PI / 3.4;
              targetTheta = Math.PI / 2.2;
            } else {
              // Global Martian Panorama
              targetLook.set(0, 0, 0);
              targetDist = 78;
              targetPhi = Math.PI / 3.4;
              targetTheta = Math.PI / 2;
            }
          } else if (destinationId === 'deep-space') {
            if (siteId === 'voyager-craft') {
              // Voyager 1 Spacecraft Close-Up
              targetLook.set(0, 0, 0);
              targetDist = 28;
              targetPhi = Math.PI / 3.2;
              targetTheta = Math.PI / 2.1;
            } else {
              // Interstellar Heliopause Wide Vista
              targetLook.set(0, 0, 0);
              targetDist = 55;
              targetPhi = Math.PI / 3.4;
              targetTheta = Math.PI / 2;
            }
          }
        }
      };

      const dom = renderer.domElement;
      dom.style.cursor = 'grab';

      dom.addEventListener('pointerdown', (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        dom.style.cursor = 'grabbing';
      });

      window.addEventListener('pointerup', () => {
        isDragging = false;
        if (dom) dom.style.cursor = 'grab';
      });

      dom.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;

        targetTheta -= dx * 0.007;
        targetPhi = Math.max(0.12, Math.min(Math.PI / 2.1, targetPhi - dy * 0.005));
      });

      dom.addEventListener('wheel', (e) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 0.9 : 1.1;
        targetDist = Math.max(18, Math.min(140, targetDist * factor));
      }, { passive: false });

      // Click on Beacon Pin
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      dom.addEventListener('click', (e) => {
        const rect = dom.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(clickableObjects, true);
        if (hits.length > 0) {
          let topGroup = hits[0].object;
          while (topGroup && topGroup.parent && !topGroup.userData?.targetId) {
            topGroup = topGroup.parent;
          }
          const targetId = topGroup?.userData?.targetId;
          if (targetId && onPinClick) {
            if (this.audio) this.audio.playQuindar();
            onPinClick(targetId);
          }
        }
      });

      // Animate Loop with Smooth Inertia and Focal Panning
      const animate = () => {
        this.surfaceAnimId = requestAnimationFrame(animate);

        // Smooth camera coordinate interpolation
        camDist += (targetDist - camDist) * 0.08;
        camTheta += (targetTheta - camTheta) * 0.08;
        camPhi += (targetPhi - camPhi) * 0.08;
        curLook.lerp(targetLook, 0.08);

        camera.position.x = curLook.x + camDist * Math.sin(camPhi) * Math.sin(camTheta);
        camera.position.y = curLook.y + camDist * Math.cos(camPhi);
        camera.position.z = curLook.z + camDist * Math.sin(camPhi) * Math.cos(camTheta);
        camera.lookAt(curLook);

        clickableObjects.forEach(pin => {
          pin.rotation.y += 0.03;
        });

        renderer.render(scene, camera);
      };

      animate();

    } catch (err) {
      console.warn("3D Surface rendering error, falling back to 2D map:", err);
      this.renderPlanetaryMap(canvasContainer, destinationId, onPinClick);
    }
  }

  createSurfaceBeacon(color, labelText) {
    const group = new THREE.Group();

    // Pulsing diamond / pin
    const geom = new THREE.OctahedronGeometry(1.8, 0);
    const mat = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
    const diamond = new THREE.Mesh(geom, mat);
    group.add(diamond);

    // Glowing core
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    group.add(core);

    // Ground laser beam
    const beamGeom = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
    const beamMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.45 });
    const beam = new THREE.Mesh(beamGeom, beamMat);
    beam.position.y = -4;
    group.add(beam);

    return group;
  }

  focusSurfaceSite(siteId) {
    if (this.surfaceController && typeof this.surfaceController.focusSite === 'function') {
      this.surfaceController.focusSite(siteId);
    }
  }

}
