# Keigh’s Corner — e-commerce storefront (demo)

A responsive independent French-language boutique prototype for Keigh’s Corner, with the owner-provided KC monogram and the public Shopify catalogue snapshot captured on 26 November 2026.

## Features

- 36 distinct products and 65 original Shopify CDN photograph links.
- Responsive browsing, product photographs, category/search filters, product details, basket, checkout, seller dashboard and simulated orders.
- Public catalogue availability preserved: 27 available, 9 unavailable at the time of capture.
- All financial operations, payment results, shipping and refund operations are **SIMULATED**.
- **Not production-safe:** demo admin is not authenticated, data is browser-local, real stock quantities are unknown, and no real payments, shipping, notification emails or customer data security are provided.
- This repository intentionally does **not** include Stripe keys, Supabase secrets or sensitive customer data.

## Run locally

Install Node.js and npm, then run:

```bash
npm install
npm run dev
```

To build a static deployment:

```bash
npm run build
npm run preview
```

The Vite build produces the static `dist` directory. The `vite.config.ts` file sets `base: './'` for relative assets, with hash routing for GitHub Pages. Shopify CDN photos require an internet connection. Before Shopify closure, download and rehost images and verify every product photograph.

## Deployment

The repository can use GitHub Pages Actions to publish a **demo only**. The `.github/workflows/pages.yml` workflow supports **manual trigger only**; it will not automatically publish the demo when files are uploaded. Do **not** turn on production checkout simply by enabling Pages; see `docs/END_TO_END_LAUNCH_CHECKLIST.md` for the remaining secure backend, PCI/payment, stock, email, shipping, legal and operational integration tasks.

## Data provenance

`data/shopify_catalogue_public.json` is the frozen public snapshot; public yes/no availability is not a numeric stock export. Final exact quantities, product descriptions and variants must be confirmed via the Shopify admin export before accepting real purchases.

## Domain

Buy the domain once the site is ready. Configure it under GitHub `Settings → Pages` (or a separate hosting provider) and follow that provider's current DNS and HTTPS instructions. Avoid mixing the Keigh’s Corner shop with the unrelated Korantemaa portfolio or Girlogyshop projects.

If the GitHub connector cannot write to the repository, see `docs/DEPLOYMENT_INSTRUCTIONS.md` for a safe manual upload route.
