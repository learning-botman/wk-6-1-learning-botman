                **BOOKSTORE RECOMMENDATION**

**ID:** *R-01*

**RECOMMENDATION:** <br>
*Boook Cover Image Not Visible on Product Page* 

**EVIDENCE:**<br>
*Launch the browser*<br>
*Load-up the website* <br>

**PRIORITY:** Medium:<br>
The issue does not block functionality but affects user experience and sales quality.

**ACCEPTANCE CRITERIA:**<br>
*The correct book cover image displays on the product page.*<br>
*The image loads consistently acorss supported browsers.*<br>
*No placehorlder or incorrect image appears.*<br>
*Image meet required resolution display standards.*


<br>

**ID:** R-02<br>

**RECOMMENDATION:**<br>
*No Clear payment system indicated on the checkout process*<br>

**EVIDENCE:**<br>
*Add a book to cart*<br>
*Purchase the book added to cart*<br>

**PRIORITY:**<br>
*Medium*<br>
*Every customer need to know which payment system is available to use in purchasing there desire book*<br>

**ACCEPTANCE CRITERIA:**<br>
*Clear message on which payment system is available to use*<br>
*Paystack, Visa, Mastercard, Paypal, e.t.c*<br>

<br>

**ID:**  R-03<br>

**RECOMMENDATION:**<br>
*using ISBN Number to search for book*<br>

**EVIDENCE:**<br>
*Load-up the website*<br>
*Search a book by it ISBN Number*<br>

**PRIORITY:**<br>
*Low*<br>
*Using ISBN Number to search gives users more option to find there desire books*<br>

**ACCEPTANCE CRITERIA:**<br>
*Search box activated to allow ISBN Number*<br>
*The search should the pop-up correct information related to the ISBN Number*


## Additional Recommendations (from Test Plan, Test Cases & Final Report)

### ID: R-04
RECOMMENDATION:
Implement a basic authentication system (registration, login, session) and tie orders to user accounts.

EVIDENCE:
- `tests/final-report.md` (DEFECT-001) — No authentication, orders stored only in localStorage.
- TC034 (Checkout allows anonymous purchase).

PRIORITY:
Critical (P0)

ACCEPTANCE CRITERIA:
- Users can sign up with email and password and log in.
- Email verification flow in place (or explicit demo disclaimer until implemented).
- Orders are associated with authenticated user IDs and viewable on a "My Orders" page.
- Protected admin routes require server-verified authorization (client-side role is not trusted).

ESTIMATED EFFORT:
3-4 weeks (backend + frontend + testing)


### ID: R-05
RECOMMENDATION:
Add a "My Orders" list page and a persistent UI link so users can browse order history.

EVIDENCE:
- `tests/final-report.md` (DEFECT-006, DEFECT-010) — No order list or navigation.
- TC035-TC037 show direct URL works but there is no discoverable way to reach orders.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- `/orders` route shows a paginated list of orders for the current user.
- Each list item includes: Order ID, date, status, total, and a link to details.
- Navbar contains "My Orders" when a user is logged in.

ESTIMATED EFFORT:
~1 day (frontend) + small backend work if orders are persisted server-side


### ID: R-06
RECOMMENDATION:
Add configuration validation and startup warnings for critical env variables (currency, Paystack key).

EVIDENCE:
- `tests/final-report.md` (DEFECT-002, DEFECT-009) — Currency mismatch and missing key cause silent failures.
- Test cases TC051-TC052.

PRIORITY:
Critical (P0)

ACCEPTANCE CRITERIA:
- On app start, validate `REACT_APP_PAYSTACK_PUBLIC_KEY` format and presence.
- Validate `REACT_APP_CURRENCY` against supported currencies; show a clear banner/error if mismatch.
- Fail fast with a clear developer message in console and an in-UI banner for demo users.

ESTIMATED EFFORT:
2-3 hours


### ID: R-07
RECOMMENDATION:
Fix payment calculation to charge the full cart total (not just the first item) and add unit tests for totals.

EVIDENCE:
- `tests/final-report.md` (DEFECT-005) — Payment sent only for first item.
- CheckoutService code review.

