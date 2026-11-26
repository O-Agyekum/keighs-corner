# Keigh's Corner — End-to-end commerce launch checklist

Current version: **offline interactive demo only**. It does not charge cards, send orders, or create shipments. Sample data and any typed information are stored **only in the current browser**, with an unprotected admin route. Never publish this standalone version to accept real orders.

## Customer journey implemented in demo
1. Discover items through category filters and dedicated product URLs.
2. Add/remove products directly from catalogue cards or product detail pages; enforce client-side stock limit.
3. Basket totals and quantity updates persist in localStorage.
4. Guest checkout captures fictitious contact and address, delivery or pickup preference; test shipping fee displayed before payment.
5. Explicit **simulate success** or **simulate decline**; declined transaction does not reduce stock, successful test creates order and decrements demo stock.
6. Confirmation shows order reference, total and delivery choice.
7. Test customer tracking requires local order ID and matching email; shows shipment status and can request a return after delivery.
8. Seller dashboard lists orders, addresses, preparation, manual carrier/tracking, delivery, cancellation, test refunds and returns, CSV/JSON export.
9. Product admin supports photos, descriptions, stock levels, price and profit estimates; all data local browser.

## Required for real production (not implemented)
### Identity, personal data, security
- Separate Supabase project for Keigh's Corner, admin login with MFA, roles/ownership, RLS on every exposed table, server-side access checks; public users must not access private customer records. Do not reuse DZOFT or Joblytics financial data.
- Server-side forms and validation; rate limiting, CSRF strategy where relevant, input validation and file type/size limits.
- Dedicated protected object storage for product uploads and properly scoped signed URLs for nonpublic files. Public product images may be stored in an appropriately configured public bucket.
- GDPR privacy and retention policy, access/correction/deletion mechanisms, no personal data in public analytics; encrypted backups with restore test.

### Payment and inventory
- Stripe Checkout hosted page in test mode, then live mode only after end-to-end verification; never collect raw card details or secret keys on frontend.
- Server must determine SKU, price, currency, discount, stock and shipping, **never trust browser amount**.
- Atomic inventory reservation/expiry for unique items and multiple concurrent shoppers. Idempotent webhooks for payment succeeded/failed/expired/refunded; transactions and constraints to prevent overselling and duplicate order creation.
- Orders have immutable line-item snapshots and auditable payment events; order is fulfilled only after a verified server-side event.
- Refunds initiated server-side, reconciliation to Stripe, restock based on validated returns/cancellations, duplicate refund protection.

### Fulfilment and after-sales
- Verified postcode/address validation; actual Mondial Relay pickup-point selector and La Poste/Mondial Relay commercial API or approved shipping integration.
- Carrier pricing based on destination, weight and dimensions, print real labels, shipping events and customer tracking links.
- Order confirmation, payment receipt, dispatch, delivery, returns/refund notification emails from a verified sender with bounce/error monitoring.
- Customer order lookup with secure signed access tokens or customer accounts, **not email and order number alone**.
- Shipping service unavailable? Hold shipping state, do not charge for services not deliverable.

### French commercial launch
- Company seller identity, legal notice, CGV, cancellation/refunds, distance-selling withdrawal disclosures and online withdrawal functionality; privacy and cookies policies.
- Determine whether prices display VAT/TVA and how tax and shipping are displayed; appropriate invoices/receipts, numbering, accounting export.
- Contact and customer support channel, delivery timelines, gift/discount rules, stock accuracy.

### Quality and launch
- Unit tests for money/rounding/shipping; integration tests for idempotency, out-of-stock, failed and disputed payment, cancellation/refund, carrier/API errors; browser/mobile E2E.
- Speed targets for mobile, alt text, keyboard navigation, accessible forms, canonical URLs, metadata, sitemap and SEO, image compression and lazy loading.
- Prepare production monitoring, uptime checks, backups, deployment rollback, incident process, DNS/domain, email authentication (SPF/DKIM/DMARC).
- Complete test purchase and refund with authorized test accounts **before** cancelling Shopify.

**Principle:** browser demo proves the workflow visually; production requires separate secure infrastructure, real integrations, and legal approval.
