describe('E2E Checkout flow', () => {
  beforeEach(() => {
    cy.visit('/catalog');
  });

  it('adds a book to cart and proceeds through checkout to payment initiation', () => {
    // Add first available book to cart
    cy.get('[data-testid="book-buy-button"]').first().click();

    // Go to cart and proceed
    cy.visit('/cart');
    cy.contains('Proceed to Checkout').click();

    // On checkout page - fill shipping form (Step 1)
    cy.url().should('include', '/checkout');
    // Accessibility check on checkout page load
    cy.injectAxe();
    cy.checkA11y();
    cy.get('#fullName').type('Automated Tester');
    cy.get('#email').type('tester@example.com');
    cy.get('#address').type('123 Test St');
    cy.get('#city').type('Testville');
    cy.get('#country').type('Testland');
    cy.get('#postalCode').type('12345');
    cy.get('form').submit();

    // Review step (Step 2)
    cy.contains('Review your order');
    // Run a11y check on review step
    cy.a11yCheck();
    cy.contains('Proceed to Payment').click();

    // Payment step (Step 3) - initiate payment (Paystack simulated)
    cy.contains('Payment');
    cy.contains('Pay Now').click();

    // Run a quick accessibility check after initiating payment (UI state)
    cy.a11yCheck();

    // Verify that a Pending order was created in localStorage
    cy.window().then((win) => {
      const raw = win.localStorage.getItem('app.orders');
      const orders = raw ? JSON.parse(raw) : [];
      expect(orders.length).to.be.greaterThan(0);
      const last = orders[orders.length - 1];
      expect(last).to.have.property('status', 'Pending');
      expect(last).to.have.property('shipping');
      expect(last.shipping).to.have.property('email', 'tester@example.com');
    });
  });
});
