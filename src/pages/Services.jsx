import React, { useState, useRef } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
import useScrollReveal from '../utils/useScrollReveal';

const SERVICES = [
  { icon: '🎯', h: 'svc_1_h', p: 'svc_1_p' },
  { icon: '🎬', h: 'svc_2_h', p: 'svc_2_p' },
  { icon: '📊', h: 'svc_3_h', p: 'svc_3_p' },
  { icon: '🛒', h: 'svc_4_h', p: 'svc_4_p' },
  { icon: '✉️', h: 'svc_5_h', p: 'svc_5_p' },
  { icon: '🚀', h: 'svc_6_h', p: 'svc_6_p' },
];

export default function Services() {
  const { t } = useLanguage();
  const { openDemoModal } = useModal();
  const revealRef = useScrollReveal();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // On mobile the grid becomes a swipeable scroll-snap row; keep the dots in sync with it
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  };

  const goTo = (i) => {
    const track = trackRef.current;
    const card = track?.children[(i + SERVICES.length) % SERVICES.length];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <div id="services" ref={revealRef}>
      <section className="use-cases">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('svc_label')}</span>
            <h2>{t('svc_h2')}</h2>
          </div>

          <div className="cases-grid" ref={trackRef} onScroll={handleScroll}>
            {SERVICES.map((s) => (
              <article key={s.h} className="case-card glass-panel">
                <div className="case-icon" aria-hidden="true">{s.icon}</div>
                <h3>{t(s.h)}</h3>
                <p>{t(s.p)}</p>
                <a href="#book" className="learn-more" onClick={(e) => { e.preventDefault(); openDemoModal(); }}>
                  <span>{t('svc_cta')}</span> <span aria-hidden="true">{t('demo_dir_arrow')}</span>
                </a>
              </article>
            ))}
          </div>

          {/* ── Mobile carousel controls ──────────────────── */}
          <div className="cases-slider-controls">
            <button className="slider-arrow" onClick={() => goTo(active - 1)} aria-label="Previous service">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="slider-dots">
              {SERVICES.map((s, i) => (
                <button
                  key={s.h}
                  className={`slider-dot ${i === active ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                />
              ))}
            </div>
            <button className="slider-arrow" onClick={() => goTo(active + 1)} aria-label="Next service">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
