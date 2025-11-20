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
  await page.locator('form').first().evaluate(form => form.submit());

  // Proceed from review
  await page.click('text=Proceed to Payment');

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
