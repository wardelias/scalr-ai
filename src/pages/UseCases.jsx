import React, { useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import useScrollReveal from '../utils/useScrollReveal';

const CASES = [
  { icon: '🩺', h: 'c1_h', p: 'c1_p' },
  { icon: '✨', h: 'c2_h', p: 'c2_p' },
  { icon: '🏢', h: 'c3_h', p: 'c3_p' },
  { icon: '🌍', h: 'c4_h', p: 'c4_p' },
  { icon: '⚖️', h: 'c5_h', p: 'c5_p' },
  { icon: '🚗', h: 'c6_h', p: 'c6_p' },
];

export default function UseCases() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + CASES.length) % CASES.length);
  const next = () => setActive(i => (i + 1) % CASES.length);

  return (
    <div id="use-cases" ref={revealRef}>
      <section className="use-cases">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('cases_label')}</span>
            <h2>{t('cases_h2')}</h2>
          </div>

          {/* ── Desktop grid ──────────────────────────────── */}
          <div className="cases-grid-desktop">
            {CASES.map((c, i) => (
              <div key={i} className="case-card glass-panel">
                <div className="case-icon">{c.icon}</div>
                <h3>{t(c.h)}</h3>
                <p>{t(c.p)}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
            ))}
          </div>

          {/* ── Mobile slider ─────────────────────────────── */}
          <div className="cases-slider">
            <div className="cases-slider-track">
              {CASES.map((c, i) => (
                <div
                  key={i}
                  className={`cases-slide ${i === active ? 'active' : i === (active - 1 + CASES.length) % CASES.length ? 'prev' : 'next'}`}
                >
                  <div className="case-card glass-panel">
                    <div className="case-icon">{c.icon}</div>
                    <h3>{t(c.h)}</h3>
                    <p>{t(c.p)}</p>
                    <a href="#book" className="learn-more">
                      <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="cases-slider-controls">
              <button className="slider-arrow" onClick={prev} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div className="slider-dots">
                {CASES.map((_, i) => (
                  <button
                    key={i}
                    className={`slider-dot ${i === active ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button className="slider-arrow" onClick={next} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
