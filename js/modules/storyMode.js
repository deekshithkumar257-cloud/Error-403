/**
 * NASA: ECHOES BEYOND EARTH - Mission Story Mode Module
 * "Voices from Space" - First-person educational dramatizations
 * Chapter-by-chapter cinematic navigation with audio narrations,
 * mission progress indicator, and completion screen.
 */

export class StoryMode {
  constructor(storiesData, artifactsData, audioEngine) {
    this.stories = storiesData;
    this.artifacts = artifactsData;
    this.audio = audioEngine;
    this.currentStoryId = 'apollo-11-lm-descent';
    this.currentChapterIndex = 0;
    this.isCompleted = false;

    this.container = document.getElementById('story-terminal-content');
    this.selectorBar = document.getElementById('story-selector-bar');
  }

  init() {
    this.renderSelectorPills();
    this.loadStory(this.currentStoryId, 0);
  }

  renderSelectorPills() {
    if (!this.selectorBar) return;
    this.selectorBar.innerHTML = this.stories.map(s => {
      const isSelected = (s.id === this.currentStoryId || (s.aliases && s.aliases.includes(this.currentStoryId)));
      const isActive = isSelected ? 'active' : '';
      return `
        <button class="story-selector-pill ${isActive}" data-id="${s.id}">
          <span>${s.destinationIcon || '🛰️'}</span>
          <span>${s.artifactName.replace('Apollo 11 Lunar Module Descent Stage', 'Apollo 11 Eagle').replace('Apollo Lunar Roving Vehicle', 'Apollo Lunar Rover')}</span>
        </button>
      `;
    }).join('');

    this.selectorBar.querySelectorAll('.story-selector-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const id = btn.dataset.id;
        this.loadStory(id, 0);
      });
    });
  }

  loadStory(storyId, chapterIndex = 0) {
    // Find matching story by id or alias
    let story = this.stories.find(s => s.id === storyId || (s.aliases && s.aliases.includes(storyId)));
    if (!story) {
      story = this.stories[0];
    }

    this.currentStoryId = story.id;
    this.currentChapterIndex = Math.max(0, Math.min(chapterIndex, story.chapters.length - 1));
    this.isCompleted = false;

    // Update active selector pill
    if (this.selectorBar) {
      this.selectorBar.querySelectorAll('.story-selector-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.id === story.id);
      });
    }

    this.renderChapter(story);
  }

  renderChapter(story) {
    if (!this.container) return;

    if (this.isCompleted) {
      this.renderCompletionScreen(story);
      return;
    }

    const chapter = story.chapters[this.currentChapterIndex];
    const totalChapters = story.chapters.length;
    const progressPercent = ((this.currentChapterIndex + 1) / totalChapters) * 100;

    // Render progress step dots
    const progressDotsHTML = story.chapters.map((ch, idx) => {
      const activeClass = idx === this.currentChapterIndex ? 'active' : (idx < this.currentChapterIndex ? 'passed' : '');
      return `
        <div class="story-step-dot ${activeClass}" title="Chapter ${idx + 1}: ${ch.title}" data-step="${idx}">
          <span>${idx + 1}</span>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `
      <div class="cinematic-story-card glass-hud scanline-layer animate-fade-in-up">
        
        <!-- Story Top Header Bar -->
        <div class="story-crt-header">
          <div class="story-speaker-id">
            <div class="story-speaker-dot"></div>
            <div>
              <div class="story-speaker-name">${story.speaker}</div>
              <div class="story-speaker-date">MISSION: ${story.mission.toUpperCase()} (${story.year}) • ${story.destination.toUpperCase()}</div>
            </div>
          </div>
          <div class="telemetry-tag">
            <span class="telemetry-dot"></span> CHAPTER ${this.currentChapterIndex + 1} OF ${totalChapters}
          </div>
        </div>

        <!-- Prominent Ethical Historical Disclaimer -->
        <div class="story-disclaimer-box">
          <strong>⚠️ MISSION NOTICE:</strong> ${story.disclaimer}
        </div>

        <!-- Visual Progress Tracker -->
        <div class="story-progress-container">
          <div class="story-progress-bar-bg">
            <div class="story-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <div class="story-dots-row">
            ${progressDotsHTML}
          </div>
        </div>

        <!-- Cinematic Story Layout: Grid with Large Image & Story Prose -->
        <div class="cinematic-story-grid">
          
          <!-- Left: Large Archival Image Viewport -->
          <div class="story-visual-viewport glass-panel">
            <div class="story-img-wrapper">
              <img src="${chapter.image}" alt="${chapter.title}" class="story-feature-img" id="story-feature-img" />
              <div class="story-img-overlay"></div>
            </div>
            <div class="story-img-caption">
              <span>📷 ${chapter.caption}</span>
            </div>
          </div>

          <!-- Right: Chapter Content & Voice Controls -->
          <div class="story-prose-viewport">
            <div class="story-chapter-meta">
              <span class="section-tag" style="padding: 0.2rem 0.6rem; font-size: 0.65rem; margin-bottom: 0.5rem;">
                ${chapter.badge.toUpperCase()}
              </span>
              <h3 class="story-chapter-title">${chapter.title}</h3>
            </div>

            <div class="story-text-body">
              <p class="story-narration-paragraph">${chapter.text}</p>
            </div>

            <!-- Voice Log Audio Controls -->
            <div class="story-audio-controls" style="margin-top: 1.5rem; margin-bottom: 0;">
              <button class="story-voice-btn" id="story-narrate-btn" title="Listen to first-person narration">
                <span id="narrate-icon">🔊</span>
                <span id="narrate-text">Listen to AI Voice Log</span>
              </button>
              <button class="hud-btn" id="story-quindar-btn" title="Play Apollo Quindar comms beep">
                <span>📡 Quindar Beep</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Bottom Chapter Navigation Bar -->
        <div class="story-navigation-bar">
          <button class="btn-secondary story-nav-btn" id="story-prev-btn" ${this.currentChapterIndex === 0 ? 'disabled' : ''}>
            <span>❮ Previous Chapter</span>
          </button>

          <div class="story-nav-center-hint">
            <span>Chapter ${this.currentChapterIndex + 1} of ${totalChapters}</span>
          </div>

          ${this.currentChapterIndex === totalChapters - 1 ? `
            <button class="btn-primary story-nav-btn" id="story-next-btn">
              <span>Complete Mission Story 🏆</span>
            </button>
          ` : `
            <button class="btn-primary story-nav-btn" id="story-next-btn">
              <span>Next Chapter ❯</span>
            </button>
          `}
        </div>

      </div>
    `;

    // Handle image load error fallback
    const imgEl = document.getElementById('story-feature-img');
    if (imgEl) {
      imgEl.addEventListener('error', () => {
        imgEl.src = story.heroImage;
      });
    }

    // Attach step dots click handlers
    this.container.querySelectorAll('.story-step-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const step = parseInt(dot.dataset.step, 10);
        if (this.audio) this.audio.playChirp();
        this.currentChapterIndex = step;
        this.renderChapter(story);
      });
    });

    // Previous Chapter button
    const prevBtn = document.getElementById('story-prev-btn');
    if (prevBtn && this.currentChapterIndex > 0) {
      prevBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.currentChapterIndex--;
        this.renderChapter(story);
      });
    }

    // Next / Complete button
    const nextBtn = document.getElementById('story-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        if (this.currentChapterIndex < totalChapters - 1) {
          this.currentChapterIndex++;
          this.renderChapter(story);
        } else {
          this.isCompleted = true;
          this.renderChapter(story);
        }
      });
    }

    // Audio voice narration handler
    const narrateBtn = document.getElementById('story-narrate-btn');
    const narrateText = document.getElementById('narrate-text');
    const narrateIcon = document.getElementById('narrate-icon');

    if (narrateBtn && this.audio) {
      narrateBtn.addEventListener('click', () => {
        const textToSpeak = `${chapter.title}. ${chapter.text}`;

        const isNowPlaying = this.audio.toggleSpeech(
          textToSpeak,
          () => {
            narrateText.textContent = 'Pause Transmission';
            narrateIcon.textContent = '⏸️';
            narrateBtn.style.borderColor = '#10b981';
          },
          () => {
            narrateText.textContent = 'Listen to AI Voice Log';
            narrateIcon.textContent = '🔊';
            narrateBtn.style.borderColor = '';
          }
        );

        if (!isNowPlaying) {
          narrateText.textContent = 'Listen to AI Voice Log';
          narrateIcon.textContent = '🔊';
        }
      });
    }

    const quindarBtn = document.getElementById('story-quindar-btn');
    if (quindarBtn && this.audio) {
      quindarBtn.addEventListener('click', () => this.audio.playQuindar());
    }
  }

  // -------------------------------------------------------------
  // STORY COMPLETION SCREEN
  // -------------------------------------------------------------
  renderCompletionScreen(story) {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="cinematic-story-card glass-hud scanline-layer animate-fade-in-up" style="text-align: center; padding: 3.5rem 2rem;">
        
        <div style="width: 72px; height: 72px; margin: 0 auto 1.5rem auto; border-radius: 50%; background: rgba(0, 229, 255, 0.15); border: 2px solid var(--cyan-glow); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);">
          🏆
        </div>

        <span class="telemetry-tag" style="margin-bottom: 0.75rem;">
          <span class="telemetry-dot"></span> MISSION LOG COMPLETED
        </span>

        <h3 style="font-family: var(--font-display); font-size: 2rem; color: #fff; margin-bottom: 0.5rem;">
          ${story.artifactName}
        </h3>

        <p style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--cyan-glow); margin-bottom: 1.5rem;">
          You have completed the first-person journey of ${story.speaker}.
        </p>

        <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 650px; margin: 0 auto 2rem auto; line-height: 1.7;">
          This historical machine remains a permanent landmark beyond Earth. Its discoveries laid the foundation for modern planetary science and future deep-space exploration.
        </p>

        <!-- NASA Official Citation Link -->
        <div style="background: rgba(11, 61, 145, 0.3); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: var(--border-radius-sm); padding: 1rem; max-width: 550px; margin: 0 auto 2.5rem auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="text-align: left;">
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--cyan-glow);">VERIFIED NASA ARCHIVE</div>
            <div style="font-size: 0.85rem; color: #fff; font-weight: 600;">${story.nasaSourceLabel}</div>
          </div>
          <a href="${story.nasaSourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">
            <span>NASA Source ↗</span>
          </a>
        </div>

        <!-- Completion Actions -->
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-primary" id="story-replay-btn">
            <span>🔄 Replay Story</span>
          </button>
          <button class="btn-secondary" id="story-inspect-specs-btn" data-id="${story.id}">
            <span>Inspect Technical Telemetry</span>
          </button>
          <button class="btn-secondary" id="story-next-machine-btn">
            <span>Next Space Machine ❯</span>
          </button>
        </div>

      </div>
    `;

    const replayBtn = document.getElementById('story-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.loadStory(story.id, 0);
      });
    }

    const specsBtn = document.getElementById('story-inspect-specs-btn');
    if (specsBtn) {
      specsBtn.addEventListener('click', () => {
        const artSection = document.getElementById('artifacts');
        if (artSection) artSection.scrollIntoView({ behavior: 'smooth' });
        const card = document.querySelector(`.artifact-card[data-id="${story.id}"]`);
        if (card) card.click();
      });
    }

    const nextMachineBtn = document.getElementById('story-next-machine-btn');
    if (nextMachineBtn) {
      nextMachineBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const currentIndex = this.stories.findIndex(s => s.id === story.id);
        const nextIndex = (currentIndex + 1) % this.stories.length;
        this.loadStory(this.stories[nextIndex].id, 0);
      });
    }
  }
}
