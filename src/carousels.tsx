// @ts-nocheck
// Carrousels de la page d’accueil (création originale Keigh’s Corner).
import * as React from "react";
import { tr } from "./i18n";

const { useState, useEffect, useRef, useCallback } = React;
import { getLang } from "./i18n";
const PRICE_LOCALE = { fr: 'fr-FR', en: 'en-IE', es: 'es-ES', de: 'de-DE' };
const fmt = n => new Intl.NumberFormat(PRICE_LOCALE[getLang()] || 'fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(Number(n) || 0);
const reducedMotion = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } };

const Arrow = ({ dir }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dir === 'prev' ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}</svg>;

// Grande image d’accueil : une seule photo fixe (la première de la liste, le Mini Handbag - Chocolate).
export function HeroSlides({ slides }) {
  const s = slides[0];
  if (!s) return null;
  return <a className="hero-image" href={'#/product/' + s.id}>
    <img src={s.image} alt={s.title} loading="eager" decoding="async" />
    <div className="hero-image-caption"><span>{tr('LA TOUCHE FINALE')}</span><strong>{tr('Des accessoires à aimer et à porter.')}</strong></div>
  </a>;
}

// Rangée de produits qui défile horizontalement (flèches sur ordinateur, glisser sur téléphone).
export function ProductCarousel({ items, renderItem, label }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => { const t = track.current; if (!t) return; setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 }); };
  useEffect(() => { update(); const t = track.current; if (!t) return; t.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { t.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, [items.length]);
  const scroll = dir => { const t = track.current; if (!t) return; t.scrollBy({ left: dir * t.clientWidth * 0.9, behavior: reducedMotion() ? 'auto' : 'smooth' }); };
  return <div className="kc-carousel" aria-roledescription={tr("carrousel")} aria-label={label}>
    <button type="button" className="kc-car-arrow prev" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Produits précédents"><Arrow dir="prev" /></button>
    <div className="kc-car-track" ref={track} tabIndex={0}>
      {items.map(p => <div className="kc-car-item" key={p.id}>{renderItem(p)}</div>)}
    </div>
    <button type="button" className="kc-car-arrow next" onClick={() => scroll(1)} disabled={edge.end} aria-label="Produits suivants"><Arrow dir="next" /></button>
  </div>;
}

// Bandeau de produits qui défile en continu. On peut l’attraper et le faire glisser
// (avec un léger élan au relâchement) ; il s’arrête au survol de la souris.
// Avec « réduire les animations » activé, il reste immobile et se fait défiler à la main.
export function ProductMarquee({ items, renderItem, label, secondsPerLoop = 45, variant = '' }) {
  const zone = useRef(null), track = useRef(null);
  const still = reducedMotion();
  useEffect(() => {
    const z = zone.current, t = track.current;
    if (!z || !t || still || items.length < 2) return;
    let x = 0, loop = 0, speed = 0, raf = 0, last = performance.now();
    let hover = false, down = false, moved = false, startX = 0, lastX = 0, lastT = 0, fling = 0, visible = true;
    const measure = () => { loop = t.scrollWidth / 2; speed = loop / secondsPerLoop; };
    const wrap = v => { if (!loop) return v; v %= loop; return v > 0 ? v - loop : v; };
    const frame = now => {
      const dt = Math.min((now - last) / 1000, 0.1); last = now;
      if (!down) {
        if (Math.abs(fling) > 5) { x += fling * dt; fling *= Math.pow(0.05, dt); }
        else { fling = 0; if (!hover) x -= speed * dt; }
      }
      x = wrap(x);
      t.style.transform = `translate3d(${x}px,0,0)`;
      raf = visible || down ? requestAnimationFrame(frame) : 0;
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    measure(); start();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(measure) : null; ro?.observe(t);
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; if (visible) start(); }, { rootMargin: '100px 0px' }) : null; io?.observe(z);
    const enter = e => { if (e.pointerType === 'mouse') hover = true; };
    const leave = e => { if (e.pointerType === 'mouse') hover = false; };
    const pdown = e => { if (e.button !== 0) return; down = true; moved = false; startX = lastX = e.clientX; lastT = performance.now(); fling = 0; start(); };
    const pmove = e => {
      if (!down) return;
      const dx = e.clientX - lastX, now = performance.now();
      if (!moved && Math.abs(e.clientX - startX) > 6) { moved = true; z.setPointerCapture?.(e.pointerId); z.classList.add('dragging'); }
      if (moved) { x = wrap(x + dx); fling = dx / Math.max((now - lastT) / 1000, 0.008); }
      lastX = e.clientX; lastT = now;
    };
    const pup = () => { if (!down) return; down = false; z.classList.remove('dragging'); if (performance.now() - lastT > 80) fling = 0; fling = Math.max(-3000, Math.min(3000, fling)); };
    // Empêche d’ouvrir un produit quand on vient de faire glisser le bandeau.
    const click = e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    z.addEventListener('pointerenter', enter); z.addEventListener('pointerleave', leave);
    z.addEventListener('pointerdown', pdown); z.addEventListener('pointermove', pmove);
    z.addEventListener('pointerup', pup); z.addEventListener('pointercancel', pup);
    z.addEventListener('click', click, true);
    return () => {
      cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect();
      z.removeEventListener('pointerenter', enter); z.removeEventListener('pointerleave', leave);
      z.removeEventListener('pointerdown', pdown); z.removeEventListener('pointermove', pmove);
      z.removeEventListener('pointerup', pup); z.removeEventListener('pointercancel', pup);
      z.removeEventListener('click', click, true);
    };
  }, [items.length, still, secondsPerLoop]);
  const list = still ? items : [...items, ...items];
  return <div className={'kc-marquee' + (variant ? ' ' + variant : '') + (still ? ' still' : '')} ref={zone} aria-roledescription={tr("carrousel")} aria-label={label}>
    <div className="kc-marquee-track" ref={track}>
      {list.map((p, k) => <div className="kc-marquee-item" key={p.id + '-' + k} aria-hidden={k >= items.length ? true : undefined}>{renderItem(p, k >= items.length)}</div>)}
    </div>
  </div>;
}

// Bande « galerie » : tuiles portrait arrondies (photos ou vidéos courtes) qui défilent en continu.
// Chaque tuile mène à la fiche produit. Les vidéos ne se chargent qu’à l’écran et restent muettes.
export function GalleryStrip({ tiles, title, subtitle }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; if (!root || reducedMotion()) return;
    const vids = [...root.querySelectorAll('video[data-src]')]; if (!vids.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play?.().catch(() => {}); } else v.pause?.(); }), { rootMargin: '150px 200px' });
    vids.forEach(v => io.observe(v)); return () => io.disconnect();
  }, [tiles.length]);
  if (!tiles.length) return null;
  return <section className="kc-gallery" ref={ref}>
    {(title || subtitle) && <div className="kc-gallery-head">{title && <h2>{title}</h2>}{subtitle && <p>{subtitle}</p>}</div>}
    <ProductMarquee variant="kc-gallery-row" label={title || 'Galerie'} items={tiles} secondsPerLoop={Math.max(30, tiles.length * 4)}
      renderItem={(t, copy) => <a className="kc-tile" href={'#/product/' + t.id} tabIndex={copy ? -1 : undefined} draggable={false} aria-label={t.caption}>
        {t.video ? <video muted loop playsInline preload="none" poster={t.image} data-src={t.video} aria-hidden="true" /> : <img src={t.image} alt="" loading="lazy" decoding="async" draggable={false} />}
        {t.caption && <span className="kc-tile-caption">{t.caption}</span>}
      </a>} />
  </section>;
}
