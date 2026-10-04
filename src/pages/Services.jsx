import React, { useState } from 'react';
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
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + SERVICES.length) % SERVICES.length);
  const next = () => setActive(i => (i + 1) % SERVICES.length);

  const renderCard = (s) => (
    <div className="case-card glass-panel">
      <div className="case-icon">{s.icon}</div>
      <h3>{t(s.h)}</h3>
      <p>{t(s.p)}</p>
      <a href="#book" className="learn-more" onClick={(e) => { e.preventDefault(); openDemoModal(); }}>
        <span>{t('svc_cta')}</span> <span>{t('demo_dir_arrow')}</span>
      </a>
    </div>
  );

  return (
    <div id="services" ref={revealRef}>
      <section className="use-cases">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('svc_label')}</span>
            <h2>{t('svc_h2')}</h2>
          </div>

          {/* ── Desktop grid ──────────────────────────────── */}
          <div className="cases-grid-desktop">
            {SERVICES.map((s, i) => (
              <React.Fragment key={i}>{renderCard(s)}</React.Fragment>
            ))}
          </div>

          {/* ── Mobile slider ─────────────────────────────── */}
          <div className="cases-slider">
            <div className="cases-slider-track">
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className={`cases-slide ${i === active ? 'active' : i === (active - 1 + SERVICES.length) % SERVICES.length ? 'prev' : 'next'}`}
                >
                  {renderCard(s)}
                </div>
              ))}
            </div>

            <div className="cases-slider-controls">
              <button className="slider-arrow" onClick={prev} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div className="slider-dots">
                {SERVICES.map((_, i) => (
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
