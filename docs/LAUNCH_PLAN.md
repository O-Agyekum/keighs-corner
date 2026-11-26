# Keigh’s Corner — Production setup checklist

The React interface in this package is a **working local demonstration**, not a deployed payment or shipping system. It must not be exposed as a real shop with its current public demo admin.

## Already implemented and tested in the browser
- Mobile responsive storefront, category listings, product detail URLs, favourites and basket.
- Mobile-friendly seller workspace with overview, product creation/editing, 1–5 photos per item, publication toggle, stock management, cost and margin estimates.
- Simulated checkout with address and pickup-point fields, simulated order, stock decrement.
- Order review, customer details, manual transport/tracking record, fulfilment states, cancellation with demo stock restoration, printable **preparation sheet**, CSV/JSON exports.
- Product-price calculator; no real tax or fee calculation.

## Required before live sales (not implemented)
1. **Create a NEW isolated Supabase project for Keigh’s Corner.** Do not reuse DZOFT or Joblytics databases. Apply a reviewed version of `schema_proposed.sql` after testing. Enable RLS for every public table; restrict any privileged actions to a trusted shop-admin account.
2. **Secure admin:** Supabase Auth password/passkey/MFA as appropriate; check the admin role in trusted `app_metadata`/server-side authorization. Remove or gate public `/admin` route before deployment.
3. **Migrate product inventory:** export Shopify products and inventory, review photos, SKUs, taxes, variants, quantities, prices and publishing status. Replace demo/localStorage persistence with database and file storage.
4. **Real checkout:** server endpoint re-reads product prices and stock from DB; enforces stock reservation and expiry; creates a Stripe Checkout session using a secret stored only server-side. Never trust client-supplied totals.
5. **Stripe webhooks:** verify signature, record events idempotently, mark orders paid only on confirmed payment, adjust reserved/available stock atomically, handle failures, late async payments and refunds. Never ship based solely on a success redirect.
6. **Delivery:** configure home delivery and pickup-point selection using actual carrier agreement/API; confirm final shipping prices; purchase/generate transport labels server-side; save carrier tracking numbers, dispatch timestamps and customer notifications. The demo printing action is NOT a shipping label.
7. **Email:** order and shipping confirmation through authenticated server provider, no addresses sent to a public endpoint without access controls.
8. **Compliance:** verify business registration/retail status, legal identity, CGV, privacy notice, cookies, pricing incl. VAT where applicable, return/withdrawal processes, consumer support, data retention and deletion.
9. **Infrastructure:** configure domain, secure HTTPS hosting, monitoring, rate limits, abuse protection, backups, test purchases and refund flow, and admin recovery path.
10. **Switch off Shopify only after migration and launch verification:** export products/orders/customer data allowed under your policies, test checkout and shipping end-to-end, verify DNS/redirects, and then cancel platform and app subscriptions.

## Recommended architecture
- Frontend: Vite + React on static hosting (Cloudflare Pages/GitHub Pages).
- Backend & images: **separate Keigh’s Corner** Supabase project, RLS policies + dedicated product-photo bucket.
- Payments: Stripe Checkout **server integration with verified webhooks**.
- Shipping: Mondial Relay / La Poste partner APIs as available, manually managed shipping as an interim option once real paid orders and customer data are secured.

## Security boundaries
- `schema_proposed.sql` is reference SQL only and has **not** been applied anywhere.
- There are **no Stripe keys**, Supabase secrets, shipping credentials or real customer records in this package.
- Demo checkout stores test customer addresses locally. Do not enter personal information or production credentials.
- Supabase `service_role`/secret keys are **never** for browser source code.
- Draft product images in a public bucket may still be visible to someone with their direct link; review storage access design.

## Testing record
- Verified browser navigation and rendering for seller overview, product editor and order details.
- Verified mobile viewport 390px with no page-width overflow.
- Verified end-to-end **simulated** checkout and order success with no page errors.
- Still required: real service integration tests, provider sandbox purchases, refunds, security checks and real-device smoke tests.
