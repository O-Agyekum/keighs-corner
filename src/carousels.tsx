// @ts-nocheck
// Carrousels de la page d’accueil (création originale Keigh’s Corner).
import * as React from "react";

const { useState, useEffect, useRef, useCallback } = React;
const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(Number(n) || 0);
const reducedMotion = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } };

const Arrow = ({ dir }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dir === 'prev' ? <path d="m15 6-6 6 6 6" /> : <path d="m9 6 6 6-6 6" />}</svg>;

// Diaporama de la grande image d’accueil : défilement automatique, flèches, points, glisser au doigt.
export function HeroSlides({ slides, interval = 5000 }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const n = slides.length;
  const go = useCallback(k => setI(((k % n) + n) % n), [n]);
  useEffect(() => {
    if (paused || n < 2 || reducedMotion()) return;
    const t = setTimeout(() => go(i + 1), interval);
    return () => clearTimeout(t);
  }, [i, paused, n, interval, go]);
  if (!n) return null;
  return <div className="hero-image kc-hero-slides" aria-roledescription="carrousel" aria-label="Pièces à la une"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    onTouchStart={e => { touch.current = e.touches[0].clientX; setPaused(true); }}
    onTouchEnd={e => { const d = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); touch.current = null; setPaused(false); }}>
    {slides.map((s, k) => <a key={s.id} href={'#/product/' + s.id} className={'kc-hero-slide' + (k === i ? ' active' : '')}
      aria-hidden={k !== i} tabIndex={k === i ? 0 : -1} aria-roledescription="diapositive" aria-label={`${k + 1} sur ${n} : ${s.title}`}>
      <img src={s.image} alt={s.title} loading={k === 0 ? 'eager' : 'lazy'} decoding="async" />
      <div className="hero-image-caption"><span>{s.eyebrow}</span><strong>{s.title}</strong><small>{fmt(s.price)} · Découvrir →</small></div>
    </a>)}
    {n > 1 && <>
      <button type="button" className="kc-car-arrow prev" onClick={() => go(i - 1)} aria-label="Diapositive précédente"><Arrow dir="prev" /></button>
      <button type="button" className="kc-car-arrow next" onClick={() => go(i + 1)} aria-label="Diapositive suivante"><Arrow dir="next" /></button>
      <div className="kc-dots">{slides.map((s, k) => <button type="button" key={s.id} className={k === i ? 'active' : ''} onClick={() => go(k)} aria-label={'Afficher ' + s.title} aria-current={k === i} />)}</div>
    </>}
  </div>;
}

// Rangée de produits qui défile horizontalement (flèches sur ordinateur, glisser sur téléphone).
export function ProductCarousel({ items, renderItem, label }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => { const t = track.current; if (!t) return; setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 }); };
  useEffect(() => { update(); const t = track.current; if (!t) return; t.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { t.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, [items.length]);
  const scroll = dir => { const t = track.current; if (!t) return; t.scrollBy({ left: dir * t.clientWidth * 0.9, behavior: reducedMotion() ? 'auto' : 'smooth' }); };
  return <div className="kc-carousel" aria-roledescription="carrousel" aria-label={label}>
    <button type="button" className="kc-car-arrow prev" onClick={() => scroll(-1)} disabled={edge.start} aria-label="Produits précédents"><Arrow dir="prev" /></button>
    <div className="kc-car-track" ref={track} tabIndex={0}>
      {items.map(p => <div className="kc-car-item" key={p.id}>{renderItem(p)}</div>)}
    </div>
    <button type="button" className="kc-car-arrow next" onClick={() => scroll(1)} disabled={edge.end} aria-label="Produits suivants"><Arrow dir="next" /></button>
  </div>;
}
