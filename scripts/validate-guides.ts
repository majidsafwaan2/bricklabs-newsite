import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { allGuides } from "../src/content/guides/registry";
import { suppliedCoverPhotoCount } from "../src/content/guides/media";
import { GUIDE_CATEGORIES, GUIDE_DIFFICULTIES } from "../src/content/guides/types";
import videoManifest from "../src/content/tiktok/bricklabclips-video-manifest.json";

const root = process.cwd();
const failures: string[] = [];
const warnings: string[] = [];
const expectedCategoryCounts: Record<string, number> = {
  "Brick-compatible mechanisms": 45,
  "Cardboard builds": 20,
  "Household engineering": 20,
  "Classroom challenges": 15,
  "Robotics/electronics": 20,
  "Coding/game projects": 5
};
const requiredAssets = ["concept.svg"];
const obsoleteGeneratedAssets = ["hero.svg", "step-01.svg", "step-02.svg", "step-03.svg", "builder-moment.svg"];
const placeholderPattern = /\b(coming soon|todo|tbd|lorem ipsum|add image|insert video|write this later|starter draft)\b/i;
const exactTikTokPattern = /^https:\/\/(?:www\.)?tiktok\.com\/@bricklabclips\/video\/\d+(?:\?.*)?$/;

function fail(message: string) {
  failures.push(message);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function meaningfulWordCount(guide: (typeof allGuides)[number]) {
  const visible = [
    guide.description, guide.hook, guide.finishedResult, ...guide.learningObjectives,
    ...guide.materials.flatMap((item) => [item.quantity, item.item, item.purpose]),
    ...guide.tools, ...guide.alternatives, ...guide.accessibility, ...guide.safety,
    guide.orientation, guide.input, guide.output, guide.motion, ...guide.efficiencyLosses,
    ...guide.steps.flatMap((step) => [step.title, ...step.instructions, step.checkpoint ?? "", step.commonMistake ?? ""]),
    ...guide.conceptPauses.flatMap((pause) => [pause.title, pause.concept, pause.explanation, pause.observe]),
    guide.mathBite.title, guide.mathBite.formula, ...guide.mathBite.variables, guide.mathBite.substitution,
    guide.mathBite.result, guide.mathBite.interpretation, guide.mathBite.assumptions,
    guide.testing.firstTest, guide.testing.success, guide.testing.measure, guide.testing.variable,
    guide.testing.controls, ...guide.testing.trials,
    ...guide.troubleshooting.flatMap((item) => [item.symptom, item.likelyCause, item.confirm, item.fix]),
    guide.tuning, ...guide.extensions.flatMap((item) => [item.level, item.title, item.description]),
    guide.classroomAdaptation, ...guide.reflectionQuestions,
    ...guide.glossary.flatMap((item) => [item.term, item.definition]), guide.sourceType,
    ...guide.sources.flatMap((source) => [source.label, source.note]), guide.builderMoment,
    guide.code?.explanation ?? "", guide.code?.source ?? ""
  ].join(" ");
  return visible.trim().split(/\s+/).filter(Boolean).length;
}

function repeatedValues(values: Array<{ guide: string; value: string }>, label: string) {
  const seen = new Map<string, Set<string>>();
  for (const item of values) {
    const key = normalize(item.value);
    if (key.length < 45) continue;
    const guides = seen.get(key) ?? new Set<string>();
    guides.add(item.guide);
    seen.set(key, guides);
  }
  for (const [value, guides] of seen) {
    if (guides.size > 1) fail(`Duplicate ${label} shared by ${[...guides].join(", ")}: “${value.slice(0, 90)}…”`);
  }
}

if (allGuides.length !== 125) fail(`Expected exactly 125 guides; found ${allGuides.length}.`);

const numbers = new Set<number>();
const slugs = new Set<string>();
const titles = new Set<string>();
const guideSlugs = new Set(allGuides.map((guide) => guide.slug));
const editorialParagraphs: Array<{ guide: string; value: string }> = [];
const stepInstructions: Array<{ guide: string; value: string }> = [];
const troubleshootingRows: Array<{ guide: string; value: string }> = [];

for (const guide of allGuides) {
  const prefix = `[${guide.number} ${guide.slug}]`;
  if (numbers.has(guide.number)) fail(`${prefix} duplicate guide number.`);
  numbers.add(guide.number);
  if (slugs.has(guide.slug)) fail(`${prefix} duplicate slug.`);
  slugs.add(guide.slug);
  const normalizedTitle = normalize(guide.title);
  if (titles.has(normalizedTitle)) fail(`${prefix} duplicate normalized title.`);
  titles.add(normalizedTitle);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.publishedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(guide.updatedAt)) fail(`${prefix} invalid publication date metadata.`);
  if (!GUIDE_CATEGORIES.includes(guide.category)) fail(`${prefix} invalid category.`);
  if (!GUIDE_DIFFICULTIES.includes(guide.difficulty)) fail(`${prefix} invalid difficulty.`);
  if (guide.description.trim().length < 45) fail(`${prefix} description is too short.`);
  if (guide.coverPhoto) {
    if (guide.coverPhoto.alt.length < 25 || guide.coverPhoto.caption.length < 45) fail(`${prefix} cover photo needs useful alt text and an honest caption.`);
    if (guide.coverPhoto.width < 300 || guide.coverPhoto.height < 300) fail(`${prefix} cover photo dimensions are too small.`);
    if (!existsSync(join(root, "public", guide.coverPhoto.src))) fail(`${prefix} missing cover photo ${guide.coverPhoto.src}.`);
    if (["cc-by", "cc-by-sa"].includes(guide.coverPhoto.sourceType) && (!guide.coverPhoto.creator || !guide.coverPhoto.sourceUrl || !guide.coverPhoto.licenseName || !guide.coverPhoto.licenseUrl)) fail(`${prefix} licensed cover photo lacks attribution metadata.`);
  }
  if (!guide.builderMomentPhoto.alt || !existsSync(join(root, "public", guide.builderMomentPhoto.src))) fail(`${prefix} missing Builder Moment photo or alt text.`);
  if (guide.materials.length < 5 || guide.materials.some((item) => !item.quantity || !item.item || !item.purpose)) fail(`${prefix} materials need quantities, items, and purposes.`);
  if (guide.tools.length < 2) fail(`${prefix} needs at least two tools.`);
  if (guide.alternatives.length < 3) fail(`${prefix} needs at least three substitutions.`);
  if (guide.safety.length < 3) fail(`${prefix} needs project-specific safety guidance.`);
  if (guide.accessibility.length < 3) fail(`${prefix} needs access and low-cost adaptations.`);
  if (guide.steps.length < 8 || guide.steps.length > 18) fail(`${prefix} must contain 8-18 build steps.`);
  if (guide.steps.filter((step) => step.checkpoint).length < 3) fail(`${prefix} needs at least three checkpoints.`);
  if (new Set(guide.steps.map((step) => step.id)).size !== guide.steps.length) fail(`${prefix} has duplicate step IDs.`);
  if (guide.steps.some((step) => step.instructions.length < 2)) fail(`${prefix} has an incomplete build step.`);
  if (guide.conceptPauses.length < 2 || guide.conceptPauses.some((pause) => pause.explanation.length < 50)) fail(`${prefix} needs two substantial concept pauses.`);
  if (!guide.mathBite.formula || guide.mathBite.variables.length < 2 || !guide.mathBite.result || !guide.mathBite.assumptions) fail(`${prefix} has an incomplete worked math example.`);
  if (!guide.testing.firstTest || !guide.testing.success || guide.testing.trials.length < 3) fail(`${prefix} has an incomplete test plan.`);
  if (guide.troubleshooting.length < 4 || guide.troubleshooting.some((item) => !item.symptom || !item.likelyCause || !item.confirm || !item.fix)) fail(`${prefix} needs four complete troubleshooting entries.`);
  if (guide.extensions.length < 3) fail(`${prefix} needs three extensions.`);
  if (!guide.classroomAdaptation || guide.classroomAdaptation.length < 45) fail(`${prefix} needs a classroom/team adaptation.`);
  if (guide.reflectionQuestions.length < 3) fail(`${prefix} needs three reflection questions.`);
  if (guide.glossary.length < 4) fail(`${prefix} needs a glossary.`);
  if (guide.relatedSlugs.length < 3) fail(`${prefix} needs at least three related guides.`);
  for (const related of guide.relatedSlugs) {
    if (related === guide.slug) fail(`${prefix} links to itself as related.`);
    if (!guideSlugs.has(related)) fail(`${prefix} links to missing related guide “${related}”.`);
  }
  if (guide.category === "Robotics/electronics" && (!guide.wiring || guide.wiring.length < 3)) fail(`${prefix} electronics guide lacks a wiring table.`);
  if (guide.category === "Coding/game projects" && (!guide.code || guide.code.source.length < 100)) fail(`${prefix} coding guide lacks complete source.`);
  if (guide.video && !exactTikTokPattern.test(guide.video.url)) fail(`${prefix} has an unverified or non-BrickLabClips TikTok URL.`);
  if (placeholderPattern.test(JSON.stringify(guide))) fail(`${prefix} contains public placeholder language.`);

  const expectedVisualPaths = [guide.conceptVisual.src, guide.builderMomentPhoto.src, ...(guide.coverPhoto ? [guide.coverPhoto.src] : [])];
  for (const path of new Set(expectedVisualPaths)) {
    if (!path.startsWith("/") || !existsSync(join(root, "public", path))) fail(`${prefix} missing local visual ${path}.`);
  }
  for (const file of requiredAssets) {
    if (!existsSync(join(root, "public", "guides", guide.slug, file))) fail(`${prefix} missing required asset ${file}.`);
  }
  for (const file of obsoleteGeneratedAssets) {
    if (existsSync(join(root, "public", "guides", guide.slug, file))) fail(`${prefix} still contains obsolete generated asset ${file}.`);
  }

  const minimumWords = guide.difficulty === "Beginner" ? 900 : guide.difficulty === "Intermediate" ? 1000 : 1100;
  const wordCount = meaningfulWordCount(guide);
  if (wordCount < minimumWords) fail(`${prefix} has ${wordCount} meaningful words; expected at least ${minimumWords}.`);

  editorialParagraphs.push(
    { guide: guide.slug, value: guide.hook },
    { guide: guide.slug, value: guide.finishedResult },
    { guide: guide.slug, value: guide.conceptPauses[0]?.explanation ?? "" },
    { guide: guide.slug, value: guide.tuning },
    { guide: guide.slug, value: guide.builderMoment }
  );
  for (const step of guide.steps) for (const instruction of step.instructions) stepInstructions.push({ guide: guide.slug, value: instruction });
  for (const item of guide.troubleshooting) troubleshootingRows.push({ guide: guide.slug, value: `${item.symptom}|${item.likelyCause}|${item.confirm}|${item.fix}` });
}

