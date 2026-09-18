const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const dir = "/root/workspace/ditek-jaya/screenshots/v3";

  const pages = [
    { url: "http://localhost:3000/products", name: "products-page.png" },
    { url: "http://localhost:3000/brands/shimadzu", name: "brand-shimadzu.png" },
    { url: "http://localhost:3000/admin/subcategories", name: "admin-subcategories.png" },
    { url: "http://localhost:3000/admin/products", name: "admin-products.png" },
  ];

  for (const p of pages) {
    try {
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${dir}/${p.name}`, fullPage: true });
      console.log(`✓ ${p.name}`);
    } catch (e) {
      console.log(`✗ ${p.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log("Done");
})();
