import { expect, test } from "@playwright/test";

test("Store Settings - Component Integrity and Tabs", async ({ page }) => {
  await page.goto("./set/toko");

  await expect(page.getByRole("tab", { name: "Nama Toko" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Rekening" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Pengiriman" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Slider" })).toBeVisible();

  await page.getByRole("tab", { name: "Rekening" }).click();

  const activeTab = page.locator(".el-tabs__item.is-active");
  await expect(activeTab).toContainText("Rekening");

  const pane = page.locator("#pane-1");
  await expect(pane).toHaveClass(/is-active|/);

  await page.getByRole("tab", { name: "Slider" }).click();
  await expect(page.locator(".el-tabs__item.is-active")).toContainText(
    "Slider"
  );
});
