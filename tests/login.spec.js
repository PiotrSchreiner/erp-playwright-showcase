import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);

test("Login process - Success and Failure", async ({ page }) => {
  await page.goto("./login");

  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ message: "Login failed" })
    });
  });

  await page.getByPlaceholder("Username / Email").fill("wrong@test.de");
  await page.getByPlaceholder("Password").fill("wrongpassword");
  await page
    .getByRole("button", { name: "Login" })
    .first()
    .click();
  await expect(page.getByText("Login failed")).toBeVisible();

  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: {
          accessToken: "fake-jwt-token"
        },
        user: loginData.user
      })
    });
  });

  await page.route("**/api/user", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: loginData.user
      })
    });
  });

  await page.getByPlaceholder("Username / Email").fill("admin@test.de");
  await page.getByPlaceholder("Password").fill("password123");

  await Promise.all([
    page.waitForResponse("**/api/login"),
    page
      .getByRole("button", { name: "Login" })
      .first()
      .click()
  ]);

  await expect(page).not.toHaveURL(/.*login/, { timeout: 15000 });
});
