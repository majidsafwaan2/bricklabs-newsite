import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allGuides } from "../src/content/guides/registry.ts";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = dirname(scriptDirectory);
const manifestPath = join(scriptDirectory, "guide-visual-manifest.json");
const guides = allGuides.map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  category: guide.category,
  input: guide.input,
  output: guide.output,
  motion: guide.motion,
  parts: guide.materials.slice(0, 3).map((material) => material.item),
  steps: guide.steps.slice(0, 3).map((step) => step.title),
  losses: guide.efficiencyLosses.slice(0, 3),
  builderMoment: guide.builderMoment
}));

await writeFile(manifestPath, `${JSON.stringify(guides, null, 2)}\n`);

const palettes = {
  "Brick-compatible mechanisms": ["#ffd433", "#2f80ed"],
  "Cardboard builds": ["#ffd433", "#ff5b45"],
  "Household engineering": ["#ffd433", "#22a35a"],
  "Classroom challenges": ["#ffd433", "#7c5cff"],
  "Robotics/electronics": ["#ffd433", "#00a6a6"],
  "Coding/game projects": ["#ffd433", "#2f80ed"]
};

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function wrap(value, max = 32) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function textLines(value, x, y, options = {}) {
  const { size = 42, weight = 800, anchor = "start", max = 32, lineHeight = 1.12, fill = "#111111" } = options;
  return wrap(value, max).map((line, index) => `<text x="${x}" y="${y + index * size * lineHeight}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}" font-family="Arial Rounded MT Bold, Arial, sans-serif">${escapeXml(line)}</text>`).join("");
}

function shell(content, background = "#ffffff", viewBox = "0 0 1200 800") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1200" height="800"><rect width="1200" height="800" fill="${background}"/><rect x="18" y="18" width="1164" height="764" rx="28" fill="none" stroke="#111111" stroke-width="6"/>${content}</svg>`;
}

function arrow(x1, y1, x2, y2, color = "#111111") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="12" stroke-linecap="round"/><path d="M ${x2 - 26} ${y2 - 22} L ${x2} ${y2} L ${x2 - 26} ${y2 + 22}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function heroSvg(guide) {
  const [primary, accent] = palettes[guide.category] ?? palettes["Brick-compatible mechanisms"];
  const titleSize = guide.title.length > 34 ? 48 : 56;
  const parts = guide.parts.map((part, index) => `<g transform="translate(${62 + index * 362} 306)"><rect width="330" height="86" rx="16" fill="${index === 1 ? accent : primary}" stroke="#111" stroke-width="5"/>${textLines(part, 165, 38, { size: 20, anchor: "middle", max: 25, lineHeight: 1.04, fill: index === 1 ? "#ffffff" : "#111111" })}</g>`).join("");
  return shell(`<rect x="18" y="18" width="1164" height="104" rx="24" fill="${primary}"/>${textLines(guide.category, 66, 82, { size: 26, max: 45 })}${textLines(guide.title, 66, 205, { size: titleSize, max: 38 })}${textLines("KEY MATERIALS", 62, 282, { size: 19, fill: accent })}${parts}${textLines("INPUT", 62, 500, { size: 22, fill: accent })}${textLines(guide.input, 62, 548, { size: 30, max: 17 })}${arrow(310, 558, 478, 558, accent)}<rect x="478" y="462" width="244" height="192" rx="28" fill="#fff" stroke="#111" stroke-width="6"/><circle cx="560" cy="558" r="50" fill="${primary}" stroke="#111" stroke-width="6"/><circle cx="643" cy="558" r="31" fill="${accent}" stroke="#111" stroke-width="6"/>${arrow(722, 558, 804, 558, accent)}${textLines("OUTPUT", 838, 500, { size: 22, fill: accent })}${textLines(guide.output, 838, 548, { size: 30, max: 18 })}`, "#f7f7f2");
}

