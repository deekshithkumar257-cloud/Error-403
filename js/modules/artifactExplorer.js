/**
 * NASA: ECHOES BEYOND EARTH - Artifact Explorer Module
 * Interactive mission explorer presenting NASA hardware on the Moon, Mars, and Deep Space.
 * Designed with educational clarity for school students and space enthusiasts.
 */

export class ArtifactExplorer {
  constructor(missionsData, audioEngine, onOpenStoryCallback, blueprintsData = []) {
    this.missions = missionsData;
    this.audio = audioEngine;
    this.onOpenStory = onOpenStoryCallback;
    this.blueprints = blueprintsData;
    this.activeDestination = 'all';
    this.searchQuery = '';
    this.gridContainer = document.getElementById('artifacts-grid');
    this.modalOverlay = document.getElementById('artifact-modal');

    // 3D Spacecraft Viewer State (Phase 6)
    this.threeAvailable = typeof window.THREE !== 'undefined';
    this.viewerRenderer = null;
    this.viewerScene = null;
    this.viewerCamera = null;
    this.viewerGroup = null;
    this.viewerAnimId = null;
    this.viewerAutoRotate = true;
    this.viewerHotspots = [];
    this.activeHotspotIndex = 0;
    this.currentBlueprint = null;
  }

  init() {
    this.setupFilters();
    this.setupSearch();
    this.setupModalEvents();
    this.render();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.artifact-filters .filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeDestination = btn.dataset.filter;
        this.render();
      });
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('artifact-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  }

  setupModalEvents() {
    if (!this.modalOverlay) return;

    const closeBtn = this.modalOverlay.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  setDestination(destinationSlug) {
    this.activeDestination = destinationSlug;
    const filterButtons = document.querySelectorAll('.artifact-filters .filter-btn');
    filterButtons.forEach(btn => {
      if (btn.dataset.filter === destinationSlug) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.render();
  }

  getFilteredMissions() {
    return this.missions.filter(item => {
      const destMatches = this.activeDestination === 'all' || 
        item.destinationSlug === this.activeDestination ||
        item.destination.toLowerCase() === this.activeDestination.toLowerCase();
      
      const searchMatches = !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.missionName.toLowerCase().includes(this.searchQuery) ||
        item.destination.toLowerCase().includes(this.searchQuery) ||
        item.tagline.toLowerCase().includes(this.searchQuery);

      return destMatches && searchMatches;
    });
  }

  render() {
    if (!this.gridContainer) return;
    const filtered = this.getFilteredMissions();

    if (filtered.length === 0) {
      this.gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-family: var(--font-mono); color: var(--text-dim); font-size: 1.1rem; margin-bottom: 1rem;">
            [ NO HARDWARE FOUND MATCHING YOUR SELECTION ]
          </p>
          <button class="btn-secondary" id="reset-filter-btn">Show All Destinations</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.setDestination('all');
          const searchInput = document.getElementById('artifact-search-input');
          if (searchInput) searchInput.value = '';
          this.searchQuery = '';
          this.render();
        });
      }
      return;
    }

    this.gridContainer.innerHTML = filtered.map(item => this.createCardHTML(item)).join('');

    // Attach card click handlers for detailed view
    this.gridContainer.querySelectorAll('.artifact-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking on story button specifically, open story
        if (e.target.closest('.view-story-btn')) {
          e.stopPropagation();
          const id = e.target.closest('.view-story-btn').dataset.id;
          if (this.audio) this.audio.playChirp();
          if (this.onOpenStory) this.onOpenStory(id);
          return;
        }

        // Otherwise open full detailed view
        const id = card.dataset.id;
        const mission = this.missions.find(m => m.id === id);
        if (mission) {
          if (this.audio) this.audio.playQuindar();
          this.openDetailModal(mission);
        }
      });
    });

    // Handle image error fallbacks gracefully
    this.gridContainer.querySelectorAll('img.artifact-img').forEach(img => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const fallback = img.parentElement.querySelector('.artifact-svg-fallback');
        if (fallback) fallback.style.display = 'flex';
      });
    });
  }

  createCardHTML(item) {
    // Current status classes: Active (green), Still Travelling (blue/cyan), Inactive (amber)
    let statusClass = 'inactive';
    let statusDotGlow = '#fbbf24';
    if (item.status === 'Active') {
      statusClass = 'active';
      statusDotGlow = '#34d399';
    } else if (item.status === 'Still Travelling') {
      statusClass = 'travelling';
      statusDotGlow = '#38bdf8';
    }

    return `
      <article class="artifact-card glass-hud" data-id="${item.id}" tabindex="0" role="button" aria-label="Inspect ${item.name}">
        <div class="artifact-card-header">
          <div class="artifact-img-wrap">
            <img class="artifact-img" src="${item.imageThumb}" alt="${item.name}" loading="lazy" />
            <div class="artifact-svg-fallback" style="display: none;">
              ${this.generateSVGIcon(item.destinationSlug)}
            </div>
          </div>
          <div class="artifact-badges-bar">
            <span class="artifact-dest-tag">
              ${item.destinationIcon} ${item.destination}
            </span>
            <span class="status-pill ${statusClass}">
              <span class="status-dot" style="background: ${statusDotGlow}; box-shadow: 0 0 6px ${statusDotGlow};"></span>
              ${item.status}
            </span>
          </div>
        </div>
        <div class="artifact-card-body">
          <div class="artifact-mission-meta">
            YEAR: ${item.missionYear} • ${item.missionName.toUpperCase()}
          </div>
          <h3 class="artifact-card-title">${item.name}</h3>
          <p class="artifact-card-desc">${item.tagline}</p>
          
          <div class="artifact-card-footer" style="margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow);">
              Click to Explore ❯
            </span>
            <button class="btn-secondary view-story-btn" data-id="${item.id}" title="Read first-person story log" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">
              <span>Story Log</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // DETAILED VIEW (WITH THE 6 STUDENT QUESTIONS)
  // -------------------------------------------------------------
  openDetailModal(item) {
    if (!this.modalOverlay) return;

    const modalBody = this.modalOverlay.querySelector('.modal-content-body');
    const modalHeaderBanner = this.modalOverlay.querySelector('.modal-header-banner');

    modalHeaderBanner.innerHTML = `
      <img class="modal-header-img" src="${item.image}" alt="${item.name}" />
      <div class="modal-header-gradient"></div>
      <div class="modal-header-info">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <span class="telemetry-tag">
            <span class="telemetry-dot"></span> ${item.destinationIcon} ${item.destination.toUpperCase()}
          </span>
          <span class="telemetry-tag">
            MISSION: ${item.missionName} (${item.missionYear})
          </span>
          <span class="status-pill ${item.status === 'Still Travelling' ? 'travelling' : item.status.toLowerCase()}">
            <span class="status-dot"></span> STATUS: ${item.status.toUpperCase()}
          </span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: #fff;">
          ${item.name}
        </h2>
        <p style="font-size: 0.95rem; color: var(--cyan-glow); font-style: italic; margin-top: 0.25rem;">
          "${item.tagline}"
        </p>
      </div>
    `;

    // Handle modal image error fallback
    const modalImg = modalHeaderBanner.querySelector('.modal-header-img');
    if (modalImg) {
      modalImg.addEventListener('error', () => {
        modalImg.src = item.imageThumb;
      });
    }

    const qa = item.studentQandA;
    const blueprint = (this.blueprints || []).find(b => b.id === item.id) || null;
    this.currentBlueprint = blueprint;

    modalBody.innerHTML = `
      <!-- Modal Navigation Sub-Tabs (Phase 6) -->
      <div class="modal-subtabs-row" style="display: flex; gap: 0.5rem; border-bottom: 1px solid rgba(0, 229, 255, 0.22); padding-bottom: 0.85rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <button class="filter-btn active modal-subtab-btn" data-tab="qa">
          <span>📋 6 Educational Questions &amp; Flight Specs</span>
        </button>
        <button class="filter-btn modal-subtab-btn" data-tab="3d-viewer">
          <span>🔬 Interactive 3D Spacecraft &amp; Anatomy</span>
        </button>
      </div>

      <!-- Tab View 1: 6 Student Questions & Specs (Existing Flow) -->
      <div id="modal-tab-qa-view" class="modal-subtab-view">
        <div class="student-detail-qa-container">

        <!-- Question 1 -->
        <div class="student-qa-card">
          <div class="student-qa-number">1</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title">What is this machine?</h4>
            <p class="student-qa-answer">${qa.whatIsThis}</p>
          </div>
        </div>

        <!-- Question 2 -->
        <div class="student-qa-card">
          <div class="student-qa-number">2</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title">Why did NASA send it?</h4>
            <p class="student-qa-answer">${qa.whyDidNasaSendIt}</p>
          </div>
        </div>

        <!-- Question 3 -->
        <div class="student-qa-card">
          <div class="student-qa-number">3</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title">What did it do?</h4>
            <p class="student-qa-answer">${qa.whatDidItDo}</p>
          </div>
        </div>

        <!-- Question 4 -->
        <div class="student-qa-card" style="border-left-color: #38bdf8;">
          <div class="student-qa-number" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8;">4</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title" style="color: #38bdf8;">What did scientists discover?</h4>
            <p class="student-qa-answer">${qa.whatDidScientistsDiscover}</p>
          </div>
        </div>

        <!-- Question 5 -->
        <div class="student-qa-card">
          <div class="student-qa-number">5</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title">Where is it now?</h4>
            <p class="student-qa-answer">${qa.whereIsItNow}</p>
          </div>
        </div>

        <!-- Question 6 -->
        <div class="student-qa-card" style="border-left-color: ${item.status === 'Still Travelling' ? '#38bdf8' : '#fbbf24'};">
          <div class="student-qa-number" style="background: rgba(251, 191, 36, 0.2); color: #fbbf24;">6</div>
          <div class="student-qa-content">
            <h4 class="student-qa-title" style="color: #fbbf24;">Is it still working?</h4>
            <p class="student-qa-answer">${qa.isItStillWorking}</p>
          </div>
        </div>

      </div>

      <!-- Verified NASA Engineering & Flight Telemetry Specs -->
      <div style="background: rgba(10, 22, 48, 0.7); border: 1px solid rgba(0, 229, 255, 0.25); border-radius: var(--border-radius-sm); padding: 1.25rem; margin: 2rem 0;">
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.8px;">
          ⚙️ VERIFIED HARDWARE TELEMETRY & FLIGHT SPECIFICATIONS
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; font-size: 0.85rem;">
          <div><strong style="color: var(--text-muted);">Launch Date:</strong> <span style="color: #fff; margin-left: 4px;">${item.launchDate || 'N/A'}</span></div>
          <div><strong style="color: var(--text-muted);">${item.destinationSlug === 'deep-space' ? 'Heliopause Crossed:' : 'Landing Date:'}</strong> <span style="color: #fff; margin-left: 4px;">${item.landingDate || item.heliopauseCrossingDate || 'N/A'}</span></div>
          <div><strong style="color: var(--text-muted);">Location Type:</strong> <span style="color: ${item.status === 'Still Travelling' ? 'var(--cyan-glow)' : '#fbbf24'}; margin-left: 4px;">${item.hardwareLocationType || 'Preserved Surface Station'}</span></div>
          <div><strong style="color: var(--text-muted);">Coordinates / Distance:</strong> <span style="color: var(--cyan-glow); font-family: var(--font-mono); margin-left: 4px;">${item.coordinates || item.landingSite || 'N/A'}</span></div>
        </div>

        ${item.keyInstruments && item.keyInstruments.length ? `
          <div style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.75rem;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--solar-gold); text-transform: uppercase; margin-bottom: 0.45rem;">PRIMARY INSTRUMENTS & EQUIPMENT:</div>
            <ul style="font-size: 0.82rem; color: var(--text-main); line-height: 1.6; padding-left: 1.2rem; margin: 0;">
              ${item.keyInstruments.map(inst => `<li>${inst}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      </div> <!-- End of modal-tab-qa-view -->

      <!-- Tab View 2: Interactive 3D Spacecraft Viewer (Phase 6) -->
      <div id="modal-tab-3d-view" class="modal-subtab-view" style="display: none;">
        <div class="spacecraft-3d-card glass-hud" style="padding: 1rem; border-radius: var(--border-radius-md); margin-bottom: 1.5rem;">
          
          <!-- 3D Canvas Viewport Wrap -->
          <div id="spacecraft-3d-wrap" style="position: relative; width: 100%; height: 380px; background: radial-gradient(circle at center, #071739 0%, #020612 100%); border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid rgba(0, 229, 255, 0.25);">
            <div id="spacecraft-3d-canvas-container" style="width: 100%; height: 100%;"></div>

            <!-- 3D Viewport HUD Overlay -->
            <div style="position: absolute; top: 12px; left: 14px; pointer-events: none; z-index: 2;">
              <span class="telemetry-tag" style="background: rgba(2, 6, 18, 0.85);">
                <span class="telemetry-dot"></span> 3D HARDWARE VIEWER // 360° ORBIT
              </span>
            </div>

            <!-- Viewport Controls -->
            <div style="position: absolute; bottom: 12px; right: 14px; display: flex; gap: 0.4rem; z-index: 2;">
              <button class="filter-btn" id="viewer-rotate-btn" style="padding: 0.3rem 0.65rem; font-size: 0.72rem; background: rgba(10,22,48,0.85);">
                <span>⟳ Auto-Rotate</span>
              </button>
              <button class="filter-btn" id="viewer-reset-btn" style="padding: 0.3rem 0.65rem; font-size: 0.72rem; background: rgba(10,22,48,0.85);">
                <span>⟲ Reset View</span>
              </button>
            </div>

            <div style="position: absolute; bottom: 12px; left: 14px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); pointer-events: none; z-index: 2;">
              🖱️ Drag to rotate 360° • Scroll to zoom
            </div>
          </div>

          <!-- Component Anatomy Drawer & Telemetry Callouts -->
          <div style="margin-top: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow); text-transform: uppercase;">
                🔬 SUBSYSTEM COMPONENT ANATOMY &amp; HOTSPOTS
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim);">
                Click component to inspect
              </span>
            </div>

            <!-- Component Buttons Row -->
            <div id="viewer-components-list" style="display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 1rem;">
              ${(blueprint?.components || []).map((comp, idx) => `
                <button class="filter-btn comp-select-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                  <span>${idx + 1}. ${comp.name}</span>
                </button>
              `).join('')}
            </div>

            <!-- Active Component Detail Card -->
            <div id="viewer-active-comp-card" style="background: rgba(11, 26, 58, 0.65); border: 1px solid rgba(0, 229, 255, 0.28); border-radius: var(--border-radius-sm); padding: 1.15rem;">
              <!-- Populated dynamically by updateComponentCard() -->
            </div>
          </div>

          <!-- Authenticity Disclaimer -->
          <div style="margin-top: 1rem; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-align: right;">
            NASA HISTORICAL HARDWARE // 3D ILLUSTRATIVE ENGINEERING RECONSTRUCTION
          </div>
        </div>
      </div> <!-- End of modal-tab-3d-view -->

      <!-- Verified NASA Source Verification Box -->
      <div style="background: rgba(11, 61, 145, 0.2); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: var(--border-radius-sm); padding: 1.25rem; margin: 2rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <span class="telemetry-tag" style="font-size: 0.7rem; color: var(--cyan-glow);">✓ VERIFIED NASA SOURCE</span>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim);">${item.verifiedNasaCitation || 'NASA Scientific Archives'}</span>
          </div>
          <div style="font-size: 0.95rem; color: #fff; font-weight: 600; margin-top: 0.35rem;">
            ${item.nasaSourceLabel}
          </div>
        </div>
        <a href="${item.nasaSourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
          <span>Open NASA Archive ↗</span>
        </a>
      </div>

      <!-- Action buttons -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
          NASA ECHOES BEYOND EARTH // EDUCATIONAL MISSION ARCHIVE
        </div>
        <button class="btn-primary modal-open-story-btn" data-id="${item.id}">
          <span>Read Story Mode Log ("Echoes from the Void")</span>
        </button>
      </div>
    `;

    const openStoryBtn = modalBody.querySelector('.modal-open-story-btn');
    if (openStoryBtn) {
      openStoryBtn.addEventListener('click', () => {
        this.closeModal();
        if (this.onOpenStory) this.onOpenStory(item.id);
      });
    }

    // Bind Sub-Tab Switching (Q&A vs 3D Viewer)
    const subTabBtns = modalBody.querySelectorAll('.modal-subtab-btn');
    const qaView = modalBody.querySelector('#modal-tab-qa-view');
    const viewerView = modalBody.querySelector('#modal-tab-3d-view');

    subTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        subTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;

        if (tab === '3d-viewer') {
          if (qaView) qaView.style.display = 'none';
          if (viewerView) viewerView.style.display = 'block';
          this.init3DSpacecraftViewer(item);
        } else {
          if (viewerView) viewerView.style.display = 'none';
          if (qaView) qaView.style.display = 'block';
        }
      });
    });

    this.modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    this.cleanup3DViewer();
  }

  openById(artifactId) {
    const item = this.missions.find(m => 
      m.id === artifactId || 
      m.slug === artifactId ||
      m.id.includes(artifactId) ||
      artifactId.includes(m.id)
    );
    if (item) {
      if (this.audio) this.audio.playQuindar();
      this.openDetailModal(item);
    }
  }

  generateSVGIcon(dest) {
    const color = dest === 'mars' ? '#ef4444' : dest === 'deep-space' ? '#818cf8' : '#94a3b8';
    return `
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" stroke="${color}" stroke-width="2" stroke-dasharray="4 4" opacity="0.4"/>
        <path d="M50 20 L65 75 L50 65 L35 75 Z" fill="${color}" opacity="0.8"/>
        <circle cx="50" cy="45" r="5" fill="#fff"/>
      </svg>
    `;
  }

  // =============================================================
  // 3D SPACECRAFT HARDWARE VIEWER & ANATOMY (Phase 6)
  // =============================================================
  init3DSpacecraftViewer(item) {
    const container = document.getElementById('spacecraft-3d-canvas-container');
    if (!container || !this.threeAvailable) return;
    this.cleanup3DViewer();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    // Scene & Camera
    this.viewerScene = new THREE.Scene();
    this.viewerCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.viewerCamera.position.set(0, 18, 48);

    this.viewerRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.viewerRenderer.setSize(width, height);
    this.viewerRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(this.viewerRenderer.domElement);

    // Studio Lighting for Hardware Inspection
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.viewerScene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(30, 45, 40);
    this.viewerScene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00e5ff, 1.2);
    rimLight.position.set(-30, -20, -30);
    this.viewerScene.add(rimLight);

    // Ground Grid
    const grid = new THREE.GridHelper(60, 24, 0x00e5ff, 0x1e293b);
    grid.position.y = -8;
    this.viewerScene.add(grid);

    // Build the specific 3D Spacecraft Model
    this.viewerGroup = new THREE.Group();
    this.buildSpacecraftMesh(item.id, this.viewerGroup);
    this.viewerScene.add(this.viewerGroup);

    // Drag Orbit & Zoom Controls
    this.setupViewerControls(this.viewerRenderer.domElement);

    // Setup Component Callout Card
    this.activeHotspotIndex = 0;
    this.updateComponentCard(0);

    // Bind Component Buttons
    const compBtns = document.querySelectorAll('.comp-select-btn');
    compBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        compBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.dataset.index, 10);
        this.activeHotspotIndex = idx;
        this.updateComponentCard(idx);
        this.highlightComponentHotspot(idx);
      });
    });

    // Bind Reset and Auto-Rotate buttons
    const resetBtn = document.getElementById('viewer-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.viewerCamera.position.set(0, 18, 48);
        if (this.viewerGroup) {
          this.viewerGroup.rotation.set(0, 0, 0);
        }
      });
    }

    const rotateBtn = document.getElementById('viewer-rotate-btn');
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        this.viewerAutoRotate = !this.viewerAutoRotate;
        rotateBtn.classList.toggle('active', this.viewerAutoRotate);
        if (this.audio) this.audio.playChirp();
      });
    }

    // Start Viewer Animation Loop
    const animateViewer = () => {
      this.viewerAnimId = requestAnimationFrame(animateViewer);
      if (this.viewerAutoRotate && this.viewerGroup && !this.isDraggingViewer) {
        this.viewerGroup.rotation.y += 0.005;
      }
      this.viewerCamera.lookAt(0, 0, 0);
      if (this.viewerRenderer && this.viewerScene && this.viewerCamera) {
        this.viewerRenderer.render(this.viewerScene, this.viewerCamera);
      }
    };
    animateViewer();
  }

  buildSpacecraftMesh(artifactId, group) {
    if (artifactId === 'apollo-11-lm-descent') {
      // Octagonal Body with gold Kapton foil
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 9, 6.5, 8),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.85 })
      );
      group.add(body);

      // DPS Rocket Engine Nozzle
      const dps = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 4.2, 4, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 })
      );
      dps.position.y = -4.5;
      group.add(dps);

      // 4 Cantilevered Honeycomb Landing Gear Struts
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 11, 8),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.7 })
        );
        leg.position.set(Math.cos(angle) * 9, -3.5, Math.sin(angle) * 9);
        leg.rotation.z = Math.cos(angle) * 0.48;
        leg.rotation.x = -Math.sin(angle) * 0.48;
        group.add(leg);

        // Circular Footpad
        const pad = new THREE.Mesh(
          new THREE.CylinderGeometry(2.2, 2.2, 0.4, 16),
          new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, metalness: 0.8 })
        );
        pad.position.set(Math.cos(angle) * 13, -7.8, Math.sin(angle) * 13);
        group.add(pad);
      }

      // MESA Equipment Bay (Quadrant IV)
      const mesa = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 3.5, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5 })
      );
      mesa.position.set(7.5, 0.5, 0);
      group.add(mesa);

      // EASEP Bay (Quadrant II)
      const easep = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 3.5, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5 })
      );
      easep.position.set(-7.5, 0.5, 0);
      group.add(easep);

    } else if (artifactId === 'apollo-lrv') {
      // Aluminum Tube Chassis
      const chassis = new THREE.Mesh(
        new THREE.BoxGeometry(14, 1.2, 8),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7 })
      );
      group.add(chassis);

      // Twin Crew Seats
      const seats = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 5, 6),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 })
      );
      seats.position.set(0, 3, 0);
      group.add(seats);

      // T-Handle Controller Joystick
      const stick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 3, 8),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24 })
      );
      stick.position.set(1.5, 3.5, 0);
      group.add(stick);

      // 4 Woven Wire Mesh Wheels
      const wGeom = new THREE.CylinderGeometry(3.2, 3.2, 1.5, 24);
      const wMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.3, metalness: 0.8 });
      const positions = [[-6, -1, -4.8], [6, -1, -4.8], [-6, -1, 4.8], [6, -1, 4.8]];
      positions.forEach(p => {
        const w = new THREE.Mesh(wGeom, wMat);
        w.position.set(...p);
        w.rotation.x = Math.PI / 2;
        group.add(w);
      });

      // High-Gain Umbrella Dish Antenna
      const dish = new THREE.Mesh(
        new THREE.ConeGeometry(4.5, 1.5, 24),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 })
      );
      dish.position.set(5.5, 6.5, 3);
      dish.rotation.z = -0.4;
      group.add(dish);

      // Color TV Camera (GCTA)
      const tv = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.8, 2.5),
        new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 })
      );
      tv.position.set(6, 4.5, -3);
      group.add(tv);

    } else if (artifactId === 'viking-1-lander') {
      // Hexagonal Body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 9, 4.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.6 })
      );
      group.add(body);

      // 3 Shock Landing Legs
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 10, 8), new THREE.MeshStandardMaterial({ color: 0x64748b }));
        leg.position.set(Math.cos(a) * 8.5, -3.5, Math.sin(a) * 8.5);
        leg.rotation.z = Math.cos(a) * 0.45;
        leg.rotation.x = -Math.sin(a) * 0.45;
        group.add(leg);
      }

      // 3-Meter Sampler Arm
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 14, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      arm.position.set(8, -1, 4);
      arm.rotation.z = -Math.PI / 3.5;
      group.add(arm);

      // Dual RTG Wind Covers
      const rtg1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 3.5, 12), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      rtg1.position.set(-5, 3.5, -3);
      group.add(rtg1);
      const rtg2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 3.5, 12), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      rtg2.position.set(-5, 3.5, 3);
      group.add(rtg2);

      // Meteorology Boom
      const met = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 12, 8), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
      met.position.set(4, 7, -4);
      group.add(met);

    } else if (artifactId === 'sojourner-rover') {
      // Warm Electronics Box Chassis
      const chassis = new THREE.Mesh(
        new THREE.BoxGeometry(8, 3.5, 6),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.8 })
      );
      group.add(chassis);

      // GaAs Solar Panel Array Deck
      const solarDeck = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.4, 7.5),
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2, metalness: 0.9 })
      );
      solarDeck.position.y = 2;
      group.add(solarDeck);

      // APXS Spectrometer on Rear Arm
      const apxs = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 2.2, 12),
        new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4, metalness: 0.6 })
      );
      apxs.position.set(-5.5, -0.5, 0);
      apxs.rotation.z = Math.PI / 2;
      group.add(apxs);

      // 6-Wheel Rocker-Bogie Cleated Wheels
      const wGeom = new THREE.CylinderGeometry(1.6, 1.6, 1.2, 16);
      const wMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
      const wheels = [
        [-4.5, -2.5, -3.8], [0, -2.5, -4.2], [4.5, -2.5, -3.8],
        [-4.5, -2.5, 3.8], [0, -2.5, 4.2], [4.5, -2.5, 3.8]
      ];
      wheels.forEach(pos => {
        const w = new THREE.Mesh(wGeom, wMat);
        w.position.set(...pos);
        w.rotation.x = Math.PI / 2;
        group.add(w);
      });

    } else if (artifactId === 'mars-pathfinder-lander') {
      // Central Tetrahedron
      const center = new THREE.Mesh(
        new THREE.ConeGeometry(6, 4, 3),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
      );
      group.add(center);

      // 3 Unfolded Solar Petals
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3;
        const petal = new THREE.Mesh(
          new THREE.ConeGeometry(5, 0.4, 3),
          new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.25, metalness: 0.85 })
        );
        petal.position.set(Math.cos(a) * 7.5, -1.8, Math.sin(a) * 7.5);
        group.add(petal);
      }

      // IMP Stereo Camera Mast
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 9, 8), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
      mast.position.y = 5.5;
      group.add(mast);

      // Deflated Kevlar Airbag Cushions
      const airbagMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 });
      for (let k = 0; k < 6; k++) {
        const bag = new THREE.Mesh(new THREE.DodecahedronGeometry(2.5), airbagMat);
        const ka = (k * Math.PI) / 3;
        bag.position.set(Math.cos(ka) * 11, -2.5, Math.sin(ka) * 11);
        group.add(bag);
      }

    } else {
      // Voyager 1 Spacecraft
      // 3.7-Meter Cassegrain High-Gain Antenna Dish
      const dish = new THREE.Mesh(
        new THREE.CylinderGeometry(15, 2.5, 4, 32),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, metalness: 0.15 })
      );
      dish.rotation.x = Math.PI / 2;
      group.add(dish);

      // 10-Sided Equipment Bus
      const bus = new THREE.Mesh(
        new THREE.CylinderGeometry(5.5, 5.5, 3.5, 10),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.7 })
      );
      bus.position.z = -3.5;
      bus.rotation.x = Math.PI / 2;
      group.add(bus);

      // Voyager Golden Record Disc (gleaming gold)
      const rec = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.2, 0.35, 32),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.15, metalness: 0.95 })
      );
      rec.position.set(4.5, 0, -3.5);
      rec.rotation.z = Math.PI / 2;
      group.add(rec);

      // RTG Power Canisters on Boom
      const rtgBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 18, 12), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      rtgBoom.position.set(-11, -5, -3.5);
      rtgBoom.rotation.z = Math.PI / 3;
      group.add(rtgBoom);

      // 13-Meter Magnetometer Boom
      const magBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 34, 8), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      magBoom.position.set(13, 11, -3.5);
      magBoom.rotation.z = -Math.PI / 4;
      group.add(magBoom);
    }
  }

  setupViewerControls(dom) {
    let isDragging = false;
    let prevX = 0, prevY = 0;
    dom.style.cursor = 'grab';

    dom.addEventListener('pointerdown', (e) => {
      isDragging = true;
      this.isDraggingViewer = true;
      prevX = e.clientX;
      prevY = e.clientY;
      dom.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      this.isDraggingViewer = false;
      if (dom) dom.style.cursor = 'grab';
    });

    dom.addEventListener('pointermove', (e) => {
      if (!isDragging || !this.viewerGroup) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      this.viewerGroup.rotation.y += dx * 0.01;
      this.viewerGroup.rotation.x += dy * 0.008;
    });

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 0.92 : 1.08;
      this.viewerCamera.position.multiplyScalar(factor);
      this.viewerCamera.position.clampLength(18, 90);
    }, { passive: false });
  }

  updateComponentCard(index) {
    const card = document.getElementById('viewer-active-comp-card');
    if (!card || !this.currentBlueprint) return;

    const comp = this.currentBlueprint.components[index];
    if (!comp) return;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="telemetry-tag" style="margin-bottom: 0.35rem;">
            <span class="telemetry-dot"></span> ${comp.tag}
          </span>
          <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700;">
            ${comp.name}
          </h4>
        </div>
        <span class="status-pill active" style="font-size: 0.65rem;">
          HOTSPOT #${index + 1}
        </span>
      </div>

      <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin-bottom: 0.75rem;">
        ${comp.description}
      </p>

      <div style="font-size: 0.8rem; color: var(--text-muted); background: rgba(0, 229, 255, 0.06); padding: 0.5rem 0.75rem; border-left: 2px solid var(--cyan-glow); border-radius: 0 4px 4px 0;">
        <strong style="color: var(--cyan-glow);">Aerospace Materials:</strong> ${comp.materials}
      </div>
    `;
  }

  highlightComponentHotspot(index) {
    if (!this.viewerGroup) return;
    // Gentle camera bump to highlight selected component
    const angle = (index / (this.currentBlueprint?.components.length || 1)) * Math.PI * 2;
    this.viewerGroup.rotation.y = angle;
  }

  cleanup3DViewer() {
    if (this.viewerAnimId) {
      cancelAnimationFrame(this.viewerAnimId);
      this.viewerAnimId = null;
    }
    if (this.viewerRenderer) {
      this.viewerRenderer.dispose();
      this.viewerRenderer = null;
    }
    this.viewerScene = null;
    this.viewerCamera = null;
    this.viewerGroup = null;
  }

}
