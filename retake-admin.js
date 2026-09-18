const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  // Log in first
  const loginPage = await context.newPage();
  await loginPage.goto("http://localhost:3000/admin", { waitUntil: "networkidle", timeout: 15000 });
  await loginPage.waitForTimeout(1000);
  await loginPage.fill('input[placeholder="admin"]', 'admin');
  await loginPage.fill('input[placeholder="Enter password"]', 'ditekjaya2024');
  await loginPage.click('button:has-text("Sign In")');
  await loginPage.waitForTimeout(2000);
  console.log("Logged in, URL:", loginPage.url());
  await loginPage.close();

  // Screenshot admin brands
  const brandsPage = await context.newPage();
  await brandsPage.goto("http://localhost:3000/admin/brands", { waitUntil: "networkidle", timeout: 15000 });
  await brandsPage.waitForTimeout(2000);
  await brandsPage.screenshot({ path: "/root/workspace/ditek-jaya/screenshots/v2/04-admin-brands.png", fullPage: true });
  console.log("✓ admin brands");
  await brandsPage.close();

  // Screenshot admin products
  const productsPage = await context.newPage();
  await productsPage.goto("http://localhost:3000/admin/products", { waitUntil: "networkidle", timeout: 15000 });
  await productsPage.waitForTimeout(2000);
  await productsPage.screenshot({ path: "/root/workspace/ditek-jaya/screenshots/v2/05-admin-products.png", fullPage: true });
  console.log("✓ admin products");
  await productsPage.close();

  await browser.close();
  console.log("Done");
})();
