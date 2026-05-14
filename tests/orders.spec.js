import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const ordersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/purchase_orders.json"), "utf8")
);

const suppliersData = {
  rows: [
    { supplier_name: "Global Tech Industries", supplier_number: "S-001" },
    { supplier_name: "Office World", supplier_number: "S-002" }
  ]
};

test("Purchase Order Management - Table and Dialog", async ({ page }) => {
  await page.route("**/api/purchase_order/browse_data/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(ordersData)
    });
  });

  await page.route("**/api/supplier/browse_data/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(suppliersData)
    });
  });

  await page.goto("./po/order");

  await expect(page.getByText("Global Tech Industries")).toBeVisible();

  await page.getByPlaceholder("Type to search").fill("Global");
  await expect(page.getByText("Office World")).not.toBeVisible();

  await page.getByRole("button", { name: "Addnew" }).click();

  await expect(page.locator(".el-dialog")).toBeVisible();
  await expect(page.locator(".el-dialog__title")).toContainText(
    "Master Sales Order"
  );

  await page.locator(".el-select").click();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Global Tech Industries" })
    .click();

  await page.getByPlaceholder("Select date and time").click();
  await page.locator(".el-picker-panel__footer .el-button--text").click();

  await page.route("**/api/purchase_order/save", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        purchase_order_number: "PO-NEW-001"
      })
    });
  });

  await page.getByRole("button", { name: "Confirm" }).click();
});
