const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const dir = "/root/workspace/ditek-jaya/screenshots/v2";

  const pages = [
    { name: "01-home", url: "http://localhost:3000", waitFor: 3000 },
    { name: "02-products", url: "http://localhost:3000/products", waitFor: 3000 },
    { name: "03-brand-detail", url: "http://localhost:3000/brands/mettler-toledo", waitFor: 3000 },
    { name: "04-admin-brands", url: "http://localhost:3000/admin/brands", waitFor: 3000 },
    { name: "05-admin-products", url: "http://localhost:3000/admin/products", waitFor: 3000 },
  ];

  for (const p of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(p.waitFor);
    await page.screenshot({ path: `${dir}/${p.name}.png`, fullPage: true });
    console.log(`✓ ${p.name}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots done");
})();
