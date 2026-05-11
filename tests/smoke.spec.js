import { expect, test } from "@playwright/test";

test("Check if the login page finally loads", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await expect(page.locator("body")).toContainText(/Login|Sign In|Masuk/i);
});
