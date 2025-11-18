# Book Store Application - Test Plan

**Version:** 2.0  
**Date:** November 18, 2025  
**Prepared By:** QA Testing Team

---

## 1. OBJECTIVE & SCOPE

### 1.1 Testing Objective

Validate that the React Book Store application meets functional requirements and is ready for demonstration/educational use. Focus on critical user paths: catalog browsing → cart management → checkout → payment integration.

### 1.2 Release Goal

**Target:** Demo-ready application suitable for training and portfolio use  
**NOT targeting:** Production deployment (requires authentication system and backend)

---

## 2. IN-SCOPE FEATURES

| Feature Area         | Test Cases                  | Description                                                           |
| -------------------- | --------------------------- | --------------------------------------------------------------------- |
| **Catalog Browsing** | TC001-TC010 (10 cases)      | Browse books, search by title/author, responsive layout               |
| **Shopping Cart**    | TC011-TC022 (12 cases)      | Add/remove items, update quantities, cart persistence, badge accuracy |
| **Checkout Process** | TC023-TC034 (12 cases)      | Shipping form validation, payment modal, Paystack integration         |
| **Order Management** | TC035-TC038 (4 cases)       | View order details, order persistence, navigation to orders           |
| **Admin Panel**      | TC039-TC040 (2 cases)       | Access control, authorization checks                                  |
| **Accessibility**    | TC041-TC043 (3 cases)       | Keyboard navigation, alt text, focus indicators                       |
| **Performance**      | TC044-TC045 (2 cases)       | UI responsiveness, search performance                                 |
| **Compatibility**    | TC046-TC047 (2 cases)       | Chrome compatibility, mobile responsive design                        |
| **Security/Config**  | TC048-TC050 (3 cases)       | Environment variables, currency validation, localStorage              |
| **User Feedback**    | (Identified during testing) | Toast notifications, success messages, error alerts                   |

**Total Documented Test Cases:** 53  
**Planned Execution:** 46 cases (87% of documented cases)

---

## 3. OUT-OF-SCOPE

The following are intentionally excluded from this testing phase:

- **User Authentication System** - Feature does not exist (12 test cases deferred)
- **Backend Database** - Application uses localStorage only
- **Production Security Measures** - Client-side only implementation
- **Email Verification** - No email system implemented
- **Advanced Admin Features** - Admin panel is placeholder only
- **Returns & Refunds** - Not implemented
- **Review System** - Not implemented
- **Load Testing** - Beyond scope (500+ concurrent users)
- **Comprehensive Screen Reader Testing** - Tools not available (7 cases deferred)
- **Cross-Browser Testing** - Limited to Chrome only (6 cases deferred)
- **Advanced Performance Audits** - Lighthouse audit deferred (3 cases)

**Total Deferred Test Cases:** 28 cases requiring features not implemented or tools not available

---

## 4. TEST ENVIRONMENT

### 4.1 Setup Details

| Component            | Specification                                    |
| -------------------- | ------------------------------------------------ |
| **URL**              | http://localhost:3000                            |
| **Node.js**          | v18.x                                            |
| **React**            | 18.x                                             |
| **Payment Gateway**  | Paystack (test mode)                             |
| **Primary Browser**  | Chrome 119.x (Version 142.0.7444.60)             |
| **Operating System** | Windows 11                                       |
| **Display**          | 1920×1080 (14-inch laptop)                       |
| **Mobile Testing**   | Browser DevTools emulation (iPhone XR, iPad Pro) |
| **Network**          | Standard broadband (no throttling)               |

### 4.2 Required Configuration

```env
REACT_APP_CURRENCY=NGN
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_[your_key]
```

**Critical Requirement:** Currency in `.env` MUST match Paystack merchant account configuration or payment will fail silently.

---

## 5. TESTING TOOLS & EXTENSIONS

### 5.1 Manual Testing Tools

