import { defineGuide } from "./guideFactory";

export const pilotGuides = [
  defineGuide({
    number: 1,
    slug: "gear-ratio-demonstrator",
    title: "Gear Ratio Demonstrator",
    description: "Turn one crank and compare how gear size changes output speed, direction, and turning force.",
    category: "Brick-compatible mechanisms",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "45-60 min",
    timeMinutes: 60,
    tuningTime: "15 min",
    estimatedCost: "$0-$10",
    maxCost: 10,
    reuseCost: "$0 with an existing parts bin",
    workspace: "A clear desk or table",
    supervision: "Adult help recommended for builders under 10",
    concepts: ["Gear ratio", "Torque", "Rotational speed"],
    tags: ["gears", "mechanisms", "motion", "classroom", "one-hour build"],
    featured: true,
    hook:
      "Build a hand-cranked gear pair that makes a visible trade: one setup spins the output quickly, while the other turns it slowly with more ideal torque. The frame is open so you can watch every tooth enter and leave the mesh.",
    finishedResult:
      "A successful demonstrator turns without gear skipping. With a 12-tooth driver and 36-tooth driven gear, the output completes about one turn for every three crank turns and rotates in the opposite direction.",
    learningObjectives: [
      "Identify the driver and driven gears in a simple train.",
      "Calculate an ideal gear ratio from tooth counts.",
      "Compare output speed and ideal torque after swapping the gears.",
      "Tune axle spacing to reduce friction without allowing teeth to skip."
    ],
    materials: [
      { quantity: "1", item: "12-tooth brick-compatible gear", purpose: "Small gear for the first ratio test" },
      { quantity: "1", item: "36-tooth brick-compatible gear", purpose: "Large gear for the first ratio test" },
      { quantity: "2", item: "straight axles, at least 5 modules long", purpose: "Support the input and output gears" },
      { quantity: "8-12", item: "frame beams or rigid brick-compatible elements", purpose: "Hold both axles parallel" },
      { quantity: "4", item: "bushings or spacers", purpose: "Prevent side-to-side axle movement" },
      { quantity: "1", item: "small crank handle", purpose: "Apply a steady rotary input" },
      { quantity: "2", item: "paper arrow flags", purpose: "Make rotation direction easy to see" }
    ],
    tools: ["Ruler", "Pencil", "Small piece of removable tape"],
    alternatives: [
      "Use any two meshing gears with clearly countable teeth and recalculate the ratio.",
      "Build a corrugated-cardboard frame with straw axle bearings when no brick-compatible frame pieces are available.",
      "Mark one tooth on each gear with removable tape instead of adding paper arrow flags."
    ],
    accessibility: [
      "Use high-contrast arrow flags and tactile tape on the input axle.",
      "A partner can count rotations while the builder turns the larger crank.",
      "Replace the small crank with a wider handle for an easier grip."
    ],
    safety: [
      "Keep hair, sleeves, and fingers clear of the meshing teeth while the crank is moving.",
      "Use only hand speed; spinning the gears with a motor can eject loose parts.",
      "Small gears and bushings are a choking hazard for young children."
    ],
    orientation:
      "Place the model so the crank is on your left. That is the input side. The axle on your right is the output side; the long beams are the front and back rails, and the tabletop is the bottom reference plane.",
    input: "clockwise hand-crank rotation",
    output: "slower counterclockwise axle rotation",
    motion: "rotary-to-rotary",
    efficiencyLosses: ["axle friction", "gear-tooth rubbing", "frame flex", "backlash"],
    steps: [
      {
        id: "frame-base",
        title: "Build a rigid base",
        instructions: [
          "Connect two long beams with at least three cross pieces so the frame cannot twist when held at one corner.",
          "Leave an open strip through the middle so both gears remain visible during testing."
        ],
        checkpoint: "Press gently on opposite corners. The frame should stay flat instead of rocking."
      },
      {
        id: "input-supports",
        title: "Raise the input supports",
        instructions: [
          "Add matching upright supports near the left side of the base, one on the front rail and one directly behind it.",
          "Choose holes at the same height so the input axle will cross the frame at a right angle."
        ],
        commonMistake: "Offset supports make the axle diagonal, which adds friction before the gears even meet."
      },
      {
        id: "input-axle",
        title: "Install the small driver",
        instructions: [
          "Slide the input axle through both supports and place the 12-tooth gear near the center of the frame.",
          "Add one spacer on each side, leaving a paper-thin gap so the axle can rotate freely."
        ],
        checkpoint: "The axle should coast briefly after a quick finger turn and should not slide sideways."
      },
      {
        id: "locate-output",
        title: "Locate the output axle",
        instructions: [
          "Hold the 36-tooth gear against the driver and find the position where the teeth overlap to about half their depth.",
          "Mark that output-axle location on both frame rails before adding supports."
        ],
        commonMistake: "A tight mesh pinches the teeth; a loose mesh allows the gears to skip under load."
      },
      {
        id: "output-axle",
        title: "Add the large driven gear",
        instructions: [
          "Build equal-height supports at the marked position and pass the second axle through them.",
          "Secure the 36-tooth gear in line with the driver, then use spacers to limit side-to-side motion."
        ],
        checkpoint: "Turn the small gear one full rotation. Every tooth should stay engaged without forcing the frame apart."
      },
      {
        id: "crank-flags",
        title: "Add the crank and flags",
        instructions: [
          "Attach the crank to the outer end of the input axle where your hand will not scrape the frame.",
          "Tape one small arrow flag to each axle and point both arrows upward at the starting position."
        ]
      },
      {
        id: "slow-test",
        title: "Run a slow mesh test",
        instructions: [
          "Turn the crank slowly through three complete rotations while watching the marked teeth.",
          "Stop immediately if a gear lifts, binds, or pushes an axle support outward; correct alignment before continuing."
        ],
        commonMistake: "Speed can hide a repeating tight spot. Diagnose at one slow turn every two seconds."
      },
      {
        id: "swap-ratio",
        title: "Swap the ratio",
        instructions: [
          "Move the crank to the 36-tooth axle so the large gear becomes the driver and the small gear becomes the output.",
          "Repeat the three-turn test and compare output rotations, turning effort, and noise."
        ],
        checkpoint: "Both arrangements should rotate smoothly, with a clear change in speed and direction."
      }
    ],
    conceptPauses: [
      {
        title: "Why this works",
        concept: "Gear ratio",
        explanation:
          "Meshing teeth move at the same contact speed. A gear with three times as many teeth must take three times as long to complete a turn, so speed decreases while ideal output torque increases.",
        observe: "Watch the arrow flags: three turns of the 12-tooth driver produce about one turn of the 36-tooth output."
      },
      {
        title: "Mechanical design note",
        concept: "Backlash and friction",
        explanation:
          "Backlash is the small free movement between teeth when direction reverses. Some clearance prevents binding, but too much clearance makes motion imprecise and can let teeth skip.",
        observe: "Reverse the crank gently and notice the tiny delay before the output flag begins moving."
      }
    ],
    mathBite: {
      title: "Calculate the speed ratio",
      formula: "speed ratio = driven teeth / driver teeth",
      variables: ["Driven teeth = 36", "Driver teeth = 12"],
      substitution: "speed ratio = 36 / 12 = 3",
      result: "The input turns three times for one ideal output turn.",
      interpretation: "At the same time, ideal output torque is about three times the input torque.",
      assumptions: "This ideal result ignores axle friction, tooth rubbing, backlash, and frame flex, so a real model delivers less than the ideal torque increase."
    },
    testing: {
      firstTest: "Turn the unloaded crank slowly for three input rotations.",
      success: "The output makes about one rotation in the reduction setup, with no skipping or visible axle wobble.",
      measure: "Count input and output rotations and record the time for ten input turns.",
      variable: "Driver and driven gear tooth counts",
      controls: "Keep the frame, axle spacing, crank speed, and paper flags unchanged.",
      trials: ["12 driving 36 teeth", "36 driving 12 teeth", "A same-size gear pair if available"]
    },
    troubleshooting: [
      { symptom: "The gears jam once per turn.", likelyCause: "One gear or axle is bent or off-center.", confirm: "Mark the tight point and rotate again to see whether it repeats at the same angle.", fix: "Reseat the gear, replace the bent axle, and square both supports." },
      { symptom: "Teeth skip under light finger resistance.", likelyCause: "The axle spacing is too wide or the frame is flexing.", confirm: "Watch whether the centers move apart when the output is held.", fix: "Move the supports one position closer or add a cross brace beside the gears." },
      { symptom: "The crank is hard to turn before the gears mesh.", likelyCause: "Bushings are squeezing the frame or an axle is diagonal.", confirm: "Remove the driven gear and test each axle separately.", fix: "Leave a thin side gap and align support holes at equal height." },
      { symptom: "The measured ratio is not exactly 3:1.", likelyCause: "The flags were not reset or partial turns were counted.", confirm: "Align both flags upward and repeat with twelve input turns.", fix: "Count full rotations from a shared start mark and average three trials." }
    ],
    tuning:
      "Tune one tradeoff at a time. Tighter spacing reduces backlash but raises friction; more bracing improves alignment but adds parts. Choose the loosest mesh that still holds under the load you plan to demonstrate.",
    extensions: [
      { level: "Easier", title: "Same-size comparison", description: "Mesh two equal gears and verify a 1:1 speed ratio with reversed direction." },
      { level: "Performance", title: "Compound reduction", description: "Add a second gear pair on a shared middle axle and predict the total ratio before testing." },
      { level: "Advanced", title: "Efficiency estimate", description: "Lift a small known mass on the output axle and compare useful output work with input work over one cycle." }
    ],
    classroomAdaptation:
      "Give teams different gear pairs but the same frame footprint. Assign a builder, rotation counter, timer, and recorder. Teams predict the ratio, collect three trials, then arrange their models from fastest output to greatest ideal torque.",
    reflectionQuestions: [
      "Why does the driven gear rotate in the opposite direction?",
      "What changed when the 36-tooth gear became the driver?",
      "Where did friction have the largest effect on your model?",
      "How would adding an idler gear change direction without changing the ideal ratio?"
    ],
    glossary: [
      { term: "Driver gear", definition: "The gear that receives the input motion." },
      { term: "Driven gear", definition: "The gear that receives motion from another gear." },
      { term: "Torque", definition: "A turning effect produced by force acting at a distance from an axis." },
      { term: "Backlash", definition: "Free movement between meshing teeth when rotation reverses." }
    ],
    relatedSlugs: ["compound-gear-train", "idler-gear-direction-reverser", "gear-ratio-race"],
    sourceType: "An original BrickLabClips interpretation of a standard spur-gear mechanism.",
    sources: [
      { label: "Mechanical mechanism reference", note: "Standard spur-gear kinematics; dimensions are specified and editorially reviewed." },
      { label: "NASA STEM: Gears", href: "https://www.grc.nasa.gov/www/k-12/Summer_Training/KaeAvenueES/Gears.html", note: "Background reference for gear direction and ratios." }
    ],
    verificationBasis: "standard-mechanism",
    advancedExtension: true,
    householdFriendly: false,
    classroomFriendly: true,
    electronicsOrCode: false,
    builderMoment: "When the ratio is correct but the axle is emotionally diagonal.",
    video: undefined
  })
] as const;