for (let number = 1; number <= 125; number += 1) if (!numbers.has(number)) fail(`Missing catalog number ${number}.`);
for (const [category, expected] of Object.entries(expectedCategoryCounts)) {
  const actual = allGuides.filter((guide) => guide.category === category).length;
  if (actual !== expected) fail(`${category}: expected ${expected}, found ${actual}.`);
}

repeatedValues(editorialParagraphs, "editorial paragraph");
repeatedValues(stepInstructions, "step instruction");
repeatedValues(troubleshootingRows, "troubleshooting row");

const criteria = {
  mechanicalOrStructural: allGuides.filter((guide) => !["Coding/game projects"].includes(guide.category)).length,
  householdOrClassroomMaterials: allGuides.filter((guide) => guide.householdFriendly).length,
  classroomOrTeam: allGuides.filter((guide) => guide.classroomFriendly).length,
  electronicsOrProgramming: allGuides.filter((guide) => guide.electronicsOrCode).length,
  zeroToTenDollars: allGuides.filter((guide) => guide.maxCost <= 10).length,
  beginnerNearOneHour: allGuides.filter((guide) => guide.difficulty === "Beginner" && guide.timeMinutes <= 70).length,
  advancedExtension: allGuides.filter((guide) => guide.advancedExtension).length,
  workedMath: allGuides.filter((guide) => Boolean(guide.mathBite)).length
};
const minimumCriteria: Record<keyof typeof criteria, number> = {
  mechanicalOrStructural: 60,
  householdOrClassroomMaterials: 30,
  classroomOrTeam: 20,
  electronicsOrProgramming: 20,
  zeroToTenDollars: 25,
  beginnerNearOneHour: 15,
  advancedExtension: 10,
  workedMath: 60
};
for (const key of Object.keys(criteria) as Array<keyof typeof criteria>) {
  if (criteria[key] < minimumCriteria[key]) fail(`Catalog criterion ${key} expected at least ${minimumCriteria[key]}, found ${criteria[key]}.`);
}

