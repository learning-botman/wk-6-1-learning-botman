const { test, expect } = require('@playwright/test');

test('cart → checkout → create pending order in localStorage', async ({ page }) => {
  await page.goto('/catalog');

  // Click first Buy Now button
  const buy = await page.locator('[data-testid="book-buy-button"]').first();
  await buy.click();

  await page.goto('/cart');
  await page.click('text=Proceed to Checkout');

  // Fill shipping form
  await expect(page).toHaveURL(/\/checkout/);
  await page.fill('#fullName', 'Playwright Tester');
  await page.fill('#email', 'pwtester@example.com');
  await page.fill('#address', '1 Test Lane');
  await page.fill('#city', 'Test City');
  await page.fill('#country', 'Testland');
  await page.fill('#postalCode', '00000');
  // Click the Next button to move from Shipping -> Review (form submit may behave differently in test env)
  try {
    await page.click('text=Next', { timeout: 10000 });
  } catch (e) {
    // fallback to submit form if Next button not found
    await page.locator('form').first().evaluate((f) => f.submit());
  }

  // Wait for review step to be visible, then proceed
  await page.waitForSelector('text=Review your order', { timeout: 10000 });
  await page.click('text=Proceed to Payment', { timeout: 10000 });

  // Click Pay Now
  await page.click('text=Pay Now');

  // Read localStorage to ensure order created
  const ordersRaw = await page.evaluate(() => window.localStorage.getItem('app.orders'));
  const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
  expect(orders.length).toBeGreaterThan(0);
  const last = orders[orders.length - 1];
  expect(last.status).toBe('Pending');
  expect(last.shipping.email).toBe('pwtester@example.com');
});
