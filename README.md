# NASA: ECHOES BEYOND EARTH
> **Tagline:** *The forgotten machines that changed our understanding of space.*

An interactive, educational space science web application that introduces school students (aged 10–18) and casual space enthusiasts to the legendary NASA hardware resting permanently on the Moon, Mars, and in deep space.

---

## 🌌 Project Overview
When humans leave Earth, the machines stay behind. From the golden legs of the Apollo 11 Lunar Module to the tiny microwave-sized wheels of Sojourner and the solitary interstellar voyage of Voyager 1, these robotic sentinels continue to hold silent vigil across the cosmos.

**NASA: Echoes Beyond Earth** brings these artifacts to life through verified NASA mission science, interactive 3D celestial visualizations, educational first-person storytelling, a chronological mission timeline, and a space cadet certification quiz.

---

## 🚀 Key Features

### 1. Cinematic 3D Earth Hero & ParticleText
- **React Bits ParticleText Integration:** Main title `ECHOES BEYOND EARTH` rendered as an interactive particle canvas featuring intro gathering (`gather`), motion-reactive cyan highlight blending (`highlightMode: 'motion'`), pointer repulsion (`pointerRepel`), radial click shockwave burst (`clickBurst`), and subtle harmonic idle drift (`idleDrift`).
- **Real-time Procedural 3D Earth:** High-resolution procedural canvas surface texture displaying continents, ocean bathymetry, mountain snow ranges, arid desert belts, and night-side glowing civilization lights.
- **Dual-Sphere Atmosphere:** Independent swirling atmospheric cloud layer + Rayleigh atmospheric rim glow sphere creating an authentic cyan-blue electric halo.
- **Orbiting 3D Moon:** Cratered lunar companion in synchronous orbital motion.
- **Interactive Drag & Scroll Physics:** Drag to rotate Earth with momentum damping; scrolling smoothly glides Earth downward and recedes into deep space.

### 2. Solar System Museum – Interactive 3D Space Simulator
- **Real-time 3D Space Scene in Three.js:**
  - **The Sun (0 AU):** Glowing sphere with solar point light casting planetary shadows and coronal prominence.
  - **Planetary Orbits:** Earth-Moon system, Mars with thin atmosphere, an Asteroid Belt particle dust ring, and the Heliopause shock wave.
  - **Voyager 1 Model:** Cruising at the heliopause with golden Cassegrain dish antenna, Golden Record disc, and RTG booms.
- **Interactive Raycasting & Camera Fly-To:** Click any planet or tab (`Moon`, `Mars`, `Deep Space`, `Sun & Earth`) to fly the camera into that destination.
- **Grand Tour Autopilot (`🚀 Grand Tour`):** One-click automated cinematic flight tour for presentations and hackathons, gliding sequentially through the Sun, Moon, Mars, Deep Space, and returning to the cosmic Heliopause vista.
- **Mode Switcher:** Seamlessly toggle between **3D Space View** (`🌐 3D`) and **2D Orbital Map** (`🗺️ 2D`).

### 3. Destination Explorer & 3D Surface Explorer
Explore three distinct celestial domains:
- **The Moon (Luna):** 1.62 m/s² gravity, airless exosphere, site of Tranquility Base and Taurus-Littrow.
- **Mars (The Red Planet):** 3.72 m/s² gravity, thin CO₂ atmosphere, site of ancient catastrophic floods and robotic pioneers.
- **Deep Space (The Interstellar Void):** ~3 Kelvin cosmic background, beyond the heliopause at 24+ billion kilometers.
- **Three Viewport Modes:**
  1. `[ 🌐 3D Globe ]`: Draggable 3D celestial sphere.
  2. `[ 🪐 3D Surface ]`: Interactive 3D planetary terrain with realistic regolith, craters, boulders, and situated NASA hardware models with clickable beacons!
  3. `[ 🗺️ Landing Map ]`: Cartographic landing site coordinate map.
- **Dynamic ParticleText Heading Transitions:** Destination headings (`MOON`, `MARS`, `DEEP SPACE`) dynamically morph across selections with distinct destination-specific palettes:
  - *Moon:* `#EAF4FF` base with `#69BFFF` cyan highlight.
  - *Mars:* `#FFE4D6` base with `#FF6E40` rust-orange highlight.
  - *Deep Space:* `#E0E7FF` base with `#818CF8` interstellar-indigo highlight.
- **Surface Landing Site Navigator:**
  - *Moon:* Switch seamlessly between **Mare Tranquillitatis** (Apollo 11 foot-exploration site, 0.674° N, 23.473° E) and **Hadley-Apennine** (Apollo 15 first lunar rover site, 26.132° N, 3.634° E).
  - *Mars:* Switch between **Chryse Planitia** (Viking 1 Lander, 22.27° N, 47.95° W) and **Ares Vallis** (Mars Pathfinder & Sojourner, 19.13° N, 33.22° W — accurately positioned ~830 km southeast across the red planet).
  - *Deep Space:* Switch between **Voyager 1 Spacecraft Close-Up** (Golden Record, RTG, booms) and the **Heliopause Cosmic Void** (>121 AU).

