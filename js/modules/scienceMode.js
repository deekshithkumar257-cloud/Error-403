/**
 * NASA: ECHOES BEYOND EARTH - Science Discoveries Module
 * Educational explanations of scientific principles proven by space artifacts,
 * plus interactive student laboratory calculation widgets, live Voyager telemetry,
 * and an interactive Rocker-Bogie suspension physics simulator.
 */

export class ScienceMode {
  constructor(discoveriesData, audioEngine, missionsData = [], onOpenArtifact = null) {
    this.discoveries = discoveriesData;
    this.audio = audioEngine;
    this.missions = missionsData;
    this.onOpenArtifact = onOpenArtifact;
    this.gridContainer = document.getElementById('science-discoveries-grid');
    this.voyagerTimer = null;
    this.rockerBogieAnimId = null;
  }

  init() {
    this.renderDiscoveries();
    this.initInteractiveCalculators();
    this.initVoyagerLiveTelemetry();
    this.initRockerBogieSimulator();
    this.initGoldenRecordDecoder();
    this.initComparisonMatrix();
  }

  renderDiscoveries() {
    if (!this.gridContainer) return;

    this.gridContainer.innerHTML = this.discoveries.map(item => `
      <div class="science-card glass-hud">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="science-badge">${item.badge}</span>
          <span class="telemetry-tag">${item.destination}</span>
        </div>
        <h3 class="science-title">${item.title}</h3>
        <p class="science-summary">${item.summary}</p>
        
        <div class="science-callout">
          <strong>HOW IT WORKS</strong>
          ${item.howItWorks}
        </div>

        <div class="science-callout" style="border-left-color: #38bdf8;">
          <strong style="color: #38bdf8;">STUDENT SCIENCE TAKEAWAY</strong>
          ${item.studentTakeaway}
        </div>

        <div class="science-fun-fact">
          <strong>💡 COSMIC FUN FACT:</strong> ${item.funFact}
        </div>
      </div>
    `).join('');
  }

