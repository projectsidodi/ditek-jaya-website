const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/brands/shimadzu", { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/root/workspace/ditek-jaya/screenshots/v2/03-brand-detail.png", fullPage: true });
  console.log("✓ brand detail retaken");
  await browser.close();
})();
