import { expect, test } from "playwright/test";
import videoManifest from "../src/content/tiktok/bricklabclips-video-manifest.json";

const representativeGuides = [
  ["/library/cardboard-arcade-button", "Cardboard Arcade Button"],
  ["/library/compound-gear-train", "Compound Gear Train"],
  ["/library/planetary-gearset", "Planetary Gearset"],
  ["/library/line-following-robot", "Line-Following Robot"],
  ["/library/makecode-physics-platformer", "MakeCode Physics Platformer"]
] as const;

for (const [path, title] of representativeGuides) {
  test(`${title} renders as a complete article`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Step-by-step instructions" })).toBeVisible();
    await expect(page.locator(".build-step-list > li")).toHaveCount(8);
    await expect(page.locator(".build-step figure")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Test, troubleshoot, and tune" })).toBeVisible();
    await expect(page.locator(".troubleshooting-table-wrap tbody tr")).toHaveCount(4);
    const conceptMap = page.locator(".concept-figure img");
    await conceptMap.scrollIntoViewIfNeeded();
    await expect(conceptMap).toHaveJSProperty("complete", true);
    expect(await conceptMap.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

    const builderMoment = page.locator(".builder-moment img");
    await builderMoment.scrollIntoViewIfNeeded();
    await expect(builderMoment).toHaveJSProperty("complete", true);
    expect(await builderMoment.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  });
}

test("supplied covers and text-only fallbacks are used honestly", async ({ page }) => {
  await page.goto("/library/gear-ratio-demonstrator");
  await expect(page.locator(".guide-hero-visual img")).toHaveAttribute("src", /gear-ratio-example/);
  await expect(page.locator(".guide-hero-visual figcaption")).toContainText("different frame");

  await page.goto("/library/planetary-gearset");
  await expect(page.locator(".guide-article-hero")).toHaveClass(/text-only/);
  await expect(page.locator(".guide-hero-visual")).toHaveCount(0);
});

test("every Builder Moment uses the supplied meme image", async ({ page }) => {
  await page.goto("/library/pulley-elevator");
  await expect(page.locator(".builder-moment img")).toHaveAttribute("src", /chuck-norris-builder-meme/);
  await expect(page.locator(".builder-moment figcaption")).toContainText("Image supplied by the site owner");
});

test("guide structured data parses and matches visible content", async ({ page }) => {
  await page.goto("/library/gear-ratio-demonstrator");
  const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(jsonLd).toHaveLength(2);
  const parsed = jsonLd.map((value) => JSON.parse(value));
  const howTo = parsed.find((item) => item["@type"] === "HowTo");
  expect(howTo.name).toBe("Gear Ratio Demonstrator");
  expect(howTo.step.length).toBeGreaterThanOrEqual(8);
  expect(howTo.supply.length).toBeGreaterThanOrEqual(5);
  expect(howTo.step.every((step: { image?: string }) => !("image" in step))).toBe(true);
});

test("related guide links resolve and invalid slugs return 404", async ({ page, request }) => {
  await page.goto("/library/rubber-band-car");
  const related = await page.locator(".related-guides a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(related.length).toBeGreaterThanOrEqual(3);
  for (const href of related) {
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
  }
  const missing = await request.get("/library/this-guide-does-not-exist");
  expect(missing.status()).toBe(404);
});

test("guides without verified video show no broken placeholder", async ({ page }) => {
  expect(videoManifest.videos).toHaveLength(0);
  await page.goto("/library/cardboard-arcade-button");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(page.getByText(/video coming soon|insert video|add video/i)).toHaveCount(0);
});

test("sitemap includes all guide URLs", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect((xml.match(/<loc>/g) ?? []).length).toBe(131);
  expect(xml).toContain("/about");
  expect(xml).toContain("/library/gear-ratio-demonstrator");
  expect(xml).toContain("/library/makecode-physics-platformer");
});

test("narrow mobile pages have no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const path of ["/library", "/library/cardboard-arcade-button", "/library/line-following-robot"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(1);
  }
});

test("article remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/library/rubber-band-car");
  await expect(page.getByRole("heading", { level: 1, name: "Rubber Band Car" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Step-by-step instructions" })).toBeVisible();
  await expect(page.locator(".build-step-list > li")).toHaveCount(8);
  await context.close();
});
