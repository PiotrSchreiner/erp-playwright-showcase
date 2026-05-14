import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);
const inventoryData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/inventory.json"), "utf8")
);

test("User can navigate to inventory, see list and open add dialog", async ({
  page
}) => {
  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(loginData)
    });
  });

  await page.route(/\/api\/inventory\/browse_data/, async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rows: inventoryData,
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

  await page.goto("./inventory");

  await expect(page.locator(".el-table__body")).toBeVisible({ timeout: 10000 });
  await expect(page.locator(".el-table")).toContainText("Gaming Laptop Pro");

  await page.getByRole("button", { name: "Addnew" }).click();

  const dialog = page.locator(".el-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Master Data Inventory");

  await expect(page.locator("label").filter({ hasText: "Kode" })).toBeVisible();
  await expect(
    page.locator("label").filter({ hasText: "Nama Barang" })
  ).toBeVisible();
});
