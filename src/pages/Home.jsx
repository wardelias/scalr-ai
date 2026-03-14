import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
// Link import removed for single-page layout
import useScrollReveal from '../utils/useScrollReveal';
import InteractiveDemo from '../components/InteractiveDemo';
import Solutions from './Solutions';
import UseCases from './UseCases';
import Pricing from './Pricing';
import About from './About';

export default function Home() {
  const { t } = useLanguage();
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
            <a href="#book" className="btn-primary btn-large">{t('hero_cta_1')}</a>
            <a href="#demo" className="btn-secondary btn-large">
              <span>{t('hero_cta_2')}</span>
              <span className="icon" style={{ display: 'inline-block' }}>{t('hero_cta_icon')}</span>
            </a>
          </div>

          <div className="hero-visual fade-up stagger-4">
            <div className="glass-panel hero-panel">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">{t('hero_calling')}</div>
              </div>
              <div className="mockup-body">
                <div className="waveform-container">
                  <div className="bar"></div><div className="bar"></div><div className="bar"></div>
                  <div className="bar"></div><div className="bar"></div><div className="bar"></div>
                  <div className="bar"></div><div className="bar"></div><div className="bar"></div>
                  <div className="bar"></div><div className="bar"></div><div className="bar"></div>
                </div>
                <p className="mockup-text" dir="rtl">"שלום, תודה שהתקשרת לקליניקה. איך אוכל לעזור?"</p>
              </div>
              <div className="mockup-footer">
                <span className="status-label">
                  <span className="pulse-dot"></span> <span>{t('hero_status')}</span>
                </span>
              </div>
            </div>
            <div className="hero-glow"></div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ─────────────────────────────────── */}
      <section className="stats-banner" ref={statsRef}>
        <div className="container container-wide">
          <div className="banner-grid">
            <div className="banner-item fade-up stagger-1">
              <div className="banner-number">{t('stat_1_num')}</div>
              <div className="banner-text">{t('stat_1_text')}</div>
            </div>
            <div className="banner-item fade-up stagger-2">
              <div className="banner-number">{t('stat_2_num')}</div>
              <div className="banner-text">{t('stat_2_text')}</div>
            </div>
            <div className="banner-item fade-up stagger-3">
              <div className="banner-number">{t('stat_3_num')}</div>
              <div className="banner-text">{t('stat_3_text')}</div>
            </div>
            <div className="banner-item fade-up stagger-4">
              <div className="banner-number">{t('stat_4_num')}</div>
              <div className="banner-text">{t('stat_4_text')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* All sections integrated (they have their own revealRefs now) */}
      <Solutions />
      <UseCases />
      <Pricing />
      <About />

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="final-cta" id="book" ref={ctaRef}>
        <div className="container text-center fade-up">
          <h2>{t('cta_h2')}</h2>
          <p className="section-subtitle">{t('cta_sub')}</p>

          <div className="cta-form glass-panel">
            <a href="#book" className="btn-primary btn-large btn-block">
              <span>{t('btn_book_your')}</span> <span style={{ display: 'inline-block' }}>{t('demo_dir_arrow')}</span>
            </a>
            <div className="cta-alt">
              <span>{t('cta_al')}</span>{' '}
              <a href="tel:+972500000000" className="accent-text" dir="ltr">+972-50-000-0000</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
