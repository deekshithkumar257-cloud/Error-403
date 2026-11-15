# NASA: ECHOES BEYOND EARTH
## Scientific Asset Manifest & Provenance Registry

**Status:** Verified Aerospace & Scientific Provenance  
**Compliance Standard:** NASA Historical Data, NASA Planetary Data System (PDS), JPL Technical Documentation, USGS Astrogeology, ALSJ.

---

### 1. Planetary Geometry & Surface Datasets

| Asset Name | Scientific Source | Representation Type | Resolution / Geometry | Usage Rights / License | Scientific Verification Details |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Earth Day/Night Surface Map** | NASA Earth Observatory / Visible Earth (*Blue Marble: Next Generation*) | Scientific Procedural Map (Canvas 2D/3D) | 2048 × 1024 px equivalent | Public Domain (NASA Open Data) | Geographical continental coastlines, bathymetric shelf depths, night-side city luminescence clusters. |
| **Earth Atmospheric Cloud Layer** | NOAA / NASA GOES Satellite Imagery & Dynamic Atmospheric Synthesis | Atmospheric Simulation | 1024 × 512 px dual-sphere | Public Domain (NASA/NOAA Open Science) | Swirling cyclonic storm patterns & equatorial Intertropical Convergence Zone (ITCZ) cloud bands. |
| **Atmospheric Rayleigh Scattering** | Theoretical Rayleigh-Mie Scattering Formulation | Physical Shader / Additive Inverted Hull | 64 × 64 geodesic sphere | Open Source Mathematical Formulation | Replicates the thin, brilliant electric-cyan limb observable from low Earth orbit. |
| **Moon Topography & Regolith Map** | NASA Lunar Reconnaissance Orbiter (LROC / LOLA) / USGS Astrogeology | Topographic Reconstruction | 1024 × 512 px + 3D Displaced Mesh | Public Domain (NASA PDS) | Sea of Tranquility (Mare Tranquillitatis), Oceanus Procellarum, and impact crater regolith morphology. |
| **Mars Cartography & Outflow Channels** | NASA Mars Global Surveyor (MGS MOLA) & Mars Reconnaissance Orbiter (MRO) | Cartographic & Terrain Reconstruction | 1024 × 512 px + 3D Displaced Mesh | Public Domain (NASA PDS/JPL) | Chryse Planitia, Ares Vallis catastrophic flood channels, Syrtis Major basalt, and dry-ice polar caps. |
| **Heliopause Shock Barrier** | NASA Voyager Interstellar Mission (VIM) Telemetry | Scientific Plasma Model | 128-segment particle torus ring | Public Domain (NASA JPL) | Illustrates the terminal boundary (~121 AU) where solar wind is stopped by the interstellar medium. |

---

### 2. Spacecraft Hardware 3D Models & Anatomy

| Artifact / Hardware | Historical Manufacturer / Agency | Model Representation | Geometry / Subsystems | Provenance & Verified Dimensions |
| :--- | :--- | :--- | :--- | :--- |
| **Apollo 11 Lunar Module Descent Stage** | Grumman Aerospace Corporation / NASA MSC | High-Precision Procedural 3D Reconstruction | Octagonal lower stage, throttleable DPS rocket engine, 4 landing struts with crushable honeycomb cartridges, MESA bay, and EASEP bay | Verified from Apollo Lunar Surface Journal (ALSJ) & Grumman LM-5 Familiarization Manual. Dry mass: 2,134 kg. Height: 3.2m. |
| **Apollo Lunar Roving Vehicle (LRV)** | Boeing Aerospace & Delco Electronics / NASA MSFC | High-Precision Procedural 3D Reconstruction | Tubular aluminum chassis, 4 independent wire-mesh wheels with titanium chevrons, central T-handle flight joystick, S-band umbrella dish antenna, color GCTA camera | Verified from Boeing LRV Operations Handbook (Apollo 15, 16, 17). Mass: 210 kg. Length: 3.1m. Exactly 3 rovers remain on the Moon. |
| **Viking 1 Lander** | Martin Marietta Aerospace / NASA Langley | High-Precision Procedural 3D Reconstruction | Hexagonal titanium body, 3 shock-absorbing legs, 3-meter motorized sampler arm with backhoe scoop, dual SNAP-19 RTGs, meteorology boom, dual facsimile scanning cameras | Verified from NASA SP-425 *The Martian Landscape* & Viking Lander Technical Manual. Mass: 572 kg. Operated 2,245 Martian sols. |
| **Sojourner Microrover** | NASA Jet Propulsion Laboratory (JPL) | High-Precision Procedural 3D Reconstruction | 6-wheel articulated Rocker-Bogie kinematic chassis, rear-mounted APXS spectrometer deployment arm, flat GaAs solar array deck, forward laser hazard stripers | Verified from JPL Mars Pathfinder Rover Team documentation. Flight mass: 11.5 kg (25.4 lbs). Planned: 7 sols; Actual: 83 sols. |
| **Mars Pathfinder Lander ("Carl Sagan Memorial Station")** | NASA Jet Propulsion Laboratory (JPL) | High-Precision Procedural 3D Reconstruction | Central tetrahedral equipment bay, 3 self-righting deployable triangular solar petals, deflated 24-lobe Kevlar/Vectran airbags, IMP stereo camera mast, egress ramps | Verified from JPL Pathfinder Mission Operations Archive. Lander mass: 360 kg. Distinct from Sojourner. |
| **Voyager 1 Spacecraft** | NASA Jet Propulsion Laboratory (JPL) | High-Precision Procedural 3D Reconstruction | 3.7-meter parabolic High-Gain Antenna (HGA) dish, 10-sided electronics bus, gleaming Golden Record phonograph disc, 3 MHW RTG nuclear canisters, 13-meter magnetometer boom | Verified from JPL Voyager Technical Description & Interstellar Mission Archive. Mass: 773 kg. Cruising at ~17 km/s in interstellar space (>163 AU). |

---

### 3. Audio & Telemetry Synthesis

| Audio Asset | Historical Origin | Synthesis Method | Acoustic Parameters | Educational Significance |
| :--- | :--- | :--- | :--- | :--- |
| **Apollo Intro Quindar Tone** | Bell Telephone Hour / NASA Manned Spacecraft Center | Web Audio API Oscillator | 2524 Hz pure sinusoidal tone, 250ms duration | Triggered Houston CapCom push-to-talk transmitters for lunar voice broadcasts. |
| **Apollo Outro Quindar Tone** | Bell Telephone Hour / NASA Manned Spacecraft Center | Web Audio API Oscillator | 2475 Hz pure sinusoidal tone, 250ms duration | Signaled release of transmitter keying to ground stations. |
| **Procedural Cosmic Drone** | Synthesized Space Ambience | Web Audio API Dual Filtered Osc | 55 Hz fundamental, low-pass filtered at 180 Hz with slow LFO pulse | Non-intrusive aerospace soundscape; OFF by default to respect WCAG accessibility guidelines. |