- **Browser DevTools** - Network inspection, console monitoring, localStorage inspection
- **Responsive Design Mode** - Mobile/tablet viewport testing
- **Screen Capture** - OS screen recorder for evidence collection

### 5.2 Accessibility Tools

- **axe DevTools** - Automated accessibility scanning
- **Manual Inspection** - Keyboard navigation, focus indicators, alt text verification

### 5.3 Performance Monitoring

- **Chrome DevTools Performance** - Manual observation of UI responsiveness
- **React Developer Tools** - State inspection

### 5.4 Project Management

- **GitHub Projects** - Test case tracking and progress monitoring
- **Evidence Storage** - `test-evidence/` folder for screenshots and recordings

---

## 6. TEST TYPES & COVERAGE

| Test Type                 | Focus Areas                                       | Target Coverage            |
| ------------------------- | ------------------------------------------------- | -------------------------- |
| **Functional Testing**    | User flows, state management, data persistence    | 90% of critical paths      |
| **Integration Testing**   | Paystack API, localStorage, routing               | 100% of integrations       |
| **UI/UX Testing**         | Form validation, user feedback, responsive design | 85% of user interactions   |
| **Accessibility (a11y)**  | Keyboard nav, alt text, focus indicators          | Limited (tool constraints) |
| **Performance**           | Response times, UI updates                        | Manual observation only    |
| **Compatibility**         | Browser/device consistency                        | Chrome + mobile emulation  |
| **Configuration Testing** | Environment variables, setup requirements         | 100% of config scenarios   |

---

## 7. RISKS & MITIGATIONS

| Risk                                           | Impact   | Likelihood | Mitigation                                             |
| ---------------------------------------------- | -------- | ---------- | ------------------------------------------------------ |
| **Currency mismatch blocks payment**           | Critical | High       | Document setup requirements clearly; validate on day 1 |
| **No authentication causes security concerns** | Critical | Certain    | Document as demo-only limitation; add disclaimers      |
| **Order viewing broken**                       | High     | Certain    | Log as critical defect; document workaround            |
| **Limited accessibility testing**              | Medium   | Certain    | Document limitations; use available automated tools    |
| **Browser compatibility unknown**              | Medium   | High       | Document Chrome-only testing; recommend future testing |
| **Configuration errors waste time**            | Medium   | Medium     | Create setup checklist; validate environment early     |
| **Missing user feedback confuses testers**     | Low      | Certain    | Document as usability issue                            |

---

## 8. ENTRY & EXIT CRITERIA

### 8.1 Entry Criteria

- ✅ Application builds and runs on localhost:3000
- ✅ Paystack test account configured
- ✅ Test environment stable
- ✅ Test cases documented and reviewed
- ✅ Evidence collection tools ready

### 8.2 Exit Criteria

- ✅ All planned test cases (46 of 53) executed
- ✅ Critical defects identified and documented
- ✅ Pass rate calculated (target: 85% for release; actual: 82.6% acceptable for demo)
- ✅ Evidence collected for all executed tests
- ✅ Final report completed with recommendations
- ✅ Verdict delivered: Demo-ready vs Production-ready

### 8.3 Acceptance Threshold

**For Demo/Training Use:** 80%+ pass rate  
**For Production Release:** 95%+ pass rate + all critical defects resolved

---

## 9. TEST DELIVERABLES

| Deliverable               | Due Date        | Status      | Owner     |
| ------------------------- | --------------- | ----------- | --------- |
| Test Plan (this document) | Nov 5, 2025     | ✅ Complete | Team Lead |
| Test Cases Document       | Nov 11, 2025    | ✅ Complete | QA Team   |
| Test Execution (46 cases) | Nov 14-18, 2025 | ✅ Complete | QA Team   |
| Defect Log                | Nov 18, 2025    | ✅ Complete | QA Team   |
| Evidence Collection       | Nov 18, 2025    | ✅ Complete | QA Team   |
| Final Test Report         | Nov 18, 2025    | ✅ Complete | Team Lead |

