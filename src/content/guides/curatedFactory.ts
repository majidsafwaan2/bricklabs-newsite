import { defineGuide } from "./guideFactory";
import type { CuratedGuideSeed } from "./curatedSchema";
import type { GuideArticle, GuideCategory, GuideExtension, GuideMaterial, GlossaryItem, TroubleshootingItem } from "./types";

type SeedWithCategory = CuratedGuideSeed & { category: GuideCategory };

const sourceNotes: Record<GuideCategory, GuideArticle["sources"]> = {
  "Brick-compatible mechanisms": [
    { label: "Mechanism verification", note: "Standard kinematics were checked for motion direction, constraint, clearance, and likely friction points." }
  ],
  "Cardboard builds": [
    { label: "Cardboard design verification", note: "Dimensions, fold allowances, repeated-motion joints, and likely load paths received an editorial geometry review." }
  ],
  "Household engineering": [
    { label: "Classroom engineering basis", note: "A common educational challenge implemented with original dimensions, tests, diagrams, and instructions." }
  ],
  "Classroom challenges": [
    { label: "Classroom challenge basis", note: "A controlled-variable engineering activity with original constraints, scoring ideas, and measurement guidance." }
  ],
  "Robotics/electronics": [
    { label: "Low-voltage design review", note: "Battery voltage, polarity, component roles, current paths, and motor or LED protection were editorially checked." }
  ],
  "Coding/game projects": [
    { label: "Programming project basis", note: "A platform-appropriate educational project with complete logic, setup instructions, debugging, and original examples." }
  ]
};

const sourceTypes: Record<GuideCategory, string> = {
  "Brick-compatible mechanisms": "An original BrickLabClips interpretation of a standard mechanical mechanism.",
  "Cardboard builds": "An original BrickLabClips cardboard machine with dimensionally specified construction.",
  "Household engineering": "A familiar household engineering activity implemented with original instructions and controlled tests.",
  "Classroom challenges": "A common classroom engineering challenge implemented with original constraints, diagrams, and measurement guidance.",
  "Robotics/electronics": "A platform-agnostic low-voltage robotics or electronics project with original assembly guidance.",
  "Coding/game projects": "A platform-appropriate educational coding project with original logic and instruction."
};

function parseMaterial(value: string): GuideMaterial {
  const [quantity, item, purpose] = value.split("|");
  return { quantity, item, purpose };
}

function parseTroubleshooting(value: string): TroubleshootingItem {
  const [symptom, likelyCause, confirm, fix] = value.split("|");
  return { symptom, likelyCause, confirm, fix };
}

function parseExtension(value: string): GuideExtension {
  const [level, title, description] = value.split("|") as [GuideExtension["level"], string, string];
  return { level, title, description };
}

function parseGlossary(value: string): GlossaryItem {
  const [term, definition] = value.split("|");
  return { term, definition };
}

function formatCost(maxCost: number) {
  return maxCost === 0 ? "$0" : `$0-$${maxCost}`;
}

export function buildCuratedGuide(seed: SeedWithCategory): GuideArticle {
  const checkpoints = new Map([
    [2, seed.checkpoints[0]],
    [5, seed.checkpoints[1]],
    [seed.steps.length - 1, seed.checkpoints[2]]
  ]);

  return defineGuide({
    number: seed.number,
    slug: seed.slug,
    title: seed.title,
    description: seed.description,
    category: seed.category,
    difficulty: seed.difficulty,
    ageRange: seed.ageRange,
    estimatedTime: seed.estimatedTime,
    timeMinutes: seed.timeMinutes,
    tuningTime: seed.difficulty === "Advanced" ? "30-45 min" : "15-25 min",
    estimatedCost: formatCost(seed.maxCost),
    maxCost: seed.maxCost,
    reuseCost: seed.maxCost <= 10 ? "$0-$3 with reused materials" : "Usually under $5 with an existing kit",
    workspace: seed.category === "Coding/game projects" ? "A computer or tablet workspace" : "A clear table about 90 cm wide",
    supervision: seed.category === "Robotics/electronics" ? "Adult guidance recommended for wiring and cutting" : "Adult help recommended for sharp or heated tools",
    concepts: seed.concepts,
    tags: seed.tags,
    featured: seed.featured,
    hook: seed.hook,
    finishedResult: seed.outcome,
    learningObjectives: [
      `Identify how ${seed.input} produces ${seed.output}.`,
      `Construct and explain a ${seed.motion} system.`,
      `Measure how ${seed.test.variable.toLowerCase()} changes performance.`,
      `Diagnose losses caused by ${seed.losses.slice(0, 2).join(" and ")}.`
    ],
    materials: seed.materials.map(parseMaterial),
    tools: seed.tools,
    alternatives: seed.alternatives,
    accessibility: seed.access,
    safety: seed.safety,
    orientation: seed.orientation,
    input: seed.input,
    output: seed.output,
    motion: seed.motion,
    efficiencyLosses: seed.losses,
    steps: seed.steps.map((value, index) => {
      const [title, first, second] = value.split("|");
      return {
        id: `${index + 1}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
        title,
        instructions: [first, second],
        checkpoint: checkpoints.get(index),
        commonMistake: index === 3 ? `If this stage binds or drifts, inspect ${seed.losses[index % seed.losses.length]} before adding more parts.` : undefined
      };
    }),
    conceptPauses: [
      { title: "Why this works", concept: seed.principleName, explanation: seed.principle, observe: seed.observe },
      {
        title: "Where the energy goes",
        concept: "Efficiency and losses",
        explanation: `The ideal model leaves out ${seed.losses.join(", ")}. These effects turn some input energy into heat, sound, vibration, or unwanted motion, so measured performance will be lower than an ideal calculation.`,
        observe: `Run the build slowly and locate the first place where ${seed.losses[0]} becomes visible or audible.`
      }
    ],
    mathBite: seed.math,
    testing: seed.test,
    troubleshooting: seed.failures.map(parseTroubleshooting),
    tuning: seed.tuning,
    extensions: seed.extensions.map(parseExtension),
    classroomAdaptation: seed.classroom,
    reflectionQuestions: seed.reflection,
    glossary: seed.glossary.map(parseGlossary),
    relatedSlugs: seed.related,
    sourceType: sourceTypes[seed.category],
    sources: sourceNotes[seed.category],
    verificationBasis: seed.verificationBasis,
    advancedExtension: seed.advancedExtension,
    householdFriendly: seed.householdFriendly,
    classroomFriendly: seed.classroomFriendly,
    electronicsOrCode: seed.electronicsOrCode,
    builderMoment: seed.builderMoment,
    code: seed.code,
    video: undefined,
    wiring: seed.wiring
  });
}
