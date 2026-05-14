import { expect, test } from "@playwright/test";

test("DialogItem - Select Inventory and Save", async ({ page }) => {
  await page.route("**/api/sales_order/view/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        sales_order_number: "SO-123",
        sold_to_customer: "Test Client"
      })
    });
  });

  await page.route("**/api/sales_order/items/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ rows: [] })
    });
  });

  await page.route("**/api/inventory/find/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        msg: "Item Found",
        description: "Gaming Mouse",
        retail: 59.99,
        unit_of_measure: "PCS",
        discount: 10
      })
    });
  });

  await page.route("**/api/sales_order/save_item", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true })
    });
  });

  await page.goto("./so/view/SO-123");

  await page.getByRole("button", { name: "Add Row" }).click();

  const dialog = page.getByRole("dialog", { name: "Addnew Items" });
  await expect(dialog).toBeVisible();

  await dialog
    .locator(".el-form-item", { hasText: "Item Number" })
    .locator("input")
    .fill("MOUSE-001");

  await page.route("**/api/sales_order/items/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        rows: [
          {
            item_number: "MOUSE-001",
            description: "Gaming Mouse",
            quantity: 1,
            amount: 53.99
          }
        ]
      })
    });
  });

  await dialog.getByRole("button", { name: "Confirm" }).click();

  await expect(dialog).not.toBeVisible();
  await expect(page.getByText("Gaming Mouse")).toBeVisible();
});
