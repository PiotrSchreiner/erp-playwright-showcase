import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const soData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/sales_orders.json"), "utf8")
);

test("Sales Order Workflow - List to Detail", async ({ page }) => {
  await page.route("**/api/sales_order/browse_data/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(soData.browse)
    });
  });

  await page.route("**/api/customer/browse_data/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rows: [{ company: "Mustermann GmbH", customer_number: "C001" }]
      })
    });
  });

  await page.goto("./so/order");
  await expect(page.getByText("Mustermann GmbH")).toBeVisible();

  await page.route("**/api/sales_order/view/SO-2026-001*", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(soData.detail)
    });
  });

  await page.route("**/api/sales_order/items/SO-2026-001*", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(soData.items)
    });
  });

  await page.route("**/api/sales_order/save", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, msg: "Saved successfully" })
    });
  });

  await page
    .getByRole("button", { name: "Edit" })
    .first()
    .click();

  await expect(page).toHaveURL(/.*so\/view\/SO-2026-001/);
  await expect(page.getByText("Laptop Pro")).toBeVisible();

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.locator("i", { hasText: "Ready" })).toBeVisible({
    timeout: 10000
  });
});
