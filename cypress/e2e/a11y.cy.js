describe('Accessibility smoke tests', () => {
  it('Catalog, Cart, and Order pages pass a11y checks (fail on serious+)', () => {
    // Check catalog
    cy.visit('/catalog');
    cy.injectAxe();
    // Fail build if 'serious' or 'critical' violations are present
    cy.a11yCheck(null, null, 'serious');

    // Check cart (ensure there's at least an empty state)
    cy.visit('/cart');
    cy.injectAxe();
    cy.a11yCheck(null, null, 'serious');

    // Prepare a test order in localStorage to visit order details page
    const sampleOrder = {
      id: 'test-order-1',
      status: 'Paid',
      items: [],
      shipping: { fullName: 'Test User', email: 'test@local', address: '123', city: 'C', country: 'X', postalCode: '000' },
      totals: { subtotal: 0, shippingFee: 0, tax: 0, total: 0 },
      createdAt: new Date().toISOString()
    };

    cy.window().then((win) => {
      const raw = win.localStorage.getItem('app.orders');
      const orders = raw ? JSON.parse(raw) : [];
      orders.push(sampleOrder);
      win.localStorage.setItem('app.orders', JSON.stringify(orders));
    });

    cy.visit(`/orders/${sampleOrder.id}`);
    cy.injectAxe();
    cy.a11yCheck(null, null, 'serious');
  });
});
