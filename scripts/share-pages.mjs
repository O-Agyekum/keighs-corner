// Génère, après `vite build`, une petite page HTML par produit dans dist/p/<id>/.
// Les applications de partage (WhatsApp, Instagram, iMessage…) ne lisent que le HTML :
// ces pages portent l’aperçu (titre, photo, prix) du produit, puis renvoient le visiteur
// vers la fiche produit du site (#/product/<id>).
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(join(root, 'src/main.tsx'), 'utf8');
const cfg = readFileSync(join(root, 'src/shopConfig.ts'), 'utf8');
const SITE_URL = (cfg.match(/SITE_URL\s*=\s*'([^']+)'/) || [])[1];
if (!SITE_URL) throw new Error('SITE_URL introuvable dans src/shopConfig.ts');
const m = src.match(/const initialProducts = (\[.*?\]);\n/s);
if (!m) throw new Error('initialProducts introuvable dans src/main.tsx');
const products = JSON.parse(m[1]);
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n) || 0);

let count = 0;
for (const p of products) {
  if (p.published === false) continue;
  const title = `${p.title} — Keigh’s Corner`;
  const desc = `${fmt(p.price)} · ${p.description || p.category}`;
  const url = `${SITE_URL}p/${p.id}/`;
  const target = `../../#/product/${p.id}`;
  const html = `<!doctype html>
<html lang="fr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="robots" content="noindex"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}"/>
<meta property="og:type" content="product"/><meta property="og:site_name" content="Keigh’s Corner"/><meta property="og:locale" content="fr_FR"/>
<meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(desc)}"/>
<meta property="og:url" content="${esc(url)}"/><meta property="og:image" content="${esc(p.image)}"/><meta property="og:image:alt" content="${esc(p.title)}"/>
<meta property="product:price:amount" content="${Number(p.price).toFixed(2)}"/><meta property="product:price:currency" content="EUR"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(title)}"/><meta name="twitter:description" content="${esc(desc)}"/><meta name="twitter:image" content="${esc(p.image)}"/>
<meta http-equiv="refresh" content="0;url=${target}"/>
<script>location.replace(${JSON.stringify(target)});</script>
<style>body{font:15px system-ui,sans-serif;margin:40px;color:#352823}a{color:#693d37}</style>
</head><body><p>${esc(p.title)} — <a href="${target}">ouvrir la fiche produit</a></p></body></html>
`;
  const dir = join(root, 'dist', 'p', p.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  count++;
}
console.log(`share pages: ${count} générées dans dist/p/`);
