import { createGuides, type GuideBlueprint } from "../blueprintFactory";
import type { MathBite, TestPlan } from "../types";

const math = (title: string, formula: string, variables: string[], substitution: string, result: string, interpretation: string, assumptions: string): MathBite => ({ title, formula, variables, substitution, result, interpretation, assumptions });
const test = (firstTest: string, success: string, measure: string, variable: string, controls: string, trials: string[]): TestPlan => ({ firstTest, success, measure, variable, controls, trials });
function codingMaterials(...items: [string, string, string, string, string, ...string[]]): GuideBlueprint["materials"] { return items; }

const blueprints = [
  {
    number: 121,
    title: "Scratch Arcade Game",
    slug: "scratch-arcade-game",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "60-90 min",
    timeMinutes: 90,
    maxCost: 0,
    description: "Build a keyboard-controlled collecting game with falling objects, lives, score, speed progression, and a clear restart loop.",
    hook: "The player sees a simple catch game, but underneath it are events, clones, collision tests, variables, and a difficulty curve that changes while the game runs.",
    outcome: "The game starts from a green-flag reset, creates falling objects, updates score and lives correctly, speeds up, and reaches a game-over state.",
    concepts: ["Events", "Clones", "Variables"],
    featured: true,
    input: "left and right keyboard events",
    output: "player motion, score, lives, and game state",
    motion: "discrete input-to-sprite movement and falling-object loops",
    losses: ["frame timing", "collision edge cases", "duplicate events", "unbounded clone creation"],
    principleName: "Event-driven game loop",
    principle: "Events start scripts, while repeated loops update position and test collisions. Shared variables keep score, lives, speed, and the running state synchronized across clones.",
    observe: "Display the speed variable and note how clone travel changes after every five catches.",
    materials: codingMaterials("1|computer or tablet that runs the Scratch editor|Build and play the project", "1|Scratch account or offline editor|Save project safely", "1|keyboard or accessible input device|Control the player", "1|notebook test table|Record bugs and difficulty", "2|original simple sprites made in the editor|Represent player and falling object"),
    alternative: "Use the offline Scratch editor and draw only simple geometric sprites when internet or asset access is limited.",
    hazard: "Use an adult-managed account when required, keep projects private until approved, and do not include student names, photos, locations, or contact information.",
    accessNote: "Add A/D keys as alternatives, use high-contrast large sprites, and provide a slower starting speed setting.",
    steps: ["Define the game states|Create variables score, lives, speed, and running.|Write the start and game-over conditions.", "Build the player|Place a wide original sprite near the bottom and constrain horizontal motion.|Add arrow and A/D controls.", "Reset on green flag|Set score to 0, lives to 3, speed to 4, and running to 1.|Move the player to its start.", "Create falling clones|Hide the source object and create a clone once per second while running.|Limit creation after game over.", "Program clone motion|Start each clone at a random top x position and move downward by speed.|Delete it after a catch or miss.", "Score catches|If a clone touches the player, add one score and play a short original tone.|Increase speed every five points.", "Handle misses|If the clone passes the bottom, subtract one life and delete it.|Set running to 0 when lives reach zero.", "Test and polish|Run ten catches and ten misses intentionally.|Fix duplicate scoring, clone leaks, and restart behavior."],
    math: math("Set a difficulty increase", "speed = base speed + floor(score / 5)", ["Base speed = 4", "Score = 13"], "speed = 4 + floor(13 / 5) = 6", "At 13 points, falling speed is 6 steps per frame.", "Difficulty rises once for every five points.", "Actual screen speed depends on frame timing and device performance."),
    test: test("Run the reset script twice before playing to confirm variables and clones return to one clean state.", "Ten intentional catches and misses produce correct score, lives, speed, and game-over behavior.", "Score changes, lives, active clones, frame feel, and restart success.", "starting speed", "sprites, controls, spawn interval, collision rules, screen size, and test script", ["speed 3", "speed 4", "speed 5"]),
    failures: ["One catch adds many points|Collision remains true for several frames|Watch score during one overlap|Delete clone immediately after scoring", "Objects remain after game over|Clone loop ignores running state|Set lives to zero during a test|Check running inside clone and spawner loops", "Player leaves the screen|Position is never clamped|Hold one movement key|Limit x to stage boundaries", "Restart keeps old objects|Existing clones do not receive reset|Press green flag after many clones|Broadcast reset or stop all before initialization"],
    tuning: "Change one difficulty variable at a time. Faster falling raises challenge, but spawn rate, player width, and screen size also affect fairness.",
    extensions: ["Easier|Practice mode|Use five lives and slower objects.", "Performance|Combo scoring|Reward consecutive catches while resetting on a miss.", "Advanced|Object types|Add rare bonus and penalty clones with clearly different shapes."],
    related: ["reaction-time-game", "makecode-physics-platformer", "cardboard-arcade-button"],
    builderMoment: "The clone was supposed to fall once. It had other ideas about concurrency."
    ,code: { language: "Scratch blocks", filename: "scratch_arcade_scripts.txt", explanation: "A complete block-by-block script plan using only built-in Scratch events, variables, clones, sensing, and motion.", source: `STAGE — when green flag clicked
stop all sounds
set [score] to 0
set [lives] to 3
set [speed] to 4
set [running] to 1
broadcast [reset]
wait until <(lives) = 0>
set [running] to 0
broadcast [game over]

PLAYER — when I receive [reset]
go to x:0 y:-145
show
forever
  if <(running) = 1> then
    if <<key [right arrow] pressed?> or <key [d] pressed?>> then change x by 8
    if <<key [left arrow] pressed?> or <key [a] pressed?>> then change x by -8
    if <(x position) > 205> then set x to 205
    if <(x position) < -205> then set x to -205
  end
end

OBJECT — when green flag clicked
hide
forever
  if <(running) = 1> then create clone of [myself]
  wait 1 seconds
end

OBJECT — when I start as a clone
go to x:(pick random -210 to 210) y:175
show
repeat until <<touching [Player]?> or <(y position) < -175>>
  change y by ((0) - (speed))
  wait 0.03 seconds
end
if <touching [Player]?> then
  change [score] by 1
  set [speed] to ((4) + (floor ((score) / 5)))
else
  change [lives] by -1
end
delete this clone` }
  },
  {
    number: 122,
    title: "Reaction-Time Game",
    slug: "reaction-time-game",
    difficulty: "Beginner",
    ageRange: "10-16",
    estimatedTime: "45-70 min",
    timeMinutes: 70,
    maxCost: 0,
    description: "Create an unpredictable on-screen cue, reject early presses, measure reaction time, and summarize five trials.",
    hook: "A fair reaction game must prevent guessing. A random wait, edge-based key detection, and clear false-start rule make the measurement meaningful.",
    outcome: "The project records five valid trials in milliseconds, flags early key presses, and displays average, best, and range.",
    concepts: ["Randomness", "Timers", "Data lists"],
    input: "spacebar press after a visual cue",
    output: "reaction-time statistics",
    motion: "human event-to-measured software interval",
    losses: ["screen refresh", "keyboard latency", "anticipation", "duplicate key state"],
    principleName: "Randomized event timing",
    principle: "The program resets a timer when the cue appears, then stores the value at the next new key press. A random pre-cue delay makes anticipation less useful.",
    observe: "Compare individual trials and identify whether one unusually slow or fast value changes the average.",
    materials: codingMaterials("1|computer or tablet with Scratch or equivalent editor|Run the game", "1|keyboard or accessible switch input|Capture response", "1|high-contrast original cue sprite|Show start signal", "1|results list variable|Store five trials", "1|quiet test area|Reduce distractions"),
    alternative: "Use a large external keyboard switch or touch input mapped to space.",
    hazard: "Keep screen brightness comfortable, take breaks, and treat results as a game rather than a judgment of a person.",
    accessNote: "Offer visual and audio cue modes, larger cue graphics, and alternative input devices; compare results only within the same mode.",
    steps: ["Plan the states|Define ready, waiting, cue, response, false start, and summary.|Draw a state flow.", "Build the cue|Create a large high-contrast circle that starts hidden.|Add plain text instructions outside the sprite.", "Reset results|Clear the list, set trial to 0, and set best to a high value.|Require the spacebar to be released.", "Create random wait|Choose 2-5 seconds and start waiting.|Check for an early space press during the wait.", "Handle false starts|Show a false-start message and repeat the same trial number.|Wait for full key release.", "Measure response|Show cue, reset timer, wait for space, and store timer × 1000.|Hide cue immediately.", "Repeat five trials|Add each valid result to the list and update best.|Give a short rest.", "Calculate summary|Sum list values, divide by five, and find maximum minus minimum.|Display units as milliseconds."],
    math: math("Find reaction-time range", "range = slowest time - fastest time", ["Slowest = 310 ms", "Fastest = 240 ms"], "range = 310 - 240 = 70 ms", "The five-trial spread is 70 milliseconds.", "Range shows consistency but depends on extreme values.", "Device latency affects every measurement."),
    test: test("Hold space during the random wait to confirm false-start detection.", "Five valid trials appear in the list and summary values match a hand calculation.", "Times, early presses, average, best, range, and restart state.", "cue mode", "same user, device, key, wait range, posture, and trial count", ["visual cue", "audio cue", "visual cue after a short rest"]),
    failures: ["Time is always zero|Timer resets after the response|Inspect block order|Reset exactly when cue appears", "Held key scores instantly|Code waits for key state, not a new press|Hold space before cue|Require release before each trial", "False starts count as trials|Trial increments too early|Trigger a false start on trial one|Increment only after valid result", "Average is wrong|List contains text or old values|Show list after restart|Delete all before trials and sum numeric items"],
    tuning: "Protect fairness before adding visuals. Longer random waits reduce anticipation but can frustrate players, while more trials improve the summary but add fatigue.",
    extensions: ["Easier|Three-trial version|Display only each result and average.", "Performance|Consistency score|Use range or median.", "Advanced|Choice reaction|Show left or right cues and score speed plus correctness."],
    related: ["led-reaction-timer", "scratch-arcade-game", "traffic-light-controller"],
    builderMoment: "The game said false start. The spacebar said it was merely enthusiastic."
    ,code: { language: "Scratch blocks", filename: "reaction_game_scripts.txt", explanation: "A complete Scratch-style procedure for five valid trials with false-start handling and summary calculation.", source: `when green flag clicked
delete all of [results]
set [trial] to 0
set [best] to 99999
hide [Cue]
repeat until <(trial) = 5>
  wait until <not <key [space] pressed?>>
  say [Ready...] for 0.5 seconds
  set [waitTime] to (pick random 20 to 50) / 10
  reset timer
  set [falseStart] to 0
  repeat until <<(timer) > (waitTime)> or <key [space] pressed?>>
  end
  if <key [space] pressed?> then
    set [falseStart] to 1
    say [False start — release and try again] for 1 seconds
  else
    show [Cue]
    reset timer
    wait until <key [space] pressed?>
    set [reactionMs] to (round ((timer) * 1000))
    add (reactionMs) to [results]
    if <(reactionMs) < (best)> then set [best] to (reactionMs)
    change [trial] by 1
    hide [Cue]
    wait until <not <key [space] pressed?>>
    wait 0.5 seconds
  end
end
set [total] to 0
set [index] to 1
repeat (length of [results])
  change [total] by (item (index) of [results])
  change [index] by 1
end
set [average] to (total) / (length of [results])
say (join [Average ms: ] (average)) for 3 seconds` }
  },
  {
    number: 123,
    title: "Gear-Ratio Simulator",
    slug: "gear-ratio-simulator",
    difficulty: "Intermediate",
    ageRange: "11-18",
    estimatedTime: "75-120 min",
    timeMinutes: 120,
    maxCost: 0,
    description: "Build a browser simulator that calculates speed, torque, and direction for a simple two-gear pair and animates both rotations.",
    hook: "A simulator makes an ideal model visible. Change tooth counts and the output speed, torque multiplier, and direction update together, while a note keeps friction and backlash in view.",
    outcome: "The app accepts valid tooth counts, animates opposite gear directions at the calculated speed ratio, and reports worked results for three test cases.",
    concepts: ["Gear ratio", "Simulation", "Input validation"],
    input: "driver tooth count and input speed",
    output: "calculated driven speed, torque multiplier, and animation",
    motion: "numeric input-to-modeled rotary motion",
    losses: ["ideal-model assumptions", "display frame timing", "rounding", "invalid inputs"],
    principleName: "Ideal gear-pair model",
    principle: "For external gears, output speed equals input speed times driver teeth divided by driven teeth, and direction reverses. Ideal torque changes by the inverse speed ratio.",
    observe: "Compare 12:36 and 36:12 cases and explain why one increases ideal torque while the other increases speed.",
    materials: codingMaterials("1|computer with a modern browser|Run the simulator", "1|plain-text code editor|Edit HTML, CSS, and JavaScript", "1|local project folder|Store one self-contained file", "1|calculator or notebook|Verify outputs independently", "3|known ratio test cases|Check behavior"),
    alternative: "Use an offline browser and the single-file source with no libraries or network requests.",
    hazard: "Save only in a local classroom folder and avoid publishing names or personal data with the project.",
    accessNote: "Use labeled numeric inputs, keyboard controls, visible focus, high contrast, and a reduced-motion setting that preserves the calculated text.",
    steps: ["Define the model|Write formulas for speed, torque multiplier, and direction.|List assumptions such as no friction.", "Build labeled inputs|Add driver teeth, driven teeth, and input rpm fields with sensible limits.|Provide an update button.", "Validate values|Reject zero, negative, nonnumeric, or extreme counts with visible text.|Keep the previous valid state.", "Calculate outputs|Compute ratio, driven rpm, and ideal torque multiplier.|Round only for display.", "Draw two gears|Use CSS circles with tooth-count labels and center markers.|Do not claim exact tooth geometry.", "Animate direction|Set opposite CSS rotation directions and duration from rpm ratio.|Respect reduced-motion preference.", "Add model notes|Explain ideal assumptions and why a physical build differs.|Keep text near results.", "Run three tests|Verify 12:36, 36:12, and 24:24 by hand.|Check keyboard and error behavior."],
    math: math("Calculate driven speed", "driven rpm = input rpm × driver teeth / driven teeth", ["Input = 90 rpm", "Driver = 12 teeth", "Driven = 36 teeth"], "driven = 90 × 12 / 36 = 30 rpm", "The driven gear turns at 30 rpm in the opposite direction.", "Ideal torque is multiplied by three.", "Friction and tooth losses are omitted."),
    test: test("Verify one equal-gear case before testing reduction and speed increase.", "Three known cases match hand calculations and invalid input produces an accessible error.", "Ratio, output rpm, torque multiplier, direction, validation, and reduced-motion behavior.", "tooth-count pair", "same code, input rpm, browser, formulas, rounding, and test procedure", ["24:24", "12:36", "36:12"]),
    failures: ["Animation direction matches|Both CSS directions use the same sign|Pause and inspect classes|Reverse only the driven gear", "Results show infinity|Zero input was accepted|Enter 0 in each field|Add finite positive validation", "Text and animation disagree|Separate formulas or stale state exist|Run 12:36 and compare|Use one computed result object", "Fast ratios become unreadable|Duration is too short|Enter extreme valid counts|Clamp visual duration while preserving numeric result"],
    tuning: "Keep the mathematical result accurate even when visual speed is clamped for readability. More animation detail can look realistic but must not imply unmodeled physical precision.",
    extensions: ["Easier|Calculator only|Remove animation and verify formulas.", "Performance|Compound train|Multiply two stages and animate three shafts.", "Advanced|Loss estimate|Add a clearly labeled per-mesh efficiency slider."],
    related: ["gear-ratio-demonstrator", "compound-gear-train", "gear-ratio-race"],
    builderMoment: "The model had zero friction and therefore no opinion about the frame you would need in real life."
    ,code: { language: "html", filename: "gear-ratio-simulator.html", explanation: "A complete self-contained browser simulator with validation, accessible results, and reduced-motion support.", source: `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Gear Ratio Simulator</title>
<style>body{font:18px system-ui;max-width:720px;margin:2rem auto;padding:1rem}label{display:block;margin:.8rem 0}input,button{font:inherit;padding:.5rem}.gears{display:flex;gap:2rem;align-items:center;margin:2rem 0}.gear{display:grid;place-items:center;border:8px dotted #111;border-radius:50%;width:120px;height:120px;animation:spin var(--duration) linear infinite}.driven{animation-direction:reverse}@keyframes spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.gear{animation:none}}#error{color:#b00020}</style>
<h1>Gear Ratio Simulator</h1><label>Driver teeth <input id="driver" type="number" min="6" max="120" value="12"></label><label>Driven teeth <input id="driven" type="number" min="6" max="120" value="36"></label><label>Input rpm <input id="rpm" type="number" min="1" max="300" value="90"></label><button id="update">Update model</button><p id="error" role="alert"></p><div class="gears"><div class="gear" id="g1">Driver</div><div class="gear driven" id="g2">Driven</div></div><output id="result" aria-live="polite"></output><p>This is an ideal model. Physical gears lose energy to friction, backlash, flex, and tooth contact.</p>
<script>const $=id=>document.getElementById(id);function update(){const d=+$('driver').value,n=+$('driven').value,r=+$('rpm').value;if(![d,n,r].every(Number.isFinite)||d<6||n<6||d>120||n>120||r<=0){$('error').textContent='Enter tooth counts from 6 to 120 and a positive input speed.';return}$('error').textContent='';const out=r*d/n,torque=n/d;$('result').textContent='Ratio '+(n/d).toFixed(2)+':1. Driven speed '+out.toFixed(1)+' rpm, opposite direction. Ideal torque multiplier '+torque.toFixed(2)+'.';$('g1').textContent=d+' teeth';$('g2').textContent=n+' teeth';$('g1').style.setProperty('--duration',Math.max(.5,60/r)+'s');$('g2').style.setProperty('--duration',Math.max(.5,60/out)+'s')} $('update').addEventListener('click',update);update();</script></html>` }
  },
  {
    number: 124,
    title: "Virtual Robot Maze",
    slug: "virtual-robot-maze",
    difficulty: "Intermediate",
    ageRange: "11-18",
    estimatedTime: "90-140 min",
    timeMinutes: 140,
    maxCost: 0,
    description: "Program a grid robot to navigate walls using turn-and-move commands, collision checks, and a reusable path queue.",
    hook: "The robot moves in four directions, but solving the maze requires state: position, heading, walls, goal, and an ordered plan. One invalid move should stop safely rather than pass through a wall.",
    outcome: "The browser project loads a fixed maze, executes a queued command sequence, rejects wall collisions, and reaches the goal from the start.",
    concepts: ["Algorithms", "Coordinate grids", "State"],
    input: "queued forward, left, and right commands",
    output: "validated robot position and heading",
    motion: "discrete command sequence-to-grid navigation",
    losses: ["off-by-one errors", "coordinate confusion", "stale command state", "missing collision checks"],
    principleName: "State-based navigation",
    principle: "The robot's state contains row, column, and heading. A command proposes a new state, and collision logic accepts it only when the destination is inside the grid and not a wall.",
    observe: "Step through one command at a time and write the expected row, column, and heading before running it.",
    materials: codingMaterials("1|computer with modern browser|Run the project", "1|plain-text editor|Edit source", "1|local folder|Store the self-contained HTML file", "1|printed 8 × 8 grid|Plan coordinates", "1|command-card set labeled F, L, R|Storyboard algorithms"),
    alternative: "Act out the algorithm on a floor grid before using a screen.",
    hazard: "Keep projects local or use approved accounts, and do not publish names, school locations, or personal information.",
    accessNote: "Provide keyboard-operable buttons, screen-reader status text, high-contrast walls, and command cards with tactile symbols.",
    steps: ["Define the grid|Represent open cells with 0 and walls with 1.|Mark start and goal coordinates.", "Store robot state|Create row, column, and heading values.|Draw an arrow for each heading.", "Build turn logic|Rotate heading left or right without changing position.|Test four consecutive turns.", "Propose forward motion|Convert heading into row and column offsets.|Do not change state yet.", "Check collisions|Reject proposed cells outside the grid or equal to 1.|Show a visible status message.", "Draw the maze|Render every cell, wall, goal, and robot from current state.|Repeat essential status in text.", "Queue commands|Let buttons append F, L, or R and run one item at a time.|Provide clear and step controls.", "Verify a solution|Plan on paper, enter the sequence, and step through it.|Record and fix the first mismatch."],
    math: math("Convert heading to a turn", "new heading index = (old index + turn + 4) mod 4", ["Old heading east = 1", "Left turn = -1"], "new = (1 - 1 + 4) mod 4 = 0", "Heading index 0 represents north.", "Modular arithmetic wraps after the fourth direction.", "The chosen index order must stay consistent."),
    test: test("Run four right turns and confirm the robot returns to its original heading.", "The provided command queue reaches the goal and every attempted wall move is rejected.", "Final position, collision count, command count, status text, and keyboard operation.", "command sequence", "maze, start, goal, movement rules, heading order, and render function", ["known solution", "one intentional wall collision", "same solution with step mode"]),
    failures: ["Robot walks through walls|State updates before validation|Attempt a known wall move|Validate proposed state first", "Left and right are reversed|Heading order or turn sign is wrong|Run four one-step turns|Use one documented direction array", "Maze draws flipped|Row and column map to x and y incorrectly|Mark cell (1,2) on paper|Use column for x and row for y", "Queue repeats old commands|Run index is not reset|Clear and enter a new path|Reset queue and pointer together"],
    tuning: "Make state transitions correct before adding automatic solving. Faster animation is pleasant, but step mode is essential for debugging and accessibility.",
    extensions: ["Easier|Five-by-five maze|Use buttons with immediate commands.", "Performance|Shortest path|Compare valid command counts.", "Advanced|Breadth-first search|Generate a shortest route and explain the visited set."],
    related: ["drawbot", "makecode-physics-platformer", "differential-steer-rover-chassis"],
    builderMoment: "The virtual robot did not hit the wall. It submitted a collision error with coordinates."
    ,code: { language: "html", filename: "virtual-robot-maze.html", explanation: "A complete self-contained grid maze with queued keyboard-friendly commands and collision-safe state updates.", source: `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Virtual Robot Maze</title><style>body{font:18px system-ui;max-width:700px;margin:2rem auto}.grid{display:grid;grid-template-columns:repeat(6,52px);gap:2px}.cell{width:52px;height:52px;display:grid;place-items:center;border:1px solid #555}.wall{background:#111}.goal{background:#ffd433}.robot{color:#075fd8;font-size:30px}button{font:inherit;padding:.6rem;margin:.25rem}</style><h1>Virtual Robot Maze</h1><div id="grid" class="grid" aria-label="Six by six maze"></div><p id="status" aria-live="polite"></p><button data-cmd="L">Turn left</button><button data-cmd="F">Forward</button><button data-cmd="R">Turn right</button><button id="run">Run queue</button><button id="clear">Clear</button><p>Queue: <output id="queue"></output></p><script>
const maze=[[0,0,1,0,0,0],[1,0,1,0,1,0],[0,0,0,0,1,0],[0,1,1,0,0,0],[0,0,0,1,1,0],[1,1,0,0,0,0]], dirs=[[-1,0],[0,1],[1,0],[0,-1]], arrows=['↑','→','↓','←'];let robot={r:0,c:0,d:1},queue=[];const goal={r:5,c:5};
function draw(){const grid=document.getElementById('grid');grid.innerHTML='';maze.forEach((row,r)=>row.forEach((wall,c)=>{const cell=document.createElement('div');cell.className='cell'+(wall?' wall':'')+(r==goal.r&&c==goal.c?' goal':'');if(r==robot.r&&c==robot.c){cell.textContent=arrows[robot.d];cell.classList.add('robot')}grid.append(cell)}));document.getElementById('queue').textContent=queue.join(' ')}
function step(cmd){if(cmd==='L')robot.d=(robot.d+3)%4;else if(cmd==='R')robot.d=(robot.d+1)%4;else{const nr=robot.r+dirs[robot.d][0],nc=robot.c+dirs[robot.d][1];if(nr<0||nc<0||nr>=maze.length||nc>=maze[0].length||maze[nr][nc]){document.getElementById('status').textContent='Blocked at row '+nr+', column '+nc;draw();return}robot.r=nr;robot.c=nc}document.getElementById('status').textContent=robot.r===goal.r&&robot.c===goal.c?'Goal reached!':'Robot at row '+robot.r+', column '+robot.c;draw()}
document.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>{queue.push(b.dataset.cmd);draw()});document.getElementById('run').onclick=()=>{const run=[...queue];queue=[];let i=0;const timer=setInterval(()=>{if(i>=run.length){clearInterval(timer);return}step(run[i++])},350)};document.getElementById('clear').onclick=()=>{queue=[];robot={r:0,c:0,d:1};draw()};draw();</script></html>` }
  },
  {
    number: 125,
    title: "MakeCode Physics Platformer",
    slug: "makecode-physics-platformer",
    difficulty: "Advanced",
    ageRange: "12-18",
    estimatedTime: "120-180 min",
    timeMinutes: 180,
    maxCost: 0,
    description: "Create a tile-based platformer with gravity, jumping, coins, hazards, camera follow, and a complete win-and-restart loop.",
    hook: "Platform games feel responsive when vertical velocity, grounded checks, collision tiles, and input timing work together. The code turns those physics rules into a playable level.",
    outcome: "The game loads one original tilemap, supports walking and grounded jumps, collects coins once, handles hazards, and reaches a win state.",
    concepts: ["Velocity", "Collision states", "Game events"],
    input: "left, right, and jump button events",
    output: "player motion, score, lives, and level completion",
    motion: "digital input-to-velocity-based sprite motion",
    losses: ["frame-rate assumptions", "double jumps", "tile-edge collisions", "duplicate overlap events"],
    principleName: "Discrete game physics",
    principle: "The engine updates velocity and position each frame, then resolves collisions with solid tiles. A grounded test allows jumps only when the player is standing on a floor tile.",
    observe: "Display vertical velocity while jumping and note where it crosses zero at the top of the arc.",
    materials: codingMaterials("1|computer or tablet that runs MakeCode Arcade|Build and test", "1|approved account or offline-capable editor|Save project", "1|keyboard or game controller|Provide input", "1|original 16 × 16 pixel sprites|Represent player and items", "1|original tilemap planned on grid paper|Create level"),
    alternative: "Use the MakeCode Arcade offline app and keyboard-only controls.",
    hazard: "Use approved accounts, do not include personal information, and take screen and hand breaks during longer coding sessions.",
    accessNote: "Use high-contrast tiles, remappable controls, forgiving jump speed, and an optional no-hazard practice mode.",
    steps: ["Plan the level|Draw start, platforms, five coins, two hazards, and goal on grid paper.|Ensure every required jump is possible.", "Create player physics|Make the sprite, set horizontal controller movement, and apply downward acceleration.|Keep speed values in named constants.", "Build the tilemap|Draw original solid ground, empty space, hazard, and goal tiles.|Place player at the start marker.", "Add grounded jumping|On jump press, change vertical velocity only when the player hits a wall below.|Prevent air jumps.", "Program coins|Create coin sprites at marked tiles and destroy each on overlap after scoring.|Use one event handler.", "Handle hazards|On hazard overlap, reduce life, move to checkpoint, and briefly protect from repeat damage.|End at zero lives.", "Add the goal|Require all five coins before the goal wins; otherwise show remaining count.|Stop movement after win.", "Test edge cases|Try jumping under platforms, touching a hazard continuously, revisiting coins, and restarting.|Fix one state bug at a time."],
    math: math("Estimate jump time", "time to peak = initial upward speed / gravity", ["Upward speed magnitude = 150 px/s", "Gravity = 400 px/s²"], "time = 150 / 400 = 0.375 s", "The player reaches the ideal jump peak after about 0.38 seconds.", "Total airtime is roughly twice that when landing at the same height.", "The tile engine resolves motion in discrete frames and collisions alter the path."),
    test: test("Verify walking and one grounded jump in an empty test room before loading the full level.", "The complete level supports all required events and restarts with score and lives reset.", "Jump success, duplicate coin events, hazard repeats, completion state, and restart state.", "jump velocity", "tilemap, gravity, horizontal speed, controls, coin count, and test route", ["lower jump", "baseline jump", "higher safe jump"]),
    failures: ["Player can double jump|Grounded condition is missing or always true|Press jump repeatedly in air|Check collision below before setting velocity", "Coins score twice|Sprite is not destroyed immediately|Pause on one overlap|Destroy before any delayed effect", "Hazard removes all lives|Overlap repeats every frame|Stand on hazard during test|Move to checkpoint and add invulnerability time", "Goal wins early|Coin requirement is not checked|Reach goal with zero coins|Compare score with total before game over win"],
    tuning: "Tune gravity and jump velocity together. A higher jump reaches more tiles but can reduce control and make ceilings or hazards easier to bypass.",
    extensions: ["Easier|Practice level|Remove hazards and require three coins.", "Performance|Time trial|Add a timer without changing physics.", "Advanced|Moving platforms|Create controlled platform motion and safe rider behavior."],
    related: ["scratch-arcade-game", "virtual-robot-maze", "reaction-time-game"],
    builderMoment: "The player collected every coin and found one tile edge with a strong opinion about momentum."
    ,verificationBasis: "code-executed",
    code: { language: "typescript", filename: "makecode_platformer.ts", explanation: "A complete MakeCode Arcade TypeScript project using built-in tilemaps and sprite events; replace the sample tilemap literals with original editor-created tiles at the same named locations.", source: `namespace SpriteKind { export const Coin = SpriteKind.create() }
const MOVE_SPEED=90, JUMP_SPEED=-150, GRAVITY=400, TOTAL_COINS=5
let collected=0, invulnerable=false
const player=sprites.create(img\` . . . . 8 8 8 8 . . . . . . . .
 . . 8 8 9 9 9 9 8 8 . . . . . .
 . . 8 9 9 8 8 9 9 8 . . . . . .
 . . 8 9 9 9 9 9 9 8 . . . . . .
 . . . 8 9 9 9 9 8 . . . . . . .
 . . 8 8 8 8 8 8 8 8 . . . . . .
 . 8 8 . 8 8 8 8 . 8 8 . . . . .
 . . . . 8 . . 8 . . . . . . . .\`,SpriteKind.Player)
controller.moveSprite(player,MOVE_SPEED,0); player.ay=GRAVITY; scene.cameraFollowSprite(player); info.setLife(3)
tiles.setCurrentTilemap(tilemap\`level1\`); tiles.placeOnRandomTile(player,assets.tile\`start\`); tiles.setTileAt(player.tilemapLocation(),assets.tile\`transparent\`)
for(let i=0;i<TOTAL_COINS;i++){ const coin=sprites.create(img\` . 5 5 . / 5 4 4 5 / 5 4 4 5 / . 5 5 .\`,SpriteKind.Coin); tiles.placeOnRandomTile(coin,assets.tile\`coinSpot\`) }
controller.A.onEvent(ControllerButtonEvent.Pressed,()=>{ if(player.isHittingTile(CollisionDirection.Bottom)) player.vy=JUMP_SPEED })
sprites.onOverlap(SpriteKind.Player,SpriteKind.Coin,(hero,coin)=>{ coin.destroy(effects.spray,100); collected++; info.changeScoreBy(1) })
scene.onOverlapTile(SpriteKind.Player,assets.tile\`hazard\`,sprite=>{ if(invulnerable)return; invulnerable=true; info.changeLifeBy(-1); tiles.placeOnRandomTile(sprite,assets.tile\`checkpoint\`); timer.after(1000,()=>invulnerable=false) })
scene.onOverlapTile(SpriteKind.Player,assets.tile\`goal\`,()=>{ if(collected>=TOTAL_COINS) game.over(true,effects.confetti); else player.sayText((TOTAL_COINS-collected)+" coins left",700) })` }
  }
] satisfies GuideBlueprint[];

export const codingGuides = createGuides("Coding/game projects", blueprints);
