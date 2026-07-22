import { curatedGuideSeedSchema, type CuratedGuideSeed } from "./curatedSchema";
import { buildCuratedGuide } from "./curatedFactory";
import type { GuideArticle, GuideCategory, GuideCode, GuideDifficulty, GuideWiringRow, MathBite, TestPlan, VerificationBasis } from "./types";

export type GuideBlueprint = {
  number: number;
  title: string;
  slug: string;
  difficulty: GuideDifficulty;
  ageRange: string;
  estimatedTime: string;
  timeMinutes: number;
  maxCost: number;
  description: string;
  hook: string;
  outcome: string;
  concepts: [string, string, string, ...string[]];
  featured?: boolean;
  input: string;
  output: string;
  motion: string;
  losses: [string, string, string, string];
  principleName: string;
  principle: string;
  observe: string;
  materials: [string, string, string, string, string, ...string[]];
  extraTools?: string[];
  alternative: string;
  hazard: string;
  accessNote: string;
  steps: [string, string, string, string, string, string, string, string, ...string[]];
  math: MathBite;
  test: TestPlan;
  failures: [string, string, string, string];
  tuning: string;
  extensions: [string, string, string, ...string[]];
  related: [string, string, string, ...string[]];
  builderMoment: string;
  verificationBasis?: VerificationBasis;
  advancedExtension?: boolean;
  wiring?: [GuideWiringRow, GuideWiringRow, GuideWiringRow, ...GuideWiringRow[]];
  code?: GuideCode;
};

type CategoryProfile = {
  tools: string[];
  alternatives: string[];
  safety: string[];
  access: string[];
  verificationBasis: VerificationBasis;
  householdFriendly: boolean;
  classroomFriendly: boolean;
  electronicsOrCode: boolean;
};

const profiles: Record<GuideCategory, CategoryProfile> = {
  "Brick-compatible mechanisms": {
    tools: ["Ruler", "Removable tape for motion marks"],
    alternatives: ["Use equivalent brick-compatible parts from any kit.", "Use cardboard beams and straw bearings for a larger demonstration model."],
    safety: ["Keep fingers, hair, and loose sleeves clear of moving parts.", "Turn the mechanism by hand; do not attach a high-speed motor."],
    access: ["Use high-contrast tape to distinguish input and output parts.", "Replace a small crank with a wider handle for an easier grip."],
    verificationBasis: "standard-mechanism",
    householdFriendly: false,
    classroomFriendly: true,
    electronicsOrCode: false
  },
  "Cardboard builds": {
    tools: ["Ruler", "Pencil", "Scissors", "Low-temperature glue gun or tape"],
    alternatives: ["Use clean shipping-box cardboard instead of buying sheets.", "Replace hot glue with strong tape and folded tabs."],
    safety: ["An adult should handle craft knives and make difficult starter cuts.", "Let hot glue cool before pressing a joint or testing moving parts."],
    access: ["Pre-cut repeated pieces and mark fold lines with high-contrast ink.", "Use large tabs, binder clips, and tape for easier one-handed assembly."],
    verificationBasis: "editorial-geometry-review",
    householdFriendly: true,
    classroomFriendly: true,
    electronicsOrCode: false
  },
  "Household engineering": {
    tools: ["Ruler", "Pencil", "Scissors", "Masking tape"],
    alternatives: ["Use clean recycled packaging whenever it has similar stiffness.", "Substitute paper clips, binder clips, or twist ties for specialty fasteners."],
    safety: ["Wear eye protection when stretched elastic, magnets, or spinning parts are present.", "Test at floor or tabletop height and keep the path clear of people."],
    access: ["Offer pre-cut parts and tactile or high-contrast measurement marks.", "Split roles so one builder can hold, another assemble, and another measure."],
    verificationBasis: "dimensionally-specified-classroom-build",
    householdFriendly: true,
    classroomFriendly: true,
    electronicsOrCode: false
  },
  "Classroom challenges": {
    tools: ["Ruler", "Pencil", "Scissors", "Timer or phone stopwatch"],
    alternatives: ["Use reclaimed paper and packaging while keeping material limits equal for every team.", "Replace metal test weights with labeled bags of coins or washers."],
    safety: ["Keep load and drop tests below shoulder height and away from faces.", "Clear the test zone before releasing moving objects or suspended loads."],
    access: ["Assign varied roles such as designer, builder, tester, recorder, and presenter.", "Provide pre-measured materials and a visual checklist when helpful."],
    verificationBasis: "dimensionally-specified-classroom-build",
    householdFriendly: true,
    classroomFriendly: true,
    electronicsOrCode: false
  },
  "Robotics/electronics": {
    tools: ["Small screwdriver", "Wire stripper", "Multimeter", "Low-temperature glue gun or tape"],
    alternatives: ["Use alligator-clip leads for a no-solder version.", "Build and test the mechanism manually before adding electronics."],
    safety: ["Use only the listed low-voltage battery supply; never use mains electricity.", "Disconnect power before changing wires and stop if a motor, wire, or battery becomes warm."],
    access: ["Color-code and label every wire at both ends.", "Use clip leads, larger controls, and pre-crimped connectors when fine motor work is difficult."],
    verificationBasis: "circuit-checked",
    householdFriendly: false,
    classroomFriendly: true,
    electronicsOrCode: true
  },
  "Coding/game projects": {
    tools: ["Computer or tablet", "Web browser or offline editor", "Notebook for test results"],
    alternatives: ["Use the platform's offline editor when internet access is limited.", "Storyboard the logic with cards and arrows before opening the coding tool."],
    safety: ["Use a teacher, parent, or guardian account where the platform requires an adult.", "Do not publish student names, locations, or personal contact details inside a project."],
    access: ["Use keyboard-accessible controls and high-contrast sprites or interface elements.", "Pair a navigator who reads instructions with a driver who enters blocks or code."],
    verificationBasis: "code-executed",
    householdFriendly: true,
    classroomFriendly: true,
    electronicsOrCode: true
  }
};

