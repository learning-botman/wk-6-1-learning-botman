# -----------------------------
# Book Store QA Test Plan (Detailed)
# -----------------------------

## 1. Objective & Scope
Validate that the React Book Store meets stated functional requirements (FR), non-functional requirements (NFR) and intentional defect seeds, before the Nov 18 production release.
Focus on risk-based coverage: cart → checkout → payment flow, accessibility, performance budgets, cross-browser compatibility, and security hygiene.

## 2. In-Scope Features (mapped to FR codes)
| Feature Area   | ID           | Description                                 |
|---------------|--------------|---------------------------------------------|
| Catalog       | FR-C01       | Browse, search, lazy images                 |
| Cart          | FR-O01–O03   | Add, update qty, subtotal, stock guard      |
| Checkout      | FR-O04–O05   | Wizard, validation, Paystack payment        |
| Orders        | FR-O06       | Order history, status lifecycle             |
| Admin         | FR-M01–M05   | CRUD, inventory, moderation                 |
| Reviews       | FR-U01–U03   | Post-purchase rating, sanitization          |
| Returns       | FR-R01–R03   | 7-day window, refund simulation             |
| Notifications | FR-N01–N02   | Bell, unread count, mark read               |
| A11y          | FR-X01       | WCAG 2.1 AA compliance                      |
| Performance   | FR-X02       | LCP ≤ 2.5 s, TTI ≤ 1 s                      |
| Security      | FR-S01–S03   | XSS prevention, URL whitelist               |
| Intentional Defects | —      | 10 seeded bugs (currency, rounding, XSS, etc.) |

## 3. Out-of-Scope
- Native mobile app (iOS/Android)
- Email/SMS notification delivery (only in-app)
- PCI-DSS audit of Paystack SDK
- Load testing > 500 concurrent users (covered in NFR but deferred to Phase-2)

## 4. Environments
| Tier  | URL                     | Browsers                                             | Devices                                 | Throttling |
|-------|-------------------------|------------------------------------------------------|-----------------------------------------|------------|
| Local | http://localhost:3000   | Chrome Version 142.0.7444.60 (Official Build) (64-bit), Firefox, Edge | Windows 11 14inch Laptop, Samsung A34, iPhone 12 Pro | None       |

## 5. Tools & Extensions
- Test case mgmt: GitHub Projects (board link)
- Exploratory notes: RapidReporter 2.3
- A11y: axe-core 4.9, WAVE, Lighthouse a11y audit
- Perf: Lighthouse CI, WebPageTest, React Profiler
- Network: MSW 2.1 for mock latency/errors
- Automation: Cypress 13 (e2e), React Testing Library (unit)
- CSV validation: Python pandas + pytest
- Security: OWASP ZAP baseline scan

## 6. Risks & Mitigations
| Risk                        | Impact | Likelihood | Mitigation                                 |
|-----------------------------|--------|------------|--------------------------------------------|
| Paystack test key expires   | High   | Low        | Alert 3 days before; key rotation script   |
| Stock race condition        | Major  | Medium     | Add pessimistic UI lock, test with 2 tabs  |
| CSV export decimal comma    | Minor  | High       | Post-process with locale=EN-us             |
| Seeded XSS flagged by client| Major  | Low        | Document in test report; use safe markdown lib |

## 7. Test Types & Coverage Targets
| Test Type                  | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| Functional Testing         | Ensures all bookstore features (book listing, add to cart, checkout, Paystack integration, admin guard, and routing) work correctly according to requirements. |
| Accessibility (a11y) Testing | Checks that all UI elements are accessible, properly labeled, and usable with assistive technologies such as screen readers and keyboard navigation. |
| Performance Testing        | Measures the app’s load speed, responsiveness, and stability — ensuring efficient performance under normal and heavy usage. |
| Compatibility Testing      | Verifies the app behaves consistently across different browsers (Chrome, Firefox, Safari, Edge) and on both desktop and mobile devices. |
| Hygiene / Code Quality Testing | Focuses on code cleanliness, adherence to best practices, and security hygiene — checking for vulnerabilities, outdated dependencies, and coding standard compliance. |

## 8. Entry & Exit Criteria
| Criteria Type | Description |
|--------------|-------------|
| Entry Criteria | - All bookstore features are developed and merged into the main branch.<br>- Test environment (development or staging) is set up and stable.<br>- Test data (books, users, payment sandbox) prepared.<br>- Functional build passes without critical errors.<br>- Required tools (browsers, a11y and performance tools) available. |
| Exit Criteria  | - All planned test cases executed and documented.<br>- No critical or high-severity defects remain unresolved.<br>- Accessibility, performance, and compatibility targets met.<br>- Code review and hygiene checks completed.<br>- Final test summary reviewed and approved by QA lead or instructor. |

## 9. Deliverables & Schedule
| Artifact             | Due      | Owner         |
|---------------------|----------|--------------|
| This test plan      | Nov 5    | Team Lead      |
| Test cases          | Nov 11   | Whole team   |
| Defect log          | Nov 11 (draft) → Nov 18 (final) | Everyone |
| Final report        | Nov 18   | Team Lead      |
| Video presentation  | Nov 18   |  |

# 📝 Test Plan

## Introduction
This Test Plan document defines the testing strategy, objectives, scope, test environment, and responsibilities for the Bookstore application. The system is an e-commerce web application that allows users to browse books, add them to a cart, and simulate a checkout using the Paystack payment integration.

