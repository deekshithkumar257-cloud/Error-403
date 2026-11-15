/**
 * NASA: ECHOES BEYOND EARTH - Knowledge Quiz Module
 * "COSMIC CHALLENGE – Test Your Space Knowledge"
 * 15-question interactive multiple choice challenge with 10 points per question (150 max),
 * 3 achievement ranks (Space Explorer, Mission Specialist, Cosmic Expert),
 * start screen, answer selection & submit workflow, and NASA source references.
 */

export class QuizEngine {
  constructor(quizData, audioEngine) {
    this.questions = quizData;
    this.audio = audioEngine;

    this.isStarted = false;
    this.currentIndex = 0;
    this.score = 0; // 10 points per correct answer, max 150
    this.correctCount = 0;
    this.selectedOptionIndex = null;
    this.hasSubmittedCurrent = false;

    // DOM references
    this.cardContainer = document.getElementById('quiz-card-content');
    this.certificateView = document.getElementById('quiz-certificate-view');
    this.progressBar = document.getElementById('quiz-progress-bar');
    this.currentScoreEl = document.getElementById('quiz-score-val');
    this.totalQuestionsEl = document.getElementById('quiz-total-val');
  }

  init() {
    this.resetQuiz(false); // start on welcome/start screen
  }

  resetQuiz(autoStart = false) {
    this.isStarted = autoStart;
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.selectedOptionIndex = null;
    this.hasSubmittedCurrent = false;

    if (this.totalQuestionsEl) {
      this.totalQuestionsEl.textContent = this.questions.length;
    }
    if (this.currentScoreEl) {
      this.currentScoreEl.textContent = '0 pts';
    }
    if (this.progressBar) {
      this.progressBar.style.width = '0%';
    }

    if (this.certificateView) {
      this.certificateView.classList.remove('show');
    }
    if (this.cardContainer) {
      this.cardContainer.style.display = 'block';
    }

    if (!this.isStarted) {
      this.renderStartScreen();
    } else {
      this.renderQuestion();
    }
  }

