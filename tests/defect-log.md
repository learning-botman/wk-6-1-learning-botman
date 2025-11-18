# Defect Log



## DEFECT-001: No User Authentication System
- Severity: Critical
- Priority: P0 (Release Blocker)
- Component: Security / User Management
- Status: Open / Confirmed
- Summary: Application lacks login/registration, email verification, session management. Orders are anonymous and stored only in localStorage.
- Impact: Fraud risk, GDPR/PCI non-compliance, inability to track users or access orders across devices.
- Recommendation: Implement full authentication (registration, login, email verification, session management) and associate orders with user accounts.

---

## DEFECT-002: Paystack Merchant Currency Configuration Mismatch
- Severity: Critical
- Priority: P0
- Component: Payment Integration
- Status: Verified (reproduced)
- Summary: App currency does not match the Paystack account currency. Payment initialization fails with: "Currency not supported by merchant".
- Impact: Payment flow blocked (100% failure), cannot complete transactions.
- Recommendation: Either change app currency to match Paystack account or obtain a Paystack test key for the intended currency. Add startup validation and documentation.

---

## DEFECT-003: Orders Not Tied to User Identity
- Severity: Critical
- Priority: P0
- Component: Order Management / Data Privacy
- Status: Verified
- Summary: Orders are saved in localStorage without user association. Anyone with access to the browser can view orders; orders are lost on cache clear.
- Impact: Privacy violations, data loss, support/fulfillment problems.
- Recommendation: Persist orders server-side and associate with authenticated user IDs; add access controls.

---

## DEFECT-004: Email Address Not Verified
- Severity: High
- Priority: P1
- Component: Checkout / Identity Verification
- Status: Confirmed
- Summary: Checkout accepts any email string without verification; no confirmation emails are sent.
- Impact: Typos/fake emails lead to lost confirmations, fraud risk, and poor UX.
- Recommendation: Implement email verification flow; at minimum send confirmation emails and consider blocking checkout until verification.

---

## DEFECT-005: Payment Charges Only First Item in Cart
- Severity: Critical
- Priority: P0
- Component: Payment Calculation
- Status: Code confirmed (cannot fully verify live due to currency block)
- Summary: Payment logic sends only the first item's price to Paystack instead of the full cart total.
- Impact: Significant revenue loss; customers receive multiple items for the price of one.
- Recommendation: Update payment orchestration to charge the full cart total and add unit tests for cart totals.

---

## DEFECT-006: Order Details Page Unreliable
- Severity: Critical / High
- Priority: P0
- Component: Order Management / UX
- Status: Verified
- Summary: After checkout, `/orders/:id` often shows "We couldn't find this order" even for newly created orders.
- Impact: Users cannot confirm or find their orders; leads to confusion and support requests.
- Recommendation: Fix order persistence/timing, add "My Orders" list, ensure order saved before redirect.

---

## DEFECT-007: Environment Variable Loading Requires Server Restart
- Severity: High
- Priority: P2
- Component: Configuration
- Status: Confirmed (working as designed)
- Summary: Changes to `.env` only take effect after restarting the dev server (React behavior).
- Impact: Developer confusion; need to document restart requirement.
- Recommendation: Add README note, show startup console warning with current currency, or implement runtime checks where practical.

---

## DEFECT-008: Admin Guard Bypass via Browser Console
- Severity: High
- Priority: P1
- Component: Security - Authorization
- Status: Confirmed
- Summary: Admin role is determined by client-side localStorage; anyone can set `app.user.role = 'admin'` and gain admin access.
- Impact: Security bypass, unsuited for production.
- Recommendation: Implement server-side auth/authorization; add demo warning banner until fixed.

---

## DEFECT-009: Missing Paystack Public Key Shows Late Error
- Severity: High
- Priority: P1
- Component: Payment Configuration
- Status: Confirmed
- Summary: Missing/invalid Paystack key only triggers an error at checkout rather than at startup.
- Impact: Poor UX; users discover payment unavailability late.
- Recommendation: Add startup validation and visible warning if payment key is missing.

---

## DEFECT-0101: No "My Orders" or Order History Page
- Severity: High
- Priority: P1
- Component: UX / Orders
- Status: Confirmed
- Summary: No dedicated orders list page; users must know exact order ID to view details.
- Impact: Poor UX, lost orders, difficulty in support.
- Recommendation: Add `/orders` list view and navbar link; show only authenticated user's orders after auth is implemented.

---

## DEFECT-011: Search Not Synced Between Navbar and Catalog
- Severity: Medium
- Component: Search
- Status: Open
- Summary: Navbar search and catalog search inputs are independent; search query isn't persisted or synced.
- Recommendation: Synchronize via URL params or shared state.

---

## DEFECT-012: No Form Validation Error Display
- Severity: Medium
- Component: Checkout Form
- Status: Open
- Summary: HTML5 validation exists but there are no custom inline error messages informing the user what to fix.
- Recommendation: Add inline error messages beneath the invalid fields.

---

## DEFECT-013: Missing Confirmation Before Cart Item Removal
- Severity: Medium
- Component: UX
- Status: Open
- Summary: Removing an item from cart happens immediately with no confirmation or undo option.
- Recommendation: Add a confirmation dialog or undo toast.

---

## DEFECT-014: Cart Image Missing Alt Text
- Severity: Medium
- Component: Accessibility
- Status: Open
- Summary: Cart page images lack descriptive alt attributes for screen readers.
- Recommendation: Add alt text like "Cover of [Book Title] by [Author]".

---

## DEFECT-015: No Loading State During Add to Cart
- Severity: Medium
- Component: UI/UX
- Status: Open
- Summary: BookCard button shows "Processing..." but page lacks visual feedback (spinner/disable) on the card itself.
- Recommendation: Show spinner overlay or disable the card during processing to avoid duplicate clicks.

---


