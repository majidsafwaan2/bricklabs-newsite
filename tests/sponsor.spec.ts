import { expect, test } from "playwright/test";

test.describe("sponsorship page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sponsor");
  });

  test("shows the local student image, verified impact, and current schools", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1, name: "Help Students Build." })).toBeVisible();
    const studentImage = page.getByAltText(
      "A student using BrickLabs building materials during a hands-on STEM activity."
    );
    await expect(studentImage).toHaveAttribute("src", /students-building/);
    await expect(studentImage).toBeVisible();

    for (const value of ["20,000+", "118,000", "16M+", "$2,000", "2"]) {
      await expect(page.locator(".sponsor-impact-card").getByText(value, { exact: true })).toBeVisible();
    }
    await expect(page.getByText("Approx. average views per TikTok video", { exact: true })).toBeVisible();

    for (const school of [
      "Belmont Ridge Middle School",
      "Watson Mountain Middle School",
      "Heritage High School"
    ]) {
      await expect(page.getByText(school, { exact: true })).toBeVisible();
    }

    await expect(
      page.getByText(
        "100% of sponsorship proceeds received by BrickLabClips, excluding unavoidable payment-processing fees, will be allocated toward equipment, materials, and program support for participating school STEM programs.",
        { exact: true }
      )
    ).toBeVisible();
  });

  test("presents the three tiers with exact pricing and recognition language", async ({ page }) => {
    const tiers = page.locator(".sponsor-tier");
    await expect(tiers).toHaveCount(3);
    await expect(tiers.nth(0).getByRole("heading", { name: "Community Sponsor" })).toBeVisible();
    await expect(tiers.nth(0).getByText("$250", { exact: true })).toBeVisible();
    await expect(
      tiers.nth(0).getByText("Recognition in one BrickLabClips TikTok video caption and end card", { exact: true })
    ).toBeVisible();
    await expect(page.getByText("caption or end card")).toHaveCount(0);

    await expect(tiers.nth(1).getByText("$500", { exact: true })).toBeVisible();
    await expect(tiers.nth(1).getByText("Recommended", { exact: true })).toBeVisible();
    await expect(tiers.nth(2).getByText("$1,000", { exact: true })).toBeVisible();
  });

  test("uses functional tier and contact email links without a form", async ({ page }) => {
    const mailLinks = page.locator('a[href^="mailto:"]');
    expect(await mailLinks.count()).toBeGreaterThanOrEqual(6);

    for (const link of await mailLinks.all()) {
      await expect(link).toHaveAttribute("href", /^mailto:majidsafwaan2@gmail\.com/);
    }

    await expect(page.getByRole("button")).toHaveCount(0);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Email BrickLabClips" })).toHaveAttribute(
      "href",
      /subject=BrickLabClips%20Sponsorship%20Inquiry/
    );
  });

  test("keeps the page concise, accessible, and free of horizontal overflow", async ({ page }) => {
    await expect(page.locator(".sponsor-page > section")).toHaveCount(5);
    await expect(page.locator(".sponsor-detail-list details")).toHaveCount(5);
    for (const heading of [
      "Cumulative View Commitments",
      "Measurement",
      "Disclosure",
      "Content and School Approval",
      "Final Scope"
    ]) {
      await expect(page.getByText(heading, { exact: true })).toBeVisible();
    }

    const pageCopy = await page.locator(".sponsor-page").innerText();
    expect(pageCopy).not.toContain("—");
    expect(pageCopy).not.toContain("tax-deductible");
    expect(pageCopy).not.toContain("registered nonprofit");

    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.reload();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
  });
});
