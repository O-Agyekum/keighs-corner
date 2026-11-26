# GitHub web upload (only if the ChatGPT GitHub connection remains unavailable)

1. Extract the ZIP locally. Open the **Keighs_Corner_GitHub_Ready** folder.
2. Visit https://github.com/O-Agyekum/keighs-corner and select **Add file → Upload files**.
3. Upload the **contents** of the folder into the repository root (not the outer folder). Include `.github/workflows/pages.yml`, `public/assets/kc-monogram.png`, `src/main.tsx`, `data/` and `docs/`. GitHub's browser drag-and-drop supports adding nested folders if dropped from an extracted folder; verify the folder structure in the preview.
4. Commit to `main` only after confirming the path list. The README can be replaced with the included project README; no other existing user files are changed.
5. To preview the static DEMO: Settings → Pages → Source: GitHub Actions. Then Actions → Publish Keighs Corner demo to GitHub Pages → Run workflow. This workflow deliberately does not publish on every push.
6. Ensure all payments are simulations. The demo admin has **no login security**. Do not enter real customer information, mark this a production store or start sending real payments.

## Before going live
Follow `docs/END_TO_END_LAUNCH_CHECKLIST.md`. Customer records, paid checkout, accurate stock and shipping need a secured backend and verified payment webhooks.

## If the GitHub connection becomes available
The storefront can be transferred by API directly; these manual instructions are unnecessary.
