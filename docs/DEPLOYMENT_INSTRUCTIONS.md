# Fix GitHub Pages for Keigh’s Corner (React source)

GitHub URL: https://github.com/O-Agyekum/keighs-corner

## WHY THE SITE WAS BLANK
After the first browser upload, the `src/`, `public/`, `docs/`, `data/` and `.github/` folders were missing from the repository. GitHub Pages published the Vite SOURCE `index.html` without building it. The source HTML imports `/src/main.tsx`, which a static GitHub Pages site cannot compile.

## CORRECT UPLOAD
1. Download and EXTRACT this ZIP locally (do not upload the ZIP file itself).
2. On GitHub use Add file -> Upload files. **Drag the extracted files AND WHOLE FOLDERS** from the Windows File Explorer into the upload zone. A 'Choose files' picker can omit folders.
3. Confirm the upload queue contains exactly these nested paths BEFORE committing:
   - `src/main.tsx`
   - `public/style.css`
   - `public/favicon.png`
   - `public/assets/kc-monogram.png`
   - `data/shopify_catalogue_public.json`
   - `.github/workflows/pages.yml`
4. Commit changes to `main`. Keep the root `index.html` from this React ZIP, not the quick standalone demo `index.html`.
5. Verify each folder appears as a folder on the repository main page. If `.github` did not upload, open https://github.com/O-Agyekum/keighs-corner/new/main, enter the filename `.github/workflows/pages.yml`, paste the YAML from the workflow included here, and commit.
6. Go to Settings -> Pages -> Build and deployment -> Source: GitHub Actions.
7. Go to Actions -> Deploy Keighs Corner demo to GitHub Pages; wait for BUILD AND DEPLOY to complete successfully, then use the URL from Settings -> Pages. If an error occurs, open the failed job logs to see which step failed.

## SAFETY
This is only a demonstration. The seller admin is public, quantities are fictitious, and payments/shipments are simulated. It does not support real customers or card payments. It requires a secure backend before a real business launch.

If you only want the site to appear now without a build, upload the separate Quick_Blank_Page_Fix/index.html instead, and use Pages 'Deploy from a branch / main / (root)' rather than GitHub Actions. Choose ONE publishing method at a time.