const visualManifestPath = join(root, "scripts", "guide-visual-manifest.json");
if (!existsSync(visualManifestPath)) fail("Missing guide visual manifest.");
else {
  const visualManifest = JSON.parse(readFileSync(visualManifestPath, "utf8")) as Array<{ slug: string }>;
  if (visualManifest.length !== 125) fail(`Visual manifest expected 125 entries; found ${visualManifest.length}.`);
  const manifestSlugs = new Set(visualManifest.map((item) => item.slug));
  for (const slug of guideSlugs) if (!manifestSlugs.has(slug)) fail(`Visual manifest missing ${slug}.`);
}

if (videoManifest.account !== "https://www.tiktok.com/@bricklabclips") fail("TikTok manifest does not use the exact BrickLabClips account.");
for (const video of videoManifest.videos as Array<{ url?: string; candidateGuideSlug?: string }>) {
  if (!video.url || !exactTikTokPattern.test(video.url)) fail(`TikTok manifest contains an invalid URL: ${video.url ?? "missing"}.`);
  if (video.candidateGuideSlug && !guideSlugs.has(video.candidateGuideSlug)) fail(`TikTok manifest maps to missing guide ${video.candidateGuideSlug}.`);
}
if (videoManifest.videos.length === 0) warnings.push("No TikTok mappings: direct profile inventory was blocked by platform robots; public guides use local visuals with no video placeholders.");

