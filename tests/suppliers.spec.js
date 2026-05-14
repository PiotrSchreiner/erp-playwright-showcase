import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const loginData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/login.json"), "utf8")
);
const supplierData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/suppliers.json"), "utf8")
);

test("User can navigate to suppliers and see the list", async ({ page }) => {
  await page.route("**/api/login", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(loginData)
    });
  });

  await page.route(/\/api\/supplier\/browse_data/, async route => {
    const rawRows = Array.isArray(supplierData)
      ? supplierData
      : supplierData.rows || supplierData.data;

    const mappedRows = rawRows.map(item => ({
      supplier_number: item.supplier_number || item.id || "S001",
      supplier_name: item.supplier_name || item.name || "Alpha Supplies",
      city: item.city || "Hamburg",
      street: item.street || item.address || "Main Street 1"
    }));

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rows: mappedRows,
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

  await page.goto("./supplier");

  await expect(page.locator(".el-table__body")).toBeVisible({ timeout: 10000 });

  await expect(page.locator(".el-table")).toContainText("Alpha Supplies", {
    timeout: 10000
  });
});
