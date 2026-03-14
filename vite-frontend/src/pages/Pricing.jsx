import React, { useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const { t, currentLang } = useLanguage();

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }, [currentLang]);

  return (
    <section className="pricing" id="pricing" style={{ paddingTop: '180px' }}>
      <div className="container">
        <div className="section-header text-center fade-up">
          <span className="section-label">{t('price_label')}</span>
          <h2>{t('price_h2')}</h2>
          <p className="section-subtitle">{t('price_sub')}</p>
        </div>

        <div className="pricing-grid">
          {/* Starter */}
          <div className="pricing-card glass-panel fade-up stagger-1">
            <div className="pricing-header">
              <h3>{t('p1_h')}</h3>
              <p className="pricing-desc">{t('p1_sub')}</p>
              <div className="price">
                <span className="currency">₪</span>
                <span className="amount">1,200</span>
                <span className="period">{t('p_mo')}</span>
              </div>
              <p className="setup-fee">{t('p1_setup')}</p>
            </div>
            <ul className="features-list">
              <li><span className="check">✓</span> <span>{t('p1_f1')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f2')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f3')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f4')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f5')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f6')}</span></li>
              <li><span className="check">✓</span> <span>{t('p1_f7')}</span></li>
            </ul>
            <div className="pricing-footer">
              <Link to="/book" className="btn-secondary btn-block">{t('p_get')}</Link>
            </div>
          </div>

          {/* Growth */}
          <div className="pricing-card glass-panel recommended fade-up stagger-2">
            <div className="recommended-badge">{t('p_popular')}</div>
            <div className="pricing-header">
              <h3>{t('p2_h')}</h3>
              <p className="pricing-desc">{t('p2_sub')}</p>
              <div className="price">
                <span className="currency">₪</span>
                <span className="amount">2,500</span>
                <span className="period">{t('p_mo')}</span>
              </div>
              <p className="setup-fee">{t('p2_setup')}</p>
            </div>
            <ul className="features-list">
              <li><span className="check">✓</span> <strong>{t('p2_f1')}</strong></li>
              <li><span className="check">✓</span> <span>{t('p2_f2')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f3')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f4')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f5')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f6')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f7')}</span></li>
              <li><span className="check">✓</span> <span>{t('p2_f8')}</span></li>
            </ul>
            <div className="pricing-footer">
              <Link to="/book" className="btn-primary btn-block">{t('hero_cta_1')}</Link>
            </div>
          </div>

          {/* Premium */}
          <div className="pricing-card glass-panel fade-up stagger-3">
            <div className="pricing-header">
              <h3>{t('p3_h')}</h3>
              <p className="pricing-desc">{t('p3_sub')}</p>
              <div className="price">
                <span className="currency">₪</span>
                <span className="amount">4,500</span>
                <span className="period">{t('p_mo')}</span>
              </div>
              <p className="setup-fee">{t('p3_setup')}</p>
            </div>
            <ul className="features-list">
              <li><span className="check">✓</span> <strong>{t('p3_f1')}</strong></li>
              <li><span className="check">✓</span> <span>{t('p3_f2')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f3')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f4')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f5')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f6')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f7')}</span></li>
              <li><span className="check">✓</span> <span>{t('p3_f8')}</span></li>
            </ul>
            <div className="pricing-footer">
              <Link to="/book" className="btn-secondary btn-block">{t('p_contact')}</Link>
            </div>
          </div>
        </div>

        <p className="pricing-disclaimer text-center fade-up stagger-4">{t('p_disc')}</p>
      </div>
    </section>
  );
}