PRIORITY:
Critical (P0)

ACCEPTANCE CRITERIA:
- Payment initialization uses the cart grand total (including shipping/tax/coupons) converted to minor units.
- Unit tests cover single-item, multi-item, and quantity variants; regression prevented by CI.

ESTIMATED EFFORT:
2-4 hours + tests


### ID: R-08
RECOMMENDATION:
Improve user feedback: add a toast/notification system, success/error messages, loading indicators, and confirmation dialogs for destructive actions.

EVIDENCE:
- Test cases TC005, TC015 and final report (DEFECT-015, DEFECT-013) — no toasts/confirmations.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- Add toast notifications for actions (add to cart, remove item, payment success/failure).
- Confirm destructive actions (remove item) with an undo or confirm dialog.
- Show loading spinners and disable buttons while async operations run.

ESTIMATED EFFORT:
4-8 hours


### ID: R-09
RECOMMENDATION:
Fix quantity input usability: provide ± controls, allow keyboard editing, and validate quantity changes.

EVIDENCE:
- TC022 and DEFECT-016 — quantity input not editable/no +/- controls.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- Quantity field supports keyboard input and +/- buttons.
- Quantity changes update cart totals immediately and persist to localStorage.

ESTIMATED EFFORT:
2-3 hours


### ID: R-10
RECOMMENDATION:
Harden admin access: replace client-side role checks with server-side auth (or at minimum show demo-only banner until backend auth is in place).

EVIDENCE:
- DEFECT-008 (admin access via localStorage) and TC040.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- Admin route requires a server-validated token/session.
- If backend is unavailable, show "Demo only - Admin features disabled" message and keep admin UI read-only.

ESTIMATED EFFORT:
Backend work: 1-2 days (minimum) or show UI-only disclaimer in 1 hour


### ID: R-11
RECOMMENDATION:
Add automated tests and CI: unit tests (Jest/RTL) for key components, and an end-to-end smoke test (Cypress) for the critical path (catalog → cart → checkout → payment stub).

EVIDENCE:
- Test-plan describes manual coverage; final-report notes lack of automation.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- Add unit tests covering StoreProvider, cart logic, toMinorUnits, and payment orchestration.
- Add a Cypress smoke test that runs in CI on pushes to main; test must exercise the critical path with mocked Paystack responses (MSW/Cypress stubs).

ESTIMATED EFFORT:
2-3 days initial + CI pipeline setup


### ID: R-12
RECOMMENDATION:
Improve accessibility coverage: run axe checks, fix missing alt text or ARIA labels, and add at least one screen-reader check in CI.

EVIDENCE:
- Test-plan & test-cases include a11y; final-report shows partial coverage and missing alt text (DEFECT-014).

PRIORITY:
Medium (P2)

ACCEPTANCE CRITERIA:
- All images have descriptive alt text.
- Critical pages pass automated axe checks (no violations of level A/AA for tested rules).
- Keyboard navigation flows documented and fixed where needed.

ESTIMATED EFFORT:
1-3 days depending on fixes


### ID: R-13
RECOMMENDATION:
Add a README / Troubleshooting section with explicit setup steps, Paystack currency requirements, and restart reminders.

EVIDENCE:
- Final Report and Test Plan document confusion around .env handling and currency mismatch.

PRIORITY:
High (P1)

ACCEPTANCE CRITERIA:
- README clearly lists required env vars with examples and explains that `.env` changes require a server restart.
- Include a short checklist for first-time setup and common errors + fixes.

ESTIMATED EFFORT:
1-2 hours


### ID: R-14
RECOMMENDATION:
Create a prioritized remediation plan: convert the critical test findings into GitHub Issues (DEFECT-001..DEFECT-016), assign owners, and add target dates.

EVIDENCE:
- Final report lists critical defects and estimated fix times.

PRIORITY:
Critical (P0) for triage

ACCEPTANCE CRITERIA:
- Each critical defect has a GitHub issue with reproduction steps, acceptance criteria, and an assignee.
- A short project board column "Critical fixes" created and tracked.

ESTIMATED EFFORT:
2-3 hours to triage and create issues; ongoing for fixing