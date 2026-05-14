import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const inventoryData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/inventory.json"), "utf8")
);

test("LookupData - Search and Select Item", async ({ page }) => {
  await page.route("**/api/sales_order/view/**", async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ sales_order_number: "SO-123" })
    });
  });
  await page.route("**/api/sales_order/items/**", async route => {
    await route.fulfill({ status: 200, body: JSON.stringify({ rows: [] }) });
  });

  await page.route("**/api/inventory/browse_data/**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(inventoryData.search_results)
    });
  });

  await page.goto("./so/view/SO-123");
  await page.getByRole("button", { name: "Add Row" }).click();

  const itemDialog = page.getByRole("dialog", { name: "Addnew Items" });
  await itemDialog.locator(".el-icon-search").click();

  const lookupDialog = page.getByRole("dialog", { name: "Daftar Pilihan" });
  await expect(lookupDialog).toBeVisible();

  const searchInput = lookupDialog.getByPlaceholder("Ketik dan tekan ENTER");
  await searchInput.fill("Gaming");
  await searchInput.press("Enter");

  await expect(lookupDialog.getByText("Gaming Laptop Pro")).toBeVisible();
  await lookupDialog
    .getByRole("button", { name: "Pilih" })
    .first()
    .click();

  await expect(lookupDialog).not.toBeVisible();
  const itemNumberInput = itemDialog
    .locator(".el-form-item", { hasText: "Item Number" })
    .locator("input");
  await expect(itemNumberInput).toHaveValue("INV001");
});
