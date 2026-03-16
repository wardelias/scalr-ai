import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
// Link import removed for single-page layout
import useScrollReveal from '../utils/useScrollReveal';
import InteractiveDemo from '../components/InteractiveDemo';
import Solutions from './Solutions';
import UseCases from './UseCases';
import Pricing from './Pricing';
import About from './About';

export default function Home() {
  const { t } = useLanguage();
  const { openDemoModal } = useModal();
  const heroRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="container hero-content">
          <div className="badge fade-up">
            <span className="pulse-dot"></span>
            <span>{t('hero_badge')}</span>
          </div>

          <h1 className="fade-up stagger-1">
            <span>{t('hero_h1_1')}</span>{' '}
            <span className="gradient-text">{t('hero_h1_2')}</span>
          </h1>

          <p className="subtitle fade-up stagger-2">{t('hero_sub')}</p>

          <div className="cta-group fade-up stagger-3">
            <a href="#book" onClick={(e) => { e.preventDefault(); openDemoModal(); }} className="btn-primary btn-large">{t('hero_cta_1')}</a>
            <a href="#demo" className="btn-secondary btn-large">
              <span>{t('hero_cta_2')}</span>
              <span className="icon" style={{ display: 'inline-block' }}>{t('hero_cta_icon')}</span>
            </a>
          </div>


        </div>
      </section>



      {/* All sections integrated (they have their own revealRefs now) */}
      <Solutions />
      <UseCases />
      {/* <Pricing /> */}
      <About />

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="final-cta" id="book" ref={ctaRef}>
        <div className="container text-center fade-up">
          <h2>{t('cta_h2')}</h2>
          <p className="section-subtitle">{t('cta_sub')}</p>

          <div className="cta-form glass-panel">
            <a href="#book" onClick={(e) => { e.preventDefault(); openDemoModal(); }} className="btn-primary btn-large btn-block">
              <span>{t('btn_book_your')}</span> <span style={{ display: 'inline-block' }}>{t('demo_dir_arrow')}</span>
            </a>
            <div className="cta-alt" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginTop: '24px' }}>
              <span>{t('cta_al')}</span>
              <a href="tel:+972544799652" className="accent-text" dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                +972-54-479-9652
              </a>
              <a href="https://wa.me/972544799652" target="_blank" rel="noopener noreferrer" className="accent-text" dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
