import { expect, test } from "playwright/test";
import { guideSummaries } from "../src/content/guides/registry";

test.describe("build guide directory", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/library");
  });

  test("renders all 125 published guide cards with valid route URLs", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Find your next project." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pick a build. Make it move." })).toHaveCount(0);
    await expect(page.getByText("125 guides live", { exact: true })).toBeVisible();
    const cardLinks = await page.locator(".guide-card h2 a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(cardLinks).toHaveLength(125);
    expect(new Set(cardLinks)).toEqual(new Set(guideSummaries.map((guide) => `/library/${guide.slug}`)));
    await expect(page.locator(".guide-thumbnail-photo")).toHaveCount(8);
    await expect(page.locator(".guide-card-text-cover")).toHaveCount(117);
  });

  test("search finds titles, concepts, and materials", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: "Search build guides" });
    await search.fill("Peaucellier");
    await expect(page.locator(".guide-card h2")).toHaveText("Peaucellier Straight-Line Linkage");
    await search.fill("Capacitance");
    await expect(page.locator(".guide-card h2")).toContainText("Capacitive-Touch Cardboard Piano");
    await search.fill("photoresistor");
    await expect(page.locator(".guide-card h2")).toContainText("Automatic Night Light");
  });

  test("category and difficulty filters work together", async ({ page }) => {
    await page.getByLabel("Category").selectOption("Robotics/electronics");
    await expect(page.getByText("Showing 20 of 125 complete guides.")).toBeVisible();
    await page.getByLabel("Difficulty").selectOption("Advanced");
    const cards = page.locator(".guide-card");
    await expect(cards).not.toHaveCount(0);
    await expect(cards.locator(".guide-card-top").first()).toContainText("Robotics/electronics");
    await expect(cards.locator(".guide-card-facts").first()).toContainText("Advanced");
  });

  test("empty search state can be cleared", async ({ page }) => {
    await page.getByRole("searchbox", { name: "Search build guides" }).fill("not-a-real-build-phrase");
    await expect(page.getByRole("heading", { name: "No builds match yet." })).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(page.locator(".guide-card")).toHaveCount(125);
  });
});
