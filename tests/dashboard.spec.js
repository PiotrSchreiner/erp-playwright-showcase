import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);

test("User can see the dashboard sidebar after login", async ({ page }) => {
  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(loginData)
    });
  });

  await page.goto("./login");

  await page.getByPlaceholder("Username / Email").fill("admin");
  await page.getByPlaceholder("Password").fill("password123");

  await page
    .getByRole("button", { name: "Login" })
    .first()
    .click();

  await page.goto("http://localhost:3000/");

  const sidebarItem = page.getByText("Main Menu");
  await expect(sidebarItem).toBeVisible({ timeout: 15000 });

  await expect(page.getByRole("heading", { name: /DASHBOARD/i })).toBeVisible();
});