  initInteractiveCalculators() {
    // 1. Lunar Drift Calculator
    const driftInput = document.getElementById('drift-year-input');
    const calcDriftBtn = document.getElementById('calc-drift-btn');
    const driftResult = document.getElementById('drift-result-display');

    if (calcDriftBtn && driftInput && driftResult) {
      calcDriftBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        const year = parseInt(driftInput.value, 10);
        const currentYear = new Date().getFullYear();

        if (isNaN(year) || year < 1969 || year > currentYear) {
          driftResult.innerHTML = `<span style="color: #ef4444;">Please enter a year between 1969 and ${currentYear}.</span>`;
          return;
        }

        const elapsedYears = currentYear - year;
        const driftCm = (elapsedYears * 3.8).toFixed(1);
        const driftInches = (driftCm / 2.54).toFixed(1);

        driftResult.innerHTML = `
          In the <strong>${elapsedYears} years</strong> since ${year}:<br>
          ▸ The Moon has drifted away by <strong style="color: var(--cyan-glow); font-size: 1.15rem;">${driftCm} cm</strong> (${driftInches} inches)!<br>
          <span style="font-size: 0.8rem; color: var(--text-dim);">Measured with laser pulses bouncing off Apollo 11's Retroreflector in the Sea of Tranquility.</span>
        `;
      });
    }

    // 2. Radio Communication Delay Calculator
    const radioSelect = document.getElementById('radio-target-select');
    const calcRadioBtn = document.getElementById('calc-radio-btn');
    const radioResult = document.getElementById('radio-result-display');

    if (calcRadioBtn && radioSelect && radioResult) {
      calcRadioBtn.addEventListener('click', () => {
        if (this.audio) this.audio.playQuindar();
        const target = radioSelect.value;
        const speedOfLightKmS = 299792; // km/s

        let distanceKm = 0;
        let targetName = '';
        let contextNote = '';

        if (target === 'moon') {
          distanceKm = 384400;
          targetName = 'Apollo 11 Tranquility Base (The Moon)';
          contextNote = 'Astronauts on the Moon experienced a brief 1.3-second delay between speaking and Houston responding.';
        } else if (target === 'mars-close') {
          distanceKm = 54600000;
          targetName = 'Viking 1 / Sojourner (Mars at closest approach)';
          contextNote = 'Even when Earth and Mars are at their closest alignment, radio signals take over 3 minutes to cross space.';
        } else if (target === 'mars-far') {
          distanceKm = 401000000;
          targetName = 'Pathfinder (Mars at farthest opposition)';
          contextNote = 'When Mars is on the opposite side of the Sun, messages take over 22 minutes each way!';
        } else if (target === 'voyager1') {
          distanceKm = 24400000000;
          targetName = 'Voyager 1 (Interstellar Space)';
          contextNote = 'Voyager 1 is so far away that commands sent this morning will not be answered until tomorrow!';
        }

        const oneWaySeconds = distanceKm / speedOfLightKmS;
        const roundTripSeconds = oneWaySeconds * 2;

        const formatTime = (totalSec) => {
          if (totalSec < 60) return `${totalSec.toFixed(2)} seconds`;
          const hrs = Math.floor(totalSec / 3600);
          const mins = Math.floor((totalSec % 3600) / 60);
          const secs = Math.floor(totalSec % 60);
          if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
          return `${mins}m ${secs}s`;
        };

        radioResult.innerHTML = `
          <strong>Target:</strong> ${targetName}<br>
          ▸ Distance: <strong>${(distanceKm).toLocaleString()} km</strong><br>
          ▸ One-Way Signal Travel Time: <strong style="color: var(--cyan-glow);">${formatTime(oneWaySeconds)}</strong><br>
          ▸ Round-Trip Ping Time: <strong style="color: var(--solar-gold);">${formatTime(roundTripSeconds)}</strong><br>
          <span style="font-size: 0.8rem; color: var(--text-dim); display: block; margin-top: 0.5rem;">${contextNote}</span>
        `;
      });
    }
  }

  // -------------------------------------------------------------
  // 3. VOYAGER 1 REAL-TIME LIVE TELEMETRY ODOMETER
  // -------------------------------------------------------------
  initVoyagerLiveTelemetry() {
    const odoKm = document.getElementById('voyager-live-km');
    const odoAu = document.getElementById('voyager-live-au');
    const odoDelay = document.getElementById('voyager-live-delay');
    const odoPower = document.getElementById('voyager-live-power');

    if (!odoKm || !odoAu) return;

    // Reference point: Jan 1, 2024 ~ 24,300,000,000 km, speed ~ 17.0 km/s relative to Sun
    const refTimestamp = new Date('2024-01-01T00:00:00Z').getTime();
    const refDistanceKm = 24300000000;
    const speedKmPerSec = 17.0; // km/s
    const kmPerAU = 149597870.7; // 1 AU in km
    const speedOfLight = 299792; // km/s

    const updateOdometer = () => {
      const now = Date.now();
      const elapsedSec = (now - refTimestamp) / 1000;
      const currentDistanceKm = refDistanceKm + (elapsedSec * speedKmPerSec);
      const currentDistanceAU = currentDistanceKm / kmPerAU;
      const oneWaySec = currentDistanceKm / speedOfLight;
      const hrs = Math.floor(oneWaySec / 3600);
      const mins = Math.floor((oneWaySec % 3600) / 60);
      const secs = Math.floor(oneWaySec % 60);

      // RTG Power decay formula: P(t) = 470W * (0.5)^(years / 87.7) * thermal factor
      const yearsSince1977 = (now - new Date('1977-09-05T00:00:00Z').getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      const remainingWatts = Math.max(220, 470 * Math.pow(0.5, yearsSince1977 / 87.7) * 0.72).toFixed(1);

      odoKm.textContent = `${Math.floor(currentDistanceKm).toLocaleString()} km`;
      odoAu.textContent = `${currentDistanceAU.toFixed(5)} AU`;
      if (odoDelay) odoDelay.textContent = `${hrs}h ${mins}m ${secs}s`;
      if (odoPower) odoPower.textContent = `~${remainingWatts} Watts (RTG)`;
    };

    updateOdometer();
    if (this.voyagerTimer) clearInterval(this.voyagerTimer);
    this.voyagerTimer = setInterval(updateOdometer, 1000);
  }

  // -------------------------------------------------------------
  // 4. ROCKER-BOGIE SUSPENSION PHYSICS SIMULATOR
  // -------------------------------------------------------------
  initRockerBogieSimulator() {
    const canvas = document.getElementById('rocker-bogie-canvas');
    const slider = document.getElementById('bogie-rock-slider');
    const angleReadout = document.getElementById('bogie-chassis-angle');
    if (!canvas || !slider) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.clientWidth || 540);
    const height = (canvas.height = 240);

    const draw = (rockHeight) => {
      ctx.clearRect(0, 0, width, height);

      // Ground plane
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 190);
      ctx.lineTo(240, 190);
      // The rock obstacle
      ctx.lineTo(280, 190 - rockHeight);
      ctx.lineTo(340, 190 - rockHeight);
      ctx.lineTo(370, 190);
      ctx.lineTo(width - 20, 190);
      ctx.stroke();

      // Rock terrain fill
      ctx.fillStyle = 'rgba(230, 92, 0, 0.25)';
      ctx.beginPath();
      ctx.moveTo(240, 190);
      ctx.lineTo(280, 190 - rockHeight);
      ctx.lineTo(340, 190 - rockHeight);
      ctx.lineTo(370, 190);
      ctx.closePath();
      ctx.fill();

      // Rock label
      ctx.fillStyle = '#f97316';
      ctx.font = '11px JetBrains Mono';
      ctx.fillText(`Martian Boulder (${Math.round(rockHeight * 1.5)} cm)`, 255, 180 - rockHeight);

      // Wheel positions
      // Front wheel on rock:
      const frontX = 310;
      const frontY = 190 - rockHeight;

      // Middle wheel climbing:
      const midX = 220;
      const midY = 190;

      // Rear wheel on flat ground:
      const rearX = 130;
      const rearY = 190;

      // Bogie link connects rear and middle wheels
      const bogieCenterY = (rearY + midY) / 2 - 25;
      const bogieCenterX = (rearX + midX) / 2;

      // Rocker link connects bogie center to front wheel
      // Chassis center pivot is at the rocker center
      const chassisPivotX = (bogieCenterX + frontX) / 2;
      const chassisPivotY = (bogieCenterY + frontY) / 2 - 20;

      // Chassis body tilt angle is half the slope of the rocker
      const rockerAngle = Math.atan2(frontY - bogieCenterY, frontX - bogieCenterX);
      const chassisTiltDeg = ((rockerAngle * 180) / Math.PI * 0.5).toFixed(1);

      if (angleReadout) {
        angleReadout.textContent = `${Math.abs(chassisTiltDeg)}° (${rockHeight > 0 ? 'Absorbed 50%' : 'Level'})`;
      }

      // Draw Bogie Link (Rear to Mid)
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(rearX, rearY);
      ctx.lineTo(bogieCenterX, bogieCenterY);
      ctx.lineTo(midX, midY);
      ctx.stroke();

      // Draw Rocker Arm (Bogie to Front)
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(bogieCenterX, bogieCenterY);
      ctx.lineTo(chassisPivotX, chassisPivotY);
      ctx.lineTo(frontX, frontY);
      ctx.stroke();

      // Draw Central Differential Pivot
      ctx.fillStyle = '#ffb703';
      ctx.beginPath();
      ctx.arc(chassisPivotX, chassisPivotY, 7, 0, Math.PI * 2);
      ctx.fill();

      // Draw Rover Main Body Platform (Chassis)
      ctx.save();
      ctx.translate(chassisPivotX, chassisPivotY);
      ctx.rotate(rockerAngle * 0.5);

      ctx.fillStyle = 'rgba(11, 61, 145, 0.85)';
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.fillRect(-65, -35, 130, 25);
      ctx.strokeRect(-65, -35, 130, 25);

      // Solar panel on top
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-60, -42, 120, 6);
      ctx.strokeStyle = '#60a5fa';
      ctx.strokeRect(-60, -42, 120, 6);

      // APXS sensor mast
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(50, -35);
      ctx.lineTo(60, -55);
      ctx.stroke();
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(60, -55, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Orbitron';
      ctx.fillText('SOJOURNER', -38, -19);
      ctx.restore();

      // Draw 3 Wheels
      const drawWheel = (wx, wy) => {
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(wx, wy, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hub
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(wx, wy, 4, 0, Math.PI * 2);
        ctx.fill();
      };

      drawWheel(rearX, rearY);
      drawWheel(midX, midY);
      drawWheel(frontX, frontY);
    };

    slider.addEventListener('input', (e) => {
      const rockH = parseFloat(e.target.value);
      draw(rockH);
    });

    draw(parseFloat(slider.value));
  }

  // -------------------------------------------------------------
  // 5. INTERACTIVE VOYAGER GOLDEN RECORD DECODER
  // -------------------------------------------------------------
  initGoldenRecordDecoder() {
    const hotspots = document.querySelectorAll('.record-hotspot');
    const infoTitle = document.getElementById('record-info-title');
    const infoDesc = document.getElementById('record-info-desc');
    if (!hotspots.length || !infoTitle || !infoDesc) return;

    const dataMap = {
      'hydrogen': {
        title: 'Fundamental Hydrogen Time & Distance Unit',
        desc: 'At the bottom right is a drawing of the neutral hydrogen atom in its two lowest states. The transition between these states emits radio waves with a period of 0.704 nanoseconds and wavelength of 21 centimeters—the universal galactic metric system!'
      },
      'pulsar': {
        title: 'Galactic Pulsar Coordinates (Earth Address)',
        desc: '14 lines radiating from a central point represent 14 cosmic pulsars. The binary markings on each line indicate their exact spin periods, allowing any extraterrestrial astronomer in the Milky Way to triangulate the exact location of our Sun and the date of launch.'
      },
      'stylus': {
        title: 'Playback Speed & Needle Instructions',
        desc: 'The upper left circle represents the phonograph record with the included playing stylus. Binary numbers around the rim specify the correct playback rotation speed: 16-2/3 revolutions per minute.'
      },
      'waveforms': {
        title: 'Image Waveform Scan Signals',
        desc: 'The drawing shows how visual images are encoded in the grooves as analog audio scan lines (512 lines per frame), allowing alien scientists to hook the record to an oscilloscope and view pictures of humanity and nature.'
      }
    };

    hotspots.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.audio) this.audio.playChirp();
        hotspots.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.hotspot;
        const entry = dataMap[key] || dataMap['hydrogen'];
        infoTitle.textContent = entry.title;
        infoDesc.textContent = entry.desc;
      });
    });
  }

  // -------------------------------------------------------------
  // SPACECRAFT COMPARATIVE MATRIX & GRAVITY PHYSICS ENGINE (Phase 7)
  // -------------------------------------------------------------
  initComparisonMatrix() {
    const selectA = document.getElementById('compare-craft-a');
    const selectB = document.getElementById('compare-craft-b');
    const display = document.getElementById('compare-matrix-display');
    if (!selectA || !selectB || !display) return;

    const renderMatrix = () => {
      const idA = selectA.value;
      const idB = selectB.value;
      const craftA = this.missions.find(m => m.id === idA) || this.missions[0];
      const craftB = this.missions.find(m => m.id === idB) || this.missions[1];
      if (!craftA || !craftB) return;

      display.innerHTML = [craftA, craftB].map((craft, idx) => {
        let gravityFactor = 1.0;
        let gravityLabel = 'Earth Weight (1.00 g)';
        if (craft.destinationSlug === 'moon') {
          gravityFactor = 0.166;
          gravityLabel = 'Weight on Lunar Surface (0.166 g)';
        } else if (craft.destinationSlug === 'mars') {
          gravityFactor = 0.379;
          gravityLabel = 'Weight on Martian Surface (0.379 g)';
        } else {
          gravityFactor = 0.00001;
          gravityLabel = 'Weight in Interstellar Void (~0 g)';
        }

        let earthMassKg = 0;
        if (craft.id === 'apollo-11-lm-descent') earthMassKg = 2134;
        else if (craft.id === 'apollo-lrv') earthMassKg = 210;
        else if (craft.id === 'viking-1-lander') earthMassKg = 572;
        else if (craft.id === 'sojourner-rover') earthMassKg = 11.5;
        else if (craft.id === 'mars-pathfinder-lander') earthMassKg = 360;
        else if (craft.id === 'voyager-1') earthMassKg = 773;

        const alienWeightKg = (earthMassKg * gravityFactor).toFixed(1);
        const alienWeightLbs = (alienWeightKg * 2.20462).toFixed(1);
        const earthLbs = (earthMassKg * 2.20462).toFixed(1);

        const accentColor = idx === 0 ? 'var(--cyan-glow)' : 'var(--solar-gold)';
        const borderColor = idx === 0 ? 'rgba(0, 229, 255, 0.35)' : 'rgba(251, 191, 36, 0.35)';

        return `
          <div class="glass-hud" style="padding: 1.25rem; border-color: ${borderColor}; border-radius: var(--border-radius-sm);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <span class="telemetry-tag" style="color: ${accentColor}; border-color: ${borderColor};">
                  ${craft.destinationIcon} ${craft.destination.toUpperCase()}
                </span>
                <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #fff; margin-top: 0.35rem;">
                  ${craft.name}
                </h4>
              </div>
              <span class="status-pill ${craft.status === 'Still Travelling' ? 'travelling' : craft.status.toLowerCase()}">
                ${craft.status}
              </span>
            </div>

            <!-- Physics: Alien Gravity Weight Callout -->
            <div style="background: rgba(0,0,0,0.45); padding: 0.75rem 1rem; border-radius: var(--border-radius-sm); border-left: 3px solid ${accentColor}; margin-bottom: 1rem;">
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;">
                ${gravityLabel}
              </div>
              <div style="font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: #fff; margin-top: 0.2rem;">
                ${alienWeightKg} kg <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">(${alienWeightLbs} lbs)</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.25rem;">
                Earth Launch Mass: ${earthMassKg} kg (${earthLbs} lbs)
              </div>
            </div>

            <!-- Specs Grid -->
            <div style="font-size: 0.82rem; line-height: 1.6; display: grid; gap: 0.4rem; margin-bottom: 1rem;">
              <div><strong style="color: var(--text-muted);">Mission Year:</strong> <span style="color: #fff;">${craft.missionYear} (${craft.missionName})</span></div>
              <div><strong style="color: var(--text-muted);">Operating Lifetime:</strong> <span style="color: #fff;">${craft.studentQandA?.isItStillWorking ? craft.studentQandA.isItStillWorking.split('.')[0] : craft.status}</span></div>
              <div><strong style="color: var(--text-muted);">Current Location:</strong> <span style="color: var(--cyan-glow); font-family: var(--font-mono); font-size: 0.75rem;">${craft.landingSite || craft.currentLocation}</span></div>
            </div>

            <button class="btn-primary compare-inspect-btn" data-id="${craft.id}" style="width: 100%; padding: 0.5rem; font-size: 0.78rem;">
              <span>🔬 Inspect in 3D Spacecraft Viewer ❯</span>
            </button>
          </div>
        `;
      }).join('');

      display.querySelectorAll('.compare-inspect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (this.onOpenArtifact) this.onOpenArtifact(id);
        });
      });
    };

    selectA.addEventListener('change', () => {
      if (this.audio) this.audio.playChirp();
      renderMatrix();
    });

    selectB.addEventListener('change', () => {
      if (this.audio) this.audio.playChirp();
      renderMatrix();
    });

    renderMatrix();
  }
}