function stepSvg(guide, index) {
  const [primary, accent] = palettes[guide.category] ?? palettes["Brick-compatible mechanisms"];
  const label = guide.steps[index];
  const part = guide.parts[index % guide.parts.length];
  const nextPart = guide.parts[(index + 1) % guide.parts.length];
  const positions = [
    [220, 430, 600, 430],
    [260, 300, 720, 500],
    [230, 520, 740, 310]
  ][index];
  return shell(`<rect x="18" y="18" width="1164" height="112" rx="24" fill="${primary}"/>${textLines(`Reference ${index + 1}: ${label}`, 62, 88, { size: 36, max: 43 })}<rect x="${positions[0]}" y="${positions[1]}" width="260" height="150" rx="22" fill="#fff" stroke="#111" stroke-width="6"/>${textLines(part, positions[0] + 130, positions[1] + 70, { size: 27, anchor: "middle", max: 18 })}${arrow(positions[0] + 280, positions[1] + 75, positions[2] - 30, positions[3] + 75, accent)}<rect x="${positions[2]}" y="${positions[3]}" width="300" height="150" rx="22" fill="${accent}" stroke="#111" stroke-width="6"/>${textLines(nextPart, positions[2] + 150, positions[3] + 70, { size: 27, anchor: "middle", max: 19, fill: "#ffffff" })}<circle cx="1040" cy="680" r="48" fill="${primary}" stroke="#111" stroke-width="5"/>${textLines(String(index + 1), 1040, 696, { size: 44, anchor: "middle" })}`, "#ffffff");
}

function conceptSvg(guide) {
  const [primary, accent] = palettes[guide.category] ?? palettes["Brick-compatible mechanisms"];
  const losses = guide.losses.map((loss, index) => `<g transform="translate(${52 + index * 372} 594)"><rect width="350" height="124" rx="18" fill="#ffffff" stroke="#111" stroke-width="4"/><circle cx="28" cy="30" r="10" fill="${accent}"/>${textLines(loss, 52, 37, { size: 21, max: 25, lineHeight: 1.06 })}</g>`).join("");
  return shell(`${textLines("Motion and energy map", 62, 92, { size: 48, max: 32 })}<rect x="62" y="220" width="290" height="190" rx="24" fill="${primary}" stroke="#111" stroke-width="6"/>${textLines("INPUT", 207, 264, { size: 20, anchor: "middle" })}${textLines(guide.input, 207, 312, { size: 23, anchor: "middle", max: 20, lineHeight: 1.06 })}${arrow(376, 316, 466, 316, accent)}<rect x="466" y="205" width="268" height="220" rx="82" fill="#fff" stroke="#111" stroke-width="6"/>${textLines("MOTION", 600, 257, { size: 20, anchor: "middle", fill: accent })}${textLines(guide.motion, 600, 306, { size: 22, anchor: "middle", max: 20, lineHeight: 1.06 })}${arrow(758, 316, 848, 316, accent)}<rect x="848" y="220" width="290" height="190" rx="24" fill="${accent}" stroke="#111" stroke-width="6"/>${textLines("OUTPUT", 993, 264, { size: 20, anchor: "middle", fill: "#fff" })}${textLines(guide.output, 993, 312, { size: 23, anchor: "middle", max: 20, lineHeight: 1.06, fill: "#fff" })}${textLines("Where useful energy can be lost", 62, 530, { size: 30, max: 40 })}${losses}`, "#f7f7f2");
}

function builderMomentSvg(guide) {
  const [primary, accent] = palettes[guide.category] ?? palettes["Brick-compatible mechanisms"];
  return shell(`<rect x="18" y="18" width="1164" height="764" rx="28" fill="${primary}"/>${textLines("BUILDER MOMENT", 80, 118, { size: 28, fill: accent })}${textLines(guide.builderMoment, 80, 260, { size: 62, max: 30 })}<g transform="translate(910 480)"><circle r="116" fill="#fff" stroke="#111" stroke-width="7"/><circle cx="-38" cy="-18" r="12" fill="#111"/><circle cx="38" cy="-18" r="12" fill="#111"/><path d="M -48 48 Q 0 78 48 48" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/><rect x="-150" y="128" width="300" height="74" rx="18" fill="${accent}" stroke="#111" stroke-width="6"/>${textLines("Measure. Adjust. Try again.", 0, 176, { size: 22, anchor: "middle", max: 28, fill: "#fff" })}</g>`, "#ffffff");
}

for (const guide of guides) {
  const outputDirectory = join(repositoryRoot, "public", "guides", guide.slug);
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all([
    writeFile(join(outputDirectory, "hero.svg"), heroSvg(guide)),
    writeFile(join(outputDirectory, "step-01.svg"), stepSvg(guide, 0)),
    writeFile(join(outputDirectory, "step-02.svg"), stepSvg(guide, 1)),
    writeFile(join(outputDirectory, "step-03.svg"), stepSvg(guide, 2)),
    writeFile(join(outputDirectory, "concept.svg"), conceptSvg(guide)),
    writeFile(join(outputDirectory, "builder-moment.svg"), builderMomentSvg(guide))
  ]);
}

console.log(`Generated 6 original SVG assets for ${guides.length} guides.`);