## Objectives
The main objective of testing is to ensure that all Bookstore application components function correctly, meet business requirements, and provide a smooth and error-free user experience. Testing should also identify and clarify any confusing behavior.

## Scope (In-scope)
Testing will mainly focus on these key features:
- User registration and authentication
- Book catalog and search functionality
- Shopping cart and checkout process
- Inventory and order tracking
- Payment integration (Paystack test mode)

## Out of Scope
Some parts of the system won’t be tested in this phase to keep things focused and manageable:
- Real Paystack payments (only test mode will be used)
- Performance/load testing
- Email notifications and password recovery
- Admin analytics and sales reports
- Mobile app version (only the web version is covered)

## Testing Types
We’ll use different types of testing to make sure all aspects of the app are covered:
- Functional Testing – To confirm each feature works as expected
- Integration Testing – To verify that different modules work well together
- UI/UX Testing – To check design consistency and usability
- Regression Testing – To make sure fixes don’t break other parts of the app
- Acceptance Testing – Final testing to confirm the system meets user needs

## Test Environment
Testing will be done on a local environment using Node.js and React.

- URL: http://localhost:3000/
- Payment: Paystack (test mode only)
- Test Data: Manually created sample data
- Browser: Chrome, Firefox, and Edge (latest versions)

## Test Deliverables
- Test Plan Document
- Test Cases and Checklists
- Defect Log
- Final Test Report
- Project Board (GitHub) with test activities

## Entry and Exit Criteria
**Entry Criteria:**
- Repository setup completed
- Application runs locally
- Test environment configured

**Exit Criteria:**
- All planned test cases executed
- All critical and high-priority defects resolved
- Test report reviewed and approved

## Risks and Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| Unstable internet connection | May interrupt online calls | Use offline testing where possible and retry failed calls |
| Paystack test API downtime | Blocks checkout testing | Mock API responses to simulate transactions |
| Incomplete or outdated test data | May lead to inconsistent results | Refresh test data before execution |
| Time constraints | May reduce testing depth | Prioritize high-risk and core user flows first |

## Schedule
**Phase 1: Planning & Setup** – Due November 5, 2025  
**Phase 2: Test Design & Early Execution** – Due November 11, 2025  
**Phase 3: Final Execution & Reporting** – Due November 18, 2025

---

## Objective and Scope
To validate the Book Store App for functional correctness, accessibility, performance, compatibility, and security hygiene. The goal is to ensure the app meets all functional requirements (FRs), provides a high-quality user experience, and is ready for final submission.

## In-Scope Features (map to FR codes)
- Catalog browsing and search (FR-O01)
- Cart operations: add, update, remove, persist (FR-O01)
- Checkout wizard: Shipping → Review → Payment → Confirmation (FR-O02)
- Payments: Paystack integration, currency validation, payment status (FR-O03)
- Orders: order history, order details, status timeline (FR-O04, FR-O05)
- Admin console access and guard (FR-M01)
- Accessibility (labels, focus, aria-live, keyboard nav) (FR-X01)
- Performance (LCP, TTI, lazy images) (FR-X02)
- Compatibility (latest 2 Chrome/Firefox/Safari/Edge, responsive) (FR-X03)
- Security hygiene: input validation, storage errors, URL scheme validation (FR-X04, FR-S01–S03)

## Out-of-Scope
- Real backend services (all payment and verification are mocked)
- Multi-currency catalogs
- Real shipping carriers and address validation
- Advanced admin features (CRUD, moderation, inventory adjustments)
- Returns, refunds, and audit trail (FR-R01–R03)
- Reviews, Q&A, and community features (FR-U01–U03)

## Environments (browsers/devices, throttling)
- Browsers: Chrome (latest 2), Firefox (latest 2), Safari (latest 2), Edge (latest 2)
- Devices: Desktop (Windows, macOS), Mobile (iOS Safari, Android Chrome)
- Responsive breakpoints: mobile, tablet, desktop
- Network: Simulate 3G/4G throttling for performance tests

## Tools (extensions, screen readers)
- Accessibility: axe DevTools, WAVE, NVDA, VoiceOver
- Performance: Lighthouse, Chrome DevTools (LCP, TTI)
- Compatibility: BrowserStack or device emulators
- Project management: GitHub Projects
- Evidence: OS screen recorder, screenshot tools

## Risks and Mitigations
- Risk: Incomplete coverage of edge cases → Mitigation: Map all test cases to FR codes and review coverage weekly
- Risk: Accessibility issues missed → Mitigation: Use automated tools and manual screen reader checks
- Risk: Performance regressions → Mitigation: Run Lighthouse and LCP/TTI checks after major changes
- Risk: Storage quota errors not reproducible → Mitigation: Simulate quota exceeded and check error handling
- Risk: Team bandwidth or deadline slippage → Mitigation: Weekly progress meetings and board updates

## Test Types (functional, a11y, perf, compatibility, hygiene)
- Functional: All user flows, state persistence, error handling
- Accessibility (a11y): Labels, focus, keyboard nav, aria-live, color contrast
- Performance: LCP, TTI, lazy loading, responsiveness
- Compatibility: Cross-browser, cross-device, responsive layout
- Hygiene: Security (input validation, URL schemes), storage error handling

## Entry/Exit Criteria
**Entry Criteria:**
- App builds and runs locally
- Test plan and test cases are documented
- Test environments and tools are ready

**Exit Criteria:**
- All in-scope test cases executed
- All critical/major defects logged and triaged
- Accessibility and performance checks completed
- Evidence (screenshots, videos) collected
- Final report and required artifacts prepared for submission
