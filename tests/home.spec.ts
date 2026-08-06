import { expect, test } from "playwright/test";

test.describe("home page story and navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("About Us has a dedicated page while the founder story remains on the homepage", async ({ page }) => {
    const newsVideo = page.locator(".hero-news-video");
    await expect(newsVideo).toHaveAttribute("src", "/media/bricklabclips-fox5dc.mp4");
    await expect(newsVideo).toHaveAttribute("autoplay", "");
    await expect(newsVideo).toHaveAttribute("playsinline", "");
    await expect(newsVideo).toHaveAttribute("loop", "");
    await expect(newsVideo).toHaveAttribute("controls", "");
    await expect(newsVideo).toHaveCSS("object-fit", "cover");
    expect(await newsVideo.evaluate((element) => (element as HTMLVideoElement).muted)).toBe(true);
    await expect(page.getByText("750,000+", { exact: true })).toBeVisible();
    await expect(page.getByText("Live Viewers Across the Nation", { exact: true })).toBeVisible();
    await expect(page.locator('img[src*="candle-linkage-build"]')).toHaveCount(0);
    await expect(page.getByText("Parts allocated to schools", { exact: true })).toBeVisible();
    await expect(
      page.getByText(
        "BricklabClips already reaches millions of people each month. This dashboard shows what has been raised.",
        { exact: true }
      )
    ).toBeVisible();
    await expect(page.getByText("School support numbers update as materials are raised.", { exact: true })).toBeVisible();
    const aboutLink = page.locator(".desktop-nav").getByRole("link", { name: "About Us" });
    await expect(aboutLink).toHaveAttribute("href", "/about");
    await expect(page.locator(".desktop-nav").getByRole("link", { name: "Build Challenge" })).toHaveCount(0);
    await expect(page.locator("#about").getByRole("heading", { name: "About Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pick a path and start building." })).toHaveCount(0);
  });

  test("dedicated About Us page includes the founder background and embedded deck", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1, name: "About Us" })).toBeVisible();
    await expect(page.getByAltText("Safwaan, founder of BrickLabClips.")).toBeVisible();
    await expect(page.getByAltText("Founder STEM advocacy slideshow page 1 of 8")).toBeVisible();
    await expect(page.locator(".desktop-nav").getByRole("link", { name: "About Us" })).toHaveClass(/active/);
  });

  test("founder advocacy slides are embedded and interactive", async ({ page }) => {
    const slideshow = page.locator(".founder-deck");
    await expect(slideshow.getByAltText("Founder STEM advocacy slideshow page 1 of 8")).toBeVisible();
    await expect(slideshow.getByRole("button", { name: "Previous" })).toBeDisabled();
    await slideshow.getByRole("button", { name: "Next" }).click();
    await expect(slideshow.getByAltText("Founder STEM advocacy slideshow page 2 of 8")).toBeVisible();
    await expect(page.getByRole("button", { name: "Learn more" })).toHaveCount(0);
  });

  test("loop crop and embedded deck stay within a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.reload();
    const mobileHero = await page.evaluate(() => {
      const image = document.querySelector(".hero-illustration")?.getBoundingClientRect();
      const heading = document.querySelector(".hero-copy h1")?.getBoundingClientRect();
      return image && heading ? { imageBottom: image.bottom, headingTop: heading.top } : null;
    });
    expect(mobileHero).not.toBeNull();
    expect(mobileHero!.imageBottom).toBeLessThanOrEqual(mobileHero!.headingTop);
    const loopImage = page.locator(".loop-canvas img");
    await expect(loopImage).toBeVisible();
    await expect(loopImage).toHaveCSS("object-fit", "cover");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