---

## 10. TEST EXECUTION SCHEDULE

**Phase 1: Planning & Setup** – November 5, 2025 ✅

- Test plan creation and review
- Environment setup and validation
- Test case design

**Phase 2: Test Execution** – November 14-16, 2025 ✅

- Critical path testing (Catalog → Cart → Checkout)
- Configuration validation
- Evidence collection

**Phase 3: Extended Testing** – November 17, 2025 ✅

- Order management testing
- Admin panel testing
- Accessibility and compatibility checks

**Phase 4: Reporting** – November 18, 2025 ✅

- Final analysis and metrics calculation
- Report writing and recommendations
- Deliverable submission

---

## 11. KNOWN LIMITATIONS

### 11.1 Testing Constraints

- **Single Browser:** Only Chrome tested (Firefox, Safari, Edge deferred)
- **No Screen Readers:** NVDA/VoiceOver testing not performed
- **Mobile Devices:** Emulation only, no real device testing
- **Performance:** No Lighthouse audit or load testing
- **Security:** No penetration testing or vulnerability scanning

### 11.2 Application Constraints

- **No Authentication:** Cannot test user registration, login, session management
- **No Backend:** Cannot test server-side validation, database operations
- **Client-Side Only:** Security measures limited
- **LocalStorage Only:** Cannot test cross-device scenarios

---

## 12. TEAM & RESPONSIBILITIES

| Role               | Responsibilities                                    | Team Member                         |
| ------------------ | --------------------------------------------------- | ----------------------------------- |
| **Test Lead**      | Test planning, final report, coordination           | Evans                               |
| **QA Testers**     | Test execution, evidence collection, defect logging | Kayode Ayomide, Oreoluwa Ruth Ajayi |
| **Testing Period** | November 14-18, 2025                                | Full Team                           |
| **Total Effort**   | 7 days intensive testing                            | Full Team                           |

---

## 13. SUCCESS CRITERIA

### 13.1 For Demo/Training Release (Current Target)

- ✅ Critical shopping flow works (browse → cart → checkout → payment)
- ✅ Pass rate ≥ 80%
- ✅ Configuration documented clearly
- ✅ Limitations and disclaimers added
- ✅ Suitable for educational use

### 13.2 For Future Production Release (Not Current Target)

- ❌ Authentication system implemented
- ❌ Backend database operational
- ❌ Pass rate ≥ 95%
- ❌ All critical defects resolved
- ❌ Security audit completed
- ❌ Cross-browser testing passed

---

## APPENDIX A: TEST CASE MAPPING

| Feature         | Test Cases  | Priority | Execution Status |
| --------------- | ----------- | -------- | ---------------- |
| Catalog         | TC001-TC010 | P0-P2    | 10/10 executed   |
| Cart            | TC011-TC022 | P0-P2    | 11/12 executed   |
| Checkout        | TC023-TC034 | P0-P2    | 12/12 executed   |
| Orders          | TC035-TC038 | P0-P1    | 3/4 executed     |
| Admin           | TC039-TC040 | P0-P1    | 2/2 executed     |
| Accessibility   | TC041-TC043 | P1       | 3/3 executed     |
| Performance     | TC044-TC045 | P2       | 2/2 executed     |
| Compatibility   | TC046-TC047 | P0-P1    | 2/2 executed     |
| Security/Config | TC048-TC050 | P0-P2    | 1/3 executed     |

**Total: 46 of 53 executed (87%)**

---

## APPENDIX B: CONTACT INFORMATION

For questions about this test plan:

- **GitHub Issues:** https://github.com/learning-botman/wk-6-1-learning-botman
- **Documentation:** README.md
- **Test Evidence:** `/public/assets` folder

---

**Document Status:** FINAL
**Version:** 2.0  
**Date:** November 18, 2025  
**Next Review:** Before production development begins

---
