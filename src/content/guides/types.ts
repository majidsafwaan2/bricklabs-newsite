export const GUIDE_CATEGORIES = [
  "Brick-compatible mechanisms",
  "Cardboard builds",
  "Household engineering",
  "Classroom challenges",
  "Robotics/electronics",
  "Coding/game projects"
] as const;

export const GUIDE_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export const VERIFICATION_BASES = [
  "bricklabs-video-demonstrated",
  "standard-mechanism",
  "dimensionally-specified-classroom-build",
  "code-executed",
  "circuit-checked",
  "editorial-geometry-review"
] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];
export type GuideDifficulty = (typeof GUIDE_DIFFICULTIES)[number];
export type VerificationBasis = (typeof VERIFICATION_BASES)[number];

export type GuideMaterial = {
  quantity: string;
  item: string;
  purpose: string;
};

export type GuideVisual = {
  src: string;
  alt: string;
  caption?: string;
};

export type GuideStep = {
  id: string;
  title: string;
  instructions: string[];
  visual: GuideVisual;
  checkpoint?: string;
  commonMistake?: string;
};

export type ConceptPause = {
  title: string;
  concept: string;
  explanation: string;
  observe: string;
};

export type MathBite = {
  title: string;
  formula: string;
  variables: string[];
  substitution: string;
  result: string;
  interpretation: string;
  assumptions: string;
};

export type TestPlan = {
  firstTest: string;
  success: string;
  measure: string;
  variable: string;
  controls: string;
  trials: string[];
};

export type TroubleshootingItem = {
  symptom: string;
  likelyCause: string;
  confirm: string;
  fix: string;
};

export type GuideExtension = {
  level: "Easier" | "Performance" | "Creative" | "Advanced";
  title: string;
  description: string;
};

export type GlossaryItem = {
  term: string;
  definition: string;
};

export type GuideSource = {
  label: string;
  href?: string;
  note: string;
};

export type VerifiedTikTokVideo = {
  url: string;
  postId: string;
  caption: string;
  publishedAt: string;
  poster?: string;
};

export type GuideCode = {
  language: string;
  filename: string;
  source: string;
  explanation: string;
};

export type GuideWiringRow = {
  from: string;
  to: string;
  purpose: string;
};

export type GuideArticle = {
  number: number;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: GuideCategory;
  difficulty: GuideDifficulty;
  ageRange: string;
  estimatedTime: string;
  timeMinutes: number;
  tuningTime: string;
  estimatedCost: string;
  maxCost: number;
  reuseCost: string;
  workspace: string;
  supervision: string;
  concepts: string[];
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  hook: string;
  finishedResult: string;
  learningObjectives: string[];
  materials: GuideMaterial[];
  tools: string[];
  alternatives: string[];
  accessibility: string[];
  safety: string[];
  orientation: string;
  input: string;
  output: string;
  motion: string;
  efficiencyLosses: string[];
  steps: GuideStep[];
  conceptPauses: ConceptPause[];
  mathBite: MathBite;
  testing: TestPlan;
  troubleshooting: TroubleshootingItem[];
  tuning: string;
  extensions: GuideExtension[];
  classroomAdaptation: string;
  reflectionQuestions: string[];
  glossary: GlossaryItem[];
  relatedSlugs: string[];
  sourceType: string;
  sources: GuideSource[];
  verificationBasis: VerificationBasis;
  advancedExtension: boolean;
  householdFriendly: boolean;
  classroomFriendly: boolean;
  electronicsOrCode: boolean;
  heroImage: string;
  heroAlt: string;
  conceptVisual: GuideVisual;
  humorVisual: GuideVisual;
  builderMoment: string;
  video?: VerifiedTikTokVideo;
  wiring?: GuideWiringRow[];
  code?: GuideCode;
};

export type GuideSummary = Pick<
  GuideArticle,
  | "number"
  | "slug"
  | "title"
  | "shortTitle"
  | "description"
  | "category"
  | "difficulty"
  | "ageRange"
  | "estimatedTime"
  | "timeMinutes"
  | "estimatedCost"
  | "maxCost"
  | "concepts"
  | "tags"
  | "heroImage"
  | "heroAlt"
  | "featured"
  | "publishedAt"
  | "updatedAt"
> & {
  materialsPreview: string[];
  hasVideo: boolean;
};

export function toGuideSummary(guide: GuideArticle): GuideSummary {
  return {
    number: guide.number,
    slug: guide.slug,
    title: guide.title,
    shortTitle: guide.shortTitle,
    description: guide.description,
    category: guide.category,
    difficulty: guide.difficulty,
    ageRange: guide.ageRange,
    estimatedTime: guide.estimatedTime,
    timeMinutes: guide.timeMinutes,
    estimatedCost: guide.estimatedCost,
    maxCost: guide.maxCost,
    concepts: guide.concepts,
    tags: guide.tags,
    materialsPreview: guide.materials.slice(0, 4).map((material) => material.item),
    heroImage: guide.heroImage,
    heroAlt: guide.heroAlt,
    hasVideo: Boolean(guide.video),
    featured: guide.featured,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt
  };
}
