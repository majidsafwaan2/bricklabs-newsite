import { createGuides, type GuideBlueprint } from "../blueprintFactory";
import type { MathBite, TestPlan } from "../types";

const math = (title: string, formula: string, variables: string[], substitution: string, result: string, interpretation: string, assumptions: string): MathBite => ({ title, formula, variables, substitution, result, interpretation, assumptions });
const test = (firstTest: string, success: string, measure: string, variable: string, controls: string, trials: string[]): TestPlan => ({ firstTest, success, measure, variable, controls, trials });
function electronicsMaterials(...items: [string, string, string, string, string, ...string[]]): GuideBlueprint["materials"] { return items; }

const blueprints = [
  {
    number: 101,
    title: "Simple Motorized Fan",
    slug: "simple-motorized-fan",
    difficulty: "Beginner",
    ageRange: "11-16",
    estimatedTime: "45-70 min",
    timeMinutes: 70,
    maxCost: 12,
    description: "Build a guarded low-voltage fan, switch it with a transistor, and compare airflow at two safe blade pitches.",
    hook: "A small motor turns electrical energy into rotation, but the fan only moves useful air when the blades are balanced, angled, and safely guarded.",
    outcome: "The guarded fan starts from a switch, runs for one minute without warming, and moves a tissue strip at least 20 cm away.",
    concepts: ["Electric motors", "Transistors", "Aerodynamic pitch"],
    featured: true,
    input: "switch signal and 3-volt battery current",
    output: "motor rotation and directed airflow",
    motion: "electrical energy-to-rotary blade motion",
    losses: ["bearing friction", "blade drag", "electrical resistance", "imbalance vibration"],
    principleName: "Motor-driven airflow",
    principle: "Current in the motor windings creates magnetic forces that turn the shaft. Angled blades push air backward and produce a forward airflow through the guard.",
    observe: "Hold a tissue strip at measured distances and compare movement with shallow and steeper blade pitch.",
    materials: electronicsMaterials("1|3 V hobby motor rated for two AA cells|Turn the fan", "1|two-AA battery holder with fresh alkaline cells|Supply 3 V", "1|logic-level N-channel MOSFET rated above motor current|Switch the motor safely", "1|1N4001 diode or equivalent|Suppress motor voltage spikes", "1|pushbutton plus 10 kΩ resistor|Control the MOSFET gate", "1|balanced plastic propeller made for the motor|Move air", "1|rigid mesh guard with openings smaller than fingers|Enclose the blade"),
    alternative: "Use a commercial guarded 3 V motor-and-propeller module rather than making a blade.",
    hazard: "Never run an exposed blade; disconnect power before adjustments, secure the guard, and stop if the motor, transistor, wire, or battery becomes warm.",
    accessNote: "Use a large pushbutton, pre-crimped leads, and a tactile mark on the guarded airflow side.",
    wiring: [{ from: "Battery +3 V", to: "Motor +", purpose: "Supply motor voltage" }, { from: "Motor -", to: "MOSFET drain", purpose: "Switch motor return current" }, { from: "MOSFET source", to: "Battery negative", purpose: "Complete common return" }, { from: "Diode", to: "Across motor, stripe to +3 V", purpose: "Clamp inductive voltage" }, { from: "Button and 10 kΩ resistor", to: "MOSFET gate and ground", purpose: "Create a defined on/off command" }],
    steps: ["Build the motor stand|Clamp the motor body in a low cardboard cradle without covering ventilation holes.|Point the shaft horizontally.", "Install the guard|Fix a rigid mesh cylinder around the full blade path with 15 mm clearance.|Make the guard removable only with tools.", "Wire the power stage|Connect battery positive to motor positive and motor negative to MOSFET drain.|Leave the battery pack switched off.", "Add protection|Place the diode across motor terminals with its stripe at positive.|Connect source to battery negative.", "Build the button input|Connect the button from battery positive to gate and 10 kΩ from gate to ground.|Label the common ground.", "Check before blades|Use a multimeter for shorts, then pulse the bare motor for one second.|Confirm correct direction and no heating.", "Fit and enclose the propeller|Press the balanced propeller onto the shaft and close the guard completely.|Rotate by hand to confirm clearance.", "Run airflow trials|Operate for 10, 30, then 60 seconds while checking temperature.|Measure the farthest tissue movement."],
    math: math("Estimate motor electrical power", "power = voltage × current", ["Voltage = 3.0 V", "Running current = 0.20 A"], "power = 3.0 × 0.20 = 0.60 W", "The motor draws about 0.60 watts electrically.", "Only part becomes useful airflow.", "Current changes with blade load and battery condition."),
    test: test("Pulse the bare motor for one second before fitting the guarded propeller.", "The fan runs one minute without warming and moves tissue at 20 cm.", "Current, temperature by careful touch after power-off, noise, vibration, and airflow distance.", "blade pitch", "motor, voltage, guard, tissue, room, and run time", ["shallow pitch", "medium pitch", "manufacturer propeller pitch"]),
    failures: ["The motor does not start|Gate is low or ground is missing|Measure gate-to-source voltage while pressed|Reconnect button and common ground", "The transistor warms|MOSFET is unsuitable or motor is stalled|Measure current with blade removed|Use a rated logic MOSFET and clear obstruction", "The fan vibrates|Propeller is bent or off-center|Rotate slowly by hand|Replace and reseat the balanced propeller", "Airflow is weak|Rotation is backward or pitch is low|Check tissue on both guard sides|Reverse motor leads with power off or use correct propeller"],
    tuning: "Reduce vibration and guard rubbing before increasing pitch. Steeper blades can move more air but demand more current and may stall a small motor.",
    extensions: ["Easier|Commercial module|Measure airflow from a pre-guarded fan.", "Performance|Two-speed control|Add a rated series resistor or PWM controller.", "Advanced|Efficiency proxy|Compare airflow distance with measured electrical power."],
    related: ["hand-crank-cardboard-desk-fan", "cardboard-wind-turbine", "automatic-night-light"],
    builderMoment: "The fan moved plenty of air after the propeller agreed to face the useful direction."
  },
  {
    number: 102,
    title: "Low-Cost Robot Arm",
    slug: "low-cost-robot-arm",
    difficulty: "Advanced",
    ageRange: "13-18",
    estimatedTime: "150-220 min",
    timeMinutes: 220,
    maxCost: 35,
    description: "Build a two-joint cardboard arm with two low-voltage servos, a simple claw, and constrained motion controls.",
    hook: "A robot arm is a chain of rotating joints. Every joint carries the mass beyond it, so link length, servo torque, balance, and motion limits must be designed together.",
    outcome: "The arm moves through a programmed pick-and-place cycle and relocates a 20-gram foam block between two marked zones five times.",
    concepts: ["Servo control", "Torque", "Kinematic chains"],
    input: "microcontroller pulse commands",
    output: "shoulder, elbow, and claw position",
    motion: "electrical commands-to-multi-joint angular motion",
    losses: ["servo backlash", "link flex", "joint friction", "off-axis loading"],
    principleName: "Serial-link manipulation",
    principle: "Each joint rotates every link after it. The shoulder experiences the largest load because it must support the elbow, claw, payload, and their distances from the pivot.",
    observe: "Move one joint at a time and watch how the end-effector traces an arc rather than a straight line.",
    materials: electronicsMaterials("2|5 V micro servos rated at least 1.5 kg·cm|Drive shoulder and elbow", "1|5 V micro servo|Open and close the claw", "1|microcontroller board with three PWM-capable pins|Send position commands", "1|regulated 5 V, 2 A battery pack|Power servos separately", "1|USB power or data cable|Program the controller", "4|double-layer cardboard links 4 × 15 cm|Form the arm", "1|wide weighted base|Prevent tipping"),
    alternative: "Build the same arm with string tendons and hand levers before adding servos.",
    hazard: "Use only 5 V power, disconnect before wiring, keep fingers out of joints, set conservative software limits, and never lift living things or heavy objects.",
    accessNote: "Use large on-screen angle controls, pre-cut link pairs, and a one-button automatic cycle.",
    wiring: [{ from: "5 V supply +", to: "All servo red wires", purpose: "Provide rated servo power" }, { from: "5 V supply -", to: "Servo grounds and controller GND", purpose: "Create required common ground" }, { from: "Controller PWM 3", to: "Shoulder signal", purpose: "Command base joint" }, { from: "Controller PWM 5", to: "Elbow signal", purpose: "Command second joint" }, { from: "Controller PWM 6", to: "Claw signal", purpose: "Command gripper" }],
    steps: ["Build the base|Laminate a wide base and add ballast away from moving links.|Mark the shoulder axis at center.", "Make equal link pairs|Laminate two 15 cm beams and add reinforced servo-horn holes.|Keep left and right faces parallel.", "Mount the shoulder servo|Capture its body between side plates and support the output horn.|Do not use the servo shaft as the only frame support.", "Add the elbow|Attach the second servo at the first link end and route its cable with a loose loop.|Check full motion by hand with power off.", "Build the claw|Create two lightweight jaws driven by the third servo horn and a connecting link.|Add soft pads and hard stops.", "Wire power correctly|Power servos from the 5 V supply and join its ground to controller ground.|Do not draw servo current from a controller logic pin.", "Calibrate safe angles|Upload a slow one-joint-at-a-time sweep and record non-binding limits.|Stop before links touch the frame.", "Program pick and place|Move through home, approach, close, lift, target, release, and home.|Run first with no payload, then a 20-gram block."],
    math: math("Estimate shoulder torque", "torque = force × distance", ["Moving mass = 0.10 kg", "Force ≈ 0.98 N", "Center distance = 0.12 m"], "torque = 0.98 × 0.12 = 0.118 N·m", "The shoulder needs at least 0.118 newton-metres before safety margin.", "Choose a servo with significantly more rated torque.", "This treats the moving mass as one point and ignores acceleration."),
    test: test("Run every joint slowly through calibrated limits with no payload.", "The arm moves a 20-gram foam block between zones five times without tipping or stalling.", "Pick success, joint angles, cycle time, base movement, and servo temperature.", "one link length or motion speed", "power, payload, base, angle limits, claw, and target locations", ["no payload", "10 g foam block", "20 g foam block"]),
    failures: ["The controller resets|Servo current drops the logic supply|Watch power LED during motion|Use separate regulated servo power with common ground", "The shoulder buzzes|Command exceeds a hard stop or torque is too high|Power off and move links by hand|Reduce limits and shorten or lighten links", "The claw drops the block|Jaw path or padding is poor|Close slowly around the block|Adjust linkage and add compliant pads", "The base tips|Center of mass leaves the footprint|Hold at worst pose without power|Widen and ballast the base"],
    tuning: "Shorter, lighter links improve torque margin and repeatability. Faster moves reduce cycle time but increase inertia, power peaks, and overshoot.",
    extensions: ["Easier|One-joint arm|Operate a shoulder and passive scoop.", "Performance|Motion smoothing|Interpolate angles in small timed increments.", "Advanced|Inverse-position table|Measure reachable coordinates and build a lookup map."],
    related: ["servo-powered-claw", "water-hydraulic-cardboard-robot-arm", "linkage-grabber-arm"],
    builderMoment: "The arm completed pick-and-place, then returned home with the dignity of a much larger machine.",
    advancedExtension: true,
    code: { language: "cpp", filename: "robot_arm_cycle.ino", explanation: "A complete Arduino-style sequence with conservative angles and gradual servo motion.", source: `#include <Servo.h>
Servo shoulder, elbow, claw;
int shoulderPos = 80, elbowPos = 95, clawPos = 35;
void moveServo(Servo &motor, int &current, int target) {
  int direction = target > current ? 1 : -1;
  while (current != target) { current += direction; motor.write(current); delay(20); }
}
void setup() {
  shoulder.attach(3); elbow.attach(5); claw.attach(6);
  shoulder.write(shoulderPos); elbow.write(elbowPos); claw.write(clawPos);
  delay(1000);
}
void loop() {
  moveServo(shoulder, shoulderPos, 62);
  moveServo(elbow, elbowPos, 120);
  moveServo(claw, clawPos, 72);
  moveServo(elbow, elbowPos, 82);
  moveServo(shoulder, shoulderPos, 110);
  moveServo(elbow, elbowPos, 112);
  moveServo(claw, clawPos, 35);
  moveServo(elbow, elbowPos, 95);
  moveServo(shoulder, shoulderPos, 80);
  delay(2500);
}` }
  },
  {
    number: 103,
    title: "Bristlebot",
    slug: "bristlebot",
    difficulty: "Beginner",
    ageRange: "11-16",
    estimatedTime: "35-55 min",
    timeMinutes: 55,
    maxCost: 10,
    description: "Offset a tiny motor mass to create vibration and tune angled bristles into directional motion.",
    hook: "The motor does not drive wheels. Its off-center mass shakes the body, and tilted bristles turn that vibration into many tiny forward slips.",
    outcome: "The enclosed bristlebot travels at least 50 cm on a smooth tray in 30 seconds and keeps its battery and motor secured.",
    concepts: ["Vibration", "Asymmetric friction", "Center of mass"],
    input: "3-volt motor rotation with an eccentric mass",
    output: "small forward body motion",
    motion: "rotary imbalance-to-vibration-to-translation",
    losses: ["random bouncing", "bristle drag", "battery movement", "motor bearing friction"],
    principleName: "Vibration-driven locomotion",
    principle: "An off-center rotating mass creates a changing force. Angled bristles grip differently during each vibration direction, producing a small net step over many cycles.",
    observe: "Rotate the bristle angle and compare whether the bot moves forward, backward, or turns.",
    materials: electronicsMaterials("1|small toothbrush head with straight trimmed edges|Provide angled bristles", "1|3 V coin vibration motor with insulated leads|Create safe vibration", "1|two-AAA switched battery holder|Supply 3 V", "1|small offset foam mass supplied with motor or secure putty speck|Create imbalance", "1|foam tape and cable tie|Secure parts", "1|large shallow tray|Contain motion"),
    alternative: "Use a commercial enclosed vibration motor rather than attaching a loose mass to an exposed shaft.",
    hazard: "Use an enclosed vibration motor, secure every component, keep small batteries under adult control, and stop if anything warms or loosens.",
    accessNote: "Use a large slide switch and build on a tray with bold direction marks.",
    wiring: [{ from: "Battery +3 V", to: "Slide switch input", purpose: "Provide controlled positive supply" }, { from: "Switch output", to: "Motor positive", purpose: "Turn vibration on and off" }, { from: "Motor negative", to: "Battery negative", purpose: "Complete low-voltage circuit" }],
    steps: ["Prepare the brush|Have an adult remove and smooth the toothbrush handle.|Keep a broad bristle base.", "Inspect the motor|Confirm insulated leads and enclosed eccentric mass.|Do not run a bare unbalanced shaft.", "Place components|Lay motor and battery over the bristle base and find a centered arrangement.|Keep switch reachable.", "Wire with power off|Connect battery positive through the switch to motor positive and motor negative to battery negative.|Insulate every joint.", "Secure the motor|Use foam tape plus a cable tie around the brush body.|Keep moving motor shell clear.", "Secure the battery|Strap the holder so it cannot shift during vibration.|Provide a removable battery compartment.", "Run a tray test|Switch on for five seconds inside a shallow tray.|Stop and inspect every attachment.", "Tune direction|Change bristle angle by gently warming only with adult-approved methods or add a small rear skid.|Run three 30-second trials."],
    math: math("Calculate average speed", "speed = distance / time", ["Distance = 0.60 m", "Time = 30 s"], "speed = 0.60 / 30 = 0.020 m/s", "The bristlebot averages 2 centimetres per second.", "Direction may wander even with the same average speed.", "The path length is approximated by straight-line distance."),
    test: test("Run for five seconds in a large tray before any timed trial.", "The bot travels 50 cm in 30 seconds with all components secured.", "Straight-line distance, path direction, current, and attachment movement.", "bristle angle or small ballast position", "motor, voltage, tray, run time, battery, and start orientation", ["no ballast", "ballast forward", "ballast rearward"]),
    failures: ["It vibrates in place|Bristles are too vertical or motion is symmetric|View from the side|Angle bristles or shift mass slightly", "It spins in circles|Mass or bristle field is asymmetric|Rotate the body 180 degrees and repeat|Recenter components and trim bristles evenly", "The motor stops|Connection is loose under vibration|Wiggle wires with power off|Add strain relief and reconnect", "Parts move|Tape alone is inadequate|Mark positions before a short run|Add a mechanical strap"],
    tuning: "Secure the electrical parts before chasing speed. More vibration can increase motion but also increases wandering, noise, current, and attachment stress.",
    extensions: ["Easier|Direction observation|Compare two brush heads without a race.", "Performance|Straight-lane goal|Stay within a 20 cm-wide track.", "Advanced|Vibration isolation|Add foam layers and compare body motion with measured speed."],
    related: ["scribblebot", "drawbot", "simple-motorized-fan"],
    builderMoment: "The bristlebot moved forward by vibrating with remarkable administrative persistence."
  },
  {
    number: 104,
    title: "Bumper-Switch Rover",
    slug: "bumper-switch-rover",
    difficulty: "Intermediate",
    ageRange: "12-17",
    estimatedTime: "90-140 min",
    timeMinutes: 140,
    maxCost: 30,
    description: "Build a two-motor rover whose front bumpers trigger a timed reverse-and-turn escape behavior.",
    hook: "The rover cannot see an obstacle, but it can feel one. Two bump switches act as binary sensors, and state logic turns a collision into a controlled recovery.",
    outcome: "The rover detects left and right bumper presses and escapes a three-sided test area without motor stalls in four of five trials.",
    concepts: ["Digital sensors", "State machines", "Differential drive"],
    input: "left or right bumper switch closure",
    output: "motor reverse and turn sequence",
    motion: "electrical state-to-differential wheel motion",
    losses: ["wheel slip", "gearbox friction", "bumper flex", "timing variation"],
    principleName: "Reactive control",
    principle: "A normally open switch changes a digital input when the bumper touches an obstacle. The controller enters a brief reverse state, then turns away before returning to forward motion.",
    observe: "Press each bumper by hand with wheels raised and confirm the turn direction before floor testing.",
    materials: electronicsMaterials("1|two-wheel low-voltage rover chassis with caster|Support differential drive", "2|3-6 V geared motors|Drive wheels", "1|dual H-bridge driver rated for motor stall current|Reverse motors safely", "1|microcontroller board|Read switches and command driver", "2|normally open lever switches|Sense bumper sides", "1|4-cell NiMH holder or regulated 5-6 V pack|Power motors", "2|wide cardboard bumper paddles|Transfer contact to switches"),
    alternative: "Use a commercial two-motor classroom rover chassis and clip-on switches while keeping the control logic original.",
    hazard: "Use low voltage only, test wheels raised first, fuse or limit motor current, disconnect before wiring, and stop immediately if a motor or driver warms.",
    accessNote: "Use large switch paddles, color-coded wires, and a tabletop button that runs one test cycle.",
    wiring: [{ from: "Battery motor supply", to: "H-bridge VM and GND", purpose: "Power motors within driver rating" }, { from: "Controller GND", to: "H-bridge and battery GND", purpose: "Create common reference" }, { from: "Controller pins 5-8", to: "H-bridge direction inputs", purpose: "Command both motor directions" }, { from: "Left switch", to: "Pin 2 and GND", purpose: "Active-low left collision input" }, { from: "Right switch", to: "Pin 3 and GND", purpose: "Active-low right collision input" }],
    steps: ["Build and roll the chassis|Assemble the rover and turn each wheel by hand.|Correct rubbing before wiring.", "Mount the bumpers|Hinge broad left and right paddles so each presses one switch.|Add stops to protect switch levers.", "Wire the driver|Connect motors to H-bridge outputs and the rated battery to motor supply.|Join all grounds.", "Connect control pins|Wire four direction inputs and two switches using internal pull-ups.|Label every lead.", "Test wheels raised|Run forward, reverse, left turn, and right turn for one second each.|Correct polarity in code rather than crossing random wires.", "Test bumper states|Press left and right switches while watching serial output or indicator LED.|Confirm each input is distinct.", "Tune escape timing|On the floor, begin with 300 ms reverse and 350 ms turn.|Use soft box walls in a clear area.", "Run five enclosure trials|Start from the same center mark and record successful escapes.|Stop after any stall or warm component."],
    math: math("Estimate pivot turn", "turn angle ≈ wheel travel difference / track width", ["Wheel travel difference = 0.16 m", "Track width = 0.12 m"], "angle ≈ 0.16 / 0.12 = 1.33 rad ≈ 76°", "The timed wheel difference produces roughly a 76-degree ideal turn.", "Wheel slip makes real angle smaller and variable.", "This uses a simplified differential-drive model."),
    test: test("Raise the rover so wheels spin freely and test each direction for one second.", "The rover reacts to both bumpers and escapes four of five soft-wall trials without stalling.", "Detection side, reverse distance, turn angle, escape success, and current.", "turn duration", "rover, battery, motor speed, floor, walls, and start point", ["250 ms", "350 ms", "450 ms"]),
    failures: ["The rover turns toward the obstacle|Motor polarity or switch mapping is reversed|Press one bumper with wheels raised|Swap mapping in code", "A switch stays pressed|Bumper hinge or stop binds|Release by hand and listen for click|Loosen hinge and add return band", "Controller resets|Motor noise or voltage sag affects logic|Watch power LED at reversal|Use decoupling and separate regulated logic supply", "The driver warms|Motor current exceeds rating or wheels stall|Measure wheel-free current|Use rated driver and remove mechanical load"],
    tuning: "Reliable sensing comes before speed. Longer reverse and turn times improve clearance but increase cycle time and may create new collisions in tight spaces.",
    extensions: ["Easier|Single bumper|Reverse and turn one fixed direction.", "Performance|Maze box|Measure escapes from three start orientations.", "Advanced|Nonblocking states|Replace delays with timed state transitions so sensors stay responsive."],
    related: ["differential-steer-rover-chassis", "line-following-robot", "light-seeking-robot"],
    builderMoment: "The rover met the wall, processed the feedback, and chose a different career path.",
    code: { language: "cpp", filename: "bumper_rover.ino", explanation: "Complete active-low bumper logic for a dual H-bridge with conservative timed recovery.", source: `const int leftBumper=2, rightBumper=3;
const int leftA=5, leftB=6, rightA=7, rightB=8;
void motors(int l, int r){
  digitalWrite(leftA,l>0); digitalWrite(leftB,l<0);
  digitalWrite(rightA,r>0); digitalWrite(rightB,r<0);
}
void setup(){
  pinMode(leftBumper,INPUT_PULLUP); pinMode(rightBumper,INPUT_PULLUP);
  pinMode(leftA,OUTPUT); pinMode(leftB,OUTPUT); pinMode(rightA,OUTPUT); pinMode(rightB,OUTPUT);
}
void loop(){
  bool leftHit=!digitalRead(leftBumper), rightHit=!digitalRead(rightBumper);
  if(leftHit || rightHit){
    motors(-1,-1); delay(300); motors(0,0); delay(80);
    if(leftHit){ motors(-1,1); } else { motors(1,-1); }
    delay(350); motors(0,0); delay(80);
  } else { motors(1,1); }
}` }
  },
  {
    number: 105,
    title: "Line-Following Robot",
    slug: "line-following-robot",
    difficulty: "Advanced",
    ageRange: "13-18",
    estimatedTime: "140-220 min",
    timeMinutes: 220,
    maxCost: 45,
    description: "Use two reflectance sensors and differential motor control to follow a high-contrast tabletop track.",
    hook: "The robot never knows the whole route. It repeatedly measures the line under two sensors and makes small steering corrections, turning feedback into smooth motion.",
    outcome: "The robot completes a 3-metre high-contrast loop twice without leaving the line for more than one second.",
    concepts: ["Feedback", "Reflectance sensors", "Proportional control"],
    input: "left and right reflectance measurements",
    output: "differential wheel-speed corrections",
    motion: "sensor feedback-to-steered vehicle motion",
    losses: ["wheel slip", "sensor noise", "motor mismatch", "control delay"],
    principleName: "Closed-loop line control",
    principle: "The controller compares left and right reflectance. Their difference becomes a steering error, and proportional correction speeds one wheel while slowing the other.",
    observe: "Print or display raw sensor values over white and black surfaces before choosing a threshold or gain.",
    materials: electronicsMaterials("1|two-wheel geared rover chassis|Provide differential drive", "2|3-6 V geared motors and matching wheels|Move the robot", "1|dual H-bridge rated above stall current|Control motor direction and speed", "1|microcontroller with two analog inputs and two PWM outputs|Run feedback loop", "2|reflectance sensors rated for controller voltage|Measure track contrast", "1|regulated motor battery pack within driver rating|Supply power", "3 m|matte black tape on white board|Create track"),
    alternative: "Use a classroom line-follower kit while calibrating and writing the control logic yourself.",
    hazard: "Use low voltage, support the robot during first motor tests, protect sensors from short circuits, and stop if any motor, driver, or battery warms.",
    accessNote: "Use a wide 4 cm line, color-and-tactile wire labels, and serial calibration output with large text.",
    wiring: [{ from: "Battery +", to: "H-bridge motor supply", purpose: "Power motors within rated voltage" }, { from: "All grounds", to: "Controller, driver, sensors, battery negative", purpose: "Create common reference" }, { from: "Sensors outputs", to: "Analog A0 and A1", purpose: "Measure left and right reflectance" }, { from: "Controller PWM 5 and 6", to: "H-bridge speed inputs", purpose: "Set left and right wheel speed" }, { from: "Controller direction pins", to: "H-bridge direction inputs", purpose: "Command forward motor polarity" }],
    steps: ["Build a straight rover|Align both axle centers and match wheel diameters.|Roll unpowered through a 1-metre lane.", "Mount the sensor bar|Place sensors 15-25 mm apart and 5-10 mm above the floor.|Keep them ahead of the wheel axle.", "Wire the motor stage|Connect motors through the H-bridge and use common ground.|Do not power motors from controller pins.", "Wire and inspect sensors|Connect each sensor at its rated voltage and route outputs to A0 and A1.|Add strain relief.", "Calibrate surfaces|Read 100 samples over line and background for each sensor.|Choose midpoint thresholds or normalized ranges.", "Test motor matching|Command equal low PWM with wheels raised, then on a straight lane.|Record drift and apply a small trim.", "Tune proportional steering|Start with low base speed and correction gain.|Increase gain until turns work without rapid oscillation.", "Run full-loop trials|Complete two loops and log line-loss locations.|Change only speed or gain between tests."],
    math: math("Normalize a sensor reading", "normalized = (reading - white) / (black - white)", ["Reading = 600", "White = 200", "Black = 800"], "normalized = (600 - 200) / (800 - 200) = 0.67", "The reading is about two-thirds of the calibrated dark range.", "Normalization lets mismatched sensors use a comparable scale.", "Lighting and sensor height can shift endpoints."),
    test: test("Calibrate sensor values with motors disconnected.", "The robot completes two 3-metre loops without a line loss longer than one second.", "Lap time, line losses, steering oscillation, and sensor ranges.", "proportional gain", "track, lighting, sensor height, base speed, battery, and tires", ["low gain", "medium gain", "higher stable gain"]),
    failures: ["It drives off on curves|Gain is low, speed high, or sensors too close|Review readings at curve entry|Lower speed, raise gain, or widen sensor spacing", "It wiggles rapidly|Gain is too high or delay too long|Run on a straight line|Reduce gain and loop delay", "One side always wins|Motors or sensors are mismatched|Swap sensor positions and retest|Normalize sensors and add motor trim", "Values change with room light|Sensor shielding or height is poor|Cover with a paper hood|Add shielding and recalibrate"],
    tuning: "Calibrate at the actual sensor height and lighting before changing control gain. Faster base speed shortens reaction time and requires cleaner sensing and stronger correction.",
    extensions: ["Easier|Bang-bang control|Use three states: left, right, and forward.", "Performance|Fastest clean lap|Penalize every line loss.", "Advanced|PID control|Add derivative damping and compare oscillation."],
    related: ["bumper-switch-rover", "light-seeking-robot", "differential-steer-rover-chassis"],
    builderMoment: "The robot followed the line perfectly until the tape corner offered a philosophical question.",
    advancedExtension: true,
    code: { language: "cpp", filename: "line_follower.ino", explanation: "A complete two-sensor proportional controller. Set calibration values from your own readings before running.", source: `const int leftSensor=A0, rightSensor=A1;
const int leftPwm=5, rightPwm=6, leftDir=7, rightDir=8;
const int whiteL=220, blackL=810, whiteR=205, blackR=790;
const int baseSpeed=105; const float gain=85.0;
float normalized(int value,int whiteValue,int blackValue){
  return constrain((float)(value-whiteValue)/(blackValue-whiteValue),0.0,1.0);
}
void setup(){
  pinMode(leftPwm,OUTPUT); pinMode(rightPwm,OUTPUT);
  pinMode(leftDir,OUTPUT); pinMode(rightDir,OUTPUT);
  digitalWrite(leftDir,HIGH); digitalWrite(rightDir,HIGH);
}
void loop(){
  float left=normalized(analogRead(leftSensor),whiteL,blackL);
  float right=normalized(analogRead(rightSensor),whiteR,blackR);
  int correction=(int)(gain*(left-right));
  analogWrite(leftPwm,constrain(baseSpeed-correction,0,200));
  analogWrite(rightPwm,constrain(baseSpeed+correction,0,200));
  delay(8);
}` }
  },
  {
    number: 106,
    title: "Light-Seeking Robot",
    slug: "light-seeking-robot",
    difficulty: "Advanced",
    ageRange: "13-18",
    estimatedTime: "130-200 min",
    timeMinutes: 200,
    maxCost: 45,
    description: "Compare two light sensors and steer a differential-drive rover toward a diffuse flashlight target.",
    hook: "Two sensors create a directional clue: if the left sees more light, steer left. A center divider sharpens that difference and turns simple comparison into behavior.",
    outcome: "The robot turns toward a diffuse stationary light from three starting headings and stops within 30 cm in four of five trials.",
    concepts: ["Sensor comparison", "Feedback", "Behavior robotics"],
    input: "left and right light-sensor readings",
    output: "steering toward higher light intensity",
    motion: "light gradient-to-differential wheel motion",
    losses: ["ambient light", "sensor mismatch", "wheel slip", "motor mismatch"],
    principleName: "Differential light sensing",
    principle: "A divider creates a small shadow difference between paired sensors. The controller uses their normalized difference to steer toward the brighter side.",
    observe: "Rotate the unpowered robot in place and graph both sensor values before enabling motors.",
    materials: electronicsMaterials("1|two-wheel rover chassis|Provide mobile platform", "2|geared low-voltage motors|Drive wheels", "1|rated dual H-bridge|Control motors", "1|microcontroller with two analog inputs|Compare sensors", "2|matched photoresistor divider modules or analog light sensors|Measure light", "1|opaque 4 cm sensor divider|Create directional shading", "1|diffused LED flashlight|Provide a safe target"),
    alternative: "Mount the paired sensors on a hand-held pointer and display direction before building a rover.",
    hazard: "Use low-voltage power and a normal diffused flashlight; never use lasers or stare into high-intensity LEDs.",
    accessNote: "Use audible left/right indicators during calibration and high-contrast sensor labels.",
    wiring: [{ from: "Light sensor outputs", to: "Analog A0 and A1", purpose: "Measure left and right brightness" }, { from: "Sensor power", to: "Rated controller VCC and GND", purpose: "Supply matched sensor dividers" }, { from: "Controller PWM/direction", to: "Dual H-bridge inputs", purpose: "Set differential motor motion" }, { from: "Motor battery", to: "H-bridge supply", purpose: "Power motors separately" }, { from: "All grounds", to: "Common ground", purpose: "Share voltage reference" }],
    steps: ["Build and align the rover|Match wheels and confirm straight unpowered rolling.|Keep the front deck clear.", "Mount paired sensors|Place sensors side by side with an opaque divider centered between them.|Aim both level and forward.", "Wire sensors and driver|Use rated sensor voltage, H-bridge motor power, and common ground.|Label left and right channels.", "Calibrate darkness|Record each sensor under even room light and under the target at equal distance.|Normalize mismatched ranges.", "Test direction readings|Rotate the robot through left, center, and right positions with motors off.|Confirm the expected sign of error.", "Run wheels raised|Command slow left and right corrections from a moved flashlight.|Verify steering direction.", "Add stop behavior|Use average brightness or an ultrasonic limit to stop near the source.|Start with a conservative threshold.", "Run three-heading trials|Begin left, right, and backward from the same radius.|Record approach, final distance, and false turns."],
    math: math("Calculate directional error", "error = normalized left - normalized right", ["Left = 0.75", "Right = 0.45"], "error = 0.75 - 0.45 = 0.30", "A positive 0.30 error commands a leftward correction.", "Larger error can produce a stronger turn.", "Reflections and sensor mismatch affect the reading."),
    test: test("Rotate the unpowered robot while logging both sensor values.", "The robot approaches the diffuse target from three headings and stops within 30 cm in four of five runs.", "Direction error, approach time, final distance, and false turns.", "sensor divider depth", "robot, room, target brightness, starting radius, speed, and battery", ["2 cm divider", "4 cm divider", "6 cm divider"]),
    failures: ["It turns away|Sensor labels or motor correction sign is reversed|Move light to one side with wheels raised|Swap mapping in code", "It oscillates|Gain is high or sensors are too sensitive|Test from directly ahead|Reduce gain and average samples", "It follows room reflections|Target contrast is low|Map readings with target off|Dim stray light and use a diffuser", "It never stops|Threshold is unreachable or sensors saturate|Read values at 30 cm|Set threshold from measured data"],
    tuning: "Improve sensor matching and shielding before raising steering gain. A deeper divider gives stronger direction contrast but creates a blind zone when the target is centered.",
    extensions: ["Easier|Stationary pointer|Use LEDs to show brighter side.", "Performance|Fast approach|Minimize time without overshoot.", "Advanced|Search state|Rotate slowly when both sensors are below a measured threshold."],
    related: ["line-following-robot", "automatic-night-light", "bumper-switch-rover"],
    builderMoment: "The robot found the light and briefly considered every reflective table leg along the way.",
    advancedExtension: true,
    code: { language: "cpp", filename: "light_seeker.ino", explanation: "A complete normalized two-sensor steering loop with a measured stop threshold.", source: `const int leftLight=A0, rightLight=A1;
const int leftPwm=5, rightPwm=6, leftDir=7, rightDir=8;
const int baseSpeed=95, stopLevel=850;
void setup(){
  pinMode(leftPwm,OUTPUT); pinMode(rightPwm,OUTPUT);
  pinMode(leftDir,OUTPUT); pinMode(rightDir,OUTPUT);
  digitalWrite(leftDir,HIGH); digitalWrite(rightDir,HIGH);
}
void loop(){
  int left=analogRead(leftLight), right=analogRead(rightLight);
  int average=(left+right)/2;
  if(average>stopLevel){ analogWrite(leftPwm,0); analogWrite(rightPwm,0); return; }
  int correction=constrain((left-right)/3,-70,70);
  analogWrite(leftPwm,constrain(baseSpeed-correction,0,180));
  analogWrite(rightPwm,constrain(baseSpeed+correction,0,180));
  delay(15);
}` }
  },
  {
    number: 107,
    title: "Microcontroller Servo Pointer",
    slug: "microcontroller-servo-pointer",
    difficulty: "Beginner",
    ageRange: "11-16",
    estimatedTime: "45-70 min",
    timeMinutes: 70,
    maxCost: 18,
    description: "Turn a knob to position a low-voltage servo pointer and calibrate command values against measured angles.",
    hook: "A potentiometer creates a variable voltage, the microcontroller converts it into a number, and a servo closes its own internal position loop to point at a matching angle.",
    outcome: "The pointer tracks five labeled knob positions from 20 to 160 degrees with average error below 8 degrees.",
    concepts: ["Analog input", "Mapping", "Servo feedback"],
    input: "potentiometer shaft angle",
    output: "servo pointer angle",
    motion: "analog rotation-to-commanded angular position",
    losses: ["servo backlash", "potentiometer noise", "pointer flex", "mount movement"],
    principleName: "Input mapping",
    principle: "The analog-to-digital converter measures knob voltage from 0 to its maximum count. Code maps that range to safe servo angles, and the servo's internal controller holds the requested position.",
    observe: "Move the knob slowly through five marks and compare commanded angle with a paper protractor.",
    materials: electronicsMaterials("1|5 V micro servo|Position the pointer", "1|microcontroller board|Read and map input", "1|10 kΩ linear potentiometer|Provide analog control", "1|regulated 5 V supply rated at least 1 A|Power servo", "1|paper pointer under 10 cm|Show angle", "1|printed paper protractor|Measure output"),
    alternative: "Use two pushbuttons to step the pointer if a potentiometer is unavailable.",
    hazard: "Use only 5 V, connect common ground, keep fingers clear of the servo horn, and set software angle limits before attaching the pointer.",
    accessNote: "Use a large knob, tactile position marks, and an optional five-button preset control.",
    wiring: [{ from: "Potentiometer ends", to: "5 V and GND", purpose: "Create reference voltage range" }, { from: "Potentiometer wiper", to: "Analog A0", purpose: "Measure knob position" }, { from: "Servo signal", to: "PWM pin 9", purpose: "Send position pulse" }, { from: "Servo power", to: "Regulated 5 V and GND", purpose: "Supply servo current" }, { from: "Controller GND", to: "Servo supply GND", purpose: "Create common signal reference" }],
    steps: ["Build the dial|Mount the potentiometer through a card panel and add five knob marks.|Prevent the body from rotating.", "Mount the servo|Fix the servo behind a protractor with its shaft centered at the origin.|Leave horn access.", "Wire the input|Connect potentiometer ends to 5 V and ground and the wiper to A0.|Check resistance with power off.", "Wire servo power|Use regulated 5 V for the servo and join grounds with the controller.|Connect signal to pin 9.", "Upload safe mapping|Map analog values to 20-160 degrees and add a short delay.|Test without the pointer.", "Attach at center|Set the knob and servo to midpoint, then attach the pointer at 90 degrees.|Tighten without bending the horn.", "Calibrate five marks|Record measured angle at five knob positions.|Note backlash when approaching from each direction.", "Reduce error|Average several readings or adjust endpoint values.|Repeat the five-point test."],
    math: math("Map an analog value", "angle = 20° + reading / 1023 × 140°", ["Reading = 512", "Output span = 140°"], "angle = 20 + 512 / 1023 × 140 ≈ 90°", "A midpoint reading commands about 90 degrees.", "Endpoint limits protect the mechanism.", "ADC noise and servo calibration change real angle."),
    test: test("Move the servo with no pointer through 20, 90, and 160 degrees.", "Five output positions have average absolute error below 8 degrees.", "Commanded angle, measured angle, error, jitter, and direction of approach.", "number of analog samples averaged", "servo, supply, pointer, protractor, endpoints, and knob marks", ["one sample", "five-sample average", "ten-sample average"]),
    failures: ["The servo jitters|Input voltage is noisy or ground missing|Hold knob still and log values|Join grounds and average samples", "Angles are reversed|Potentiometer ends are swapped|Turn clockwise and watch reading|Swap the two end connections", "Pointer hits the frame|Limits are too wide or horn misaligned|Test with pointer removed|Reduce endpoints and recenter horn", "Controller resets|Servo supply sags|Watch power indicator during movement|Use rated separate 5 V servo supply with common ground"],
    tuning: "Use measured safe endpoints and attach the pointer only after centering. More averaging reduces jitter but adds response delay.",
    extensions: ["Easier|Three presets|Use buttons for 30, 90, and 150 degrees.", "Performance|Calibration curve|Correct systematic error at five points.", "Advanced|Rate limit|Move toward target gradually to control pointer speed."],
    related: ["servo-powered-claw", "low-cost-robot-arm", "traffic-light-controller"],
    builderMoment: "The pointer reached 90 degrees and requested that everyone stop touching the knob."
    ,code: { language: "cpp", filename: "servo_pointer.ino", explanation: "A complete filtered analog-to-servo mapping with conservative endpoints.", source: `#include <Servo.h>
Servo pointerServo;
void setup(){ pointerServo.attach(9); pointerServo.write(90); delay(500); }
void loop(){
  long total=0;
  for(int i=0;i<8;i++){ total += analogRead(A0); delay(2); }
  int reading=total/8;
  int angle=map(reading,0,1023,20,160);
  pointerServo.write(constrain(angle,20,160));
  delay(15);
}` }
  },
  {
    number: 108,
    title: "Traffic Light Controller",
    slug: "traffic-light-controller",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "45-70 min",
    timeMinutes: 70,
    maxCost: 12,
    description: "Program red, yellow, and green LEDs as a timed state machine with a pedestrian request button.",
    hook: "A traffic light is not three independent timers. It is a sequence of named states with safe transitions, and a button request should change when the sequence advances rather than interrupting it unpredictably.",
    outcome: "The model cycles through valid light states, accepts one pedestrian request, and never illuminates red and green together.",
    concepts: ["State machines", "Digital output", "Event flags"],
    input: "elapsed time and pedestrian button event",
    output: "safe red-yellow-green LED sequence",
    motion: "digital events-to-visible state changes",
    losses: ["button bounce", "timing drift", "wiring errors", "blocking delays"],
    principleName: "Finite-state control",
    principle: "The program stores one current state and transitions only along allowed paths. A button sets a request flag that is handled at a safe point in the cycle.",
    observe: "Write the current state beside each LED pattern and confirm there is no direct green-to-red transition without yellow.",
    materials: electronicsMaterials("1|microcontroller board|Run the state machine", "1 each|red, yellow, and green 5 mm LEDs|Display vehicle state", "3|220-330 Ω resistors|Limit LED current", "1|normally open pushbutton|Request pedestrian phase", "1|breadboard and jumper wires|Create temporary circuit", "1|USB power source|Supply 5 V logic"),
    alternative: "Use a block-coding microcontroller board with built-in LEDs and button.",
    hazard: "Use USB or battery low voltage only, include one resistor per external LED, and disconnect before changing wiring.",
    accessNote: "Arrange LEDs vertically with raised R, Y, and G labels and add a large pedestrian button.",
    wiring: [{ from: "Pins 8, 9, 10", to: "Red, yellow, green LED anodes through 220 Ω each", purpose: "Control lights with limited current" }, { from: "LED cathodes", to: "GND", purpose: "Complete each LED circuit" }, { from: "Button", to: "Pin 2 and GND", purpose: "Create active-low request input" }, { from: "USB 5 V", to: "Controller", purpose: "Supply low-voltage logic power" }],
    steps: ["Plan valid states|Draw red, red-yellow transition if desired, green, yellow, and pedestrian red states.|Choose safe durations.", "Build the light housing|Place LEDs vertically with labels and opaque dividers.|Keep leads from touching.", "Add current resistors|Connect each anode to its own 220-330 Ω resistor and digital pin.|Connect cathodes to ground.", "Wire the button|Connect it between pin 2 and ground using the internal pull-up.|Label pressed as LOW.", "Test one LED at a time|Upload a short output test and verify color-to-pin mapping.|Correct wiring with power disconnected.", "Program the states|Use millis timing and one function that sets all three LEDs.|Prevent conflicting outputs.", "Add the request flag|Record button presses and serve the request at the next safe transition.|Clear the flag afterward.", "Audit ten cycles|Log every state and press the button at different moments.|Confirm no unsafe color combination."],
    math: math("Find cycle duration", "cycle time = green + yellow + red", ["Green = 8 s", "Yellow = 2 s", "Red = 6 s"], "cycle = 8 + 2 + 6 = 16 s", "The normal cycle repeats every 16 seconds.", "A pedestrian request may extend red time.", "Button timing and loop execution add milliseconds."),
    test: test("Test each LED output separately before running the sequence.", "Ten cycles show only valid states and one request is handled without red-green overlap.", "State order, duration, request latency, and invalid combinations.", "button press timing", "code, LEDs, resistors, durations, power, and observer", ["press during green", "press during yellow", "press during red"]),
    failures: ["Wrong LED lights|Pin mapping or polarity is wrong|Run the one-at-a-time test|Reconnect with power off or fix constants", "Button triggers repeatedly|Input floats or bounces|Log raw state while held|Use pull-up and edge detection", "Sequence freezes|Blocking delay prevents transitions|Inspect timing code|Use millis-based state timing", "Red and green overlap|Outputs are changed in separate paths|Log every state change|Use one setLights function that sets all outputs"],
    tuning: "Keep transition logic explicit before shortening timings. Faster cycles are convenient for testing, but state order and button behavior must stay identical.",
    extensions: ["Easier|Fixed cycle|Remove the button and use three timed states.", "Performance|Nonblocking countdown|Display seconds while still reading the button.", "Advanced|Two-direction intersection|Add a second light with conflict-free paired states."],
    related: ["led-reaction-timer", "reaction-time-game", "microcontroller-servo-pointer"],
    builderMoment: "The button requested a crossing. The state machine checked its schedule and replied correctly."
    ,code: { language: "cpp", filename: "traffic_light.ino", explanation: "A complete nonblocking state machine with an edge-captured request flag.", source: `enum State { GREEN, YELLOW, RED };
const int redLed=8, yellowLed=9, greenLed=10, buttonPin=2;
State state=GREEN; unsigned long stateStarted=0; bool request=false, lastButton=false;
void setLights(bool r,bool y,bool g){ digitalWrite(redLed,r); digitalWrite(yellowLed,y); digitalWrite(greenLed,g); }
void enter(State next){ state=next; stateStarted=millis(); if(state==GREEN)setLights(0,0,1); if(state==YELLOW)setLights(0,1,0); if(state==RED)setLights(1,0,0); }
void setup(){ pinMode(redLed,OUTPUT); pinMode(yellowLed,OUTPUT); pinMode(greenLed,OUTPUT); pinMode(buttonPin,INPUT_PULLUP); enter(GREEN); }
void loop(){
  bool pressed=!digitalRead(buttonPin); if(pressed && !lastButton) request=true; lastButton=pressed;
  unsigned long elapsed=millis()-stateStarted;
  if(state==GREEN && (elapsed>=8000 || (request && elapsed>=3000))) enter(YELLOW);
  else if(state==YELLOW && elapsed>=2000) enter(RED);
  else if(state==RED && elapsed>=(request?8000UL:6000UL)){ request=false; enter(GREEN); }
}` }
  },
  {
    number: 109,
    title: "LED Reaction Timer",
    slug: "led-reaction-timer",
    difficulty: "Intermediate",
    ageRange: "11-17",
    estimatedTime: "60-90 min",
    timeMinutes: 90,
    maxCost: 15,
    description: "Measure response time to a randomly delayed LED cue while rejecting early button presses.",
    hook: "The hard part is not timing one button press. It is creating an unpredictable cue, detecting false starts, and separating milliseconds of code timing from human reaction.",
    outcome: "The timer records five valid reaction trials in milliseconds, detects early presses, and reports an average and best time.",
    concepts: ["Random timing", "Events", "Data analysis"],
    input: "button press after a light cue",
    output: "measured reaction time in milliseconds",
    motion: "human event-to-digital timing result",
    losses: ["button bounce", "display delay", "false starts", "timer resolution"],
    principleName: "Elapsed-time measurement",
    principle: "The program stores the cue time, waits for a new button edge, and subtracts timestamps. A random pre-cue delay prevents anticipation from replacing reaction.",
    observe: "Compare the distribution of five trials rather than treating one fastest press as the whole result.",
    materials: electronicsMaterials("1|microcontroller board|Run timing logic", "1|bright LED|Provide cue", "1|220-330 Ω resistor|Limit LED current", "1|large normally open button|Capture response", "1|breadboard and jumpers|Create circuit", "1|USB serial monitor or small display|Show results"),
    alternative: "Use a microcontroller board with built-in button and LED for a no-breadboard version.",
    hazard: "Use low voltage, include the LED resistor, keep screen brightness comfortable, and take breaks rather than repeating for long periods.",
    accessNote: "Offer an audio buzzer cue or large external switch and compare within the same cue type only.",
    wiring: [{ from: "Pin 9", to: "LED anode through 220 Ω", purpose: "Provide visual cue with limited current" }, { from: "LED cathode", to: "GND", purpose: "Complete LED circuit" }, { from: "Button", to: "Pin 2 and GND", purpose: "Provide active-low response input" }, { from: "USB", to: "Controller and serial monitor", purpose: "Supply power and show results" }],
    steps: ["Build the cue circuit|Connect the LED through its resistor and verify polarity.|Point it toward the player without glare.", "Wire the button|Connect between pin 2 and ground with internal pull-up enabled.|Mount it firmly.", "Test input edges|Print button state and confirm one press changes HIGH to LOW.|Add a short debounce interval.", "Create random waiting|Choose a 2-5 second random delay after a ready message.|Keep the LED off.", "Detect false starts|If the button is pressed before the cue, cancel the trial.|Require full release before reset.", "Measure valid response|Store millis when LED turns on and when a new press arrives.|Subtract and print the result.", "Collect five trials|Record each valid result and ignore only clearly labeled false starts.|Allow a rest between trials.", "Report summary|Calculate average and minimum valid time.|Explain why more trials improve confidence."],
    math: math("Calculate average reaction time", "average = sum of valid times / trial count", ["Times = 245, 260, 238, 275, 250 ms", "Trial count = 5"], "average = 1268 / 5 = 253.6 ms", "Average reaction time is about 254 milliseconds.", "The best single trial does not represent consistency.", "Button and software timing add small delays."),
    test: test("Confirm false-start detection before collecting valid data.", "Five valid trials are timed and early presses are rejected.", "Reaction time, false starts, average, best, and range.", "cue type or hand used", "same participant, button, delay range, posture, code, and room", ["dominant hand", "non-dominant hand", "audio cue if available"]),
    failures: ["Times read zero|A held button is accepted as a new press|Log button edges|Require release before cue", "Every trial is a false start|Input polarity or pull-up logic is wrong|Print raw state without game code|Invert logic or rewire", "Results vary impossibly|Button bounce creates extra edges|Watch serial timestamps|Add edge debounce", "The delay repeats|Random seed is constant|Compare sequences after reset|Seed from an unused analog input or entropy source"],
    tuning: "Make the cue and input logic reliable before comparing people or conditions. More smoothing can reject bounce but adds measurement delay.",
    extensions: ["Easier|Three trials|Show each time with no average.", "Performance|Consistency score|Calculate range or standard deviation.", "Advanced|Two-choice reaction|Use two cues and two buttons, scoring both speed and correctness."],
    related: ["reaction-time-game", "traffic-light-controller", "cardboard-arcade-button"],
    builderMoment: "The timer said 254 milliseconds. The button said it had been ready for hours."
    ,code: { language: "cpp", filename: "reaction_timer.ino", explanation: "A complete serial reaction timer with false-start handling and five-trial average.", source: `const int ledPin=9, buttonPin=2; long total=0; int validTrials=0;
bool pressed(){ return digitalRead(buttonPin)==LOW; }
void waitRelease(){ while(pressed()) delay(5); delay(30); }
void setup(){ pinMode(ledPin,OUTPUT); pinMode(buttonPin,INPUT_PULLUP); Serial.begin(9600); randomSeed(analogRead(A5)); }
void loop(){
  if(validTrials>=5){ Serial.print("Average ms: "); Serial.println(total/5.0); while(true){} }
  Serial.println("Ready"); waitRelease(); unsigned long waitTime=random(2000,5001), start=millis();
  while(millis()-start<waitTime){ if(pressed()){ Serial.println("False start"); waitRelease(); return; } }
  digitalWrite(ledPin,HIGH); unsigned long cue=millis();
  while(!pressed()){} unsigned long reaction=millis()-cue; digitalWrite(ledPin,LOW);
  Serial.println(reaction); total+=reaction; validTrials++; waitRelease(); delay(800);
}` }
  },
  {
    number: 110,
    title: "Conductivity Tester",
    slug: "conductivity-tester",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "35-55 min",
    timeMinutes: 55,
    maxCost: 8,
    description: "Use a current-limited LED probe to compare whether common dry materials complete a low-voltage circuit.",
    hook: "A material conducts when charges can move through it. The tester keeps current low and turns that invisible path into a visible LED result.",
    outcome: "The tester correctly distinguishes at least five known conductors and insulators without heating or damaging samples.",
    concepts: ["Conductivity", "Closed circuits", "Resistance"],
    input: "probe contact across a sample",
    output: "current-limited LED brightness",
    motion: "electrical path-to-visible indicator",
    losses: ["contact resistance", "oxide layers", "loose clips", "sample moisture"],
    principleName: "Closed-circuit conduction",
    principle: "When a conductive sample bridges the probes, current flows from the battery through the resistor, LED, and sample. Insulators leave the path open.",
    observe: "Touch both probes to different places on the same object and compare how contact pressure changes brightness.",
    materials: electronicsMaterials("1|two-AA battery holder with 3 V output|Supply safe voltage", "1|red LED with forward voltage near 2 V|Show current", "1|330 Ω resistor|Limit current", "2|insulated alligator leads|Create probes", "10|clean dry sample objects|Compare materials", "1|nonconductive tray|Organize tests"),
    alternative: "Use a multimeter continuity mode with adult guidance instead of building the LED circuit.",
    hazard: "Test only disconnected dry objects; never probe outlets, appliances, batteries, liquids, skin, or unknown electrical equipment.",
    accessNote: "Use large clip probes and add a piezo buzzer in parallel only through an appropriate driver for an audible result.",
    wiring: [{ from: "Battery +3 V", to: "330 Ω resistor", purpose: "Limit maximum current" }, { from: "Resistor", to: "LED anode", purpose: "Feed indicator safely" }, { from: "LED cathode", to: "Probe A", purpose: "Send current toward sample" }, { from: "Probe B", to: "Battery negative", purpose: "Complete circuit through sample" }],
    steps: ["Sort test samples|Choose known metals, plastics, paper, graphite, wood, and rubber.|Ensure every item is dry and disconnected.", "Identify LED polarity|Find the longer anode lead and flat-side cathode.|Mark them before bending.", "Build current limit|Connect battery positive to 330 Ω resistor and then LED anode.|Insulate exposed joints.", "Add the probes|Connect LED cathode to one clip and battery negative to the other.|Keep clips separated.", "Run a self-test|Touch the probe tips together briefly.|Confirm the LED lights without warming.", "Predict before testing|Classify each sample as likely conductor or insulator.|Record the reason.", "Test consistently|Clip 2 cm apart on each object with similar pressure.|Record brightness as off, dim, or bright.", "Explain surprises|Retest coatings, pencil graphite, or mixed-material objects at exposed surfaces.|Separate material from contact effects."],
    math: math("Estimate LED current", "current = (battery voltage - LED voltage) / resistance", ["Battery = 3.0 V", "LED = 2.0 V", "Resistance = 330 Ω"], "current = (3.0 - 2.0) / 330 = 0.0030 A", "The ideal current is about 3 milliamps.", "That is enough for a visible red LED in many setups.", "Battery voltage, LED voltage, and sample resistance change the result."),
    test: test("Touch the probes directly together for less than one second.", "Known metals light the LED and known plastics do not across at least ten samples.", "LED state, relative brightness, contact location, and material prediction.", "sample material", "battery, resistor, LED, probe spacing, pressure, and room light", ["metal", "graphite", "plastic or rubber"]),
    failures: ["LED never lights|Polarity, battery, or connection is wrong|Self-test directly across resistor and LED|Correct polarity or replace battery", "LED is always on|Probe clips touch elsewhere|Separate and inspect leads|Insulate exposed crossings", "Metal reads off|Surface coating or oxide blocks contact|Scratch only a safe scrap test spot|Move to clean exposed metal", "Results change with pressure|Contact area dominates|Use clips at a marked position|Standardize pressure and clean probes"],
    tuning: "Improve probe consistency rather than reducing the resistor. A dim result can indicate high sample or contact resistance, and more current is not automatically safer or more informative.",
    extensions: ["Easier|Known sample sort|Test five conductors and five insulators.", "Performance|Resistance ranking|Use a multimeter to compare conductive samples.", "Advanced|Analog reading|Add a voltage divider and graph relative resistance safely."],
    related: ["capacitive-touch-cardboard-piano", "automatic-night-light", "hand-crank-generator-demo"],
    builderMoment: "The metal spoon passed instantly. The painted paper clip requested a surface inspection."
  },
  {
    number: 111,
    title: "Tilt Alarm",
    slug: "tilt-alarm",
    difficulty: "Beginner",
    ageRange: "11-16",
    estimatedTime: "40-60 min",
    timeMinutes: 60,
    maxCost: 10,
    description: "Use a low-voltage tilt switch and transistor to sound a buzzer when a model container tips beyond a chosen angle.",
    hook: "Inside a tilt switch, a small conductive element changes contact as gravity changes direction. Mounting angle turns that binary event into an adjustable threshold.",
    outcome: "The alarm remains silent while level and sounds in nine of ten trials when the platform tilts past the calibrated angle.",
    concepts: ["Gravity sensing", "Switches", "Transistor drivers"],
    input: "tilt-switch contact changing with orientation",
    output: "audible buzzer signal",
    motion: "angular tilt-to-electrical state change",
    losses: ["contact bounce", "mount movement", "battery resistance", "threshold hysteresis"],
    principleName: "Gravity-referenced switching",
    principle: "The tilt sensor closes or opens when its internal conductor moves under gravity. A transistor lets the small sensor current control a buzzer without overloading the switch.",
    observe: "Tilt the unpowered sensor slowly and use continuity mode to find the angle where its state changes.",
    materials: electronicsMaterials("1|ball-type tilt switch rated for low-voltage signal use|Sense orientation", "1|3-5 V active buzzer under 100 mA|Create sound", "1|2N2222 transistor or logic MOSFET rated above buzzer current|Drive buzzer", "1|1 kΩ base or gate resistor plus 10 kΩ pull-down|Control transistor", "1|three-AA battery holder with switch|Supply 4.5 V", "1|adjustable cardboard mounting wedge|Set threshold"),
    alternative: "Use an LED and resistor as a silent indicator during classroom testing.",
    hazard: "Use low voltage, keep buzzer volume comfortable, disconnect power before remounting, and secure small sensor parts inside a case.",
    accessNote: "Add a bright LED in parallel with its own resistor and use a large power switch.",
    wiring: [{ from: "Battery +4.5 V", to: "Buzzer positive", purpose: "Supply rated buzzer voltage" }, { from: "Buzzer negative", to: "Transistor collector or drain", purpose: "Switch buzzer current" }, { from: "Transistor emitter or source", to: "Battery negative", purpose: "Complete return path" }, { from: "Tilt switch through 1 kΩ", to: "Transistor control and battery positive", purpose: "Command alarm state" }, { from: "10 kΩ resistor", to: "Control node and ground", purpose: "Keep alarm off when switch is open" }],
    steps: ["Characterize the switch|Use continuity mode with no battery and rotate the switch through 180 degrees.|Mark open and closed orientations.", "Build the mounting wedge|Make an adjustable card bracket with angle marks every 10 degrees.|Hold the sensor without crushing its leads.", "Wire the buzzer stage|Connect buzzer positive to battery positive and negative to transistor output.|Keep power off.", "Add the sensor control|Wire tilt switch through the resistor to the transistor control and add pull-down.|Insulate joints.", "Test on a breadboard|Power briefly and rotate the sensor by hand.|Confirm on and off states.", "Mount the circuit|Secure battery, buzzer, and board to a wide model platform.|Add strain relief.", "Calibrate threshold|Set the wedge so the alarm changes near the chosen angle.|Measure with a paper protractor.", "Run ten trials|Return level between tests and approach from the same direction.|Record trigger angle and misses."],
    math: math("Calculate alarm reliability", "reliability = successful alarms / tilt trials × 100%", ["Successful alarms = 9", "Trials = 10"], "reliability = 9 / 10 × 100% = 90%", "The alarm triggers on 90 percent of test tilts.", "A larger sample gives better confidence.", "Contact bounce and hand angle introduce variation."),
    test: test("Test the transistor and buzzer by applying the control signal directly before adding the tilt switch.", "The device stays silent level and alarms in nine of ten threshold trials.", "Trigger angle, response delay, missed alarms, and false alarms.", "sensor mounting angle", "circuit, battery, platform, tilt rate, direction, and reset", ["20° mount", "30° mount", "40° mount"]),
    failures: ["Alarm is always on|Switch orientation or pull-down is wrong|Disconnect the switch and inspect control voltage|Rotate sensor or fix pull-down", "Buzzer is weak|Voltage is low or transistor is miswired|Measure battery under load|Correct pins and replace cells", "Trigger varies widely|Mount is loose or switch bounces|Hold the bracket and repeat slowly|Stiffen mount and add debounce delay if coded", "Alarm fails after tilting|Battery or lead shifts|Shake gently with power off|Add mechanical restraint and strain relief"],
    tuning: "Calibrate mounting angle before changing electronics. A sensitive angle gives early warning but can increase false alarms from vibration and small table movement.",
    extensions: ["Easier|LED tilt indicator|Use only an LED and resistor.", "Performance|Latch circuit|Keep the alarm on until a reset button is pressed.", "Advanced|Angle sensor|Replace the switch with an accelerometer and compare continuous readings."],
    related: ["magnetic-maze", "automatic-night-light", "conductivity-tester"],
    builderMoment: "The alarm remained calm at 29 degrees and became extremely certain at 31."
  },
  {
    number: 112,
    title: "Ultrasonic Distance Meter",
    slug: "ultrasonic-distance-meter",
    difficulty: "Intermediate",
    ageRange: "12-17",
    estimatedTime: "60-90 min",
    timeMinutes: 90,
    maxCost: 18,
    description: "Send an ultrasonic pulse, time its echo, and display the measured distance to a flat target.",
    hook: "The sensor measures time, not distance directly. Code converts the echo's round trip into a one-way distance using the speed of sound.",
    outcome: "The meter reports targets from 10 to 100 cm with average error under 3 cm across five marked positions.",
    concepts: ["Time of flight", "Speed of sound", "Measurement error"],
    input: "ultrasonic trigger pulse and returning echo",
    output: "calculated distance in centimetres",
    motion: "sound pulse travel-to-digital measurement",
    losses: ["angled reflections", "soft targets", "air temperature", "timing resolution"],
    principleName: "Echo time of flight",
    principle: "A sound burst travels to the target and back. Multiplying round-trip time by sound speed and dividing by two gives one-way distance.",
    observe: "Rotate a flat card target and note how readings become unstable when the echo reflects away from the receiver.",
    materials: electronicsMaterials("1|5 V ultrasonic distance module with trigger and echo pins|Send and receive pulses", "1|5 V microcontroller board|Measure timing", "1|breadboard and jumper wires|Make connections", "1|USB power cable|Supply low voltage", "1|30 × 30 cm flat card target|Provide a strong reflection", "1|metre stick|Set known distances"),
    alternative: "Use a classroom distance-sensor board with built-in level shifting when the controller uses 3.3 V logic.",
    hazard: "Use only rated low voltage, do not place the sensor at ears, and add a voltage divider on echo when a 3.3 V controller requires it.",
    accessNote: "Display large text and add tones whose spacing changes with distance, keeping volume comfortable.",
    wiring: [{ from: "Sensor VCC and GND", to: "Rated 5 V and common ground", purpose: "Power ultrasonic module" }, { from: "Controller pin 9", to: "Sensor trigger", purpose: "Send 10-microsecond pulse" }, { from: "Sensor echo", to: "Controller pin 10", purpose: "Measure return pulse; level-shift for 3.3 V logic" }, { from: "USB", to: "Controller and serial monitor", purpose: "Power logic and show distance" }],
    steps: ["Mount the sensor|Fix the two transducers level on a card stand.|Keep the front openings clear.", "Wire rated power|Connect VCC and ground, then join trigger and echo to chosen pins.|Add level shifting if the board requires it.", "Send a clean trigger|Drive trigger low, high for 10 microseconds, then low.|Wait between measurements.", "Read echo duration|Use a timeout so missing echoes cannot freeze the program.|Print raw microseconds.", "Convert to distance|Multiply duration by 0.0343 cm/µs and divide by two.|Reject zero or out-of-range values.", "Build a calibration lane|Mark 10, 25, 50, 75, and 100 cm from the sensor face.|Align the flat target square.", "Collect five readings|Average at each mark and record range.|Pause between samples.", "Test target angle|Rotate the target 15 and 30 degrees at 50 cm.|Explain unstable reflections."],
    math: math("Convert echo time to distance", "distance = echo time × sound speed / 2", ["Echo time = 2915 µs", "Sound speed = 0.0343 cm/µs"], "distance = 2915 × 0.0343 / 2 = 50.0 cm", "The target is about 50 centimetres away.", "Division by two accounts for the outgoing and returning path.", "Temperature and target angle affect the result."),
    test: test("Read a flat target at 25 cm before testing the full range.", "Average error is below 3 cm from 10 to 100 cm at five positions.", "Measured distance, known distance, error, and reading range.", "target angle", "sensor, code, power, room, target material, and sample count", ["0° square target", "15° target", "30° target"]),
    failures: ["Readings are zero|Echo is missing or pins are swapped|Print raw pulse duration|Correct pin mapping and target position", "Distance doubles|Round-trip path was not divided by two|Check the formula|Divide by two once", "Values jump|Target is angled, soft, or too small|Use a large square card|Align and enlarge target", "Program freezes|Pulse measurement has no timeout|Remove target and observe|Add a finite timeout and invalid reading state"],
    tuning: "Align the target before adding software smoothing. Averaging reduces random variation but can hide fast distance changes.",
    extensions: ["Easier|Three-point meter|Measure 20, 50, and 80 cm.", "Performance|Median filter|Compare median and average across noisy readings.", "Advanced|Parking display|Map distance to LEDs without fabricating precision."],
    related: ["bumper-switch-rover", "microcontroller-servo-pointer", "automatic-night-light"],
    builderMoment: "The sensor measured the wall accurately and remained skeptical of the angled notebook."
    ,code: { language: "cpp", filename: "distance_meter.ino", explanation: "A complete serial distance meter with timeout and invalid-reading handling.", source: `const int triggerPin=9, echoPin=10;
void setup(){ pinMode(triggerPin,OUTPUT); pinMode(echoPin,INPUT); Serial.begin(9600); }
void loop(){
  digitalWrite(triggerPin,LOW); delayMicroseconds(3);
  digitalWrite(triggerPin,HIGH); delayMicroseconds(10); digitalWrite(triggerPin,LOW);
  unsigned long duration=pulseIn(echoPin,HIGH,30000UL);
  if(duration==0){ Serial.println("No echo"); }
  else { float distanceCm=duration*0.0343f/2.0f; Serial.print(distanceCm,1); Serial.println(" cm"); }
  delay(100);
}` }
  },
  {
    number: 113,
    title: "Automatic Night Light",
    slug: "automatic-night-light",
    difficulty: "Beginner",
    ageRange: "11-16",
    estimatedTime: "45-70 min",
    timeMinutes: 70,
    maxCost: 10,
    description: "Use a photoresistor voltage divider and transistor to turn on a low-voltage LED when the room becomes dark.",
    hook: "The sensor does not understand night. Its resistance changes with light, and a threshold turns that continuous voltage into a clear on/off state.",
    outcome: "The LED turns on below a measured light threshold, stays off in bright conditions, and avoids rapid flicker near the boundary.",
    concepts: ["Voltage dividers", "Thresholds", "Hysteresis"],
    input: "light-dependent sensor resistance",
    output: "controlled LED illumination",
    motion: "light level-to-electrical switching",
    losses: ["ambient reflections", "sensor tolerance", "battery drop", "threshold chatter"],
    principleName: "Light threshold control",
    principle: "A photoresistor and fixed resistor divide battery voltage. The measured midpoint changes with light, and code or a transistor threshold decides when the LED turns on.",
    observe: "Shade the sensor gradually and record the value where the LED switches on and where it switches off.",
    materials: electronicsMaterials("1|photoresistor rated for low-voltage sensing|Measure light", "1|10 kΩ fixed resistor|Complete voltage divider", "1|microcontroller board|Apply threshold and hysteresis", "1|white LED|Provide indicator light", "1|220 Ω resistor|Limit LED current", "1|USB or three-AA low-voltage supply|Power circuit"),
    alternative: "Use an LED night-light module designed for 3-5 V and study its threshold without modifying mains products.",
    hazard: "Use only battery or USB low voltage; do not open or modify a wall-powered night light.",
    accessNote: "Add a large threshold knob and a tactile hood over the sensor for controlled shading.",
    wiring: [{ from: "5 V", to: "Photoresistor", purpose: "Feed top of sensor divider" }, { from: "Photoresistor/fixed-resistor midpoint", to: "Analog A0", purpose: "Measure light-dependent voltage" }, { from: "10 kΩ resistor", to: "Midpoint and GND", purpose: "Complete divider" }, { from: "Pin 9", to: "LED anode through 220 Ω", purpose: "Drive current-limited light" }, { from: "LED cathode", to: "GND", purpose: "Complete LED circuit" }],
    steps: ["Build the divider|Connect photoresistor to 5 V, fixed resistor to ground, and midpoint to A0.|Keep leads apart.", "Add the indicator|Connect pin 9 through 220 Ω to LED anode and cathode to ground.|Verify polarity.", "Read raw values|Print A0 in bright room, under a paper shade, and in a dark box.|Record ranges.", "Choose thresholds|Set an on threshold between dark and bright readings and an off threshold farther toward bright.|Keep on and off values distinct.", "Program the state|If dark crosses on threshold, light LED; if bright crosses off threshold, turn it off.|Retain state between thresholds.", "Shield the sensor|Add a short paper hood so the LED does not shine directly on its own sensor.|Keep the opening visible.", "Run transition trials|Cover and uncover gradually ten times.|Record flicker and switching values.", "Tune placement|Move the sensor or adjust thresholds for the intended room.|Document the final readings."],
    math: math("Calculate divider voltage", "Vout = Vin × fixed resistance / (sensor + fixed)", ["Vin = 5 V", "Sensor = 30 kΩ", "Fixed = 10 kΩ"], "Vout = 5 × 10 / (30 + 10) = 1.25 V", "The divider midpoint is about 1.25 volts for this sensor resistance.", "Sensor orientation determines whether darkness raises or lowers the reading.", "Photoresistor tolerance is broad."),
    test: test("Verify bright and shaded analog ranges before enabling automatic output.", "Ten light transitions switch correctly without rapid flicker at the boundary.", "Analog reading, switch state, on threshold, off threshold, and flicker count.", "threshold gap", "sensor, divider, LED, room, hood, and sample rate", ["small gap", "medium gap", "large gap"]),
    failures: ["LED behaves backward|Divider orientation or comparison sign is reversed|Print values bright and dark|Invert code logic or swap divider order", "It flickers near threshold|No hysteresis or readings are noisy|Hold light near the boundary|Separate on/off thresholds and average samples", "It never gets dark enough|LED feeds the sensor or threshold is wrong|Cover sensor fully and read value|Add hood and recalibrate", "LED does not light|Polarity, resistor, or pin is wrong|Run a direct LED test|Correct with power off"],
    tuning: "Use measured room values and hysteresis before adding delay. A wide threshold gap prevents flicker but requires a larger change in light to switch back.",
    extensions: ["Easier|Manual sensor graph|Print readings without controlling an LED.", "Performance|Brightness control|Map darkness to PWM level.", "Advanced|Adaptive baseline|Measure room light at startup and set relative thresholds."],
    related: ["light-seeking-robot", "conductivity-tester", "tilt-alarm"],
    builderMoment: "The night light turned on in the dark and ignored the dramatic shadow of one finger."
    ,code: { language: "cpp", filename: "night_light.ino", explanation: "A complete threshold controller with sample averaging and hysteresis.", source: `const int sensorPin=A0, ledPin=9;
const int darkOn=360, brightOff=440; bool lightOn=false;
void setup(){ pinMode(ledPin,OUTPUT); Serial.begin(9600); }
void loop(){
  long total=0; for(int i=0;i<10;i++){ total+=analogRead(sensorPin); delay(3); }
  int reading=total/10;
  if(!lightOn && reading<darkOn) lightOn=true;
  else if(lightOn && reading>brightOff) lightOn=false;
  analogWrite(ledPin,lightOn?180:0);
  Serial.println(reading); delay(40);
}` }
  },
  {
    number: 114,
    title: "Mini Motorized Conveyor",
    slug: "mini-motorized-conveyor",
    difficulty: "Advanced",
    ageRange: "13-18",
    estimatedTime: "140-210 min",
    timeMinutes: 210,
    maxCost: 35,
    description: "Build a guarded low-voltage belt conveyor with tension adjustment, motor driver, and repeatable package test.",
    hook: "The motor supplies rotation, rollers convert it into belt motion, and friction between belt and drive roller decides whether packages move or the roller slips underneath.",
    outcome: "The guarded conveyor moves five 30-gram packages across 50 cm without belt derailment, stalls, or warm components.",
    concepts: ["Belt drives", "Friction", "Motor current"],
    input: "low-voltage motor torque through a driver",
    output: "continuous belt motion and package transport",
    motion: "rotary motor motion-to-linear belt motion",
    losses: ["roller bearing friction", "belt slip", "belt bending", "frame misalignment"],
    principleName: "Friction belt transport",
    principle: "The drive roller pulls the belt through static friction. Enough tension creates traction, but excessive tension increases bearing load and motor current.",
    observe: "Mark the drive roller and belt; compare their motion when unloaded and under a package.",
    materials: electronicsMaterials("1|3-6 V geared motor rated for chosen supply|Drive the roller", "1|dual H-bridge or MOSFET driver rated above stall current|Switch motor safely", "1|regulated 5-6 V battery pack with fuse|Supply motor", "2|30 cm-wide supported rollers on straight shafts|Guide belt", "1|8 × 70 cm fabric or paper loop|Form conveyor belt", "1|60 cm braced cardboard frame|Hold roller centers", "2|rigid guards over gears, couplings, and pinch points|Protect users"),
    alternative: "Hand-crank the conveyor first, then add a commercial low-voltage geared motor module.",
    hazard: "Guard all pinch points, disconnect power before touching the belt, use current-limited low voltage, and stop if the belt jams or electronics warm.",
    accessNote: "Add a large emergency-off switch, high-contrast belt edges, and a loading tray outside the moving area.",
    wiring: [{ from: "Battery + and -", to: "Motor driver VM and GND", purpose: "Supply fused motor power" }, { from: "Motor driver output", to: "Geared motor terminals", purpose: "Control motor current" }, { from: "Controller or switch", to: "Driver enable/input", purpose: "Command on and off" }, { from: "Controller GND", to: "Driver and battery GND", purpose: "Create common reference when controlled electronically" }],
    steps: ["Build a square frame|Make parallel side rails with three cross braces.|Mark roller centers exactly 50 cm apart.", "Install the idle roller|Support its shaft on both rails with low-friction bushings.|Add sliding slots for 10 mm tension adjustment.", "Install the drive roller|Couple the geared motor through a guarded flexible connector.|Support the far shaft end independently.", "Make the belt loop|Join the strip with a thin overlapped seam square to its edges.|Place the seam on the outside surface.", "Set light tension|Move the idle roller until slack disappears but shafts still turn freely.|Tighten both sides equally.", "Wire and guard power|Connect the motor through the rated driver and install an accessible switch.|Cover every coupling and nip point.", "Run low-speed empty tests|Operate for 10, 30, then 60 seconds.|Watch tracking and measure current.", "Transport packages|Place one 30-gram package at a time from a loading tray.|Run five transfers and record slip or drift."],
    math: math("Estimate belt speed", "belt speed = roller circumference × rotations per second", ["Roller diameter = 0.04 m", "Speed = 1.5 rotations/s"], "speed = π × 0.04 × 1.5 = 0.188 m/s", "Ideal belt speed is about 0.19 metres per second.", "Belt slip lowers actual speed.", "Roller compression and speed variation are ignored."),
    test: test("Run the empty guarded belt for ten seconds at low voltage.", "Five 30-gram packages travel 50 cm without derailment, stall, or warming.", "Travel time, belt drift, motor current, slip, and temperature after power-off.", "belt tension", "frame, rollers, motor voltage, package mass, loading point, and guards", ["light tension", "medium tension", "higher safe tension"]),
    failures: ["Belt walks sideways|Rollers are not parallel or tension differs|Mark edge position over ten rotations|Square rollers and adjust both slots", "Roller spins under belt|Tension or surface grip is low|Watch reference marks|Increase tension slightly or add safe rubber sleeve", "Motor stalls|Tension is excessive or package jams|Run empty and measure current|Reduce tension and clear guides", "Frame twists|Motor reaction or belt pull exceeds bracing|Watch rails at startup|Add cross bracing and a separate motor mount"],
    tuning: "Find the lowest tension that prevents slip under the test package. Higher tension improves grip only up to the point where bearing friction and motor current rise sharply.",
    extensions: ["Easier|Hand-crank version|Move one package without electronics.", "Performance|Speed control|Use PWM and compare throughput.", "Advanced|Optical counter|Add a sensor that counts packages without touching them."],
    related: ["cardboard-conveyor-belt", "belt-drive-transmission", "simple-motorized-fan"],
    builderMoment: "The conveyor delivered four boxes. The fifth discovered edge tracking."
  },
  {
    number: 115,
    title: "Servo-Powered Claw",
    slug: "servo-powered-claw",
    difficulty: "Intermediate",
    ageRange: "12-17",
    estimatedTime: "90-140 min",
    timeMinutes: 140,
    maxCost: 24,
    description: "Drive a two-jaw linkage with a low-voltage servo and calibrate grip angles for soft classroom objects.",
    hook: "A servo rotates, but a claw needs matched jaw motion. A connecting link converts horn angle into opening width while soft pads spread force across the object.",
    outcome: "The claw grips and releases five different 10-30 gram foam or paper objects without stalling or crushing them.",
    concepts: ["Servo position", "Linkages", "Grip force"],
    input: "button or potentiometer command",
    output: "symmetric jaw opening and closing",
    motion: "servo rotation-to-opposed jaw rotation",
    losses: ["linkage backlash", "jaw flex", "pivot friction", "pad compression"],
    principleName: "Servo-linkage actuation",
    principle: "The servo horn moves a link that rotates one jaw; a tie link or meshed sector makes the second jaw mirror it. Hard stops protect both mechanism and servo.",
    observe: "Measure jaw gap at five servo angles and note where the relationship becomes nonlinear.",
    materials: electronicsMaterials("1|5 V micro servo rated at least 1.5 kg·cm|Drive the claw", "1|microcontroller board|Set position", "1|regulated 5 V, 1 A supply|Power servo", "2|12 cm laminated cardboard jaws|Grip objects", "3|paper fasteners or small bolts with locknuts|Create pivots", "1|connecting link and servo horn|Transmit motion", "2|foam jaw pads|Spread contact force"),
    alternative: "Operate the same claw with a hand lever and string before adding the servo.",
    hazard: "Use soft lightweight targets, keep fingers out of jaws, set angle limits before attachment, and disconnect power for adjustments.",
    accessNote: "Use two large open/close buttons and a wide object-loading tray.",
    wiring: [{ from: "Regulated 5 V", to: "Servo red wire", purpose: "Supply rated servo current" }, { from: "Supply GND", to: "Servo ground and controller GND", purpose: "Create common reference" }, { from: "Controller pin 9", to: "Servo signal", purpose: "Command jaw position" }, { from: "Buttons", to: "Pins 2, 3 and GND", purpose: "Request open or closed state with pull-ups" }],
    steps: ["Build the claw frame|Laminate a base with two equal pivot positions.|Mark center grip line.", "Make matched jaws|Cut two mirror-image jaws and add broad padded tips.|Drill or punch pivots with adult help.", "Install pivots|Attach jaws with free-running gaps and hard open stops.|Confirm equal manual swing.", "Connect the jaws|Use a tie link so one driven jaw mirrors the other.|Adjust hole positions for symmetric closure.", "Mount the servo|Fix its body rigidly and align the horn near the drive-jaw link.|Keep load sideways forces off the shaft.", "Wire safe power|Use regulated 5 V and common ground, then connect signal and buttons.|Test servo unattached at 40 and 120 degrees.", "Calibrate limits|Attach the linkage at midpoint and approach open and closed stops slowly.|Record safe angles before gripping.", "Run object trials|Grip, lift 5 cm, hold five seconds, and release each soft object.|Stop on buzzing or stalled motion."],
    math: math("Estimate jaw-tip travel", "arc length = radius × angle in radians", ["Jaw radius = 0.08 m", "Angle = 35° = 0.611 rad"], "travel = 0.08 × 0.611 = 0.049 m", "Each jaw tip follows about a 4.9 cm arc.", "The opening width changes by geometry of both jaws.", "Links and pads alter the actual path."),
    test: test("Cycle the claw empty through safe angles five times.", "It grips and releases five lightweight objects without stall or damage.", "Object success, jaw angle, gap, servo sound, and supply current.", "closed servo angle", "claw, power, pads, object set, lift height, and hold time", ["wide stop", "medium stop", "narrow safe stop"]),
    failures: ["Servo buzzes closed|Command pushes beyond a hard stop|Disconnect power and move jaws manually|Reduce close angle", "One jaw moves more|Tie-link holes or pivots differ|Measure gaps from center|Match geometry and loosen pivots", "Objects slip|Pads or jaw path provide little contact|Close gently without lifting|Enlarge compliant pads", "Controller resets|Servo current sags supply|Watch logic LED while closing|Use rated servo supply with common ground"],
    tuning: "Use the widest closing angle that holds the object without stalling. More grip force can crush targets and shorten servo life; compliant pads often help more than extra torque.",
    extensions: ["Easier|Hand-lever claw|Tune linkage before wiring.", "Performance|Object variety|Grip round, flat, and irregular soft targets.", "Advanced|Force limit|Use a current or force sensor to stop closing automatically."],
    related: ["parallel-jaw-gripper", "low-cost-robot-arm", "cardboard-claw-machine"],
    builderMoment: "The claw picked up the foam block and released it only after a brief contractual review."
    ,code: { language: "cpp", filename: "servo_claw.ino", explanation: "A complete two-button claw controller that moves gradually between calibrated safe angles.", source: `#include <Servo.h>
Servo claw; const int openButton=2, closeButton=3;
int position=45; const int openAngle=45, closedAngle=112;
void setup(){ pinMode(openButton,INPUT_PULLUP); pinMode(closeButton,INPUT_PULLUP); claw.attach(9); claw.write(position); }
void loop(){
  int target=position;
  if(!digitalRead(openButton)) target=openAngle;
  if(!digitalRead(closeButton)) target=closedAngle;
  if(position<target) position++;
  if(position>target) position--;
  claw.write(position); delay(18);
}` }
  },
  {
    number: 116,
    title: "Drawbot",
    slug: "drawbot",
    difficulty: "Intermediate",
    ageRange: "11-17",
    estimatedTime: "75-115 min",
    timeMinutes: 115,
    maxCost: 25,
    description: "Build a two-motor differential robot that carries a marker and draws paths from timed wheel commands.",
    hook: "A drawbot turns motion into evidence. Every wheel mismatch, turn duration, and slip leaves a visible line, making debugging unusually honest.",
    outcome: "The robot draws a closed shape at least 20 cm wide and returns within 5 cm of its starting point.",
    concepts: ["Differential drive", "Open-loop control", "Calibration"],
    input: "timed left and right motor commands",
    output: "vehicle path recorded by a marker",
    motion: "electrical motor rotation-to-planar drawing motion",
    losses: ["wheel slip", "motor mismatch", "marker drag", "battery variation"],
    principleName: "Differential-drive path control",
    principle: "Equal wheel speeds produce a straight path; different speeds create a curve; opposite directions pivot the robot. Open-loop timing assumes motion repeats without measuring the result.",
    observe: "Draw three one-second straight segments on fresh paper and compare their lengths and curvature.",
    materials: electronicsMaterials("1|two-wheel low-voltage rover chassis|Provide differential drive", "2|matched 3-6 V geared motors|Move wheels", "1|dual H-bridge rated above stall current|Control motors", "1|microcontroller board|Run timed path", "1|regulated motor battery pack|Supply power", "1|washable marker in springy holder|Record path", "1|large paper sheet taped flat|Provide drawing surface"),
    alternative: "Use two independent switches and hand timing for a no-code differential-drive study.",
    hazard: "Use washable markers and low voltage, test wheels raised, guard gears, and stop if motors, driver, battery, or marker holder warm or jam.",
    accessNote: "Use a large start button and prewritten motion cards that teams arrange into a path sequence.",
    wiring: [{ from: "Motor battery", to: "H-bridge VM and GND", purpose: "Supply rated motor power" }, { from: "Controller pins", to: "H-bridge direction and enable inputs", purpose: "Command wheel direction and speed" }, { from: "Driver outputs", to: "Left and right motors", purpose: "Deliver protected motor current" }, { from: "All grounds", to: "Common ground", purpose: "Share signal reference" }],
    steps: ["Square the chassis|Align axles and match wheels.|Roll unpowered across paper.", "Build the marker holder|Guide a washable marker vertically with light spring pressure.|Place tip near wheel axle center.", "Wire the driver|Route each motor to its own H-bridge output channel, then join controller and driver grounds.|Leave the battery disconnected while moving leads.", "Test wheels raised|Run each wheel forward and reverse for one second.|Correct direction constants.", "Calibrate straight travel|Command equal speeds for one second and measure line length and curve.|Add a small left-right trim.", "Calibrate a quarter turn|Run wheels in opposite directions for a short interval.|Repeat and average the angle.", "Program a shape|Combine straight and turn commands for a square or triangle.|Predict final position.", "Run and tune|Tape paper flat, press start, and measure closure error.|Change one duration or trim at a time."],
    math: math("Estimate pivot angle", "angle = wheel travel difference / track width", ["Difference = 0.18 m", "Track width = 0.12 m"], "angle = 0.18 / 0.12 = 1.5 rad = 86°", "The command produces roughly a quarter turn.", "A real turn differs because wheels slip and motors coast.", "The model assumes perfect in-place rotation."),
    test: test("Run one-second straight and pivot commands with the marker down before programming a shape.", "The robot draws a closed shape at least 20 cm wide and ends within 5 cm of its start.", "Side length, turn angle, closure error, line breaks, and battery voltage.", "turn duration", "robot, speed, surface, marker pressure, battery, and program order", ["short turn", "calculated turn", "slightly longer turn"]),
    failures: ["Lines curve|Motors differ or marker drags off-center|Run with marker lifted, then lowered|Add trim and reduce marker pressure", "Turns overshoot|Motor coast or duration is high|Mark wheel stop after command|Shorten pulse or add braking", "The marker skips|Holder pressure is low or paper wrinkles|Move robot by hand|Flatten paper and add gentle spring force", "Controller resets|Motor supply noise affects logic|Watch power light at starts|Use decoupling and rated separate supplies with common ground"],
    tuning: "Calibrate straight travel before turns. Higher speed makes larger drawings faster but increases coast, slip, and closure error.",
    extensions: ["Easier|Line and turn cards|Run one command at a time.", "Performance|Smallest closure error|Repeat the same square five times.", "Advanced|Logo path|Create a reusable command array with calibrated distances and angles."],
    related: ["scribblebot", "virtual-robot-maze", "differential-steer-rover-chassis"],
    builderMoment: "The robot drew a square with three right angles and one creative negotiation."
    ,code: { language: "cpp", filename: "drawbot_square.ino", explanation: "A complete timed square path using a dual H-bridge; calibrate durations for your chassis.", source: `const int leftA=5,leftB=6,rightA=9,rightB=10;
void drive(int left,int right,unsigned long duration){
  analogWrite(leftA,left>0?left:0); analogWrite(leftB,left<0?-left:0);
  analogWrite(rightA,right>0?right:0); analogWrite(rightB,right<0?-right:0);
  delay(duration); analogWrite(leftA,0); analogWrite(leftB,0); analogWrite(rightA,0); analogWrite(rightB,0); delay(150);
}
void setup(){ pinMode(leftA,OUTPUT); pinMode(leftB,OUTPUT); pinMode(rightA,OUTPUT); pinMode(rightB,OUTPUT); delay(1500);
  for(int side=0;side<4;side++){ drive(130,125,1100); drive(120,-120,430); }
}
void loop(){} ` }
  },
  {
    number: 117,
    title: "Scribblebot",
    slug: "scribblebot",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "40-65 min",
    timeMinutes: 65,
    maxCost: 12,
    description: "Mount an enclosed vibration motor on a marker tripod and tune mass position to create repeatable drawing patterns.",
    hook: "The vibration motor supplies changing force while three markers become flexible legs. Small shifts in mass and marker angle turn random-looking motion into patterns you can compare.",
    outcome: "The enclosed robot draws continuously for 30 seconds inside a 60 cm paper boundary without losing a marker or component.",
    concepts: ["Vibration", "Resonance", "Random motion"],
    input: "rotation of an enclosed eccentric motor mass",
    output: "vibration-driven motion and drawn trace",
    motion: "rotary imbalance-to-planar vibration motion",
    losses: ["marker friction", "body flex", "battery movement", "uneven leg stiffness"],
    principleName: "Eccentric vibration",
    principle: "An off-center motor mass creates a rotating force. Flexible marker legs alternately grip and slip, so the body wanders while recording its path.",
    observe: "Move the motor from center toward one edge and compare trace size, direction, and density.",
    materials: electronicsMaterials("1|paper cup or light container|Form body", "3|washable markers of equal size|Create legs and draw", "1|enclosed 3 V vibration motor|Generate safe vibration", "1|two-AAA switched holder|Supply 3 V", "3|rubber bands plus foam tape|Secure markers and parts", "1|large paper sheet with raised boundary|Contain drawing"),
    alternative: "Use a commercial battery vibration module with an enclosed mass and switch.",
    hazard: "Use only washable markers and an enclosed motor, secure batteries, run on a protected surface, and stop if parts loosen or warm.",
    accessNote: "Use chunky markers, a large slide switch, and clips that hold the robot while caps are removed.",
    wiring: [{ from: "Battery +3 V", to: "Switch input", purpose: "Provide controlled supply" }, { from: "Switch output", to: "Motor positive", purpose: "Turn vibration on and off" }, { from: "Motor negative", to: "Battery negative", purpose: "Complete circuit" }],
    steps: ["Prepare the body|Mark three equally spaced leg positions around the cup rim.|Reinforce each with tape.", "Attach markers|Band three capped markers at equal angles and heights.|Set the body level on the caps.", "Mount the motor|Secure the enclosed vibration motor on top with foam tape and a strap.|Keep wires away from motion.", "Wire the switch|Connect the battery through the switch to the motor and insulate joints.|Secure the holder opposite the motor if needed.", "Build the drawing arena|Tape paper flat and add a low cardboard boundary.|Protect the table beneath.", "Run a capped test|Switch on for five seconds with caps still fitted.|Inspect all straps and movement.", "Draw a baseline|Remove caps, place at center, and run for 30 seconds.|Mark final position and pattern width.", "Tune one variable|Shift motor position or marker angle and repeat on fresh paper.|Keep voltage and run time fixed."],
    math: math("Measure pattern density", "density = line intersections / sampled area", ["Intersections = 45", "Area = 100 cm²"], "density = 45 / 100 = 0.45 intersections/cm²", "The sampled pattern has 0.45 intersections per square centimetre.", "This is a comparison measure rather than a complete description.", "Counting intersections by eye introduces uncertainty."),
    test: test("Run five seconds with marker caps on before drawing.", "The bot draws 30 seconds inside the boundary with every part secured.", "Pattern width, final offset, intersections, component shift, and battery state.", "motor position", "body, markers, voltage, paper, run time, and start point", ["centered motor", "motor 2 cm off-center", "motor near edge"]),
    failures: ["It tips|Marker heights or mass balance differ|Stand with caps on|Equalize legs and recenter battery", "It stays in one spot|Marker friction is high or vibration weak|Test on scrap paper|Change marker angle or replace battery", "A marker detaches|Band or rim reinforcement is weak|Mark positions before a short run|Add a second strap and tape pad", "Pattern leaves the paper|Motion has strong direction bias|Run capped and watch drift|Recenter mass or raise the boundary"],
    tuning: "Keep parts secured and the body level before seeking larger patterns. More imbalance can increase movement but also tipping, noise, and attachment stress.",
    extensions: ["Easier|Single pattern|Build one stable three-marker setup.", "Performance|Repeatability|Overlay three runs from the same settings.", "Creative|Color sequence|Run equal times with one marker color changed per trial."],
    related: ["bristlebot", "drawbot", "eccentric-cam-shaker"],
    builderMoment: "The scribblebot drew a dense orbit and called it vibration-assisted composition."
  },
  {
    number: 118,
    title: "Capacitive-Touch Cardboard Piano",
    slug: "capacitive-touch-cardboard-piano",
    difficulty: "Intermediate",
    ageRange: "12-17",
    estimatedTime: "75-120 min",
    timeMinutes: 120,
    maxCost: 20,
    description: "Turn foil-covered cardboard keys into capacitive touch inputs that play a simple five-note scale.",
    hook: "Touching a foil pad changes how quickly a tiny electrical charge moves. The controller measures that change and maps each key to a note without a mechanical switch.",
    outcome: "Five labeled keys each trigger the correct note in nine of ten presses without neighboring false triggers.",
    concepts: ["Capacitance", "Thresholds", "Event mapping"],
    input: "finger contact changing key capacitance",
    output: "five mapped audio notes",
    motion: "touch event-to-digital sound output",
    losses: ["electrical noise", "key coupling", "loose foil", "ground variation"],
    principleName: "Capacitive touch sensing",
    principle: "A conductive pad and the surrounding environment form a small capacitor. Touch adds body capacitance, changing measured charge time or sensor value enough to cross a calibrated threshold.",
    observe: "Log baseline and touched readings for each key before enabling sound.",
    materials: electronicsMaterials("1|microcontroller board with supported capacitive-touch inputs or library|Measure keys", "5|8 × 5 cm cardboard keys wrapped in foil|Create touch pads", "5|1 MΩ resistors if required by the chosen sensing method|Set charge timing", "1|passive piezo buzzer|Play tones", "1|breadboard and insulated jumper wires|Connect circuit", "1|USB low-voltage supply|Power controller"),
    alternative: "Use a classroom board with built-in capacitive pads and attach larger foil keys by alligator leads.",
    hazard: "Use USB or battery low voltage only, smooth and tape foil edges, and never connect touch pads to outlets or unknown equipment.",
    accessNote: "Make keys 10 cm wide with raised note labels and provide an alternate button keyboard.",
    wiring: [{ from: "Five foil keys", to: "Five supported touch inputs through required resistors", purpose: "Measure individual touch events" }, { from: "Piezo positive", to: "Tone-capable pin 9", purpose: "Generate note frequencies" }, { from: "Piezo negative", to: "GND", purpose: "Complete audio circuit" }, { from: "USB", to: "Controller", purpose: "Supply isolated low-voltage power" }],
    steps: ["Build five keys|Wrap identical card rectangles with smooth foil and tape every edge.|Leave a rear connection tab.", "Space the keyboard|Mount keys with at least 1 cm gaps on a nonconductive base.|Label C through G.", "Connect touch channels|Wire each tab to a separate supported sensing pin with required resistor arrangement.|Keep leads separated.", "Add the speaker|Connect a passive piezo to the chosen tone pin and ground.|Keep volume comfortable.", "Read baselines|Log every key untouched for ten seconds and record normal ranges.|Avoid touching the desk during this step.", "Set per-key thresholds|Touch each key ten times and choose a threshold between baseline and touch values.|Do not assume all keys match.", "Map notes|Assign C4, D4, E4, F4, and G4 frequencies.|Play only the highest-confidence active key.", "Run isolation trials|Press each key ten times and record correct, missed, and neighboring triggers.|Increase spacing or tune thresholds."],
    math: math("Calculate key reliability", "reliability = correct triggers / presses × 100%", ["Correct triggers = 9", "Presses = 10"], "reliability = 9 / 10 × 100% = 90%", "This key triggers correctly 90 percent of the time.", "Each key needs its own result.", "Humidity and grounding can change sensitivity."),
    test: test("Log untouched and touched values before connecting the buzzer logic.", "Every key produces its mapped note in nine of ten presses with no adjacent false trigger.", "Correct notes, misses, false triggers, baseline, and touch values.", "key spacing or threshold", "controller, wiring, operator, room, key size, and sample count", ["0.5 cm gaps", "1 cm gaps", "2 cm gaps"]),
    failures: ["Keys trigger untouched|Threshold is too low or wires couple|Log baseline with hands away|Raise threshold and separate leads", "Touches are missed|Foil connection or threshold is poor|Measure the raw touched range|Resecure foil and lower threshold carefully", "Two notes play|Keys are too close or code accepts multiple channels|Touch one center and inspect readings|Increase spacing and choose one active key", "Tone is wrong|Frequency mapping or pin differs|Print detected key label|Correct the note table"],
    tuning: "Calibrate each key in the actual room before changing sound code. More sensitivity helps light touches but increases false triggers from nearby hands and wiring.",
    extensions: ["Easier|Three-note keyboard|Use three large keys.", "Performance|Dynamic duration|Hold the note while touch remains stable.", "Advanced|Chord mode|Detect separated simultaneous keys and manage priority safely."],
    related: ["cardboard-arcade-button", "conductivity-tester", "scratch-arcade-game"],
    builderMoment: "The cardboard piano played C, D, E, and one note caused by a very enthusiastic sleeve."
    ,code: { language: "cpp", filename: "touch_piano.ino", explanation: "A complete example for boards whose supported touchRead function returns larger values when touched; calibrate pins and thresholds for your board.", source: `const int keys[5]={4,5,6,7,8};
const int notes[5]={262,294,330,349,392};
const int thresholds[5]={35,35,35,35,35}; const int buzzer=9;
void setup(){ pinMode(buzzer,OUTPUT); }
void loop(){
  int active=-1, strongest=0;
  for(int i=0;i<5;i++){
    int value=touchRead(keys[i]);
    if(value>thresholds[i] && value>strongest){ strongest=value; active=i; }
  }
  if(active>=0) tone(buzzer,notes[active]); else noTone(buzzer);
  delay(15);
}` }
  },
  {
    number: 119,
    title: "Hand-Crank Generator Demo",
    slug: "hand-crank-generator-demo",
    difficulty: "Intermediate",
    ageRange: "11-17",
    estimatedTime: "60-90 min",
    timeMinutes: 90,
    maxCost: 18,
    description: "Turn a low-voltage DC motor by hand, measure generated voltage, and light an LED through rectification and current limiting.",
    hook: "A motor can work in reverse. Rotating its shaft moves conductors through a magnetic field and creates voltage; crank speed and direction change the output.",
    outcome: "The guarded crank produces repeatable voltage above 2.5 V at the chosen speed and lights a protected LED without storing energy.",
    concepts: ["Electromagnetic induction", "Voltage", "Energy conversion"],
    input: "slow hand-crank rotation",
    output: "low-voltage electrical energy",
    motion: "rotary mechanical input-to-electrical output",
    losses: ["bearing friction", "gear friction", "winding resistance", "diode voltage drop"],
    principleName: "Motor as generator",
    principle: "Turning the shaft moves motor coils through a magnetic field, inducing a voltage. Faster rotation usually raises open-circuit voltage, while a connected load makes cranking harder.",
    observe: "Measure polarity while turning clockwise and counterclockwise, then compare effort with the LED disconnected and connected.",
    materials: electronicsMaterials("1|3-6 V permanent-magnet DC motor|Act as generator", "1|large hand crank and guarded 3:1 speed-increasing gear or pulley|Turn motor safely", "1|bridge rectifier rated above 1 A or four 1N4001 diodes|Keep LED polarity constant", "1|red LED|Show output", "1|220 Ω resistor|Limit LED current", "1|multimeter|Measure voltage", "1|braced base and full gear guard|Secure mechanism"),
    alternative: "Use a commercial classroom hand-crank generator module with enclosed gears.",
    hazard: "Crank by hand at low speed, guard gears, use no batteries or mains connection, never spin with a drill, and stop if parts loosen or warm.",
    accessNote: "Use a broad crank handle and an optional partner role for holding the base and reading the meter.",
    wiring: [{ from: "Motor terminals", to: "Bridge rectifier AC inputs", purpose: "Accept either crank direction" }, { from: "Rectifier positive", to: "220 Ω resistor then LED anode", purpose: "Limit indicator current" }, { from: "LED cathode", to: "Rectifier negative", purpose: "Complete load circuit" }, { from: "Multimeter", to: "Across rectifier output", purpose: "Measure generated DC voltage" }],
    steps: ["Build the base|Clamp the motor and crank shafts on a wide braced platform.|Support both sides of each shaft.", "Add speed increase|Connect a large hand pulley or gear to a smaller motor pulley.|Align the transmission and add guards.", "Test rotation by hand|Turn slowly with no wires connected.|Listen for rubbing and inspect guards.", "Build the rectifier output|Connect motor to bridge AC inputs and LED plus resistor to DC outputs.|Verify diode markings.", "Measure open circuit|Connect the multimeter and turn at three counted crank rates.|Record voltage and polarity.", "Connect the LED load|Crank slowly until the LED becomes visible.|Do not bypass the resistor.", "Compare effort|At the same speed, compare with LED connected and disconnected.|Describe the felt torque difference.", "Run repeated trials|Count ten crank turns in a fixed time and record voltage three times.|Stop and inspect mounts."],
    math: math("Calculate ideal gear speed", "motor speed = crank speed × large pulley diameter / small pulley diameter", ["Crank = 60 rpm", "Large = 9 cm", "Small = 3 cm"], "motor speed = 60 × 9 / 3 = 180 rpm", "The motor turns about 180 rpm ideally.", "Faster motor rotation usually produces more voltage.", "Belt slip and hand-speed variation reduce accuracy."),
    test: test("Turn the guarded motor slowly with the LED disconnected and measure voltage first.", "The system exceeds 2.5 V at the chosen rate and lights the protected LED repeatably.", "Crank rate, voltage, LED state, effort, and temperature.", "crank speed", "generator, gearing, rectifier, resistor, meter, and operator", ["30 rpm", "45 rpm", "60 rpm"]),
    failures: ["Voltage stays near zero|Meter range, motor, or connection is wrong|Measure directly at motor terminals|Correct meter and wiring", "LED never lights|Rectifier polarity or voltage is insufficient|Measure DC output while cranking|Correct bridge output or increase safe speed", "Crank slips|Belt tension or gear alignment is poor|Mark both shafts|Align and adjust moderate tension", "Mount vibrates|Shaft support or base is weak|Turn slowly and watch frame|Brace and add a second bearing support"],
    tuning: "Reduce mechanical friction before increasing speed. Higher speed raises voltage but also increases guarding needs, noise, and bearing load.",
    extensions: ["Easier|Meter-only generator|Measure voltage without an LED.", "Performance|Voltage-speed graph|Plot average voltage against crank rate.", "Advanced|Load comparison|Compare current through two safe resistor values without charging a battery."],
    related: ["cardboard-wind-turbine", "conductivity-tester", "simple-motorized-fan"],
    builderMoment: "The LED lit, and the crank immediately made electrical work feel very literal."
  },
  {
    number: 120,
    title: "Low-Voltage Electromagnet Lifter",
    slug: "low-voltage-electromagnet-lifter",
    difficulty: "Intermediate",
    ageRange: "12-17",
    estimatedTime: "70-110 min",
    timeMinutes: 110,
    maxCost: 15,
    description: "Wind an insulated coil around an iron core, switch it safely with a transistor, and lift steel paper clips for short timed trials.",
    hook: "Current through a coil creates a magnetic field. An iron core concentrates that field, while coil turns, current, air gap, and heating set the useful lifting force.",
    outcome: "The switched electromagnet lifts at least five steel paper clips for five seconds and remains cool during duty-cycled testing.",
    concepts: ["Electromagnetism", "Current", "Duty cycle"],
    input: "brief low-voltage current through a wire coil",
    output: "temporary magnetic attraction",
    motion: "electrical current-to-steel-object lift",
    losses: ["wire resistance", "air gap", "core leakage", "heat"],
    principleName: "Current-generated magnetic field",
    principle: "Each coil turn adds magnetic field in the same direction around the iron core. More turns or current can strengthen the field, but resistance and heating impose safe limits.",
    observe: "Count lifted paper clips after equal five-second on periods and one-minute cooling periods.",
    materials: electronicsMaterials("1|soft iron bolt about 6 mm × 60 mm|Concentrate magnetic field", "2 m|enameled copper magnet wire 26-30 AWG|Create coil", "1|logic-level MOSFET rated above measured coil current|Switch coil", "1|flyback diode rated above coil current|Protect switch", "1|three-AA battery holder with rechargeable or alkaline cells|Supply 4.5 V briefly", "1|momentary pushbutton plus 10 kΩ pull-down|Control duty cycle", "20|steel paper clips|Provide test load"),
    alternative: "Use a commercial low-voltage electromagnet module with a documented current rating.",
    hazard: "Use momentary five-second power only, disconnect if coil or battery warms, never connect to mains, keep away from medical devices, and do not lift sharp or heavy objects.",
    accessNote: "Use a large momentary button, a visible five-second timer, and a wide handle on the lifter.",
    wiring: [{ from: "Battery +4.5 V", to: "Coil input", purpose: "Supply low-voltage coil current" }, { from: "Coil output", to: "MOSFET drain", purpose: "Switch coil return" }, { from: "MOSFET source", to: "Battery negative", purpose: "Complete current path" }, { from: "Flyback diode", to: "Across coil, stripe to positive", purpose: "Clamp turn-off voltage" }, { from: "Button and 10 kΩ pull-down", to: "MOSFET gate", purpose: "Create momentary on command" }],
    steps: ["Prepare the core|Inspect and smooth the bolt and wrap one paper insulation layer around its shaft.|Leave ends exposed.", "Wind the coil|Wrap 80-120 neat turns in one direction, leaving 10 cm leads.|Tape layers so they cannot unwind.", "Expose wire ends|Have an adult scrape enamel from the last 1 cm of each lead.|Confirm continuity with a multimeter.", "Measure coil resistance|Record resistance before connecting power.|Calculate expected current and stop if it exceeds component ratings.", "Wire the MOSFET stage|Connect battery, coil, transistor, flyback diode, button, and pull-down.|Verify diode stripe at positive.", "Run a one-second test|Press briefly and pick up one clip.|Release and confirm the field disappears.", "Set a safe duty cycle|Use at most five seconds on followed by sixty seconds off.|Check temperature after power is disconnected.", "Compare coil turns|Test equal-time lifts with two prepared coils or taps.|Record clip count and current."],
    math: math("Estimate coil current", "current = voltage / resistance", ["Voltage = 4.5 V", "Coil resistance = 15 Ω"], "current = 4.5 / 15 = 0.30 A", "The ideal current is about 0.30 amperes.", "Choose a transistor, diode, wire, and battery rated above this current.", "Battery resistance and coil heating lower current over time."),
    test: test("Measure coil resistance and calculate expected current before applying power.", "The lifter holds five clips for five seconds and stays cool under the duty cycle.", "Clip count, current, on-time, coil temperature after power-off, and release behavior.", "coil turn count", "core, wire gauge, voltage, duty cycle, clips, and air gap", ["80 turns", "100 turns", "120 turns"]),
    failures: ["Nothing lifts|Enamel remains or circuit is open|Measure continuity|Rescrape and reconnect with power off", "Transistor warms|Current exceeds rating or gate is not fully on|Measure coil resistance and current|Use a rated logic MOSFET and reduce duty", "Clips remain after release|Core retains magnetism|Remove power and tap gently|Use softer iron and avoid long on-times", "Lift is weak|Air gap, low current, or loose winding dominates|Press core flat to one clip|Tighten coil and verify voltage"],
    tuning: "Reduce the air gap and make neat turns before increasing current. More turns can strengthen the field, but added wire resistance may lower current; heat is the non-negotiable limit.",
    extensions: ["Easier|One-clip indicator|Demonstrate on/off attraction only.", "Performance|Turns study|Graph clip count against turns at the same duty cycle.", "Advanced|Energy audit|Measure voltage and current to compare electrical power with lift count."],
    related: ["conductivity-tester", "hand-crank-generator-demo", "magnetic-maze"],
    builderMoment: "The electromagnet lifted seven clips and then observed its mandatory cooling break."
  }
] satisfies GuideBlueprint[];

export const roboticsGuides = createGuides("Robotics/electronics", blueprints);
