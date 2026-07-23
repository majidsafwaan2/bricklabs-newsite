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
  losses: guide.efficiencyLosses.slice(0, 3)
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

function conceptSvg(guide) {
  const [primary, accent] = palettes[guide.category] ?? palettes["Brick-compatible mechanisms"];
  const losses = guide.losses.map((loss, index) => `<g transform="translate(${52 + index * 372} 594)"><rect width="350" height="124" rx="18" fill="#ffffff" stroke="#111" stroke-width="4"/><circle cx="28" cy="30" r="10" fill="${accent}"/>${textLines(loss, 52, 37, { size: 21, max: 25, lineHeight: 1.06 })}</g>`).join("");
  return shell(`${textLines("Motion and energy map", 62, 92, { size: 48, max: 32 })}<rect x="62" y="220" width="290" height="190" rx="24" fill="${primary}" stroke="#111" stroke-width="6"/>${textLines("INPUT", 207, 264, { size: 20, anchor: "middle" })}${textLines(guide.input, 207, 312, { size: 23, anchor: "middle", max: 20, lineHeight: 1.06 })}${arrow(376, 316, 466, 316, accent)}<rect x="466" y="205" width="268" height="220" rx="82" fill="#fff" stroke="#111" stroke-width="6"/>${textLines("MOTION", 600, 257, { size: 20, anchor: "middle", fill: accent })}${textLines(guide.motion, 600, 306, { size: 22, anchor: "middle", max: 20, lineHeight: 1.06 })}${arrow(758, 316, 848, 316, accent)}<rect x="848" y="220" width="290" height="190" rx="24" fill="${accent}" stroke="#111" stroke-width="6"/>${textLines("OUTPUT", 993, 264, { size: 20, anchor: "middle", fill: "#fff" })}${textLines(guide.output, 993, 312, { size: 23, anchor: "middle", max: 20, lineHeight: 1.06, fill: "#fff" })}${textLines("Where useful energy can be lost", 62, 530, { size: 30, max: 40 })}${losses}`, "#f7f7f2");
}

for (const guide of guides) {
  const outputDirectory = join(repositoryRoot, "public", "guides", guide.slug);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(join(outputDirectory, "concept.svg"), conceptSvg(guide));
}

console.log(`Generated one motion-and-energy map for each of ${guides.length} guides.`);