### 4. Advanced 3D Spacecraft Hardware Viewer & Anatomy
Integrated into the Artifact Explorer detail modal via a dedicated sub-tab:
`[ 📋 6 Educational Questions & Flight Specs ]`  `[ 🔬 Interactive 3D Spacecraft & Anatomy ]`
- **3D Hardware Reconstructions:**
  1. **Apollo 11 LM Descent Stage:** Octagonal body wrapped in Kapton gold foil, DPS rocket engine, 4 honeycomb landing struts with circular footpads, MESA TV bay, and EASEP retroreflector bay.
  2. **Apollo Lunar Roving Vehicle:** Aluminum frame chassis, twin seats, central flight joystick, wire-mesh wheels, parabolic S-band dish antenna, and color TV camera.
  3. **Viking 1 Lander:** Hexagonal titanium body, 3 landing struts, 3-meter surface sampler arm, dual SNAP-19 RTGs, and meteorology boom.
  4. **Sojourner Rover:** 6-wheel Rocker-Bogie kinematic chassis, rear APXS spectrometer, GaAs solar array deck, and front laser stripers.
  5. **Mars Pathfinder Lander:** Tetrahedral lander body with 3 unfolded solar petals, deflated Kevlar airbags, and IMP camera mast.
  6. **Voyager 1 Spacecraft:** 3.7m Cassegrain parabolic dish, central 10-sided bus, gleaming Golden Record disc, RTG canisters, and 13m magnetometer boom.
- **Viewer Controls:** 360° mouse drag rotation, zoom, `⟳ Auto-Rotate`, and `⟲ Reset View`.
- **Hotspot Anatomy:** Clicking any component highlights it, pans the camera, and displays subsystem tags, aerospace materials, and engineering descriptions from `blueprints.json`.

### 5. Story Mode ("Voices from Space")
- Deeply moving, educational first-person narratives told from the perspective of the machines themselves.
- **Text-to-Speech Integration:** Built-in voice narration utilizing the standard Web Speech API with CapCom radio tone pacing.
- **NASA Quindar Tone Simulation:** Procedural Web Audio synthesizer replicating authentic Apollo telemetry beeps (2524 Hz / 2475 Hz pure tones).
- **Direct 3D Jump:** Completion screen links directly into the 3D Spacecraft Viewer.

### 6. Mission Timeline (1969 – Present)
- Chronological timeline tracking milestone missions from Apollo 11 to interstellar space.
- Direct links on each milestone to open the 3D Spacecraft Hardware Viewer.

### 7. Science Discoveries Lab & Physics Engine
- **Interactive Student Mini-Labs:**
  - *Spacecraft Comparative Matrix & Alien Gravity Physics:* Compare any two NASA machines side-by-side ($W = m \cdot g$ weight on Moon/Mars gravity vs Earth mass).
  - *Lunar Laser Drift Calculator:* Calculates the exact distance the Moon has drifted since any year.
  - *Deep Space Radio Ping Calculator:* Calculates speed-of-light radio delay to the Moon, Mars, and Voyager 1.
  - *Live Voyager 1 Odometer:* Real-time distance and RTG power decay tracker.
  - *Rocker-Bogie Suspension Simulator:* Real-time physics canvas simulating obstacle climbing.
  - *Golden Record Message Decoder:* Interactive diagram explaining the pulsar map and hydrogen clock.

### 8. Cosmic Challenge (Test Your Space Knowledge)
- **15-Question Interactive Quiz:** Covering all six artifacts with 10 pts per question (150 max).
- Immediate feedback, NASA archive citations, and printable Space Cadet Certificate.

### 9. Progressive Web App (PWA) Offline Support
- Includes `manifest.json` and `sw.js` (Service Worker) for standalone desktop/tablet installation during science fairs and offline events.

---

## 🛠️ Architecture & Tech Stack

