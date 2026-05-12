import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);

test("User can navigate through the sidebar modules", async ({ page }) => {
  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(loginData)
    });
  });

  await page.goto("./login");

  const usernameInput = page.getByPlaceholder("Username / Email");
  const passwordInput = page.getByPlaceholder("Password");

  await expect(usernameInput).toBeVisible({ timeout: 15000 });

  await usernameInput.fill("admin");
  await passwordInput.fill("password123");

  await page
    .getByRole("button", { name: "Login" })
    .first()
    .click();

  await page.goto("http://localhost:3000/");
  await expect(page).toHaveURL(/.*localhost:3000\/?$/);
});
