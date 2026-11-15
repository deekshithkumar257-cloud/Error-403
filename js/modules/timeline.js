/**
 * NASA: ECHOES BEYOND EARTH - Mission Timeline Module
 * "The Journey Through Time" - Interactive Horizontal Mission Chronology
 * Filterable by destination with detailed milestone panels and artifact jumps.
 */

export class Timeline {
  constructor(timelineData, audioEngine, onSelectArtifact, onSelectStory) {
    this.timeline = timelineData;
    this.audio = audioEngine;
    this.onSelectArtifact = onSelectArtifact;
    this.onSelectStory = onSelectStory;
    this.activeFilter = 'all';
    this.selectedEventId = this.timeline[0] ? this.timeline[0].id : null;

    this.container = document.getElementById('timeline-chronology');
  }

  init() {
    this.setupFilters();
    this.render();
  }

  setupFilters() {
    const filterButtons = document.querySelectorAll('.timeline-filters-bar .filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;

        // Auto-select first event in filtered list
        const filtered = this.getFilteredEvents();
        if (filtered.length > 0) {
          this.selectedEventId = filtered[0].id;
        }

        this.render();
      });
    });
  }

  getFilteredEvents() {
    return this.timeline.filter(item => {
      if (this.activeFilter === 'all') return true;
      return item.destination === this.activeFilter;
    });
  }

  render() {
    if (!this.container) return;
    const filtered = this.getFilteredEvents();

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <p style="font-family: var(--font-mono); color: var(--text-dim);">No missions found for this destination filter.</p>
          <button class="btn-secondary" id="reset-timeline-filter-btn" style="margin-top: 1rem;">Show All Missions</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-timeline-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const allBtn = document.querySelector('.timeline-filters-bar .filter-btn[data-filter="all"]');
          if (allBtn) allBtn.click();
        });
      }
      return;
    }

    // Ensure selected event is valid in current filter
    let activeEvent = filtered.find(e => e.id === this.selectedEventId);
    if (!activeEvent) {
      activeEvent = filtered[0];
      this.selectedEventId = activeEvent.id;
    }

    const currentIndex = filtered.findIndex(e => e.id === this.selectedEventId);

    // Build Horizontal Track HTML
    const trackNodesHTML = filtered.map((item, idx) => {
      const isSelected = item.id === this.selectedEventId;
      const markerClass = `marker-${item.destination}`;
      const activeClass = isSelected ? 'active' : '';

      return `
        <div class="h-timeline-node-item ${activeClass}" data-id="${item.id}" tabindex="0" role="button" aria-label="${item.year} - ${item.title}">
          <div class="h-timeline-year">${item.year}</div>
          <div class="h-timeline-pin ${markerClass}">
            <span class="h-pin-icon">${item.destinationIcon}</span>
          </div>
          <div class="h-timeline-label">${item.missionName}</div>
        </div>
      `;
    }).join('');

    // Render Container: Horizontal Track + Nav Bar + Detail Panel
    this.container.innerHTML = `
      <div class="horizontal-timeline-wrapper animate-fade-in-up">
        
        <!-- Horizontal Scrollable Timeline Rail -->
        <div class="h-timeline-rail-scroll">
          <div class="h-timeline-rail">
            <div class="h-timeline-line"></div>
            ${trackNodesHTML}
          </div>
        </div>

        <!-- Navigation Controls Strip -->
        <div class="h-timeline-nav-strip">
          <button class="hud-btn" id="h-timeline-prev-btn" ${currentIndex === 0 ? 'disabled' : ''}>
            <span>❮ Previous Milestone</span>
          </button>

          <div class="telemetry-tag" style="font-size: 0.75rem;">
            MILESTONE ${currentIndex + 1} OF ${filtered.length}
          </div>

          <button class="hud-btn" id="h-timeline-next-btn" ${currentIndex === filtered.length - 1 ? 'disabled' : ''}>
            <span>Next Milestone ❯</span>
          </button>
        </div>

        <!-- Detailed Milestone Inspection Panel -->
        <div class="h-timeline-detail-panel glass-hud scanline-layer">
          <div class="h-detail-grid">
            
            <!-- Left: Archival Image Preview -->
            <div class="h-detail-visual">
              <div class="h-detail-img-wrap">
                <img src="${activeEvent.image}" alt="${activeEvent.title}" class="h-detail-img" id="h-detail-img" />
                <div class="h-detail-img-overlay"></div>
              </div>
              <div class="h-detail-meta-bar">
                <span class="telemetry-tag">
                  ${activeEvent.destinationIcon} ${activeEvent.destinationName.toUpperCase()}
                </span>
                <span class="status-pill active" style="font-size: 0.65rem;">
                  <span class="status-dot"></span> ${activeEvent.eventType.toUpperCase()}
                </span>
              </div>
            </div>

            <!-- Right: Content & Scientific Achievements -->
            <div class="h-detail-body">
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan-glow); letter-spacing: 1px; margin-bottom: 0.35rem;">
                YEAR ${activeEvent.year} // ${activeEvent.missionName.toUpperCase()}
              </div>

              <h3 class="h-detail-title">${activeEvent.title}</h3>

              <!-- Prominent Achievement Callout -->
              <div class="h-achievement-callout">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--solar-gold); text-transform: uppercase; margin-bottom: 0.25rem;">
                  ⭐ KEY HISTORICAL ACHIEVEMENT
                </div>
                <div style="font-size: 0.95rem; color: #fff; font-weight: 500; line-height: 1.5;">
                  ${activeEvent.achievement}
                </div>
              </div>

              <p class="h-detail-summary">${activeEvent.summary}</p>

              <!-- Distinct Date Breakdown Table -->
              <div class="h-dates-grid">
                <div class="h-date-item">
                  <span class="h-date-lbl">🚀 Launch Date</span>
                  <span class="h-date-val">${activeEvent.launchDate}</span>
                </div>
                <div class="h-date-item">
                  <span class="h-date-lbl">🛬 Landing Date</span>
                  <span class="h-date-val">${activeEvent.landingDate}</span>
                </div>
                <div class="h-date-item">
                  <span class="h-date-lbl">📅 Milestone Date</span>
                  <span class="h-date-val">${activeEvent.milestoneDate}</span>
                </div>
              </div>

              <!-- Action Links: Hardware Inspector, Story Mode, NASA Source -->
              <div class="h-detail-actions">
                ${activeEvent.relatedArtifact ? `
                  <button class="btn-primary h-view-artifact-btn" data-artifact-id="${activeEvent.relatedArtifact}">
                    <span>🔍 Inspect ${activeEvent.relatedArtifactName}</span>
                  </button>
                  <button class="btn-secondary h-view-story-btn" data-artifact-id="${activeEvent.relatedArtifact}">
                    <span>📖 Read Story Log</span>
                  </button>
                ` : ''}
                <a href="${activeEvent.nasaSourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-ghost" style="font-size: 0.8rem; margin-left: auto;">
                  <span>${activeEvent.nasaSourceLabel} ↗</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    `;

    // Handle image fallback
    const imgEl = document.getElementById('h-detail-img');
    if (imgEl) {
      imgEl.addEventListener('error', () => {
        imgEl.src = 'https://images-assets.nasa.gov/image/PIA00563/PIA00563~medium.jpg';
      });
    }

    // Attach click listeners to all nodes on the timeline rail
    this.container.querySelectorAll('.h-timeline-node-item').forEach(node => {
      node.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.selectedEventId = node.dataset.id;
        this.render();
      });
    });

    // Previous Button
    const prevBtn = document.getElementById('h-timeline-prev-btn');
    if (prevBtn && currentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.selectedEventId = filtered[currentIndex - 1].id;
        this.render();
      });
    }

    // Next Button
    const nextBtn = document.getElementById('h-timeline-next-btn');
    if (nextBtn && currentIndex < filtered.length - 1) {
      nextBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        this.selectedEventId = filtered[currentIndex + 1].id;
        this.render();
      });
    }

    // View Artifact Details button
    const viewArtifactBtn = this.container.querySelector('.h-view-artifact-btn');
    if (viewArtifactBtn) {
      viewArtifactBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const artId = viewArtifactBtn.dataset.artifactId;
        const artSection = document.getElementById('artifacts');
        if (artSection) artSection.scrollIntoView({ behavior: 'smooth' });

        // Trigger card inspection modal
        const card = document.querySelector(`.artifact-card[data-id="${artId}"]`);
        if (card) {
          card.click();
        } else if (this.onSelectArtifact) {
          this.onSelectArtifact(artId);
        }
      });
    }

    // View Story button
    const viewStoryBtn = this.container.querySelector('.h-view-story-btn');
    if (viewStoryBtn) {
      viewStoryBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const artId = viewStoryBtn.dataset.artifactId;
        if (this.onSelectStory) {
          this.onSelectStory(artId);
        } else {
          const storySection = document.getElementById('story');
          if (storySection) storySection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
