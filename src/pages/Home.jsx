import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { Link } from 'react-router-dom';
import useScrollReveal from '../utils/useScrollReveal';

export default function Home() {
  const { t } = useLanguage();
  const pageRef = useScrollReveal();

  return (
    <div ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" id="home">
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
            <Link to="/book" className="btn-primary btn-large">{t('hero_cta_1')}</Link>
            <Link to="/solutions#demo" className="btn-secondary btn-large">
              <span>{t('hero_cta_2')}</span>
              <span className="icon" style={{ display: 'inline-block' }}>{t('hero_cta_icon')}</span>
            </Link>
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
      <section className="stats-banner">
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

      {/* ── Problem / Pain Points ────────────────────────── */}
      <section className="pain-points">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">{t('prob_label')}</span>
            <h2>{t('prob_h2')}</h2>
          </div>
          <div className="stats-grid">
            <div className="glass-panel stat-card fade-up stagger-1">
              <div className="stat-icon">⏱️</div>
              <div className="stat-number">78%</div>
              <p>{t('prob_1')}</p>
            </div>
            <div className="glass-panel stat-card fade-up stagger-2">
              <div className="stat-icon">💸</div>
              <div className="stat-number">{t('prob_2_num')}</div>
              <p>{t('prob_2')}</p>
            </div>
            <div className="glass-panel stat-card fade-up stagger-3">
              <div className="stat-icon">🔄</div>
              <div className="stat-number">{t('prob_3_num')}</div>
              <p>{t('prob_3')}</p>
            </div>
            <div className="glass-panel stat-card fade-up stagger-4">
              <div className="stat-icon">📅</div>
              <div className="stat-number">{t('prob_4_num')}</div>
              <p>{t('prob_4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution Flow ─────────────────────────────────── */}
      <section className="solution">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">{t('sol_label')}</span>
            <h2>{t('sol_h2')}</h2>
            <p className="section-subtitle">{t('sol_sub')}</p>
          </div>
          <div className="flow-diagram">
            <div className="glass-panel flow-step fade-up stagger-1">
              <div className="step-icon">
                📱
                <span className="floating-text">WhatsApp</span>
              </div>
              <h3>{t('sol_s1_h')}</h3>
              <p>{t('sol_s1_p')}</p>
            </div>
            <div className="flow-connector"></div>
            <div className="glass-panel flow-step fade-up stagger-2">
              <div className="step-icon">
                🤖
                <span className="floating-text">AI</span>
              </div>
              <h3>{t('sol_s2_h')}</h3>
              <p>{t('sol_s2_p')}</p>
            </div>
            <div className="flow-connector"></div>
            <div className="glass-panel flow-step fade-up stagger-3">
              <div className="step-icon">
                📆
                <span className="floating-text">✓</span>
              </div>
              <h3>{t('sol_s3_h')}</h3>
              <p>{t('sol_s3_p')}</p>
            </div>
          </div>
          <div className="text-center fade-up" style={{ marginTop: '48px' }}>
            <Link to="/solutions" className="btn-primary btn-large">{t('nav_solutions')} →</Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="final-cta">
        <div className="container text-center fade-up">
          <h2>{t('cta_h2')}</h2>
          <p className="section-subtitle">{t('cta_sub')}</p>

          <div className="cta-form glass-panel">
            <Link to="/book" className="btn-primary btn-large btn-block">
              <span>{t('btn_book_your')}</span> <span>{t('demo_dir_arrow')}</span>
            </Link>
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
