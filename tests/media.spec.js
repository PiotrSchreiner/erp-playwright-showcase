import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";

const mediaData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/media.json"), "utf8")
);

test("Media Gallery - Load, Upload and Delete", async ({ page }) => {
  await page.route("**/api/media/", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mediaData)
    });
  });

  await page.route("**/api/media/upload", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Upload successful" })
    });
  });

  await page.route("**/api/media/delete/*", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "File deleted" })
    });
  });

  await page.goto("./set/Media");

  await expect(page.getByText("company-logo.png")).toBeVisible();
  await expect(page.getByText("product-shot.jpg")).toBeVisible();

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator(".el-upload-dragger").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: "new-image.png",
    mimeType: "image/png",
    buffer: Buffer.from("fake-image-data")
  });

  await page
    .locator(".el-upload-list__item")
    .first()
    .hover();
  await page
    .locator(".el-icon-close")
    .first()
    .click();

  await expect(page.getByText("File deleted")).toBeVisible();
});
