# 🧰 Technical Specifications — Book Store App

## 🧱 Stack
- React 18, React Router 6
- Tailwind CSS
- localStorage persistence
- Paystack Inline (npm `@paystack/inline-js` or window script)

## 🔐 Environment Variables
- `REACT_APP_PAYSTACK_PUBLIC_KEY` — Paystack public key (`pk_test_...` for test)
- `REACT_APP_CURRENCY` — NGN, GHS, USD, or ZAR (defaults to ZAR)

## 🧪 Scripts
- `npm install`, `npm start`, `npm run build`

## 🏗️ Architecture
- `src/store/StoreProvider.js` — Global store: cart, orders, coupons, notifications, user
- `src/utils/storage.js` — Safe localStorage helpers (quota-safe)
- `src/services/CheckoutService.js` — Payment orchestration and post-verify
- `src/utils/paystack.js` — Paystack integration (currency validation, cents math)
- `src/config/currency.js` — Currency config and `formatCurrency`
- `src/pages/*` — Catalog, Cart, Checkout (wizard), Order Details, Admin

## 🧭 Routing
- `/` → `/catalog`
- `/catalog`, `/cart`, `/checkout`, `/orders/:id`, `/admin`

## 💾 State & Persistence
- Keys: `app.cart`, `app.orders`, `app.coupons`, `app.notifications`, `app.user`
- `storageErrors`: array of keys that failed to persist (simulate quota errors)

## 🧾 Data Contracts (UI-Level)
- Cart Item: `{ id: number, book: Book, quantity: number }`
- Book: `{ id, title, author, price:number, image:url, description, (future: genre, rating, stock, isbn, dimensions) }`
- Order: `{ id:string, status:'Pending'|'Paid'|'Fulfilled'|'Delivered'|'Cancelled'|'Refunded', items: CartItem[], shipping:{ fullName,email,address,city,country,postalCode }, totals:{ subtotal:number, shippingFee:number, tax:number, total:number }, createdAt: ISO8601, gatewayRef?: string, audit?: AuditEntry[] }`
- AuditEntry: `{ at: ISO8601, action: string, by?: string, note?: string }`

## 🔎 Observable UI Contracts
- Currency formatting via `formatCurrency(amount)` reflects `REACT_APP_CURRENCY` (symbol and locale); UI does not display raw `$`.
- Checkout errors are shown inline, inputs are labelled, and messages are announced (aria-live polite).
- Order detail shows status timeline with current step highlighted and gateway reference when Paid.

## 💳 Payments
- Supported currencies: NGN, GHS, USD, ZAR (preflight validation, user-facing error on mismatch)
- `toMinorUnits(amount)` ensures exact cents; reference generated client-side for demo

## ♿ Accessibility Targets
- Labeled search (`label` + `sr-only`); ESC clears; focus visible
- Keyboard navigation covers all interactive elements in logical order
- `aria-live` used for critical status updates (errors, confirmations)

## ⚡ Performance Targets
- LCP ≤ 2.5s desktop / ≤ 3s mobile; TTI ≤ 1s on critical interactions
- Lazy-loading images; explicit width/height; minimal main-thread blocking

## 🌐 Compatibility Matrix
- Latest 2 releases of Chrome, Firefox, Safari, Edge; responsive at mobile/tablet/desktop breakpoints

## 🧩 Testability
- `data-testid` on title/price/buy button
- Planned: deterministic `seed.json`, MSW layer for faults/latency