function orientation(category: GuideCategory, blueprint: GuideBlueprint) {
  if (category === "Coding/game projects") {
    return `Treat the screen origin and stage edges as fixed references. The control that creates ${blueprint.input} is the input side; the sprite, score, or display that produces ${blueprint.output} is the output side.`;
  }
  return `Place the build so ${blueprint.input} is on your left and ${blueprint.output} is on your right. Call the side facing you the front, the far side the back, the tabletop the bottom, and the opposite face the top.`;
}

function buildSeed(category: GuideCategory, blueprint: GuideBlueprint): CuratedGuideSeed {
  const profile = profiles[category];
  const stepTitles = blueprint.steps.map((step) => step.split("|")[0]);
  const seed = {
    ...blueprint,
    featured: blueprint.featured ?? false,
    tags: [...new Set([...blueprint.slug.split("-"), ...blueprint.concepts.map((concept) => concept.toLowerCase())])].slice(0, 8),
    tools: [...profile.tools, ...(blueprint.extraTools ?? [])],
    alternatives: [...profile.alternatives, blueprint.alternative],
    safety: [...profile.safety, blueprint.hazard],
    access: [...profile.access, blueprint.accessNote],
    orientation: orientation(category, blueprint),
    checkpoints: [
      `After ${stepTitles[2].toLowerCase()}, the first subassembly should stay aligned when handled gently.`,
      `After ${stepTitles[5].toLowerCase()}, operate the build slowly and confirm that ${blueprint.output} begins without binding.`,
      `At the final checkpoint, ${blueprint.outcome}`
    ],
    classroom: `Teams can compare ${blueprint.test.variable.toLowerCase()} while keeping ${blueprint.test.controls.toLowerCase()}. Assign builder, tester, recorder, and explainer roles; have each team predict the result before collecting three trials.`,
    reflection: [
      `How did ${blueprint.test.variable.toLowerCase()} change the measured result?`,
      `Where did ${blueprint.losses[0]} affect the build most strongly?`,
      `What evidence shows that ${blueprint.principleName.toLowerCase()} explains the motion?`,
      `Which change would improve ${blueprint.output} without creating a new problem?`
    ],
    glossary: [
      `${blueprint.principleName}|${blueprint.principle.split(/(?<=[.!?])\s/)[0]}`,
      `Input|The action or energy supplied to a system; here it is ${blueprint.input}.`,
      `Output|The useful response produced by a system; here it is ${blueprint.output}.`,
      `Efficiency|The fraction of input energy that becomes useful output instead of friction, sound, heat, or unwanted motion.`
    ],
    verificationBasis: blueprint.verificationBasis ?? profile.verificationBasis,
    advancedExtension: blueprint.advancedExtension ?? blueprint.difficulty === "Advanced",
    householdFriendly: profile.householdFriendly,
    classroomFriendly: profile.classroomFriendly,
    electronicsOrCode: profile.electronicsOrCode
  };

  return curatedGuideSeedSchema.parse(seed);
}

export function createGuides(category: GuideCategory, blueprints: GuideBlueprint[]): GuideArticle[] {
  return blueprints.map((blueprint) => buildCuratedGuide({ ...buildSeed(category, blueprint), category }));
}
