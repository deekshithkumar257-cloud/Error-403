export const FALLBACK_DATA = {
  "blueprints": [
  {
    "id": "apollo-11-lm-descent",
    "name": "Apollo 11 Lunar Module Descent Stage",
    "callsign": "Eagle (LM-5)",
    "blueprintTitle": "LUNAR MODULE DESCENT STAGE // QUADRANT & PROPULSION ANATOMY",
    "blueprintType": "Lunar Lander Lower Stage",
    "schematicSvg": "lunar-module",
    "components": [
      {
        "id": "dps-engine",
        "name": "Descent Propulsion System (DPS)",
        "tag": "PROPULSION // THROTTLEABLE",
        "description": "A pioneering throttleable rocket engine delivering 4,400 N to 43,900 N of thrust using hypergolic propellants (Aerozine-50 and Nitrogen Tetroxide). Enabled Neil Armstrong to manually hover and navigate past boulders in West Crater.",
        "materials": "Niobium-alloy nozzle extension, titanium propellant tanks",
        "x": 50,
        "y": 72
      },
      {
        "id": "landing-gear",
        "name": "Crushable Honeycomb Landing Struts",
        "tag": "LANDING GEAR // SHOCK ABSORPTION",
        "description": "Four cantilevered landing legs with aluminum honeycomb cartridges designed to compress on impact, absorbing landing shock. Footpads were 94 cm in diameter to prevent sinking into lunar dust.",
        "materials": "Aluminized Mylar thermal wrap, crushable aluminum honeycomb",
        "x": 18,
        "y": 82
      },
      {
        "id": "lunar-probe",
        "name": "Lunar Surface Sensing Probes",
        "tag": "SENSORS // CONTACT PROBES",
        "description": "Three 1.7-meter flexible probe wires extending below the footpads. When they touched the lunar regolith, they triggered the blue 'LUNAR CONTACT' light on the control panel, instructing the commander to shut off the engine.",
        "materials": "Tempered spring steel",
        "x": 82,
        "y": 92
      },
      {
        "id": "mesa-bay",
        "name": "Modular Equipment Stowage Assembly (MESA)",
        "tag": "PAYLOAD // TV BROADCAST",
        "description": "Located in Quadrant IV, this hinged pallet dropped down when Armstrong pulled a lanyard on the porch. It housed the Westinghouse black-and-white TV camera that broadcast his first steps to 650 million viewers on Earth.",
        "materials": "Structural magnesium and thermal blankets",
        "x": 74,
        "y": 42
      },
      {
        "id": "thermal-blankets",
        "name": "Multi-Layer Kapton & Mylar Foil Blankets",
        "tag": "THERMAL CONTROL // RADIATION SHIELDING",
        "description": "Up to 25 layers of aluminized Mylar and amber Kapton film. Designed to reflect intense solar radiation (up to +120°C in sunlight) and retain internal heat during lunar shadow (-130°C).",
        "materials": "Gold Kapton, aluminized Mylar, Inconel foil",
        "x": 32,
        "y": 38
      },
      {
        "id": "easep-bay",
        "name": "EASEP Scientific Experiment Bay",
        "tag": "SCIENCE EXPERIMENTS // RETROREFLECTOR",
        "description": "Quadrant II housed the Early Apollo Surface Experiments Package: the Laser Ranging Retroreflector (LRRR) that scientists still ping today and the Passive Seismic Experiment Package (PSEP).",
        "materials": "Fused silica corner-cube prisms in aluminum housing",
        "x": 62,
        "y": 28
      }
    ]
  },
  {
    "id": "apollo-lrv",
    "name": "Apollo Lunar Roving Vehicle",
    "callsign": "LRV (Moon Buggy)",
    "blueprintTitle": "LUNAR ROVING VEHICLE // CHASSIS, TRACTION & AVIONICS",
    "blueprintType": "Electric Surface Exploration Vehicle",
    "schematicSvg": "lunar-rover",
    "components": [
      {
        "id": "wire-mesh-wheels",
        "name": "Woven Wire Mesh Tires",
        "tag": "MOBILITY // TRACTION",
        "description": "Because rubber tires would burst or freeze in the lunar vacuum, the wheels were crafted from zinc-coated steel piano wire with titanium chevron treads riveted to the exterior for traction in powdery regolith.",
        "materials": "0.84 mm zinc-coated steel wire, titanium chevrons",
        "x": 22,
        "y": 76
      },
      {
        "id": "t-handle-steering",
        "name": "T-Handle Flight Controller",
        "tag": "CREW AVIONICS // FLY-BY-WIRE",
        "description": "Instead of a steering wheel or pedals, the rover was driven with a single T-shaped joystick between the seats. Tilting forward accelerated, pulling back applied mechanical brakes, and tilting left/right commanded 4-wheel steering.",
        "materials": "Machined aluminum with glove-grip contours",
        "x": 52,
        "y": 36
      },
      {
        "id": "high-gain-antenna",
        "name": "High-Gain Umbrella Dish Antenna",
        "tag": "COMMUNICATIONS // LIVE S-BAND",
        "description": "A collapsible 0.9-meter wire-mesh parabolic reflector. Astronauts aimed it directly at Earth using an optical sight to send back real-time color television and biomedical telemetry.",
        "materials": "Gold-plated molybdenum wire mesh",
        "x": 38,
        "y": 22
      },
      {
        "id": "silver-zinc-batteries",
        "name": "Dual 36-Volt Silver-Zinc Batteries",
        "tag": "ELECTRICAL POWER // STORAGE",
        "description": "Two 36-volt non-rechargeable silver-zinc potassium hydroxide batteries located in the forward chassis. They powered four independent 0.25-horsepower traction motors located inside each wheel hub.",
        "materials": "Silver-zinc alkaline cells (121 Ah capacity)",
        "x": 78,
        "y": 58
      },
      {
        "id": "color-tv-camera",
        "name": "Ground-Controlled Color TV Assembly (GCTA)",
        "tag": "BROADCAST // REMOTE SURVEILLANCE",
        "description": "Mounted on the forward deck, this color television camera was operated remotely by Ed Fendell at Mission Control in Houston. It tracked astronaut EVAs and captured the famous Apollo 17 lunar module liftoff.",
        "materials": "Vidicon tube with motorized zoom, pan, and tilt gimbal",
        "x": 68,
        "y": 30
      }
    ]
  },
  {
    "id": "viking-1-lander",
    "name": "Viking 1 Lander",
    "callsign": "Viking Lander 1",
    "blueprintTitle": "VIKING 1 LANDER // BIOLOGY SUITE & METEOROLOGY SCHEMATIC",
    "blueprintType": "Automated Martian Surface Station",
    "schematicSvg": "viking-lander",
    "components": [
      {
        "id": "gcms-biology",
        "name": "Automated Biology Experiment Suite (GCMS)",
        "tag": "ASTROBIOLOGY // MICRO-LAB",
        "description": "A 0.03 m³ biological mini-laboratory housing three biology experiments (Pyrolytic Release, Labeled Release, Gas Exchange) and a Gas Chromatograph Mass Spectrometer that baked soil samples to test for organic molecules.",
        "materials": "Titanium ovens, radioactive carbon-14 tracers, krypton valves",
        "x": 48,
        "y": 46
      },
      {
        "id": "surface-sampler",
        "name": "Surface Sampler Collector Arm",
        "tag": "SAMPLING // 3-METER BOOM",
        "description": "A motorized 3-meter boom that extended like a steel tape measure. It featured a backhoe collector scoop, temperature sensor, and vibrator sieve to dig trenches and deliver soil into the onboard analytical ovens.",
        "materials": "Beryllium-copper alloy retractable tube, stainless steel scoop",
        "x": 84,
        "y": 62
      },
      {
        "id": "snap-19-rtgs",
        "name": "Dual SNAP-19 Radioisotope Generators (RTG)",
        "tag": "NUCLEAR POWER // THERMOELECTRIC",
        "description": "Two SNAP-19 RTGs encased in beryllium heat shields. Powered by the radioactive decay of Plutonium-238, they supplied 57 watts of continuous electrical power and waste heat to survive frigid Martian nights.",
        "materials": "Plutonium-238 dioxide capsules, lead-telluride thermocouples",
        "x": 26,
        "y": 32
      },
      {
        "id": "meteorology-mast",
        "name": "Meteorology Sensor Boom",
        "tag": "ATMOSPHERIC SCIENCE // WEATHER",
        "description": "Mounted on an upright boom to avoid spacecraft engine heat, it measured Martian atmospheric temperature, wind speed, wind direction, and atmospheric pressure (averaging 7.5 millibars).",
        "materials": "Hot-film anemometer, platinum resistance thermometers",
        "x": 66,
        "y": 18
      },
      {
        "id": "facsimile-cameras",
        "name": "Dual Facsimile Panoramic Cameras",
        "tag": "IMAGING // 360-DEGREE SCANNING",
        "description": "Two nodding-mirror cameras that scanned the landscape line-by-line, capturing the first historic color images of the Martian surface, showing red sky and rusty orange rocks in Chryse Planitia.",
        "materials": "Silicon photodiode array with motorized mirror drive",
        "x": 38,
        "y": 20
      }
    ]
  },
  {
    "id": "sojourner-rover",
    "name": "Sojourner Rover",
    "callsign": "Microrover Flight Experiment (MFEX)",
    "blueprintTitle": "SOJOURNER // ROCKER-BOGIE & ALPHA X-RAY ANATOMY",
    "blueprintType": "Autonomous Robotic Microrover",
    "schematicSvg": "sojourner-rover",
    "components": [
      {
        "id": "rocker-bogie-mech",
        "name": "6-Wheel Rocker-Bogie Suspension",
        "tag": "MOBILITY // OBSTACLE CLIMBING",
        "description": "A differential rocker-bogie mechanism connecting 6 aluminum wheels without springs. Allowed the 11.5 kg rover to climb over rocks larger than its 13-cm wheels while keeping the main computer body stable.",
        "materials": "Machined titanium and aluminum chassis tubing",
        "x": 50,
        "y": 74
      },
      {
        "id": "apxs-spectrometer",
        "name": "Alpha Particle X-Ray Spectrometer (APXS)",
        "tag": "GEOLOGY // ELEMENTAL ANALYSIS",
        "description": "Mounted on a deployment arm at the rear. Pressed directly against rocks like 'Barnacle Bill' and 'Yogi' to irradiate them with Curium-244, revealing high silica volcanic andesite composition.",
        "materials": "Curium-244 radioactive source, silicon detector diode",
        "x": 86,
        "y": 52
      },
      {
        "id": "solar-deck",
        "name": "Gallium Arsenide Solar Array Deck",
        "tag": "POWER // PHOTOVOLTAIC DECK",
        "description": "A 0.22 m² flat array of high-efficiency gallium arsenide solar cells generating approximately 16 watts of peak power at Martian noon, supplemented by primary non-rechargeable lithium thionyl chloride batteries.",
        "materials": "Gallium arsenide on germanium substrate",
        "x": 48,
        "y": 28
      },
      {
        "id": "laser-stripers",
        "name": "Laser Hazard Detection Stripers",
        "tag": "AUTONOMOUS NAVIGATION // DEPTH",
        "description": "Five diode lasers projected horizontal laser stripes on the ground ahead. The forward stereo CCD cameras measured curvature in the stripes to spot drop-offs and boulders autonomously.",
        "materials": "Infrared laser diodes (820 nm wavelength)",
        "x": 16,
        "y": 42
      },
      {
        "id": "cpu-computer",
        "name": "80C85 Rad-Hard Microprocessor",
        "tag": "COMPUTING // EMBEDDED CPU",
        "description": "An 8-bit radiation-hardened Intel 80C85 processor running at 2 MHz with 512 KB RAM and 176 KB flash ROM. Managed autonomous obstacle avoidance, wheel drive motors, and communication with the Pathfinder lander.",
        "materials": "Silicon-on-sapphire radiation-hardened integrated circuit",
        "x": 46,
        "y": 48
      }
    ]
  },
  {
    "id": "mars-pathfinder-lander",
    "name": "Mars Pathfinder Lander",
    "callsign": "Carl Sagan Memorial Station",
    "blueprintTitle": "PATHFINDER LANDER // PETAL DEPLOYMENT & AIRBAG CHASSIS",
    "blueprintType": "Atmospheric Entry & Surface Base Station",
    "schematicSvg": "pathfinder-lander",
    "components": [
      {
        "id": "tetrahedral-petals",
        "name": "Triangular Self-Righting Petals",
        "tag": "MECHANICAL // DEPLOYMENT",
        "description": "Three hinged triangular solar petals surrounding a central base. High-torque electric actuators drove the petals downward with enough force to roll the landed spacecraft upright onto its base regardless of how it bounced.",
        "materials": "Graphite-epoxy composite honeycomb core",
        "x": 26,
        "y": 58
      },
      {
        "id": "airbag-assembly",
        "name": "24-Lobe Kevlar Airbag Cluster",
        "tag": "DESCENT // IMPACT CUSHION",
        "description": "Four interconnected sets of six airbags inflated with cool-gas generators 8 seconds before touchdown, allowing the lander to survive a 14 m/s impact and bounce over 15 times across the rocky terrain of Ares Vallis.",
        "materials": "Multi-layer Vectran / Kevlar fabric with abrasion covers",
        "x": 78,
        "y": 78
      },
      {
        "id": "imp-mast-camera",
        "name": "Imager for Mars Pathfinder (IMP)",
        "tag": "OPTICAL // STEREO MAST",
        "description": "Mounted atop a 80-cm pop-up mast, the IMP camera featured stereo optics separated by 14 cm (mimicking human eyes) with 12 optical filters to capture 3D multi-spectral panoramas and monitor atmospheric dust.",
        "materials": "Charge-coupled device (CCD) array with motorized filter wheel",
        "x": 52,
        "y": 18
      },
      {
        "id": "rover-egress-ramps",
        "name": "Deployable Rover Egress Ramps",
        "tag": "DEPLOYMENT // ROVER RAMP",
        "description": "Dual deployable fabric and metal ramps that unfurled over the deflated airbags, giving Sojourner a smooth incline to roll down from the lander deck onto the Martian soil.",
        "materials": "Vectran fabric with guide rails and tension springs",
        "x": 42,
        "y": 72
      }
    ]
  },
  {
    "id": "voyager-1",
    "name": "Voyager 1 Spacecraft",
    "callsign": "Voyager 1 (VGR-1)",
    "blueprintTitle": "VOYAGER 1 // INTERSTELLAR ANTENNA, RTG & GOLDEN RECORD",
    "blueprintType": "Interstellar Deep Space Probe",
    "schematicSvg": "voyager-probe",
    "components": [
      {
        "id": "high-gain-dish",
        "name": "3.7-Meter High-Gain Reflector (HGA)",
        "tag": "TELECOMMUNICATIONS // CASSEGRAIN DISH",
        "description": "A 3.7-meter parabolic aluminum dish antenna. Focuses ultra-faint 20-watt microwave signals into a narrow 0.5-degree beam directed continuously back at Earth across more than 24 billion kilometers.",
        "materials": "Graphite-epoxy honeycomb reflector with gold feed horn",
        "x": 50,
        "y": 32
      },
      {
        "id": "golden-record-case",
        "name": "Voyager Golden Record & Cover",
        "tag": "HUMAN MESSAGE // INTERSTELLAR ARTIFACT",
        "description": "A 12-inch gold-plated copper phonograph record protected by an electroplated aluminum jacket with an ultra-pure Uranium-238 radioactivity clock. Carries 115 images, greetings in 55 languages, and natural Earth sounds.",
        "materials": "Gold-plated copper disc, aluminum cover, nickel-plated stylus",
        "x": 48,
        "y": 68
      },
      {
        "id": "mhw-rtg-boom",
        "name": "3 Multihundred-Watt RTGs (Nuclear Power)",
        "tag": "ELECTRICAL POWER // PLUTONIUM-238",
        "description": "Three MHW-RTGs mounted on a deployable boom. Converting heat from Plutonium-238 decay into electricity, they originally produced 470 watts of power and still supply ~220 watts after 48+ continuous years in space.",
        "materials": "Silicon-germanium thermocouples, beryllium radiation shield",
        "x": 22,
        "y": 52
      },
      {
        "id": "mag-boom",
        "name": "13-Meter Magnetometer Boom",
        "tag": "MAGNETIC FIELDS // FIBERGLASS LATTICE",
        "description": "A 13-meter deployable triangular fiberglass boom that held high-sensitivity fluxgate magnetometers far away from the spacecraft's electrical wiring. In 2012, it detected the dramatic shift into interstellar magnetic fields.",
        "materials": "Coiled fiberglass lattice mast with triaxial fluxgate sensors",
        "x": 82,
        "y": 28
      },
      {
        "id": "plasma-wave-antennas",
        "name": "Plasma Wave Subsystem (PWS) Dipole Antennas",
        "tag": "INTERSTELLAR MEDIUM // DENSITY SENSOR",
        "description": "Two 10-meter beryllium copper antenna rods forming a V-shape. They recorded electron plasma oscillations, proving in August 2012 that electron density had spiked by a factor of 40—confirming entry into interstellar space.",
        "materials": "Spring-loaded beryllium copper tubular antennas",
        "x": 76,
        "y": 72
      }
    ]
  }
],
  "missions": [
    {
      "id": "apollo-11-lm-descent",
      "name": "Apollo 11 Lunar Module Descent Stage",
      "callsign": "Eagle (LM-5)",
      "missionName": "Apollo 11",
      "missionYear": "1969",
      "destination": "Moon",
      "destinationIcon": "🌕",
      "destinationSlug": "moon",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Lunar Surface Preserved",
      "launchDate": "July 16, 1969, 13:32:00 UTC",
      "landingDate": "July 20, 1969, 20:17:40 UTC",
      "surfaceDuration": "21 hours, 36 minutes, 20 seconds",
      "landingSite": "Mare Tranquillitatis (Sea of Tranquility)",
      "coordinates": "0.67408° N, 23.47297° E",
      "image": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~medium.jpg",
      "imageCredit": "NASA / Neil Armstrong",
      "tagline": "The golden base that caught humanity's first footsteps on another world.",
      "originalPurpose": "Powered descent from lunar orbit to the lunar surface; served as a landing gear, scientific experiment storage bay (EASEP & MESA), and stationary launch pad for the Apollo 11 Ascent Stage.",
      "keyInstruments": [
        "Descent Propulsion System (DPS) throttleable rocket engine (4,400 N to 43,900 N thrust)",
        "Laser Ranging Retroreflector (LRRR) 100-prism silica optical array",
        "Passive Seismic Experiment Package (PSEP) seismometer",
        "Solar Wind Composition (SWC) aluminum foil collector",
        "Modular Equipment Stowage Assembly (MESA) with Westinghouse B&W lunar TV camera"
      ],
      "scientificDiscoveries": "Brought the Laser Ranging Retroreflector (LRRR) that proved the Moon drifts away from Earth at 3.8 cm (1.5 inches) per year via tidal dissipation; returned 21.55 kg of basalt and breccia dating Mare Tranquillitatis to ~3.7 billion years old.",
      "missionAchievements": "First crewed landing on an extraterrestrial body; successful demonstration of manual lunar descent hovering; first direct in-situ lunar geological and seismic experiments.",
      "endOfMission": "Batteries depleted July 21, 1969; Ascent stage lifted off at 17:54:00 UTC leaving descent stage permanently at Tranquility Base.",
      "currentStatusSummary": "Inactive on lunar surface. The unpowered Laser Ranging Retroreflector (LRRR) resting nearby requires no electricity and continues to be pinged with lasers from Earth observatories today.",
      "studentQandA": {
        "whatIsThis": "It is the bottom half of the Apollo 11 Lunar Module, nicknamed 'Eagle'. It looks like a four-legged golden spider covered in shiny thermal foil, with a rocket engine bell in the center and a boarding ladder on one leg.",
        "whyDidNasaSendIt": "To safely carry two astronauts—Neil Armstrong and Buzz Aldrin—from lunar orbit down to the Moon's surface, and serve as a stable launch pad so their cockpit could fly back to Earth.",
        "whatDidItDo": "It fired its throttleable rocket engine downward to slow the spacecraft from orbital velocity down to a gentle touchdown. When the astronauts finished their historic Moonwalk and launched back into orbit, the top crew cabin lifted off, while this lower descent stage remained permanently on the Moon.",
        "whatDidScientistsDiscover": "It delivered the first lunar seismometer (moonquake detector) and the Laser Ranging Retroreflector. By firing lasers from Earth at this reflector, scientists discovered that the Moon is slowly drifting away from us by 3.8 cm (1.5 inches) every year!",
        "whereIsItNow": "It rests at Mare Tranquillitatis ('Sea of Tranquility') at exact lunar coordinates 0.67408° N, 23.47297° E, verified by NASA's Lunar Reconnaissance Orbiter.",
        "isItStillWorking": "No, its chemical batteries were depleted in July 1969. However, the mirror retroreflector resting next to its footpad needs no electricity and is still bounced with laser beams by astronomers today!"
      },
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Mission Overview & Lunar Surface Journal",
      "verifiedNasaCitation": "NASA Space Science Data Coordinated Archive (NSSDCA ID: 1969-059C) & LROC Featured Sites"
    },
    {
      "id": "apollo-lrv",
      "name": "Apollo Lunar Roving Vehicle",
      "callsign": "LRV (Moon Buggy: LRV-1, LRV-2, LRV-3)",
      "missionName": "Apollo 15, 16, & 17",
      "missionYear": "1971–1972",
      "destination": "Moon",
      "destinationIcon": "🌕",
      "destinationSlug": "moon",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Lunar Surface Preserved",
      "launchDate": "Apollo 15: July 26, 1971 | Apollo 16: April 16, 1972 | Apollo 17: Dec 7, 1972",
      "landingDate": "Apollo 15: July 30, 1971 | Apollo 16: April 21, 1972 | Apollo 17: Dec 11, 1972",
      "surfaceDuration": "Apollo 15: 66.9 hours | Apollo 16: 71.0 hours | Apollo 17: 75.0 hours",
      "landingSite": "Hadley Rille (LRV-1), Descartes Highlands (LRV-2), & Taurus-Littrow (LRV-3)",
      "coordinates": "Hadley: 26.1322° N, 3.6339° E | Descartes: 8.9730° S, 15.5002° E | Taurus: 20.1908° N, 30.7717° E",
      "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~medium.jpg",
      "imageCredit": "NASA / Eugene Cernan",
      "tagline": "The open-frame electric rovers that gave astronauts wheels on the Moon.",
      "originalPurpose": "Mobile electric surface transportation allowing Apollo 15, 16, and 17 astronauts to travel up to 7.6 km from their lander, haul hundreds of pounds of rock samples, and transmit live color TV back to Earth.",
      "keyInstruments": [
        "Four 0.25-hp independent electric wheel motors with 80:1 harmonic drive transmissions",
        "Woven zinc-coated steel wire-mesh tires with titanium chevron traction treads",
        "Central T-handle joystick controller (operable with pressurized spacesuit gloves)",
        "High-Gain umbrella-shaped parabolic S-band dish antenna (0.9-meter diameter)",
        "Ground-Controlled Television Assembly (GCTA) color camera steered remotely from Mission Control",
        "Dual 36-volt non-rechargeable silver-zinc batteries (121 Ah capacity each)"
      ],
      "scientificDiscoveries": "Enabled the discovery of the 4.1-billion-year-old 'Genesis Rock' (anorthosite sample 15415) at Hadley Rille proving the early Moon had a global magma ocean; enabled discovery of orange pyroclastic volcanic glass at Shorty Crater on Apollo 17.",
      "missionAchievements": "Traversed a total of 90.3 km (56.1 miles) across three missions; carried 280+ kg of lunar geological specimens; proved wheeled mobility on extraterrestrial regolith; beamed first live TV of lunar liftoff to Earth.",
      "endOfMission": "Parked at designated VIP sites hundreds of meters from the landers at the conclusion of EVAs (Apollo 15: Aug 2, 1971; Apollo 16: Apr 23, 1972; Apollo 17: Dec 14, 1972).",
      "currentStatusSummary": "Inactive on lunar surface. Exactly three separate rovers (LRV-1, LRV-2, LRV-3) remain parked at Hadley-Apennine, Descartes Highlands, and Taurus-Littrow. (Note: Apollo 11 did not carry a rover).",
      "studentQandA": {
        "whatIsThis": "It is an electric, four-wheeled Moon car used during the later Apollo missions (Apollo 15, 16, and 17). It had woven steel wire wheels instead of rubber tires, lawn-chair style seats, and a joystick instead of a steering wheel.",
        "whyDidNasaSendIt": "Before the rover, astronauts could only walk about 1 kilometer from their lander on foot. NASA sent the rover so astronauts could travel over 7 kilometers away, climb mountains, explore canyons, and bring back hundreds of pounds of rocks.",
        "whatDidItDo": "It drove astronauts across lunar craters, boulders, and steep hills at speeds up to 13 km/h (8 mph). It also carried a color television camera operated remotely from Houston that filmed the astronauts working and beamed back live footage.",
        "whatDidScientistsDiscover": "By driving to the edge of Hadley Rille on Apollo 15, astronauts found the 'Genesis Rock'—a 4.1-billion-year-old white rock that proved the Moon was once covered in an ocean of molten magma! On Apollo 17, it helped astronauts find orange volcanic glass beads.",
        "whereIsItNow": "All three rovers remain permanently parked on the Moon: LRV-1 is at Hadley Rille (26.13° N, 3.63° E), LRV-2 is at Descartes Highlands (8.97° S, 15.50° E), and LRV-3 is at Taurus-Littrow (20.19° N, 30.77° E).",
        "isItStillWorking": "No, their silver-zinc batteries were exhausted in 1971 and 1972. They sit silently on the Moon as historic monuments to human ingenuity."
      },
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/lrvhand.html",
      "nasaSourceLabel": "NASA Apollo Lunar Surface Journal: LRV Operations Handbook",
      "verifiedNasaCitation": "NASA NSSDCA ID: 1971-063D (LRV-1), 1972-031D (LRV-2), 1972-096D (LRV-3)"
    },
    {
      "id": "viking-1-lander",
      "name": "Viking 1 Lander",
      "callsign": "Viking Lander 1 (Thomas A. Mutch Memorial Station)",
      "missionName": "Viking 1",
      "missionYear": "1975–1976",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "August 20, 1975, 21:22:00 UTC",
      "landingDate": "July 20, 1976, 11:53:06 UTC",
      "surfaceDuration": "2,245 Martian sols (6 Earth years, 116 days)",
      "landingSite": "Chryse Planitia (Plains of Gold)",
      "coordinates": "22.48° N, 47.97° W (elevation -2.69 km)",
      "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The pioneering stationary laboratory that returned the first color photographs from Mars.",
      "originalPurpose": "First successful U.S. soft-landing on Mars to characterize Martian geology, take high-resolution panoramic images, monitor atmospheric weather, and perform automated biological experiments searching for extraterrestrial life.",
      "keyInstruments": [
        "Dual SNAP-19 Radioisotope Thermoelectric Generators (RTGs) fueled by Plutonium-238 (~57 W power)",
        "Gas Chromatograph Mass Spectrometer (GCMS) soil organic analyzer",
        "Biology Experiment Suite (Pyrolytic Release, Labeled Release, and Gas Exchange tests)",
        "3-meter retractable motorized surface sampler arm with backhoe collector scoop",
        "Meteorology sensor boom (wind speed, wind direction, atmospheric pressure, temperature)",
        "Dual facsimile scanning mirror cameras (360-degree color panoramic imaging)"
      ],
      "scientificDiscoveries": "Returned the first close-up color photographs of the Martian surface showing rusty-red iron-oxide soil and a salmon-pink sky; measured atmospheric composition (95.3% CO2, 2.7% N2, 1.6% Ar); discovered that Martian soil is chemically reactive due to powerful non-biological oxidants (superoxides/perchlorates) rather than living microbes.",
      "missionAchievements": "First successful long-duration operational mission on Mars; transmitted over 1,400 images and 2,245 sols of continuous weather logs; demonstrated interplanetary entry, parachute, and terminal thruster landing.",
      "endOfMission": "November 11, 1982: An erroneous ground software update accidentally overwrote antenna pointing instructions, breaking the radio communications link.",
      "currentStatusSummary": "Inactive on Martian surface. Rests permanently in Chryse Planitia where it touched down in July 1976.",
      "studentQandA": {
        "whatIsThis": "It is a three-legged robotic laboratory about the size of a golf cart. It landed safely on Mars in 1976 using parachutes and landing rockets, and stayed in one place to study Martian soil and weather.",
        "whyDidNasaSendIt": "To safely land on Mars for the first time in American history, take the first clear color pictures of the Martian surface, and test whether tiny living microbes existed in the soil.",
        "whatDidItDo": "It extended a long mechanical metal arm with a scoop, dug trenches in the soil, and dumped the dirt into miniature onboard ovens to bake and analyze it. It also recorded weather and wind every day for over 6 years.",
        "whatDidScientistsDiscover": "It took the first color photos showing that Mars has red soil and a pinkish sky colored by airborne dust! Its biology experiments showed exciting chemical reactions, but found NO organic carbon compounds. Scientists concluded that powerful chemical oxidants (perchlorates) caused the reaction, not living alien creatures.",
        "whereIsItNow": "It is resting on the plains of Chryse Planitia ('Plains of Gold') on Mars at coordinates 22.48° N, 47.97° W.",
        "isItStillWorking": "No, it operated faithfully until November 1982 when a mistaken computer command broke communication with Earth. It remains resting quietly in the Martian desert."
      },
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Mission & NSSDCA Spacecraft ID: 1975-075C",
      "verifiedNasaCitation": "NASA Planetary Data System (PDS) & NASA Science Mars Missions Archive"
    },
    {
      "id": "sojourner-rover",
      "name": "Sojourner Rover",
      "callsign": "Microrover Flight Experiment (MFEX)",
      "missionName": "Mars Pathfinder",
      "missionYear": "1996–1997",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "December 4, 1996, 06:58:07 UTC",
      "landingDate": "July 4, 1997, 16:56:55 UTC (delivered by Pathfinder)",
      "surfaceDuration": "83 Martian sols (85 Earth days) — Planned: 7 sols",
      "landingSite": "Ares Vallis (Valley of Ares)",
      "coordinates": "19.33° N, 33.55° W (elevation -3.68 km)",
      "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The microwave-sized robotic pioneer that proved wheeled exploration on Mars.",
      "originalPurpose": "Technology demonstration rover to test autonomous mobility, hazard avoidance, thermal survival, and in-situ rock chemistry on Mars. Named after abolitionist and civil rights pioneer Sojourner Truth.",
      "keyInstruments": [
        "Rocker-Bogie 6-wheel titanium suspension with 13-cm aluminum cleated wheels",
        "Alpha Particle X-Ray Spectrometer (APXS) using Curium-244 radiation source",
        "Gallium Arsenide solar array deck (0.22 m², producing ~16 W peak power)",
        "Intel 80C85 radiation-hardened 8-bit microprocessor (2 MHz, 512 KB RAM)",
        "Forward laser diode hazard detection stripers (5 laser diodes) and stereo CCD cameras"
      ],
      "scientificDiscoveries": "Analyzed Martian rocks like 'Barnacle Bill' and 'Yogi', discovering high silica content (andesite) that proved Mars had complex volcanic differentiation and heating cycles; demonstrated that Martian dust is magnetic and composed of maghemite.",
      "missionAchievements": "First mobile robotic rover driven on Mars; operated for 83 Martian sols (12 times its 7-sol design lifetime); traveled 104 meters around the lander without getting stuck; validated Rocker-Bogie architecture used on all subsequent NASA Mars rovers.",
      "endOfMission": "September 27, 1997 (Sol 83): Final communication transmission received via the Pathfinder lander relay.",
      "currentStatusSummary": "Inactive on Martian surface. Rests permanently in Ares Vallis ~10 meters from the Mars Pathfinder lander.",
      "studentQandA": {
        "whatIsThis": "It was the very first wheeled robotic rover ever driven on Mars! It was tiny—only 65 centimeters long (about the size of a microwave oven) and weighed just 11.5 kilograms (25 pounds on Earth, but only 9.6 pounds on Mars).",
        "whyDidNasaSendIt": "To test whether a small wheeled robot could survive freezing Martian nights, navigate around dangerous rocks on its own, and touch Martian boulders with scientific tools. It was delivered inside the Mars Pathfinder lander.",
        "whatDidItDo": "It rolled down ramps from the lander on July 5, 1997. It drove around the rocky landing site, using laser beams to avoid boulders, and pressed its chemical sensor (APXS) directly against Martian rocks nicknamed 'Barnacle Bill' and 'Yogi'.",
        "whatDidScientistsDiscover": "It discovered that Martian rocks contain high amounts of silica, similar to volcanic andesite on Earth, proving that ancient Mars experienced violent volcanic melting cycles! It was only planned to last 7 days, but survived for 83 sols (85 Earth days)!",
        "whereIsItNow": "It is resting on Mars in Ares Vallis ('Valley of Ares') at coordinates 19.33° N, 33.55° W, just a few meters away from the Pathfinder base station.",
        "isItStillWorking": "No, it lost communication on September 27, 1997, when the main lander station's battery finally depleted. It remains preserved in the Martian sands."
      },
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Mars Pathfinder & Sojourner Archive (NSSDCA ID: 1996-068B)",
      "verifiedNasaCitation": "NASA Science Mars Missions & JPL Micro-Rover Flight Experiment Team"
    },
    {
      "id": "mars-pathfinder-lander",
      "name": "Mars Pathfinder Lander",
      "callsign": "Carl Sagan Memorial Station",
      "missionName": "Mars Pathfinder",
      "missionYear": "1996–1997",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "December 4, 1996, 06:58:07 UTC",
      "landingDate": "July 4, 1997, 16:56:55 UTC",
      "surfaceDuration": "83 Martian sols (85 Earth days)",
      "landingSite": "Ares Vallis (Valley of Ares)",
      "coordinates": "19.33° N, 33.55° W (elevation -3.68 km)",
      "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The tetrahedral airbag station that delivered the first rover to Mars.",
      "originalPurpose": "To demonstrate a low-cost, innovative atmospheric entry, descent, and airbag-cushioned landing on Mars, deliver the Sojourner rover to the surface, and serve as an imaging and meteorological base station. Dedicated as the Carl Sagan Memorial Station.",
      "keyInstruments": [
        "24-lobe Kevlar/Vectran omnidirectional impact airbag cluster",
        "Tetrahedral self-righting solar petals with electric drive actuators",
        "Imager for Mars Pathfinder (IMP) stereoscopic mast camera with 12 color filters",
        "Atmospheric Structure Instrument / Meteorology Package (ASI/MET)",
        "High-gain and low-gain telecommunications relay antennas for Sojourner microrover",
        "Deployable fabric and metal rover egress ramps"
      ],
      "scientificDiscoveries": "IMP stereoscopic imaging revealed rounded river pebbles and imbricated (stacked/tilted) boulders aligned in the direction of ancient floodwaters, conclusively proving that Ares Vallis was carved by catastrophic freshwater floods hundreds of times larger than the Amazon River; recorded daily atmospheric dust devil temperature spikes.",
      "missionAchievements": "Pioneered the airbag landing system later used for the Spirit and Opportunity rovers; transmitted 16,500 images and 2.3 billion bits of telemetry; achieved 100% of primary mission objectives under NASA's 'Faster, Better, Cheaper' initiative.",
      "endOfMission": "September 27, 1997 (Sol 83): Final data transmission received. NASA officially concluded mission recovery efforts in March 1998.",
      "currentStatusSummary": "Inactive on Martian surface. Its triangular petals rest permanently open in Ares Vallis.",
      "studentQandA": {
        "whatIsThis": "It is the three-sided pyramid-shaped lander station that carried the Sojourner rover safely to Mars. It used giant bouncing airbags to land, and then opened up like a flower with three solar petals.",
        "whyDidNasaSendIt": "To test an inventive new way to land on Mars cheaply by cushioning touchdown with giant bouncing airbags, deliver the Sojourner rover to the surface, and take 3D color panoramic photos.",
        "whatDidItDo": "It entered the Martian atmosphere protected by a heat shield, deployed a parachute, and inflated 24 giant airbags. It bounced over 15 times across the rocky plain! Once it stopped, the airbags deflated, the three petals unfolded, and it rolled out ramps for Sojourner to drive down.",
        "whatDidScientistsDiscover": "Its tall mast camera took 16,500 photos showing smooth, rounded river rocks and tilted boulders stacked in the direction of giant ancient water currents. This proved that Ares Vallis was carved billions of years ago by colossal catastrophic floods hundreds of times bigger than any river on Earth!",
        "whereIsItNow": "It rests permanently in Ares Vallis on Mars at coordinates 19.33° N, 33.55° W. NASA renamed the lander the 'Carl Sagan Memorial Station' in honor of the famous space educator Carl Sagan.",
        "isItStillWorking": "No, after operating for nearly three months, its rechargeable batteries finally succumbed to the extreme Martian cold in September 1997."
      },
      "nasaSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
      "nasaSourceLabel": "NASA Science Mars Pathfinder & NSSDCA ID: 1996-068A",
      "verifiedNasaCitation": "NASA Jet Propulsion Laboratory Discovery Mission Archive"
    },
    {
      "id": "voyager-1",
      "name": "Voyager 1",
      "callsign": "Voyager 1 (VGR-1 / 1977-084A)",
      "missionName": "Voyager Interstellar Mission",
      "missionYear": "1977–Present",
      "destination": "Deep Space",
      "destinationIcon": "🌌",
      "destinationSlug": "deep-space",
      "status": "Still Travelling",
      "hardwareLocationType": "Travelling Through Interstellar Space",
      "launchDate": "September 5, 1977, 12:56:01 UTC",
      "landingDate": "N/A — Deep space probe; will never land on a planetary surface",
      "heliopauseCrossingDate": "August 25, 2012 (Distance: 121.6 AU / 18.2 billion km)",
      "surfaceDuration": "N/A (Continuous flight: 48+ years)",
      "landingSite": "Interstellar Space (Outer Heliosphere Boundary Crossed)",
      "coordinates": "Current Distance: > 163 AU (> 24.4 billion km / > 15.2 billion miles from Sun)",
      "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~medium.jpg",
      "imageCredit": "NASA / JPL-Caltech",
      "tagline": "The farthest human-made machine in history, actively exploring the space between stars.",
      "originalPurpose": "Launched to perform close-up flybys of Jupiter (March 1979) and Saturn and its moon Titan (November 1980), and then continue outward to cross the boundary of our solar system and explore interstellar space.",
      "keyInstruments": [
        "3.7-meter High-Gain Antenna (HGA) dish transmitting ultra-faint 20-watt S/X-band radio signals",
        "Three Multihundred-Watt Radioisotope Thermoelectric Generators (MHW-RTGs) fueled by Plutonium-238",
        "Magnetometer (MAG) on 13-meter fiberglass boom (Active & returning interstellar magnetic telemetry)",
        "Plasma Wave Subsystem (PWS) dipole antenna (Active & measuring interstellar plasma density)",
        "Cosmic Ray Subsystem (CRS) (Active & recording galactic cosmic rays)",
        "Low-Energy Charged Particle (LECP) instrument (Active & detecting interstellar ions)",
        "The Voyager Golden Record (12-inch gold-plated copper phonograph record of Earth sounds and images)"
      ],
      "scientificDiscoveries": "Discovered active sulfur volcanoes on Jupiter's moon Io; discovered Jupiter's faint ring system; discovered two new Jovian moons (Thebe and Metis) and complex braided ringlets at Saturn; in August 2012, detected a 40-fold spike in plasma density confirming it had crossed the Heliopause to become the first human spacecraft in interstellar space.",
      "missionAchievements": "Farthest and fastest-traveling human-made object in history (cruising at ~17 km/s / ~38,000 mph); longest continuously operating spacecraft mission in human history (48+ years); captured the iconic 1990 'Pale Blue Dot' family portrait of Earth from 6 billion km away.",
      "endOfMission": "Ongoing active interstellar mission. (In 2024, NASA JPL engineers resolved an FDS memory issue, restoring data return from all 4 working science instruments). RTG electrical power will support instruments until approximately 2028-2030, after which it will silently orbit the Milky Way galaxy forever.",
      "currentStatusSummary": "Active and Still Travelling! Cruising through interstellar space beyond our Sun's solar bubble. It is NOT resting on a planet. Currently transmitting science telemetry back to the NASA Deep Space Network.",
      "studentQandA": {
        "whatIsThis": "It is an interstellar spacecraft launched in 1977. It has a giant 3.7-meter gold-colored dish antenna, nuclear power generators fueled by Plutonium-238, and carries a famous gold-plated phonograph record with Earth's sounds and music.",
        "whyDidNasaSendIt": "To explore the giant outer planets—Jupiter and Saturn—and then keep flying outward to discover where our solar system ends and interstellar space begins.",
        "whatDidItDo": "It flew close past Jupiter in 1979 and Saturn in 1980, sending back breathtaking photographs. In 1990, it turned its camera around to take the famous 'Pale Blue Dot' photo of Earth. On August 25, 2012, it officially crossed the boundary of our solar system into interstellar space!",
        "whatDidScientistsDiscover": "It discovered that Jupiter's moon Io has active erupting volcanoes (the first discovered outside Earth!), found rings around Jupiter, and in 2012 proved that interstellar space is filled with dense galactic plasma and energetic cosmic rays from distant exploding stars.",
        "whereIsItNow": "It is actively travelling through interstellar space, more than 24 billion kilometers (163 Astronomical Units) away from Earth! It is the farthest human machine in existence and is flying at roughly 61,000 km/h (38,000 mph). It is NOT abandoned on a planet.",
        "isItStillWorking": "YES! It is STILL WORKING after more than 48 years in space! In 2024, brilliant NASA engineers fixed an onboard memory issue from 24 billion kilometers away. Four scientific instruments are still actively transmitting interstellar data back to Earth today."
      },
      "nasaSourceUrl": "https://voyager.jpl.nasa.gov/",
      "nasaSourceLabel": "NASA JPL Voyager Interstellar Mission & Status",
      "verifiedNasaCitation": "NASA Jet Propulsion Laboratory & NASA Science Voyager Interstellar Telemetry Logs"
    }
  ],
  "artifacts": [
    {
      "id": "apollo-11-lm-descent",
      "name": "Apollo 11 Lunar Module Descent Stage",
      "callsign": "Eagle (LM-5)",
      "missionName": "Apollo 11",
      "missionYear": "1969",
      "destination": "Moon",
      "destinationIcon": "🌕",
      "destinationSlug": "moon",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Lunar Surface Preserved",
      "launchDate": "July 16, 1969, 13:32:00 UTC",
      "landingDate": "July 20, 1969, 20:17:40 UTC",
      "surfaceDuration": "21 hours, 36 minutes, 20 seconds",
      "landingSite": "Mare Tranquillitatis (Sea of Tranquility)",
      "coordinates": "0.67408° N, 23.47297° E",
      "image": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~medium.jpg",
      "imageCredit": "NASA / Neil Armstrong",
      "tagline": "The golden base that caught humanity's first footsteps on another world.",
      "originalPurpose": "Powered descent from lunar orbit to the lunar surface; served as a landing gear, scientific experiment storage bay (EASEP & MESA), and stationary launch pad for the Apollo 11 Ascent Stage.",
      "keyInstruments": [
        "Descent Propulsion System (DPS) throttleable rocket engine (4,400 N to 43,900 N thrust)",
        "Laser Ranging Retroreflector (LRRR) 100-prism silica optical array",
        "Passive Seismic Experiment Package (PSEP) seismometer",
        "Solar Wind Composition (SWC) aluminum foil collector",
        "Modular Equipment Stowage Assembly (MESA) with Westinghouse B&W lunar TV camera"
      ],
      "scientificDiscoveries": "Brought the Laser Ranging Retroreflector (LRRR) that proved the Moon drifts away from Earth at 3.8 cm (1.5 inches) per year via tidal dissipation; returned 21.55 kg of basalt and breccia dating Mare Tranquillitatis to ~3.7 billion years old.",
      "missionAchievements": "First crewed landing on an extraterrestrial body; successful demonstration of manual lunar descent hovering; first direct in-situ lunar geological and seismic experiments.",
      "endOfMission": "Batteries depleted July 21, 1969; Ascent stage lifted off at 17:54:00 UTC leaving descent stage permanently at Tranquility Base.",
      "currentStatusSummary": "Inactive on lunar surface. The unpowered Laser Ranging Retroreflector (LRRR) resting nearby requires no electricity and continues to be pinged with lasers from Earth observatories today.",
      "studentQandA": {
        "whatIsThis": "It is the bottom half of the Apollo 11 Lunar Module, nicknamed 'Eagle'. It looks like a four-legged golden spider covered in shiny thermal foil, with a rocket engine bell in the center and a boarding ladder on one leg.",
        "whyDidNasaSendIt": "To safely carry two astronauts—Neil Armstrong and Buzz Aldrin—from lunar orbit down to the Moon's surface, and serve as a stable launch pad so their cockpit could fly back to Earth.",
        "whatDidItDo": "It fired its throttleable rocket engine downward to slow the spacecraft from orbital velocity down to a gentle touchdown. When the astronauts finished their historic Moonwalk and launched back into orbit, the top crew cabin lifted off, while this lower descent stage remained permanently on the Moon.",
        "whatDidScientistsDiscover": "It delivered the first lunar seismometer (moonquake detector) and the Laser Ranging Retroreflector. By firing lasers from Earth at this reflector, scientists discovered that the Moon is slowly drifting away from us by 3.8 cm (1.5 inches) every year!",
        "whereIsItNow": "It rests at Mare Tranquillitatis ('Sea of Tranquility') at exact lunar coordinates 0.67408° N, 23.47297° E, verified by NASA's Lunar Reconnaissance Orbiter.",
        "isItStillWorking": "No, its chemical batteries were depleted in July 1969. However, the mirror retroreflector resting next to its footpad needs no electricity and is still bounced with laser beams by astronomers today!"
      },
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Mission Overview & Lunar Surface Journal",
      "verifiedNasaCitation": "NASA Space Science Data Coordinated Archive (NSSDCA ID: 1969-059C) & LROC Featured Sites"
    },
    {
      "id": "apollo-lrv",
      "name": "Apollo Lunar Roving Vehicle",
      "callsign": "LRV (Moon Buggy: LRV-1, LRV-2, LRV-3)",
      "missionName": "Apollo 15, 16, & 17",
      "missionYear": "1971–1972",
      "destination": "Moon",
      "destinationIcon": "🌕",
      "destinationSlug": "moon",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Lunar Surface Preserved",
      "launchDate": "Apollo 15: July 26, 1971 | Apollo 16: April 16, 1972 | Apollo 17: Dec 7, 1972",
      "landingDate": "Apollo 15: July 30, 1971 | Apollo 16: April 21, 1972 | Apollo 17: Dec 11, 1972",
      "surfaceDuration": "Apollo 15: 66.9 hours | Apollo 16: 71.0 hours | Apollo 17: 75.0 hours",
      "landingSite": "Hadley Rille (LRV-1), Descartes Highlands (LRV-2), & Taurus-Littrow (LRV-3)",
      "coordinates": "Hadley: 26.1322° N, 3.6339° E | Descartes: 8.9730° S, 15.5002° E | Taurus: 20.1908° N, 30.7717° E",
      "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~medium.jpg",
      "imageCredit": "NASA / Eugene Cernan",
      "tagline": "The open-frame electric rovers that gave astronauts wheels on the Moon.",
      "originalPurpose": "Mobile electric surface transportation allowing Apollo 15, 16, and 17 astronauts to travel up to 7.6 km from their lander, haul hundreds of pounds of rock samples, and transmit live color TV back to Earth.",
      "keyInstruments": [
        "Four 0.25-hp independent electric wheel motors with 80:1 harmonic drive transmissions",
        "Woven zinc-coated steel wire-mesh tires with titanium chevron traction treads",
        "Central T-handle joystick controller (operable with pressurized spacesuit gloves)",
        "High-Gain umbrella-shaped parabolic S-band dish antenna (0.9-meter diameter)",
        "Ground-Controlled Television Assembly (GCTA) color camera steered remotely from Mission Control",
        "Dual 36-volt non-rechargeable silver-zinc batteries (121 Ah capacity each)"
      ],
      "scientificDiscoveries": "Enabled the discovery of the 4.1-billion-year-old 'Genesis Rock' (anorthosite sample 15415) at Hadley Rille proving the early Moon had a global magma ocean; enabled discovery of orange pyroclastic volcanic glass at Shorty Crater on Apollo 17.",
      "missionAchievements": "Traversed a total of 90.3 km (56.1 miles) across three missions; carried 280+ kg of lunar geological specimens; proved wheeled mobility on extraterrestrial regolith; beamed first live TV of lunar liftoff to Earth.",
      "endOfMission": "Parked at designated VIP sites hundreds of meters from the landers at the conclusion of EVAs (Apollo 15: Aug 2, 1971; Apollo 16: Apr 23, 1972; Apollo 17: Dec 14, 1972).",
      "currentStatusSummary": "Inactive on lunar surface. Exactly three separate rovers (LRV-1, LRV-2, LRV-3) remain parked at Hadley-Apennine, Descartes Highlands, and Taurus-Littrow. (Note: Apollo 11 did not carry a rover).",
      "studentQandA": {
        "whatIsThis": "It is an electric, four-wheeled Moon car used during the later Apollo missions (Apollo 15, 16, and 17). It had woven steel wire wheels instead of rubber tires, lawn-chair style seats, and a joystick instead of a steering wheel.",
        "whyDidNasaSendIt": "Before the rover, astronauts could only walk about 1 kilometer from their lander on foot. NASA sent the rover so astronauts could travel over 7 kilometers away, climb mountains, explore canyons, and bring back hundreds of pounds of rocks.",
        "whatDidItDo": "It drove astronauts across lunar craters, boulders, and steep hills at speeds up to 13 km/h (8 mph). It also carried a color television camera operated remotely from Houston that filmed the astronauts working and beamed back live footage.",
        "whatDidScientistsDiscover": "By driving to the edge of Hadley Rille on Apollo 15, astronauts found the 'Genesis Rock'—a 4.1-billion-year-old white rock that proved the Moon was once covered in an ocean of molten magma! On Apollo 17, it helped astronauts find orange volcanic glass beads.",
        "whereIsItNow": "All three rovers remain permanently parked on the Moon: LRV-1 is at Hadley Rille (26.13° N, 3.63° E), LRV-2 is at Descartes Highlands (8.97° S, 15.50° E), and LRV-3 is at Taurus-Littrow (20.19° N, 30.77° E).",
        "isItStillWorking": "No, their silver-zinc batteries were exhausted in 1971 and 1972. They sit silently on the Moon as historic monuments to human ingenuity."
      },
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/lrvhand.html",
      "nasaSourceLabel": "NASA Apollo Lunar Surface Journal: LRV Operations Handbook",
      "verifiedNasaCitation": "NASA NSSDCA ID: 1971-063D (LRV-1), 1972-031D (LRV-2), 1972-096D (LRV-3)"
    },
    {
      "id": "viking-1-lander",
      "name": "Viking 1 Lander",
      "callsign": "Viking Lander 1 (Thomas A. Mutch Memorial Station)",
      "missionName": "Viking 1",
      "missionYear": "1975–1976",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "August 20, 1975, 21:22:00 UTC",
      "landingDate": "July 20, 1976, 11:53:06 UTC",
      "surfaceDuration": "2,245 Martian sols (6 Earth years, 116 days)",
      "landingSite": "Chryse Planitia (Plains of Gold)",
      "coordinates": "22.48° N, 47.97° W (elevation -2.69 km)",
      "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The pioneering stationary laboratory that returned the first color photographs from Mars.",
      "originalPurpose": "First successful U.S. soft-landing on Mars to characterize Martian geology, take high-resolution panoramic images, monitor atmospheric weather, and perform automated biological experiments searching for extraterrestrial life.",
      "keyInstruments": [
        "Dual SNAP-19 Radioisotope Thermoelectric Generators (RTGs) fueled by Plutonium-238 (~57 W power)",
        "Gas Chromatograph Mass Spectrometer (GCMS) soil organic analyzer",
        "Biology Experiment Suite (Pyrolytic Release, Labeled Release, and Gas Exchange tests)",
        "3-meter retractable motorized surface sampler arm with backhoe collector scoop",
        "Meteorology sensor boom (wind speed, wind direction, atmospheric pressure, temperature)",
        "Dual facsimile scanning mirror cameras (360-degree color panoramic imaging)"
      ],
      "scientificDiscoveries": "Returned the first close-up color photographs of the Martian surface showing rusty-red iron-oxide soil and a salmon-pink sky; measured atmospheric composition (95.3% CO2, 2.7% N2, 1.6% Ar); discovered that Martian soil is chemically reactive due to powerful non-biological oxidants (superoxides/perchlorates) rather than living microbes.",
      "missionAchievements": "First successful long-duration operational mission on Mars; transmitted over 1,400 images and 2,245 sols of continuous weather logs; demonstrated interplanetary entry, parachute, and terminal thruster landing.",
      "endOfMission": "November 11, 1982: An erroneous ground software update accidentally overwrote antenna pointing instructions, breaking the radio communications link.",
      "currentStatusSummary": "Inactive on Martian surface. Rests permanently in Chryse Planitia where it touched down in July 1976.",
      "studentQandA": {
        "whatIsThis": "It is a three-legged robotic laboratory about the size of a golf cart. It landed safely on Mars in 1976 using parachutes and landing rockets, and stayed in one place to study Martian soil and weather.",
        "whyDidNasaSendIt": "To safely land on Mars for the first time in American history, take the first clear color pictures of the Martian surface, and test whether tiny living microbes existed in the soil.",
        "whatDidItDo": "It extended a long mechanical metal arm with a scoop, dug trenches in the soil, and dumped the dirt into miniature onboard ovens to bake and analyze it. It also recorded weather and wind every day for over 6 years.",
        "whatDidScientistsDiscover": "It took the first color photos showing that Mars has red soil and a pinkish sky colored by airborne dust! Its biology experiments showed exciting chemical reactions, but found NO organic carbon compounds. Scientists concluded that powerful chemical oxidants (perchlorates) caused the reaction, not living alien creatures.",
        "whereIsItNow": "It is resting on the plains of Chryse Planitia ('Plains of Gold') on Mars at coordinates 22.48° N, 47.97° W.",
        "isItStillWorking": "No, it operated faithfully until November 1982 when a mistaken computer command broke communication with Earth. It remains resting quietly in the Martian desert."
      },
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Mission & NSSDCA Spacecraft ID: 1975-075C",
      "verifiedNasaCitation": "NASA Planetary Data System (PDS) & NASA Science Mars Missions Archive"
    },
    {
      "id": "sojourner-rover",
      "name": "Sojourner Rover",
      "callsign": "Microrover Flight Experiment (MFEX)",
      "missionName": "Mars Pathfinder",
      "missionYear": "1996–1997",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "December 4, 1996, 06:58:07 UTC",
      "landingDate": "July 4, 1997, 16:56:55 UTC (delivered by Pathfinder)",
      "surfaceDuration": "83 Martian sols (85 Earth days) — Planned: 7 sols",
      "landingSite": "Ares Vallis (Valley of Ares)",
      "coordinates": "19.33° N, 33.55° W (elevation -3.68 km)",
      "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The microwave-sized robotic pioneer that proved wheeled exploration on Mars.",
      "originalPurpose": "Technology demonstration rover to test autonomous mobility, hazard avoidance, thermal survival, and in-situ rock chemistry on Mars. Named after abolitionist and civil rights pioneer Sojourner Truth.",
      "keyInstruments": [
        "Rocker-Bogie 6-wheel titanium suspension with 13-cm aluminum cleated wheels",
        "Alpha Particle X-Ray Spectrometer (APXS) using Curium-244 radiation source",
        "Gallium Arsenide solar array deck (0.22 m², producing ~16 W peak power)",
        "Intel 80C85 radiation-hardened 8-bit microprocessor (2 MHz, 512 KB RAM)",
        "Forward laser diode hazard detection stripers (5 laser diodes) and stereo CCD cameras"
      ],
      "scientificDiscoveries": "Analyzed Martian rocks like 'Barnacle Bill' and 'Yogi', discovering high silica content (andesite) that proved Mars had complex volcanic differentiation and heating cycles; demonstrated that Martian dust is magnetic and composed of maghemite.",
      "missionAchievements": "First mobile robotic rover driven on Mars; operated for 83 Martian sols (12 times its 7-sol design lifetime); traveled 104 meters around the lander without getting stuck; validated Rocker-Bogie architecture used on all subsequent NASA Mars rovers.",
      "endOfMission": "September 27, 1997 (Sol 83): Final communication transmission received via the Pathfinder lander relay.",
      "currentStatusSummary": "Inactive on Martian surface. Rests permanently in Ares Vallis ~10 meters from the Mars Pathfinder lander.",
      "studentQandA": {
        "whatIsThis": "It was the very first wheeled robotic rover ever driven on Mars! It was tiny—only 65 centimeters long (about the size of a microwave oven) and weighed just 11.5 kilograms (25 pounds on Earth, but only 9.6 pounds on Mars).",
        "whyDidNasaSendIt": "To test whether a small wheeled robot could survive freezing Martian nights, navigate around dangerous rocks on its own, and touch Martian boulders with scientific tools. It was delivered inside the Mars Pathfinder lander.",
        "whatDidItDo": "It rolled down ramps from the lander on July 5, 1997. It drove around the rocky landing site, using laser beams to avoid boulders, and pressed its chemical sensor (APXS) directly against Martian rocks nicknamed 'Barnacle Bill' and 'Yogi'.",
        "whatDidScientistsDiscover": "It discovered that Martian rocks contain high amounts of silica, similar to volcanic andesite on Earth, proving that ancient Mars experienced violent volcanic melting cycles! It was only planned to last 7 days, but survived for 83 sols (85 Earth days)!",
        "whereIsItNow": "It is resting on Mars in Ares Vallis ('Valley of Ares') at coordinates 19.33° N, 33.55° W, just a few meters away from the Pathfinder base station.",
        "isItStillWorking": "No, it lost communication on September 27, 1997, when the main lander station's battery finally depleted. It remains preserved in the Martian sands."
      },
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Mars Pathfinder & Sojourner Archive (NSSDCA ID: 1996-068B)",
      "verifiedNasaCitation": "NASA Science Mars Missions & JPL Micro-Rover Flight Experiment Team"
    },
    {
      "id": "mars-pathfinder-lander",
      "name": "Mars Pathfinder Lander",
      "callsign": "Carl Sagan Memorial Station",
      "missionName": "Mars Pathfinder",
      "missionYear": "1996–1997",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "destinationSlug": "mars",
      "status": "Inactive",
      "hardwareLocationType": "Permanent Martian Surface Preserved",
      "launchDate": "December 4, 1996, 06:58:07 UTC",
      "landingDate": "July 4, 1997, 16:56:55 UTC",
      "surfaceDuration": "83 Martian sols (85 Earth days)",
      "landingSite": "Ares Vallis (Valley of Ares)",
      "coordinates": "19.33° N, 33.55° W (elevation -3.68 km)",
      "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~medium.jpg",
      "imageCredit": "NASA / JPL",
      "tagline": "The tetrahedral airbag station that delivered the first rover to Mars.",
      "originalPurpose": "To demonstrate a low-cost, innovative atmospheric entry, descent, and airbag-cushioned landing on Mars, deliver the Sojourner rover to the surface, and serve as an imaging and meteorological base station. Dedicated as the Carl Sagan Memorial Station.",
      "keyInstruments": [
        "24-lobe Kevlar/Vectran omnidirectional impact airbag cluster",
        "Tetrahedral self-righting solar petals with electric drive actuators",
        "Imager for Mars Pathfinder (IMP) stereoscopic mast camera with 12 color filters",
        "Atmospheric Structure Instrument / Meteorology Package (ASI/MET)",
        "High-gain and low-gain telecommunications relay antennas for Sojourner microrover",
        "Deployable fabric and metal rover egress ramps"
      ],
      "scientificDiscoveries": "IMP stereoscopic imaging revealed rounded river pebbles and imbricated (stacked/tilted) boulders aligned in the direction of ancient floodwaters, conclusively proving that Ares Vallis was carved by catastrophic freshwater floods hundreds of times larger than the Amazon River; recorded daily atmospheric dust devil temperature spikes.",
      "missionAchievements": "Pioneered the airbag landing system later used for the Spirit and Opportunity rovers; transmitted 16,500 images and 2.3 billion bits of telemetry; achieved 100% of primary mission objectives under NASA's 'Faster, Better, Cheaper' initiative.",
      "endOfMission": "September 27, 1997 (Sol 83): Final data transmission received. NASA officially concluded mission recovery efforts in March 1998.",
      "currentStatusSummary": "Inactive on Martian surface. Its triangular petals rest permanently open in Ares Vallis.",
      "studentQandA": {
        "whatIsThis": "It is the three-sided pyramid-shaped lander station that carried the Sojourner rover safely to Mars. It used giant bouncing airbags to land, and then opened up like a flower with three solar petals.",
        "whyDidNasaSendIt": "To test an inventive new way to land on Mars cheaply by cushioning touchdown with giant bouncing airbags, deliver the Sojourner rover to the surface, and take 3D color panoramic photos.",
        "whatDidItDo": "It entered the Martian atmosphere protected by a heat shield, deployed a parachute, and inflated 24 giant airbags. It bounced over 15 times across the rocky plain! Once it stopped, the airbags deflated, the three petals unfolded, and it rolled out ramps for Sojourner to drive down.",
        "whatDidScientistsDiscover": "Its tall mast camera took 16,500 photos showing smooth, rounded river rocks and tilted boulders stacked in the direction of giant ancient water currents. This proved that Ares Vallis was carved billions of years ago by colossal catastrophic floods hundreds of times bigger than any river on Earth!",
        "whereIsItNow": "It rests permanently in Ares Vallis on Mars at coordinates 19.33° N, 33.55° W. NASA renamed the lander the 'Carl Sagan Memorial Station' in honor of the famous space educator Carl Sagan.",
        "isItStillWorking": "No, after operating for nearly three months, its rechargeable batteries finally succumbed to the extreme Martian cold in September 1997."
      },
      "nasaSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
      "nasaSourceLabel": "NASA Science Mars Pathfinder & NSSDCA ID: 1996-068A",
      "verifiedNasaCitation": "NASA Jet Propulsion Laboratory Discovery Mission Archive"
    },
    {
      "id": "voyager-1",
      "name": "Voyager 1",
      "callsign": "Voyager 1 (VGR-1 / 1977-084A)",
      "missionName": "Voyager Interstellar Mission",
      "missionYear": "1977–Present",
      "destination": "Deep Space",
      "destinationIcon": "🌌",
      "destinationSlug": "deep-space",
      "status": "Still Travelling",
      "hardwareLocationType": "Travelling Through Interstellar Space",
      "launchDate": "September 5, 1977, 12:56:01 UTC",
      "landingDate": "N/A — Deep space probe; will never land on a planetary surface",
      "heliopauseCrossingDate": "August 25, 2012 (Distance: 121.6 AU / 18.2 billion km)",
      "surfaceDuration": "N/A (Continuous flight: 48+ years)",
      "landingSite": "Interstellar Space (Outer Heliosphere Boundary Crossed)",
      "coordinates": "Current Distance: > 163 AU (> 24.4 billion km / > 15.2 billion miles from Sun)",
      "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
      "imageThumb": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~medium.jpg",
      "imageCredit": "NASA / JPL-Caltech",
      "tagline": "The farthest human-made machine in history, actively exploring the space between stars.",
      "originalPurpose": "Launched to perform close-up flybys of Jupiter (March 1979) and Saturn and its moon Titan (November 1980), and then continue outward to cross the boundary of our solar system and explore interstellar space.",
      "keyInstruments": [
        "3.7-meter High-Gain Antenna (HGA) dish transmitting ultra-faint 20-watt S/X-band radio signals",
        "Three Multihundred-Watt Radioisotope Thermoelectric Generators (MHW-RTGs) fueled by Plutonium-238",
        "Magnetometer (MAG) on 13-meter fiberglass boom (Active & returning interstellar magnetic telemetry)",
        "Plasma Wave Subsystem (PWS) dipole antenna (Active & measuring interstellar plasma density)",
        "Cosmic Ray Subsystem (CRS) (Active & recording galactic cosmic rays)",
        "Low-Energy Charged Particle (LECP) instrument (Active & detecting interstellar ions)",
        "The Voyager Golden Record (12-inch gold-plated copper phonograph record of Earth sounds and images)"
      ],
      "scientificDiscoveries": "Discovered active sulfur volcanoes on Jupiter's moon Io; discovered Jupiter's faint ring system; discovered two new Jovian moons (Thebe and Metis) and complex braided ringlets at Saturn; in August 2012, detected a 40-fold spike in plasma density confirming it had crossed the Heliopause to become the first human spacecraft in interstellar space.",
      "missionAchievements": "Farthest and fastest-traveling human-made object in history (cruising at ~17 km/s / ~38,000 mph); longest continuously operating spacecraft mission in human history (48+ years); captured the iconic 1990 'Pale Blue Dot' family portrait of Earth from 6 billion km away.",
      "endOfMission": "Ongoing active interstellar mission. (In 2024, NASA JPL engineers resolved an FDS memory issue, restoring data return from all 4 working science instruments). RTG electrical power will support instruments until approximately 2028-2030, after which it will silently orbit the Milky Way galaxy forever.",
      "currentStatusSummary": "Active and Still Travelling! Cruising through interstellar space beyond our Sun's solar bubble. It is NOT resting on a planet. Currently transmitting science telemetry back to the NASA Deep Space Network.",
      "studentQandA": {
        "whatIsThis": "It is an interstellar spacecraft launched in 1977. It has a giant 3.7-meter gold-colored dish antenna, nuclear power generators fueled by Plutonium-238, and carries a famous gold-plated phonograph record with Earth's sounds and music.",
        "whyDidNasaSendIt": "To explore the giant outer planets—Jupiter and Saturn—and then keep flying outward to discover where our solar system ends and interstellar space begins.",
        "whatDidItDo": "It flew close past Jupiter in 1979 and Saturn in 1980, sending back breathtaking photographs. In 1990, it turned its camera around to take the famous 'Pale Blue Dot' photo of Earth. On August 25, 2012, it officially crossed the boundary of our solar system into interstellar space!",
        "whatDidScientistsDiscover": "It discovered that Jupiter's moon Io has active erupting volcanoes (the first discovered outside Earth!), found rings around Jupiter, and in 2012 proved that interstellar space is filled with dense galactic plasma and energetic cosmic rays from distant exploding stars.",
        "whereIsItNow": "It is actively travelling through interstellar space, more than 24 billion kilometers (163 Astronomical Units) away from Earth! It is the farthest human machine in existence and is flying at roughly 61,000 km/h (38,000 mph). It is NOT abandoned on a planet.",
        "isItStillWorking": "YES! It is STILL WORKING after more than 48 years in space! In 2024, brilliant NASA engineers fixed an onboard memory issue from 24 billion kilometers away. Four scientific instruments are still actively transmitting interstellar data back to Earth today."
      },
      "nasaSourceUrl": "https://voyager.jpl.nasa.gov/",
      "nasaSourceLabel": "NASA JPL Voyager Interstellar Mission & Status",
      "verifiedNasaCitation": "NASA Jet Propulsion Laboratory & NASA Science Voyager Interstellar Telemetry Logs"
    }
  ],
  "destinations": [
    {
      "id": "moon",
      "name": "The Moon",
      "tagline": "The Airless Museum of Early Earth and Human Footprints",
      "subtitle": "Humanity's First Extraterrestrial Stepping Stone",
      "description": "Earth's only natural satellite. With no atmosphere, liquid water, or weather to erode its surface, every footprint, wheel tread, and descent stage left by NASA remains frozen in time—an untouchable cosmic time capsule preserved across billions of years.",
      "distance": "384,400 km",
      "travelTime": "~3 days (Apollo trajectory)",
      "gravity": "1.62 m/s² (16.6% of Earth)",
      "temperature": "-130°C to +120°C",
      "atmosphere": "Near-vacuum (exosphere of argon, helium, neon)",
      "color": "#94a3b8",
      "accentColor": "#38bdf8",
      "themeClass": "dest-moon",
      "artifactsCount": 2,
      "featuredArtifacts": [
        "apollo-11-lm",
        "apollo-lrv"
      ],
      "threeSettings": {
        "color": "#aaaaaa",
        "roughness": 0.9,
        "bumpScale": 0.05,
        "hasAtmosphere": false
      },
      "scientificKey": "Preserves the impact bombardment and volcanic magma ocean history of the primordial inner solar system.",
      "quote": "'That's one small step for man, one giant leap for mankind.'"
    },
    {
      "id": "mars",
      "name": "Mars",
      "tagline": "The Rust-Red Planet of Ancient Rivers and Robot Pioneers",
      "subtitle": "The Graveyard and Cradle of Planetary Science",
      "description": "The fourth planet from the Sun. A cold desert world that was once warm, wet, and teeming with torrential rivers. NASA's rovers and landers have spent nearly 50 years scouring its rust-colored dunes, studying its thin atmosphere, and seeking ancient biosignatures.",
      "distance": "54.6 to 401 Million km (Average ~225 Million km)",
      "travelTime": "6 to 9 months (Hohmann transfer)",
      "gravity": "3.72 m/s² (38% of Earth)",
      "temperature": "-140°C to +20°C (Average -63°C)",
      "atmosphere": "Thin (95% CO₂, surface pressure ~6.5 mb, <1% of Earth)",
      "color": "#ef4444",
      "accentColor": "#f97316",
      "themeClass": "dest-mars",
      "artifactsCount": 3,
      "featuredArtifacts": [
        "viking-1-lander",
        "sojourner-rover",
        "mars-pathfinder-lander"
      ],
      "threeSettings": {
        "color": "#c85a32",
        "roughness": 0.8,
        "bumpScale": 0.08,
        "hasAtmosphere": true,
        "atmosphereColor": "#ff7744"
      },
      "scientificKey": "Answers whether life can emerge independently on a sister world with early watery conditions.",
      "quote": "'Mars has been waiting for us for four billion years.'"
    },
    {
      "id": "deep-space",
      "name": "Deep Space",
      "tagline": "The Ocean Between Stars Where Humanity's Voice Coast Forever",
      "subtitle": "The Interstellar Frontier Beyond the Sun's Realm",
      "description": "Beyond the orbit of Pluto lies the true cosmic wilderness. Here, billions of kilometers from any star, NASA's farthest robotic scouts sail through the interstellar medium—measuring cosmic rays, magnetic currents, and carrying messages to whatever civilizations may watch the stars.",
      "distance": "24+ Billion km (>163 Astronomical Units)",
      "travelTime": "45+ years continuous outward voyage",
      "gravity": "Negligible microgravity (orbital interstellar trajectory)",
      "temperature": "~3 Kelvin (-270.15°C cosmic background)",
      "atmosphere": "Interstellar plasma (electrons, ionized hydrogen)",
      "color": "#818cf8",
      "accentColor": "#a855f7",
      "themeClass": "dest-deep-space",
      "artifactsCount": 1,
      "featuredArtifacts": [
        "voyager-1"
      ],
      "threeSettings": {
        "color": "#4338ca",
        "roughness": 0.5,
        "bumpScale": 0.02,
        "hasAtmosphere": true,
        "atmosphereColor": "#818cf8"
      },
      "scientificKey": "Direct sampling of galactic cosmic rays and matter born from supernova explosions outside our Sun's protective bubble.",
      "quote": "'To the makers of music – all worlds, all times.'"
    }
  ],
  "stories": [
    {
      "id": "apollo-11-lm-descent",
      "artifactId": "apollo-11-lm-descent",
      "aliases": [
        "apollo-11",
        "eagle",
        "apollo-11-lm"
      ],
      "artifactName": "Apollo 11 Lunar Module Descent Stage",
      "speaker": "Lunar Module Eagle — Descent Stage",
      "destination": "The Moon",
      "destinationIcon": "🌕",
      "mission": "Apollo 11",
      "year": "1969",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones, landing coordinates, and scientific data reflect official NASA historical archives.",
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Mission Overview & Lunar Surface Journal",
      "heroImage": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "A Golden Spider Under Black Skies",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
          "caption": "The Apollo 11 Lunar Module Descent Stage resting permanently at Tranquility Base.",
          "text": "I was never meant to return to Earth. My angular body was shaped not by wind or waves, but by mathematics and vacuum. Wrapped in 25 delicate layers of gold Kapton and aluminized Mylar foil, I stood with four spindly legs like a geometric golden spider resting beneath a jet-black sky."
        },
        {
          "chapterNumber": 2,
          "title": "The Reason I Was Sent",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg",
          "caption": "Apollo 11 Lunar Module Eagle photographed from Columbia in lunar orbit.",
          "text": "NASA gave me a momentous mission: carry Neil Armstrong and Buzz Aldrin from lunar orbit down to the cratered surface of the Moon. Every gram of my structure was pared away to save weight. My throttleable rocket engine had to fire smoothly while my legs cushioned our touchdown on an untamed alien world."
        },
        {
          "chapterNumber": 3,
          "title": "Contact Light: The Descent",
          "badge": "The Touchdown",
          "image": "https://images-assets.nasa.gov/image/as11-40-5886/as11-40-5886~orig.jpg",
          "caption": "Buzz Aldrin descending Eagle's ladder to step onto the lunar surface.",
          "text": "On July 20, 1969, my Descent Propulsion System engine ignited. As we neared the ground, Neil Armstrong saw giant boulders in our landing path and took manual control, skimming over West Crater. With only seconds of fuel remaining, my 1.7-meter wire probes touched the soil. The blue cockpit light glowed: 'CONTACT LIGHT.' Neil called Earth: 'Houston, Tranquility Base here. The Eagle has landed.'"
        },
        {
          "chapterNumber": 4,
          "title": "Mirrors and Moonquakes",
          "badge": "Scientific Legacy",
          "image": "https://images-assets.nasa.gov/image/as11-40-5952/as11-40-5952~orig.jpg",
          "caption": "The Laser Ranging Retroreflector (LRRR) deployed on the lunar surface.",
          "text": "My payload bay held the first lunar science station: a seismometer that recorded subtle moonquakes and the Laser Ranging Retroreflector (LRRR). That optical array of 100 quartz corner-cube prisms required zero electrical power. By aiming high-power lasers from Earth at my reflector, scientists proved that the Moon is spiraling away from Earth by 3.8 cm every year!"
        },
        {
          "chapterNumber": 5,
          "title": "Tranquility Base: My Eternal Home",
          "badge": "Current Location",
          "image": "https://images-assets.nasa.gov/image/as11-40-5878/as11-40-5878~orig.jpg",
          "caption": "Human bootprint preserved in the lunar regolith at Tranquility Base.",
          "text": "On July 21, 1969, after 21 hours on the surface, my crew climbed into the upper ascent cockpit. My ascent stage ignited, rocketing them back into orbit, while I remained behind as their launch pad. I am still here at Mare Tranquillitatis (0.67408° N, 23.47297° E). With no atmosphere, rain, or wind, Neil and Buzz's footprints beside my legs remain sharply preserved in the regolith."
        },
        {
          "chapterNumber": 6,
          "title": "A Message to the Future",
          "badge": "Closing Words",
          "image": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
          "caption": "The historic plaque on Eagle's front landing leg: 'We came in peace for all mankind.'",
          "text": "On my forward landing leg is a stainless-steel plaque bearing drawings of the Earth and the words: 'Here men from the planet Earth first set foot upon the Moon. July 1969, A.D. We came in peace for all mankind.' As you look up at the silver crescent in your evening sky, remember: the machines that carried humanity's greatest dreams still keep silent watch."
        }
      ]
    },
    {
      "id": "apollo-lrv",
      "artifactId": "apollo-lrv",
      "aliases": [
        "lrv",
        "moon-buggy",
        "apollo-rover"
      ],
      "artifactName": "Apollo Lunar Roving Vehicle",
      "speaker": "Lunar Roving Vehicle (LRV-003 'Moon Buggy')",
      "destination": "The Moon",
      "destinationIcon": "🌕",
      "mission": "Apollo 15, 16, & 17",
      "year": "1971–1972",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones and scientific data reflect official NASA historical archives.",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/lrvhand.html",
      "nasaSourceLabel": "NASA Apollo Lunar Surface Journal: LRV Operations Handbook",
      "heroImage": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "Wheels for an Alien World",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
          "caption": "Apollo 17 Commander Gene Cernan with LRV-3 at Taurus-Littrow.",
          "text": "Rubber tires would have burst in the harsh vacuum of the Moon, so NASA engineers built my wheels from woven piano wire made of zinc-coated steel, riveted with titanium chevron treads. I was an open-frame electric dune buggy, designed to unfold from a tight compartment on the side of the Lunar Module."
        },
        {
          "chapterNumber": 2,
          "title": "Expanding Human Footsteps",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/as15-88-11866/as15-88-11866~orig.jpg",
          "caption": "Apollo 15 LRV-1 parked near the dramatic canyon of Hadley Rille.",
          "text": "During early Apollo missions, astronauts could walk only a few hundred meters from their lander. Apollo 11 did not carry a rover. But NASA wanted to explore deep craters and towering mountain ranges, so they built three rovers for the extended J-missions: Apollo 15, 16, and 17. Exactly three rovers were driven on the Moon, and all three stay here forever."
        },
        {
          "chapterNumber": 3,
          "title": "Driving Across Craters at 8 MPH",
          "badge": "The Traverse",
          "image": "https://images-assets.nasa.gov/image/as16-107-17528/as16-107-17528~orig.jpg",
          "caption": "Astronaut John Young driving LRV-2 across Descartes Highlands.",
          "text": "I didn't have a steering wheel or foot pedals. The astronaut in the left seat drove me with a small T-shaped joystick between our lawn-chair seats. Tilting it forward engaged four independent 0.25-horsepower electric motors inside my wheel hubs. I kicked up rooster-tails of silver lunar dust, cruising at 13 km/h (8 mph) over rolling terrain."
        },
        {
          "chapterNumber": 4,
          "title": "Uncovering the Genesis Rock",
          "badge": "Discoveries",
          "image": "https://images-assets.nasa.gov/image/as15-88-11901/as15-88-11901~orig.jpg",
          "caption": "The famous 4.1-billion-year-old Genesis Rock discovered at Hadley Rille.",
          "text": "By driving astronauts kilometers away from base, my sisters and I enabled historic discoveries. On Apollo 15, LRV-1 carried Dave Scott and Jim Irwin to Hadley Rille, where they spotted sample 15415: the sparkling white 'Genesis Rock', dated to 4.1 billion years old! It proved that the early Moon was once coated in a global magma ocean. On Apollo 17, I helped find orange volcanic glass beads."
        },
        {
          "chapterNumber": 5,
          "title": "The VIP Parking Spot",
          "badge": "Current Location",
          "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
          "caption": "LRV-3 parked at the final VIP location at Taurus-Littrow.",
          "text": "At the end of each mission, astronauts parked us at the 'VIP site' about 100 meters away. From there, my color television camera was steered by Mission Control in Houston to film the astronauts blasting off for Earth. Today, LRV-1 rests at Hadley Rille, LRV-2 at Descartes Highlands, and I (LRV-3) rest at Taurus-Littrow (20.19° N, 30.77° E)."
        },
        {
          "chapterNumber": 6,
          "title": "Tracks in the Dust",
          "badge": "Closing Message",
          "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
          "caption": "Rover wheel tracks curving through the pristine lunar regolith.",
          "text": "Across our three expeditions, we drove 90.3 kilometers (56 miles) through the gray silence. With no rain or wind to sweep the valleys, our wire-mesh tread patterns are still crisply stamped into the lunar dust, awaiting the next generation of explorers who will return with the Artemis program."
        }
      ]
    },
    {
      "id": "viking-1-lander",
      "artifactId": "viking-1-lander",
      "aliases": [
        "viking-1",
        "viking-lander",
        "vl-1"
      ],
      "artifactName": "Viking 1 Lander",
      "speaker": "Viking 1 Lander",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "mission": "Viking 1",
      "year": "1975–1976",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones, landing coordinates, and scientific data reflect official NASA historical archives.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Mission & NSSDCA ID: 1975-075C",
      "heroImage": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "Touchdown on the Red Planet",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
          "caption": "First color image of the Martian surface taken by Viking 1 in July 1976.",
          "text": "On July 20, 1976—exactly seven years after Neil Armstrong set foot on the Moon—I pierced the thin carbon dioxide atmosphere of Mars. Parachutes slowed my supersonic descent, and terminal rocket thrusters guided me to a soft landing on Chryse Planitia, the 'Plains of Gold'. I became the first successful long-duration American lander on Mars."
        },
        {
          "chapterNumber": 2,
          "title": "The Search for Martian Life",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/PIA00564/PIA00564~orig.jpg",
          "caption": "Viking 1's mechanical sampler arm extending to scoop Martian soil.",
          "text": "NASA sent me to answer one of humanity's oldest questions: Is there life on Mars? My body housed a state-of-the-art miniature automated biological laboratory. Powered by the warm radioactive decay of two Plutonium-238 generators (SNAP-19 RTGs), I stood ready to sample soil that had never known human touch."
        },
        {
          "chapterNumber": 3,
          "title": "Red Dust and Pink Skies",
          "badge": "First Images",
          "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
          "caption": "Viking 1's footpad resting on the rusty, fine-grained regolith of Chryse Planitia.",
          "text": "Within minutes of landing, my scanning facsimile mirror cameras whirred to life. Line by line, I built up the first color panoramas ever seen from the surface of Mars. Humanity had expected dark blue skies; instead, my sensors revealed a pale salmon-pink sky, tinted by airborne ferric oxide dust swept up from a vast rust-colored desert."
        },
        {
          "chapterNumber": 4,
          "title": "The Chemical Mystery of Martian Soil",
          "badge": "Discoveries",
          "image": "https://images-assets.nasa.gov/image/PIA00564/PIA00564~orig.jpg",
          "caption": "Trenches dug in the Martian surface by Viking 1's robotic scoop arm.",
          "text": "My 3-meter mechanical boom reached down, dug trenches, and brought Martian soil into automated biology miniature test chambers. When nutrients touched the soil, gases surged! But my mass spectrometer detected zero organic carbon molecules. NASA scientists determined that the reactions were not living organisms, but non-biological chemical oxidants—perchlorates and superoxides produced by solar ultraviolet light."
        },
        {
          "chapterNumber": 5,
          "title": "Six Years in the Plains of Gold",
          "badge": "Current Location",
          "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
          "caption": "Viking 1 Lander resting at Chryse Planitia (22.48° N, 47.97° W).",
          "text": "I operated for 2,245 Martian sols—over six Earth years! Every day, my weather mast measured winds, temperatures down to -120°C, and pressure cycles averaging 7.5 millibars. In November 1982, a ground software update accidentally overwrote my antenna tracking angle, and my transmissions ceased. I rest permanently at Chryse Planitia (22.48° N, 47.97° W)."
        },
        {
          "chapterNumber": 6,
          "title": "A Beacon for Future Rovers",
          "badge": "Closing Message",
          "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
          "caption": "The quiet plains of Chryse Planitia under the Martian twilight.",
          "text": "NASA renamed me the 'Thomas A. Mutch Memorial Station'. I proved that human machines could endure the brutal freeze and dust storms of Mars for years. Every rover that followed—from tiny Sojourner to giant Perseverance—traveled down the path I first opened across the Plains of Gold."
        }
      ]
    },
    {
      "id": "sojourner-rover",
      "artifactId": "sojourner-rover",
      "aliases": [
        "sojourner",
        "mfex",
        "pathfinder-rover"
      ],
      "artifactName": "Sojourner Rover",
      "speaker": "Sojourner Microrover",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "mission": "Mars Pathfinder",
      "year": "1996–1997",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones, operating durations, and scientific data reflect official NASA historical archives.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Mars Pathfinder & Sojourner Archive (NSSDCA ID: 1996-068B)",
      "heroImage": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "The Microwave-Sized Pioneer",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "Sojourner rover examining the Martian rock 'Yogi' with its APXS instrument.",
          "text": "I was small enough to fit inside a microwave oven, measuring just 65 centimeters long and weighing 11.5 kilograms (25 pounds). But on Mars, where gravity is only 38 percent of Earth's, I weighed less than 10 pounds! Named after abolitionist Sojourner Truth, I carried humanity's hopes to become the first mobile rover on Mars."
        },
        {
          "chapterNumber": 2,
          "title": "A 7-Sol Test That Made History",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "Sojourner stowed on the petal of the Mars Pathfinder lander before deployment.",
          "text": "Many thought a wheeled robot would instantly become high-centered on Martian rocks. NASA sent me as a technology demonstration, packed neatly onto the petal of the Mars Pathfinder lander. My primary mission was planned for just seven Martian sols (design goal: 30 sols). Could an autonomous wheeled vehicle survive the alien terrain?"
        },
        {
          "chapterNumber": 3,
          "title": "Rocker-Bogie Rolls Down the Ramp",
          "badge": "The Rollout",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "Sojourner rolling off the Pathfinder lander ramp onto the Martian soil.",
          "text": "On July 4, 1997, my mothership bounced across Ares Vallis inside giant Kevlar airbags. Once the lander's triangular petals unfurled, I saw the Martian sky. On Sol 2, my six cleated aluminum wheels rolled down the ramps. My patented 'Rocker-Bogie' suspension moved over bumps—each wheel climbing obstacles bigger than itself while keeping my electronics deck level."
        },
        {
          "chapterNumber": 4,
          "title": "Sniffing Rocks: Barnacle Bill and Yogi",
          "badge": "Discoveries",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "Martian rock 'Barnacle Bill' analyzed by Sojourner's alpha particle spectrometer.",
          "text": "I used five laser diodes to project stripes on the ground ahead, spotting obstacles autonomously with my 8-bit Intel 80C85 processor. I backed up to boulders nicknamed 'Barnacle Bill' and 'Yogi', deploying my Alpha Particle X-Ray Spectrometer (APXS). I irradiated the rocks with Curium-244, revealing high silica volcanic andesite that proved ancient Mars had complex molten crustal cycles."
        },
        {
          "chapterNumber": 5,
          "title": "83 Sols of Wonder",
          "badge": "Current Location",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "Sojourner resting in Ares Vallis, near the Carl Sagan Memorial Station.",
          "text": "My 7-sol planned mission stretched into 83 Martian sols—nearly twelve times longer than planned! I traveled 104 meters around the lander, beaming back 550 images. On September 27, 1997, our lander's battery finally succumbed to the freezing cold. I remain parked peacefully in Ares Vallis (19.33° N, 33.55° W), just a few strides from the lander."
        },
        {
          "chapterNumber": 6,
          "title": "A Legacy on Wheels",
          "badge": "Closing Message",
          "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
          "caption": "The tiny tracks of Sojourner leading into the vast Martian desert.",
          "text": "I proved that wheels could explore another world. The Rocker-Bogie suspension geometry I validated became the chassis architecture for Spirit, Opportunity, Curiosity, and Perseverance. I was small, but my tracks opened the roads of Mars."
        }
      ]
    },
    {
      "id": "mars-pathfinder-lander",
      "artifactId": "mars-pathfinder-lander",
      "aliases": [
        "pathfinder",
        "carl-sagan-station",
        "pathfinder-lander"
      ],
      "artifactName": "Mars Pathfinder Lander",
      "speaker": "Mars Pathfinder (Carl Sagan Memorial Station)",
      "destination": "Mars",
      "destinationIcon": "🔴",
      "mission": "Mars Pathfinder",
      "year": "1996–1997",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones, landing coordinates, and scientific data reflect official NASA historical archives.",
      "nasaSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
      "nasaSourceLabel": "NASA Science Mars Pathfinder & NSSDCA ID: 1996-068A",
      "heroImage": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "A Pyramid on the Floodplains",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "Mars Pathfinder's triangular petals open on the rocky surface of Ares Vallis.",
          "text": "I was shaped like a three-sided pyramid, a folded tetrahedral puzzle protected by a heat shield. Inside my core sat the tiny Sojourner rover. We plummeted directly into the Martian atmosphere at 17,000 miles per hour, heading for the ancient catastrophic flood plains of Ares Vallis."
        },
        {
          "chapterNumber": 2,
          "title": "Bouncing to Touchdown on Airbags",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "Deflated Kevlar airbags surrounding Pathfinder's unfolded base.",
          "text": "Landing on Mars is dangerous; heavy retrorocket landers are expensive. NASA used me to demonstrate a bold, low-cost concept: impact airbags. Eight seconds before touchdown on July 4, 1997, 24 giant Kevlar/Vectran airbags inflated around me. I struck the surface, bouncing over 15 times and soaring 15 meters into the air before rolling to a stop on the red plains."
        },
        {
          "chapterNumber": 3,
          "title": "Unfurling Petals in Ares Vallis",
          "badge": "The Unfolding",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "Panoramic view of Ares Vallis taken by Pathfinder's stereo mast camera.",
          "text": "Once motionless, my airbags deflated. Powerful electric motors drove my three triangular petals open like a blooming flower, rolling me upright onto my base. My 80-centimeter stereoscopic camera mast popped up like a periscope, beholding a field of ancient boulders under the Martian sun."
        },
        {
          "chapterNumber": 4,
          "title": "Evidence of Ancient Catastrophic Floods",
          "badge": "Discoveries",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "Imbricated boulders in Ares Vallis showing evidence of ancient mega-floods.",
          "text": "My Imager for Mars Pathfinder (IMP) camera captured 16,500 color images. My stereo lenses spotted smooth, rounded river pebbles and tilted, stacked boulders aligned in the direction of ancient currents. This confirmed that Ares Vallis was carved billions of years ago by colossal freshwater mega-floods hundreds of times larger than the Amazon River!"
        },
        {
          "chapterNumber": 5,
          "title": "Dedicated to Carl Sagan",
          "badge": "Current Location",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "The Carl Sagan Memorial Station resting permanently in Ares Vallis.",
          "text": "Shortly after our landing, NASA formally dedicated me as the 'Carl Sagan Memorial Station', honoring the visionary astronomer who inspired millions to look toward the cosmos. I operated for 83 Martian sols, acting as Sojourner's radio base station. I rest permanently in Ares Vallis at coordinates 19.33° N, 33.55° W."
        },
        {
          "chapterNumber": 6,
          "title": "The Path Finder",
          "badge": "Closing Message",
          "image": "https://images-assets.nasa.gov/image/PIA00010/PIA00010~orig.jpg",
          "caption": "Sunset on Mars photographed from the Carl Sagan Memorial Station.",
          "text": "My airbag landing technology proved so reliable that NASA used it to land the twin rovers Spirit and Opportunity in 2004. I was the Pathfinder—the station that paved the way for modern robotic Mars exploration."
        }
      ]
    },
    {
      "id": "voyager-1",
      "artifactId": "voyager-1",
      "aliases": [
        "voyager",
        "voyager-1",
        "vgr-1"
      ],
      "artifactName": "Voyager 1 Spacecraft",
      "speaker": "Voyager 1 Interstellar Spacecraft",
      "destination": "Deep Space",
      "destinationIcon": "🌌",
      "mission": "Voyager Interstellar Mission",
      "year": "1977–Present",
      "disclaimer": "Creative narration based on verified NASA facts. Fictional persona used for educational storytelling; mission milestones, interstellar crossing dates, and working telemetry reflect official NASA Jet Propulsion Laboratory records.",
      "nasaSourceUrl": "https://voyager.jpl.nasa.gov/",
      "nasaSourceLabel": "NASA JPL Voyager Interstellar Mission & Telemetry Status",
      "heroImage": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
      "chapters": [
        {
          "chapterNumber": 1,
          "title": "Beyond the Bounds of the Sun",
          "badge": "Opening",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "Artist concept of Voyager 1 cruising through the interstellar medium.",
          "text": "I am not an abandoned machine resting on an alien planet. I am an active, travelling spacecraft, hurtling through the deep interstellar void at 17 kilometers per second—over 38,000 miles per hour! I left Cape Canaveral on September 5, 1977, and have traveled farther from Earth than any object in human history."
        },
        {
          "chapterNumber": 2,
          "title": "The Grand Tour of Giant Worlds",
          "badge": "NASA's Purpose",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "Jupiter and its volcanic moon Io photographed during Voyager 1's 1979 flyby.",
          "text": "NASA launched me and my twin, Voyager 2, to take advantage of a rare planetary alignment occurring once every 175 years. Using gravitational slingshots, I swept past Jupiter in March 1979, discovering active sulfur volcanoes on Io and rings around Jupiter. In November 1980, I explored Saturn, revealing intricate ringlet braids and Titan's dense nitrogen smog."
        },
        {
          "chapterNumber": 3,
          "title": "A Pale Blue Dot",
          "badge": "The Solar Portrait",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "The iconic 'Pale Blue Dot' photograph of Earth taken by Voyager 1 from 6 billion km.",
          "text": "In February 1990, on advice from Carl Sagan, I turned my camera back toward the inner solar system from 6 billion kilometers away. I snapped 60 frames capturing our planetary family. In that image, Earth appeared as a tiny speck of dust suspended in a sunbeam—a 'Pale Blue Dot' that reminded humanity of the fragility of our only home."
        },
        {
          "chapterNumber": 4,
          "title": "Crossing into Interstellar Space",
          "badge": "The Heliopause",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "Voyager 1 crossing the Heliopause boundary at 121.6 AU into interstellar space.",
          "text": "On August 25, 2012, at a distance of 121.6 Astronomical Units (18 billion kilometers), my Plasma Wave Subsystem detected a sudden drop in solar wind particles and a fortyfold surge in galactic plasma density. NASA officially confirmed the historic news: I had crossed the Heliopause to become the first human spacecraft in interstellar space!"
        },
        {
          "chapterNumber": 5,
          "title": "Whispering Across 24 Billion Kilometers",
          "badge": "Current Telemetry",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "Voyager 1's 3.7-meter dish antenna beaming faint 20-watt signals to Earth.",
          "text": "I am now over 163 AU (24.4 billion kilometers) from Earth. A radio signal traveling at the speed of light takes over 22.5 hours one-way just to reach the antennas of NASA's Deep Space Network! In 2024, brilliant engineers at JPL fixed a corrupted memory chip in my Flight Data System from across the cosmos, and all four of my working science instruments are actively measuring interstellar fields today."
        },
        {
          "chapterNumber": 6,
          "title": "The Golden Record into Eternity",
          "badge": "Closing Message",
          "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
          "caption": "The 12-inch gold-plated copper Voyager Golden Record mounted on the spacecraft.",
          "text": "Bolted to my side is a 12-inch gold-plated copper phonograph record carrying greetings in 55 human languages, the music of Bach, Beethoven, and Chuck Berry, and sounds of Earth's wind, surf, and birds. Long after the Sun expands and human cities turn to dust, I will cruise the Milky Way as an eternal ambassador of humanity."
        }
      ]
    }
  ],
  "timeline": [
    {
      "id": "timeline-1969-apollo-11",
      "year": "1969",
      "title": "Apollo 11: First Crewed Moon Landing",
      "missionName": "Apollo 11",
      "destination": "moon",
      "destinationName": "The Moon",
      "destinationIcon": "🌕",
      "eventType": "Landing Date",
      "launchDate": "July 16, 1969",
      "landingDate": "July 20, 1969 (20:17:40 UTC)",
      "milestoneDate": "July 20, 1969",
      "summary": "Neil Armstrong and Buzz Aldrin piloted Lunar Module Eagle down to Mare Tranquillitatis. When they returned to orbit, the descent stage remained permanently on the Moon as humanity's first historic extraterrestrial monument.",
      "achievement": "First humans to set foot on another world, deploying the laser ranging reflector and returning 21.6 kg of lunar material.",
      "relatedArtifact": "apollo-11-lm-descent",
      "relatedArtifactName": "Apollo 11 Lunar Module Descent Stage",
      "image": "https://images-assets.nasa.gov/image/as11-40-5927/as11-40-5927~orig.jpg",
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Mission Overview"
    },
    {
      "id": "timeline-1971-apollo-15",
      "year": "1971",
      "title": "Apollo 15: First Use of the Lunar Roving Vehicle",
      "missionName": "Apollo 15",
      "destination": "moon",
      "destinationName": "The Moon",
      "destinationIcon": "🌕",
      "eventType": "Surface Deployment",
      "launchDate": "July 26, 1971",
      "landingDate": "July 30, 1971",
      "milestoneDate": "July 31, 1971",
      "summary": "Astronauts Dave Scott and Jim Irwin unfolded the very first crewed off-world road vehicle on the Moon. The rover drove 27.8 kilometers across Hadley Rille, allowing astronauts to explore deep canyons.",
      "achievement": "Discovered the 4.1-billion-year-old 'Genesis Rock' (anorthosite), confirming the Moon once had an ocean of molten magma.",
      "relatedArtifact": "apollo-lrv",
      "relatedArtifactName": "Apollo Lunar Roving Vehicle",
      "image": "https://images-assets.nasa.gov/image/as17-147-22527/as17-147-22527~orig.jpg",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/a15/a15.html",
      "nasaSourceLabel": "NASA Apollo 15 Lunar Surface Journal"
    },
    {
      "id": "timeline-1976-viking-1",
      "year": "1976",
      "title": "Viking 1: First Successful U.S. Mars Landing",
      "missionName": "Viking 1",
      "destination": "mars",
      "destinationName": "Mars",
      "destinationIcon": "🔴",
      "eventType": "Landing Date",
      "launchDate": "August 20, 1975",
      "landingDate": "July 20, 1976 (11:53:06 UTC)",
      "milestoneDate": "July 20, 1976",
      "summary": "Viking 1 safely touched down on Chryse Planitia ('Plains of Gold'), sending back the first color panoramas of the Martian surface and operating continuously for over six Earth years (2,245 sols).",
      "achievement": "Conducted the first in-situ biology and organic tests on Martian soil and returned the first high-resolution color photos of Mars.",
      "relatedArtifact": "viking-1-lander",
      "relatedArtifactName": "Viking 1 Lander",
      "image": "https://images-assets.nasa.gov/image/PIA00563/PIA00563~orig.jpg",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Mission Archive"
    },
    {
      "id": "timeline-1977-voyager-1-launch",
      "year": "1977",
      "title": "Voyager 1: Launch of the Grand Tour",
      "missionName": "Voyager 1",
      "destination": "deep-space",
      "destinationName": "Deep Space",
      "destinationIcon": "🌌",
      "eventType": "Launch Date",
      "launchDate": "September 5, 1977",
      "landingDate": "Not Applicable (Interstellar Trajectory)",
      "milestoneDate": "September 5, 1977",
      "summary": "Voyager 1 launched from Cape Canaveral atop a Titan-Centaur rocket to explore Jupiter and Saturn, carrying the Golden Record—humanity's time capsule message to extraterrestrial civilizations.",
      "achievement": "Discovered active sulfur volcanism on Jupiter's moon Io and intricate ring structures around Saturn, then began its flight beyond the solar system.",
      "relatedArtifact": "voyager-1",
      "relatedArtifactName": "Voyager 1 Spacecraft",
      "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
      "nasaSourceUrl": "https://voyager.jpl.nasa.gov/mission/",
      "nasaSourceLabel": "NASA JPL Voyager Mission Overview"
    },
    {
      "id": "timeline-1997-mars-pathfinder",
      "year": "1997",
      "title": "Mars Pathfinder & Sojourner Touchdown",
      "missionName": "Mars Pathfinder",
      "destination": "mars",
      "destinationName": "Mars",
      "destinationIcon": "🔴",
      "eventType": "Landing Date",
      "launchDate": "December 4, 1996",
      "landingDate": "July 4, 1997",
      "milestoneDate": "July 4, 1997",
      "summary": "Mars Pathfinder bounced across Ares Vallis inside giant Kevlar airbags and deployed Sojourner—the first mobile wheeled robotic rover to explore another planet.",
      "achievement": "Proved the 6-wheel rocker-bogie mobility system on Mars, discovered silica-rich andesite rocks, and transmitted the first viral space images on the internet.",
      "relatedArtifact": "sojourner-rover",
      "relatedArtifactName": "Sojourner Rover & Mars Pathfinder Lander",
      "image": "https://images-assets.nasa.gov/image/PIA01122/PIA01122~orig.jpg",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Mars Pathfinder & Sojourner"
    },
    {
      "id": "timeline-2012-voyager-1-interstellar",
      "year": "2012",
      "title": "Voyager 1 Enters Interstellar Space",
      "missionName": "Voyager 1",
      "destination": "deep-space",
      "destinationName": "Deep Space",
      "destinationIcon": "🌌",
      "eventType": "Scientific Milestone",
      "launchDate": "September 5, 1977",
      "landingDate": "Not Applicable (Interstellar Trajectory)",
      "milestoneDate": "August 25, 2012",
      "summary": "At a distance of 121 Astronomical Units (over 18 billion kilometers), Voyager 1 detected a sharp drop in solar wind particles and a fortyfold jump in galactic plasma density, crossing the Heliopause.",
      "achievement": "First human-made craft in history to cross into interstellar space, directly sampling the pristine cosmic radiation of the Milky Way.",
      "relatedArtifact": "voyager-1",
      "relatedArtifactName": "Voyager 1 Spacecraft",
      "image": "https://images-assets.nasa.gov/image/PIA17049/PIA17049~orig.jpg",
      "nasaSourceUrl": "https://science.nasa.gov/mission/voyager/",
      "nasaSourceLabel": "NASA Science - Voyager Interstellar Mission"
    }
  ],
  "discoveries": [
    {
      "id": "lunar-laser-ranging",
      "title": "Laser Ranging: How Apollo 11 Measures the Moon's Drift",
      "topic": "Orbital Mechanics & Geodesy",
      "destination": "The Moon",
      "artifactId": "apollo-11-lm",
      "badge": "Physics & Astronomy",
      "summary": "Did you know the Moon is slowly moving away from Earth at 3.8 centimeters (1.5 inches) every year—about the same speed your fingernails grow? We know this because of an experiment left on the Moon in 1969.",
      "howItWorks": "Astronaut Buzz Aldrin placed the Laser Ranging Retroreflector (LRRR) in the lunar dust. It has 100 special quartz corner-cube prisms that act like bicycle reflectors: any laser beam fired from an observatory on Earth is bounced straight back to where it came from. By timing the round trip of light (around 2.5 seconds) down to fractions of a nanosecond, scientists calculate the Earth-Moon distance with millimeter precision.",
      "studentTakeaway": "Because Earth's oceans bulge from tidal gravity, Earth's spin pulls the tidal bulge slightly ahead of the Moon. This tidal friction acts like a gravitational slingshot, transferring Earth's rotational energy into the Moon's orbit, pushing the Moon slowly outward into a higher orbit!",
      "funFact": "The retroreflector is completely passive—it requires zero electricity, batteries, or moving parts. It has worked without interruption for over half a century!"
    },
    {
      "id": "genesis-rock",
      "title": "The Genesis Rock: Unlocking 4.1 Billion Years of Lunar Fire",
      "topic": "Planetary Geology",
      "destination": "The Moon",
      "artifactId": "apollo-lrv",
      "badge": "Geology & Magma Oceans",
      "summary": "When Apollo 15 astronauts used their Lunar Roving Vehicle to reach Spur Crater, they spotted a gleaming white rock sitting atop a dark mound. It was nicknamed the 'Genesis Rock'.",
      "howItWorks": "The rock is composed of anorthosite, a mineral made almost entirely of plagioclase feldspar. Geologists had hypothesized that early in the Moon's life, the entire outer mantle was a molten ocean of incandescent magma. Dense minerals like olivine sank toward the core, while lighter plagioclase crystals floated to the top like ice cubes in soda, freezing into the Moon's original pale crust.",
      "studentTakeaway": "The Genesis Rock was radiometrically dated to 4.1 billion years old—older than almost any rock found on Earth! Because Earth's tectonic plates and rain recycle crust, early Earth rocks are destroyed. The airless Moon preserves the primordial blueprint of planetary formation.",
      "funFact": "Astronaut Dave Scott radioed to Mission Control upon finding it: 'Guess what we just found! I think we found what we came for!'"
    },
    {
      "id": "viking-biology-puzzle",
      "title": "The Soil Chemistry Puzzle: Did Viking Find Life on Mars?",
      "topic": "Astrobiology & Soil Chemistry",
      "destination": "Mars",
      "artifactId": "viking-1-lander",
      "badge": "Astrobiology",
      "summary": "In 1976, Viking 1 scooped Martian dust into miniature automated biology test-tubes. The instruments detected a sudden burst of radioactive carbon dioxide gas—the textbook signature of microbial respiration. Yet, there was a twist.",
      "howItWorks": "While the Labeled Release experiment gave a positive gas reading, the sensitive Gas Chromatograph-Mass Spectrometer (GCMS) detected no organic carbon compounds in the soil—fewer organic molecules than even the cleanest lunar samples.",
      "studentTakeaway": "Decades of research revealed that intense solar ultraviolet radiation bathing the dry, unshielded Martian surface creates aggressive, non-biological chemical oxidants, specifically perchlorates and hydrogen peroxide. When damp nutrient broth touched the soil, these oxidants tore the nutrients apart, releasing gas without any living bacteria involved.",
      "funFact": "Viking taught scientists an invaluable lesson: before searching for alien life, you must first understand the exotic inorganic chemistry of an alien planet!"
    },
    {
      "id": "mars-flood-channels",
      "title": "Catastrophic Flash Floods: Ares Vallis & The Watery Past",
      "topic": "Hydrogeology & Martian Climate",
      "destination": "Mars",
      "artifactId": "mars-pathfinder-lander",
      "badge": "Planetary Hydrology",
      "summary": "Today Mars is an arid, bone-dry frozen desert. Yet when Mars Pathfinder and Sojourner rolled onto Ares Vallis, they found boulders aligned like pebbles in an ancient roaring river bed.",
      "howItWorks": "Geologists noticed 'imbricated boulders'—flat rocks tilted systematically in the same direction, exactly like rocks in river rapids on Earth. Ares Vallis is an enormous outflow channel where catastrophic subterranean water aquifers ruptured billions of years ago.",
      "studentTakeaway": "Calculations showed that the flood which carved Ares Vallis was one of the largest floods in the solar system—discharging water hundreds of times greater than the Amazon River, draining an ancient inland lake in a matter of weeks and depositing a giant debris fan.",
      "funFact": "Sojourner analyzed the smooth, rounded pebbles near the lander. Water erosion is one of the only natural mechanisms capable of rounding jagged volcanic rocks into smooth river stones."
    },
    {
      "id": "rocker-bogie-suspension",
      "title": "The Rocker-Bogie: How Space Wheels Climb Any Boulder",
      "topic": "Robotics & Mechanical Engineering",
      "destination": "Mars",
      "artifactId": "sojourner-rover",
      "badge": "Robotics Engineering",
      "summary": "Regular cars use springs and shock absorbers. But if a rover in space broke a metal spring, it would be stranded forever. So NASA engineers invented the 'Rocker-Bogie' mechanism.",
      "howItWorks": "The suspension consists of two rockers connected by a central differential pivot without any springs. Each rocker has a wheel in front and a smaller rocker (bogie) in the back holding two wheels. When one front wheel rolls over a tall rock, the differential tilts the opposite side downward, keeping all six wheels firmly pressed against the uneven ground.",
      "studentTakeaway": "Because weight is evenly distributed at all times, the rover can climb over rocks taller than the diameter of its own wheels without tilting more than a few degrees or tipping over.",
      "funFact": "First validated on Mars by Sojourner in 1997, the rocker-bogie design worked so masterfully that NASA used it on Spirit, Opportunity, Curiosity, and Perseverance!"
    },
    {
      "id": "heliopause-crossing",
      "title": "Crossing the Heliopause: Sailing Beyond the Sun's Bubble",
      "topic": "Astrophysics & Solar Physics",
      "destination": "Deep Space",
      "artifactId": "voyager-1",
      "badge": "Interstellar Physics",
      "summary": "Our Sun does not simply emit sunlight; it blows a constant supersonic wind of ionized hydrogen and helium plasma outward at hundreds of kilometers per second. This creates a giant protective cocoon called the Heliosphere.",
      "howItWorks": "On August 25, 2012, at a distance of 121 AU (18 billion kilometers), Voyager 1's instruments detected a dramatic event: the count of low-energy solar protons plummeted to near zero, while the flux of high-energy galactic cosmic rays from outside our solar system shot upward. Shortly after, plasma wave vibrations revealed cold, dense interstellar gas.",
      "studentTakeaway": "Voyager 1 had crossed the Heliopause—the invisible frontier where the outward pressure of the solar wind balances against the inward pressure of the interstellar medium. It proved that our solar system is shielded by a magnetic bubble, protecting planets from lethal cosmic rays.",
      "funFact": "Voyager 1 is traveling so fast (17 km per second) that it covers roughly 1.5 million kilometers every single day!"
    },
    {
      "id": "golden-record-physics",
      "title": "The Golden Record: Humanity's Cosmic Phonograph",
      "topic": "Communications & Astrobiology",
      "destination": "Deep Space",
      "artifactId": "voyager-1",
      "badge": "Message to the Stars",
      "summary": "How do you communicate with an alien civilization that has never heard human words, doesn't know English or Spanish, and has never seen our Sun?",
      "howItWorks": "Carl Sagan and Ann Druyan created the Voyager Golden Record. Its cover is etched with universal scientific symbols: the hyperfine transition of a neutral hydrogen atom defines fundamental units of time (0.7 nanoseconds) and length (21 cm). A pulsar map uses 14 spinning pulsars with binary frequencies to pinpoint Earth's exact cosmic coordinates.",
      "studentTakeaway": "The record contains analog grooves holding 116 images encoded in audio scan lines, greetings in 55 languages, natural Earth sounds (thunder, wind, birds, chimpanzees), and 90 minutes of music from around our world. The gold plating ensures it will remain readable for over one billion years.",
      "funFact": "The record also includes the recorded brainwaves of Ann Druyan while meditating on the history of Earth, human civilization, and what it feels like to fall in love."
    }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "What scientific instrument left on the Moon by Apollo 11 is still used by Earth observatories today to bounce laser beams?",
      "options": [
        "The Cosmic Ray Telescope",
        "The Laser Ranging Retroreflector (LRRR)",
        "The Saturn V Ascent Radar",
        "The Deep Space Radio Transmitter"
      ],
      "correctIndex": 1,
      "topic": "Scientific Discoveries",
      "relatedArtifact": "apollo-11-lm-descent",
      "explanation": "Buzz Aldrin placed the Laser Ranging Retroreflector on the lunar surface. By timing laser pulses fired from Earth that bounce off its corner quartz prisms, scientists proved the Moon is drifting away by 3.8 cm (1.5 inches) every year!",
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Lunar Laser Ranging Experiment"
    },
    {
      "id": 2,
      "question": "Why did the Apollo 11 Lunar Module Descent Stage remain behind on the Moon when Neil Armstrong and Buzz Aldrin flew home?",
      "options": [
        "It ran out of battery power and broke down",
        "It was designed as the rigid launch platform for the Ascent Stage cockpit to blast off from",
        "NASA forgot the keys to restart its engine",
        "It was too heavy to fit back into the Saturn V rocket"
      ],
      "correctIndex": 1,
      "topic": "Equipment Purpose",
      "relatedArtifact": "apollo-11-lm-descent",
      "explanation": "The Lunar Module was built in two parts: the Descent Stage fired its rocket to land gently, and then served as the sturdy launch pad from which the Ascent Stage rocketed back into lunar orbit.",
      "nasaSourceUrl": "https://www.nasa.gov/mission/apollo-11/",
      "nasaSourceLabel": "NASA Apollo 11 Lunar Module Overview"
    },
    {
      "id": 3,
      "question": "What famous message is engraved on the stainless-steel plaque attached to Apollo 11's forward ladder strut?",
      "options": [
        "'One small step for man, one giant leap for mankind'",
        "'We came in peace for all mankind'",
        "'Property of the United States of America'",
        "'To the Moon and the stars beyond'"
      ],
      "correctIndex": 1,
      "topic": "Mission History",
      "relatedArtifact": "apollo-11-lm-descent",
      "explanation": "The plaque reads: 'Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind.' It remains untouched in the Sea of Tranquility.",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/a11/a11.html",
      "nasaSourceLabel": "NASA Apollo Lunar Surface Journal Plaque Archive"
    },
    {
      "id": 4,
      "question": "Why were the wheels of the Apollo Lunar Roving Vehicle made of woven steel piano wire mesh instead of rubber tires?",
      "options": [
        "Rubber tires would melt or become brittle and shatter in the Moon's extreme temperature swings (-130°C to +120°C) and airless vacuum",
        "Steel wire was much heavier and helped the rover stay on the ground",
        "Rubber tires were too bouncy for astronauts to steer",
        "NASA wanted the wheels to look like bicycle spokes"
      ],
      "correctIndex": 0,
      "topic": "Equipment Purpose",
      "relatedArtifact": "apollo-lrv",
      "explanation": "Inflated rubber tires would burst in the vacuum of space, melt under the blistering 120°C daytime heat, or turn brittle and shatter in the deep -130°C lunar night. Woven zinc-coated steel wire with chevron treads provided flexibility and grip.",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/lrvhand.html",
      "nasaSourceLabel": "NASA Lunar Roving Vehicle Operations Handbook"
    },
    {
      "id": 5,
      "question": "What ancient specimen collected by Apollo 15 astronauts using their Lunar Rover proved the Moon once had a global magma ocean?",
      "options": [
        "The Black Diamond of Descartes",
        "The Genesis Rock (anorthosite dated to 4.1 billion years old)",
        "The Shorty Crater Basalt Sphere",
        "The Oceanus Procellarum Meteorite"
      ],
      "correctIndex": 1,
      "topic": "Scientific Discoveries",
      "relatedArtifact": "apollo-lrv",
      "explanation": "Astronauts Dave Scott and Jim Irwin drove to Spur Crater and spotted the Genesis Rock. Its pure plagioclase feldspar composition proved that the early Moon's surface was molten magma, where lighter crystals floated to the top to form the crust.",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/a15/a15.html",
      "nasaSourceLabel": "NASA Apollo 15 Genesis Rock Science Summary"
    },
    {
      "id": 6,
      "question": "Before leaving the Moon on Apollo 17, why did Commander Gene Cernan park the Lunar Rover one mile away from the lander?",
      "options": [
        "To save battery power for future astronauts",
        "So its color television camera could point back and film the Lunar Module blasting off into space live for Earth",
        "Because the rover got stuck in deep regolith dust",
        "To keep it away from solar radiation"
      ],
      "correctIndex": 1,
      "topic": "Mission Achievements",
      "relatedArtifact": "apollo-lrv",
      "explanation": "Gene Cernan parked LRV-003 facing the lander Challenger so the motorized RCA color TV camera could be remote-controlled from Houston to track and broadcast the ascent stage launch into orbit.",
      "nasaSourceUrl": "https://www.nasa.gov/history/alsj/a17/a17.html",
      "nasaSourceLabel": "NASA Apollo 17 Lunar Surface Excursions"
    },
    {
      "id": 7,
      "question": "What historic milestone did Viking 1 achieve on July 20, 1976?",
      "options": [
        "First spacecraft to bring Martian soil samples back to Earth",
        "First successful long-duration soft landing on Mars by the United States",
        "First spacecraft to discover frozen water ice under Martian soil",
        "First craft to orbit all four gas giant planets"
      ],
      "correctIndex": 1,
      "topic": "Mission History",
      "relatedArtifact": "viking-1-lander",
      "explanation": "On July 20, 1976 (exactly seven years after Apollo 11 landed on the Moon), Viking 1 touched down in Chryse Planitia, transmitting the very first color panoramas of Mars and operating for over six Earth years (2,245 sols).",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Mission Milestone"
    },
    {
      "id": 8,
      "question": "Why did Viking 1's biology tests detect sudden gas releases from Martian soil even though there were no living microbes?",
      "options": [
        "The test chambers leaked air from Earth",
        "Intense solar ultraviolet rays created non-biological chemical oxidants (perchlorates) in the unshielded Martian dust",
        "Martian plant roots released carbon dioxide gas",
        "The electronic sensors overheated in the sun"
      ],
      "correctIndex": 1,
      "topic": "Scientific Discoveries",
      "relatedArtifact": "viking-1-lander",
      "explanation": "Mars has no ozone layer to block solar UV light, which creates aggressive chemical oxidants called perchlorates in the regolith. When damp nutrient broth was added, these chemical compounds broke down the nutrients without any living life involved.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking Biology & Soil Chemistry Results"
    },
    {
      "id": 9,
      "question": "Where is the Viking 1 Lander located today, and what is its operational status?",
      "options": [
        "In Jezero Crater; currently active and transmitting weather",
        "In Chryse Planitia ('Plains of Gold'); inactive since communication ended in November 1982",
        "In Valles Marineris canyon; destroyed by a sandstorm in 1980",
        "On the Martian North Polar Ice Cap; currently active"
      ],
      "correctIndex": 1,
      "topic": "Current Location and Status",
      "relatedArtifact": "viking-1-lander",
      "explanation": "Viking 1 rests in Chryse Planitia (22.7° N, 48.0° W). It operated for 2,245 sols until November 11, 1982, when an unintended software command uplink inadvertently pointed its antenna away from Earth.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/viking-1",
      "nasaSourceLabel": "NASA JPL Viking 1 Lander Status"
    },
    {
      "id": 10,
      "question": "What was special about Sojourner, which landed on Mars in 1997 with the Mars Pathfinder mission?",
      "options": [
        "It was the first wheeled robotic rover ever driven on another planet",
        "It was powered by a miniature nuclear fusion reactor",
        "It was the largest rover NASA ever constructed",
        "It was the first drone helicopter to fly in alien skies"
      ],
      "correctIndex": 0,
      "topic": "Mission History",
      "relatedArtifact": "sojourner-rover",
      "explanation": "Weighing only 11.5 kg (25.4 lbs) on Earth (and only 4.3 kg / 9.6 lbs in Mars gravity), microwave-sized Sojourner made cosmic history on July 5, 1997 when its six wheels rolled down Pathfinder's ramp, becoming the first wheeled mobile vehicle on another world.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Sojourner Rover First Wheeled Vehicle"
    },
    {
      "id": 11,
      "question": "What patented 6-wheeled suspension system did Sojourner prove on Mars that NASA later used on Curiosity and Perseverance?",
      "options": [
        "The Hydraulic Air-Spring Suspension",
        "The Rocker-Bogie Suspension",
        "The Magnetic Levitation Track",
        "The Independent Leaf-Spring Axle"
      ],
      "correctIndex": 1,
      "topic": "Equipment Purpose",
      "relatedArtifact": "sojourner-rover",
      "explanation": "The Rocker-Bogie suspension uses zero metal springs. Its differential pivot distributes weight evenly across all six wheels, allowing rovers to climb over rocks twice their wheel diameter while cutting chassis tilt in half.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL Rocker-Bogie Suspension Mechanics"
    },
    {
      "id": 12,
      "question": "What scientific discovery did Sojourner make when it pressed its spectrometer against the Martian rock nicknamed 'Barnacle Bill'?",
      "options": [
        "The rock was made of pure gold ore",
        "The rock was rich in silica (andesite-like), proving Mars experienced complex crustal volcanism similar to Earth",
        "The rock contained fossilized ancient tree bark",
        "The rock was a hollow geode filled with liquid water"
      ],
      "correctIndex": 1,
      "topic": "Scientific Discoveries",
      "relatedArtifact": "sojourner-rover",
      "explanation": "Sojourner's Alpha Particle X-Ray Spectrometer (APXS) found that 'Barnacle Bill' had high silica content (andesite), showing that Martian rocks had undergone repeated melting and differentiation, much like continental volcanic rocks on Earth.",
      "nasaSourceUrl": "https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner",
      "nasaSourceLabel": "NASA JPL APXS Barnacle Bill Analysis"
    },
    {
      "id": 13,
      "question": "How did the Mars Pathfinder lander safely survive touchdown on Mars without using heavy, expensive landing thrusters?",
      "options": [
        "It glided down on steerable nylon parachutes into a soft sand dune",
        "It was enclosed in a cocoon of 24 giant Kevlar airbags and bounced up to 15 times before rolling to a stop",
        "It was caught mid-air by a rocket-powered crane helicopter",
        "It splashed down safely in an ancient crater lake"
      ],
      "correctIndex": 1,
      "topic": "Equipment Purpose",
      "relatedArtifact": "mars-pathfinder-lander",
      "explanation": "Pathfinder pioneered the airbag landing concept: giant 24-lobe Kevlar airbags inflated around the tetrahedral lander seconds before impact, allowing it to bounce eighty feet high across Ares Vallis before deflating and unfolding.",
      "nasaSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
      "nasaSourceLabel": "NASA Science - Mars Pathfinder Airbag Technology"
    },
    {
      "id": 14,
      "question": "What evidence did the Mars Pathfinder lander discover in Ares Vallis regarding the ancient history of Mars?",
      "options": [
        "Rounded stones and tilted boulders proving colossal catastrophic freshwater floods billions of years ago",
        "Active geysers spewing water vapor into the atmosphere",
        "Glaciers of frozen carbon dioxide covering the equator",
        "A subterranean cave system with running rivers"
      ],
      "correctIndex": 0,
      "topic": "Scientific Discoveries",
      "relatedArtifact": "mars-pathfinder-lander",
      "explanation": "Pathfinder's mast camera revealed imbricated (stacked and tilted) boulders aligned in the direction of ancient water currents, showing that Ares Vallis was carved by catastrophic mega-floods hundreds of times larger than the Amazon River.",
      "nasaSourceUrl": "https://science.nasa.gov/mission/mars-pathfinder/",
      "nasaSourceLabel": "NASA Science - Ares Vallis Flood Geology"
    },
    {
      "id": 15,
      "question": "On August 25, 2012, Voyager 1 achieved a milestone never accomplished by any human machine before. What was it?",
      "options": [
        "It landed safely on the frozen surface of Pluto",
        "It crossed the Heliopause and entered interstellar space beyond the Sun's magnetic bubble",
        "It discovered a ninth planet in the Kuiper Belt",
        "It returned to orbit around Saturn to inspect its rings"
      ],
      "correctIndex": 1,
      "topic": "Current Location and Status",
      "relatedArtifact": "voyager-1",
      "explanation": "At a distance of 121 AU (18 billion km), Voyager 1 detected a sharp drop in solar particles and a fortyfold surge in galactic plasma, becoming the first human-made object in history to cross into interstellar space. It is Still Travelling today!",
      "nasaSourceUrl": "https://voyager.jpl.nasa.gov/mission/interstellar-mission/",
      "nasaSourceLabel": "NASA JPL Voyager Interstellar Crossing Announcement"
    }
  ]
};
