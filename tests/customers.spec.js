import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);
const customerData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/customers.json"), "utf8")
);

test("User can navigate to customers and see the list", async ({ page }) => {
  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(loginData)
    });
  });

  await page.route(/\/api\/customer\/browse_data/, async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rows: customerData,
        total: 100
      })
    });
  });

  await page.goto("./login");

  await page.getByPlaceholder("Username / Email").fill("admin");
  await page.getByPlaceholder("Password").fill("password123");

  await page
    .getByRole("button", { name: "Login" })
    .first()
    .click();

  await page.goto("./customer");

  await expect(page.locator(".el-table__body")).toBeVisible({ timeout: 10000 });

  await expect(page.locator(".el-table")).toContainText("TechCorp Solutions", {
    timeout: 10000
  });

  await expect(page.locator(".el-table")).toContainText("Nordic Design");
});