```
Echoes Beyond Earth/
├── index.html                   # Semantic HTML5 Single-Page Application
├── launch.bat                   # Ready-to-use Windows batch launcher (Python / Node / offline)
├── start_server.bat             # Dedicated local server launcher
├── README.md                    # Project documentation
├── data/                        # Mission datasets (JSON)
│   ├── missions.json            # 6 NASA artifacts with verified telemetry & 6 student Q&A
│   ├── stories.json             # 6 first-person stories with 6 chapters each & disclaimers
│   ├── timeline.json            # 1969–2012 chronological mission milestones
│   ├── quiz.json                # 15 questions, 4 options, explanations & NASA links
│   └── discoveries.json         # Scientific principles & formulas explained
├── css/
│   ├── main.css                 # Typography, CSS reset, layout, responsive rules
│   ├── glassmorphism.css        # NASA glassmorphic HUD, frosted panels, cyan glow
│   ├── components.css           # Modular component styling (cards, tables, buttons)
│   └── animations.css           # Keyframes (pulse, float, radar blink, CRT scanlines)
├── js/
│   ├── app.js                   # Application coordinator & routing
│   ├── data/
│   │   ├── destinations.json    # Planetary environmental parameters
│   │   ├── discoveries.json     # Scientific principles explained
│   │   ├── quiz.json            # Synchronized 15-question quiz data
│   │   └── fallbackData.js      # Bundled fallback for 100% offline file:// compatibility
│   └── modules/
│       ├── audioEngine.js       # Web Audio API synthesizers & Web Speech API narrator
│       ├── celestialScene.js    # Three.js 3D space scene & rotating destination globe / landing map
│       ├── artifactExplorer.js  # Filterable grid, telemetry cards, 6-question educational modal
│       ├── storyMode.js         # CRT terminal narrator & voice synthesizer (6 chapters)
│       ├── timeline.js          # Interactive chronological mission rail & milestone viewer
│       ├── scienceMode.js       # Interactive calculators & science lab simulations
│       └── quizEngine.js        # 15-question quiz engine with scoring & flight certificate
│       ├── timeline.js          # Interactive chronological mission line
│       ├── scienceMode.js       # Science cards & interactive student calculators
│       └── quizEngine.js        # Interactive quiz engine & certificate generator
└── assets/
    ├── images/                  # NASA archival imagery
    └── icons/                   # Mission badges and UI icons
```

---

## 🛰️ Running the Project

### Option 1: Double-Click Launcher (Windows Ready)
- Double-click **`launch.bat`** in the project root directory.
  - Automatically detects Python or Node.js to spin up a local HTTP server at `http://localhost:8080` and opens it in your default browser.
  - If neither is found, it safely launches `index.html` with the offline data bundle.
- Alternatively, double-click **`start_server.bat`** for a persistent background server.

### Option 2: Any Command-Line Static Server
```bash
# Using Python
python -m http.server 8080

# Or using Node.js
npx serve .
```
Then open `http://localhost:8080` in your web browser.

### Option 3: Direct File Open
The application is engineered with an integrated data fallback (`js/data/fallbackData.js`), allowing you to double-click `index.html` directly in any modern browser without needing a backend server or command line.

---

## 🏆 Suggested Hackathon Demo Sequence (5 Minutes)

1. **The Grand Introduction (0:00 - 0:45):**
   - Start on the **Homepage Hero**. Highlight the cinematic starfield, project tagline, and mission statistics strip.
   - Point out the **"Why These Forgotten Machines Matter"** pillars (Science, Engineering, Human Legacy).
2. **Solar System Museum (0:45 - 1:45):**
   - Click **"Explore the Museum 🌌"** to glide to Section 2.
   - Interact with the 2D orbital canvas: drag to pan, scroll to zoom, hover over the Moon, Mars, and Deep Space.
   - Click **The Moon** to see the spotlight card for the Apollo 11 Descent Stage and Lunar Rover with verified coordinates (Tranquility Base).
   - Click **Deep Space** to demonstrate the distinction between fixed landers and Voyager 1 actively cruising through interstellar space.
3. **Artifact Explorer & Educational Modal (1:45 - 2:45):**
   - Jump to **Artifact Explorer**. Filter by `🌕 Moon`, `🔴 Mars`, and `🌌 Deep Space`.
   - Click on the **Sojourner Rover** card to open the educational modal.
   - Show how all **6 student questions** are clearly answered (*What is this machine? Why did NASA send it? What did scientists discover?*).
   - Click the verified NASA source link button to demonstrate real JPL archive validation.
4. **Mission Story Mode ("Voices from Space") (2:45 - 3:30):**
   - Click **"Story Log 📖"** to transition to **Mission Story Mode**.
   - Select **Voyager 1** or **Apollo 11 Eagle**.
   - Click **"Read Story Log"** and demonstrate the chapter-by-chapter progression with the mission progress bar and synthesized audio narration.
   - Point out the prominent **Creative Narration & NASA Verification Disclaimer**.
5. **Interactive Science Lab & Cosmic Challenge Quiz (3:30 - 4:45):**
   - Scroll down to the **Science Lab**: test the **Rocker-Bogie simulator** by sliding the boulder height, or ping Voyager 1 with the **Speed-of-Light delay calculator**.
   - Move to the **Cosmic Challenge Quiz**: answer a question to show immediate explanatory feedback (+10 points) and print the official Space Cadet certificate.
6. **Accessibility & Controls Demo (4:45 - 5:00):**
   - Press `?` on the keyboard (or click the `♿ A11Y` button) to show the accessibility drawer.
   - Toggle **High Contrast Mode** and cycle **Text Size** to demonstrate inclusive design for all students.

---

## 🔬 Scientific & Historical Verification
All hardware specifications, landing coordinates, and mission data have been verified against official NASA sources:
- **NASA Planetary Data System (PDS)**
- **NASA JPL Mission Archives** (Viking, Mars Pathfinder, Voyager)
- **NASA Apollo Lunar Surface Journals (ALSJ)**
- **NASA Earth and Planetary Science Division**

*Disclaimer: Creative narrative logs in Story Mode are educational dramatizations clearly labeled and inspired by actual mission communication transcripts.*