  // -------------------------------------------------------------
  // START QUIZ SCREEN
  // -------------------------------------------------------------
  renderStartScreen() {
    if (!this.cardContainer) return;

    this.cardContainer.innerHTML = `
      <div class="quiz-card glass-hud animate-fade-in-up" style="text-align: center; padding: 3rem 2rem;">
        <div style="width: 68px; height: 68px; margin: 0 auto 1.25rem auto; border-radius: 50%; background: rgba(0, 229, 255, 0.15); border: 2px solid var(--cyan-glow); display: flex; align-items: center; justify-content: center; font-size: 2rem; box-shadow: 0 0 20px rgba(0, 229, 255, 0.35);">
          🚀
        </div>

        <span class="section-tag" style="margin-bottom: 0.85rem;">NASA MISSION CADET CHALLENGE</span>
        
        <h3 style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">
          COSMIC CHALLENGE
        </h3>
        
        <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2rem auto; line-height: 1.7;">
          Test your space knowledge across <strong>15 questions</strong> about NASA's historic machines on the Moon, Mars, and in deep space. Earn 10 points per question and achieve your official flight rank!
        </p>

        <!-- Rules & Scoring Breakdown -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; max-width: 650px; margin: 0 auto 2.5rem auto; text-align: left;">
          <div style="background: rgba(10, 22, 48, 0.6); padding: 1rem; border-radius: var(--border-radius-sm); border: 1px solid rgba(0, 229, 255, 0.2);">
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--cyan-glow);">QUESTIONS</div>
            <div style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700; margin-top: 0.2rem;">15 Total</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">All 6 NASA Artifacts</div>
          </div>

          <div style="background: rgba(10, 22, 48, 0.6); padding: 1rem; border-radius: var(--border-radius-sm); border: 1px solid rgba(0, 229, 255, 0.2);">
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--solar-gold);">POINTS SYSTEM</div>
            <div style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700; margin-top: 0.2rem;">10 Pts / Question</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">150 Maximum Points</div>
          </div>

          <div style="background: rgba(10, 22, 48, 0.6); padding: 1rem; border-radius: var(--border-radius-sm); border: 1px solid rgba(0, 229, 255, 0.2);">
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: #a78bfa);">RANKS TO EARN</div>
            <div style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; font-weight: 700; margin-top: 0.2rem;">3 Tiers</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">Explorer • Specialist • Expert</div>
          </div>
        </div>

        <button class="btn-primary" id="start-quiz-btn" style="padding: 1rem 2.5rem; font-size: 1rem;">
          <span>Start Cosmic Challenge ❯</span>
        </button>
      </div>
    `;

    const startBtn = document.getElementById('start-quiz-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        this.isStarted = true;
        this.renderQuestion();
      });
    }
  }

  // -------------------------------------------------------------
  // QUESTION DISPLAY (1 AT A TIME)
  // -------------------------------------------------------------
  renderQuestion() {
    if (!this.cardContainer) return;

    if (this.currentIndex >= this.questions.length) {
      this.showFinalScoreScreen();
      return;
    }

    this.hasSubmittedCurrent = false;
    this.selectedOptionIndex = null;
    const q = this.questions[this.currentIndex];

    // Update Progress Bar & HUD
    const progressPercent = ((this.currentIndex) / this.questions.length) * 100;
    if (this.progressBar) this.progressBar.style.width = `${progressPercent}%`;
    if (this.currentScoreEl) this.currentScoreEl.textContent = `${this.score} pts (${this.correctCount} correct)`;

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHTML = q.options.map((opt, idx) => `
      <button class="quiz-opt-btn" data-index="${idx}">
        <span class="quiz-opt-letter">${letters[idx]}</span>
        <span class="quiz-opt-text">${opt}</span>
      </button>
    `).join('');

    this.cardContainer.innerHTML = `
      <div class="quiz-card glass-hud animate-fade-in-up">
        
        <!-- Question Meta Header -->
        <div class="quiz-meta-row">
          <span class="telemetry-tag">
            <span class="telemetry-dot"></span> QUESTION ${this.currentIndex + 1} OF ${this.questions.length}
          </span>
          <span class="status-pill active" style="font-size: 0.7rem;">
            TOPIC: ${q.topic.toUpperCase()}
          </span>
        </div>

        <!-- The Question -->
        <h3 class="quiz-question-text">${q.question}</h3>

        <!-- Four Selectable Answer Options -->
        <div class="quiz-options-list" id="quiz-options-list">
          ${optionsHTML}
        </div>

        <!-- Immediate Correct/Incorrect Feedback & Explanation -->
        <div class="quiz-feedback-box" id="quiz-feedback-box">
          <div id="feedback-headline" style="font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem;"></div>
          <div id="feedback-explanation" style="font-size: 0.95rem; line-height: 1.65; margin-bottom: 0.85rem;"></div>
          <div id="feedback-nasa-source" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cyan-glow);"></div>
        </div>

        <!-- Quiz Action Controls: Submit Answer / Next Question -->
        <div class="quiz-actions-bar" style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.25rem;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
            10 POINTS PER CORRECT ANSWER // 150 MAX
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button class="btn-primary" id="quiz-submit-btn" disabled>
              <span>Submit Answer</span>
            </button>
            <button class="btn-primary" id="quiz-next-btn" style="display: none;">
              <span>${this.currentIndex === this.questions.length - 1 ? 'View Final Results 🏆' : 'Next Question ❯'}</span>
            </button>
          </div>
        </div>

      </div>
    `;

    // Attach option selection click handlers
    const optionButtons = this.cardContainer.querySelectorAll('.quiz-opt-btn');
    const submitBtn = document.getElementById('quiz-submit-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.hasSubmittedCurrent) return;

        if (this.audio) this.audio.playChirp();
        optionButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedOptionIndex = parseInt(btn.dataset.index, 10);

        if (submitBtn) {
          submitBtn.disabled = false;
        }
      });
    });

    // Submit Answer button handler
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (this.hasSubmittedCurrent || this.selectedOptionIndex === null) return;
        this.submitAnswer(this.selectedOptionIndex, q, optionButtons, submitBtn, nextBtn);
      });
    }

    // Next Question button handler
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.currentIndex++;
        this.renderQuestion();
      });
    }
  }

  // -------------------------------------------------------------
  // SUBMIT ANSWER LOGIC & IMMEDIATE FEEDBACK
  // -------------------------------------------------------------
  submitAnswer(selectedIdx, question, optionButtons, submitBtn, nextBtn) {
    this.hasSubmittedCurrent = true;
    const isCorrect = (selectedIdx === question.correctIndex);

    // Lock option buttons to prevent multiple answers
    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (idx === question.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    // Hide Submit, Reveal Next Question
    if (submitBtn) submitBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'inline-flex';

    const feedbackBox = document.getElementById('quiz-feedback-box');
    const feedbackHeadline = document.getElementById('feedback-headline');
    const feedbackExplanation = document.getElementById('feedback-explanation');
    const feedbackSource = document.getElementById('feedback-nasa-source');

    if (isCorrect) {
      this.score += 10;
      this.correctCount++;
      if (this.audio) this.audio.playCorrect();

      feedbackBox.className = 'quiz-feedback-box show correct';
      feedbackHeadline.textContent = '✓ CORRECT! (+10 POINTS)';
    } else {
      if (this.audio) this.audio.playIncorrect();

      feedbackBox.className = 'quiz-feedback-box show incorrect';
      feedbackHeadline.textContent = '✗ INCORRECT';
    }

    feedbackExplanation.textContent = question.explanation;
    if (feedbackSource && question.nasaSourceUrl) {
      feedbackSource.innerHTML = `
        <span>Official NASA Reference: </span>
        <a href="${question.nasaSourceUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--cyan-glow); text-decoration: underline;">
          ${question.nasaSourceLabel} ↗
        </a>
      `;
    }

    // Update Score in HUD immediately
    if (this.currentScoreEl) {
      this.currentScoreEl.textContent = `${this.score} pts (${this.correctCount} correct)`;
    }
  }

  // -------------------------------------------------------------
  // FINAL SCORE & ACHIEVEMENT SCREEN
  // -------------------------------------------------------------
  showFinalScoreScreen() {
    if (this.cardContainer) this.cardContainer.style.display = 'none';
    if (!this.certificateView) return;

    if (this.progressBar) this.progressBar.style.width = '100%';
    if (this.audio) this.audio.playQuindar();

    const totalQuestions = this.questions.length; // 15
    const maxScore = totalQuestions * 10; // 150 points
    const percentage = Math.round((this.correctCount / totalQuestions) * 100);

    // 3 Achievement Tiers as specified:
    // 0–50: Space Explorer
    // 60–100: Mission Specialist
    // 110–150: Cosmic Expert
    let rankName = 'Space Explorer';
    let rankBadge = '🥉';
    let rankColor = '#f59e0b';
    let performanceMsg = 'Good effort! You have taken your first bold steps into exploring NASA hardware. Review the artifacts and test your knowledge again to level up!';

    if (this.score >= 110) {
      rankName = 'Cosmic Expert';
      rankBadge = '🏆';
      rankColor = 'var(--cyan-glow)';
      performanceMsg = 'Outstanding performance! You have achieved the highest flight certification. You possess expert command of NASA hardware on the Moon, Mars, and in deep space.';
    } else if (this.score >= 60) {
      rankName = 'Mission Specialist';
      rankBadge = '🥈';
      rankColor = '#38bdf8';
      performanceMsg = 'Great job! You have demonstrated impressive space knowledge and proven you understand the science, history, and machinery that carried humans and robots beyond Earth.';
    }

    this.certificateView.innerHTML = `
      <div class="certificate-frame glass-hud animate-fade-in-up">
        
        <div class="certificate-seal" style="background: radial-gradient(circle, ${rankColor} 0%, rgba(11, 61, 145, 0.9) 100%);">
          ${rankBadge}
        </div>

        <div style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 2px; color: var(--solar-gold); text-transform: uppercase; margin-bottom: 0.5rem;">
          NASA MISSION EVALUATION REPORT
        </div>

        <h2 style="font-family: var(--font-display); font-size: 2.2rem; color: #fff; margin-bottom: 0.5rem;">
          COSMIC CHALLENGE RESULTS
        </h2>

        <!-- Score & Achievement Level Display -->
        <div style="background: rgba(0,0,0,0.5); padding: 1.75rem; border-radius: var(--border-radius-md); margin: 1.75rem 0; border: 1px dashed rgba(0, 229, 255, 0.4);">
          
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">
            ACHIEVED FLIGHT RANK
          </div>

          <div style="font-family: var(--font-display); font-size: 2rem; color: ${rankColor}; font-weight: 800; margin: 0.35rem 0;">
            ${rankName}
          </div>

          <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; flex-wrap: wrap;">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">TOTAL SCORE</div>
              <div style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; font-weight: 700;">
                ${this.score} <span style="font-size: 0.9rem; color: var(--text-dim);">/ ${maxScore} pts</span>
              </div>
            </div>

            <div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">CORRECT ANSWERS</div>
              <div style="font-family: var(--font-display); font-size: 1.6rem; color: var(--solar-gold); font-weight: 700;">
                ${this.correctCount} <span style="font-size: 0.9rem; color: var(--text-dim);">/ ${totalQuestions} (${percentage}%)</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Performance Evaluation Message -->
        <p style="font-size: 1.05rem; color: #e2e8f0; line-height: 1.7; max-width: 620px; margin: 0 auto 2rem auto;">
          ${performanceMsg}
        </p>

        <!-- Cadet Name Input for Custom Certificate -->
        <div style="max-width: 380px; margin: 0 auto 2rem auto;">
          <label for="cadet-name-input" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">
            NAME FOR NASA CERTIFICATION:
          </label>
          <input type="text" id="cadet-name-input" class="glass-input" placeholder="Enter Your Name (e.g. Alex Rivera)" style="text-align: center; font-weight: 600;" />
        </div>

        <!-- Action Controls -->
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn-primary" id="quiz-print-cert-btn">
            <span>🖨️ Print / Save NASA Certificate</span>
          </button>
          <button class="btn-secondary" id="quiz-restart-btn">
            <span>🔄 Restart Quiz</span>
          </button>
          <button class="btn-secondary" id="quiz-review-artifacts-btn">
            <span>🔍 Revisit Hardware Catalog</span>
          </button>
        </div>

      </div>
    `;

    this.certificateView.classList.add('show');

    // Print Certificate handler
    const printBtn = document.getElementById('quiz-print-cert-btn');
    const nameInput = document.getElementById('cadet-name-input');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const cadetName = (nameInput && nameInput.value.trim()) || 'Cadet';
        document.title = `NASA Cosmic Challenge Certificate - ${cadetName}`;
        window.print();
      });
    }

    // Restart Quiz handler
    const restartBtn = document.getElementById('quiz-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        this.resetQuiz(true); // restart directly at question 1
      });
    }

    // Revisit Artifacts handler
    const reviewBtn = document.getElementById('quiz-review-artifacts-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const artSection = document.getElementById('artifacts');
        if (artSection) artSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}