const categorySummary = Object.fromEntries(GUIDE_CATEGORIES.map((category) => [category, allGuides.filter((guide) => guide.category === category).length]));
const difficultySummary = Object.fromEntries(GUIDE_DIFFICULTIES.map((difficulty) => [difficulty, allGuides.filter((guide) => guide.difficulty === difficulty).length]));
const guidePhotoCount = allGuides.filter((guide) => guide.coverPhoto).length;
if (guidePhotoCount !== suppliedCoverPhotoCount) fail(`Expected ${suppliedCoverPhotoCount} supplied cover photos; found ${guidePhotoCount}.`);

console.log("BrickLabClips guide validation");
console.log(`Published guides: ${allGuides.length}`);
console.log("By category:", categorySummary);
console.log("By difficulty:", difficultySummary);
console.log("Coverage:", criteria);
console.log(`Motion-and-energy SVG maps: ${allGuides.length * requiredAssets.length}`);
console.log(`User-provided cover photos: ${guidePhotoCount}`);
console.log(`Text-only cover fallbacks: ${allGuides.length - guidePhotoCount}`);
console.log(`Verified TikTok mappings: ${videoManifest.videos.length}`);
for (const warning of warnings) console.warn(`Warning: ${warning}`);

if (failures.length > 0) {
  console.error(`\nValidation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Validation passed.");
