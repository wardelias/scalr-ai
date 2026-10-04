import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
// Link import removed for single-page layout
import useScrollReveal from '../utils/useScrollReveal';

const PLANS = [
  { id: 'p1', amount: '3,500', features: 5, cta: 'p_get' },
  { id: 'p2', amount: '6,500', features: 6, cta: 'p_get', recommended: true },
  { id: 'p3', amount: '12,000', features: 6, cta: 'p_contact' },
];

export default function Pricing() {
  const { t } = useLanguage();
  const { openDemoModal } = useModal();
  const revealRef = useScrollReveal();

  return (
    <div id="pricing" ref={revealRef}>
      <section className="pricing">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('price_label')}</span>
            <h2>{t('price_h2')}</h2>
            <p className="section-subtitle">{t('price_sub')}</p>
          </div>

          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className={`pricing-card glass-panel${plan.recommended ? ' recommended' : ''} fade-up stagger-${i + 1}`}>
                {plan.recommended && <div className="recommended-badge">{t('p_popular')}</div>}
                <div className="pricing-header">
                  <h3>{t(`${plan.id}_h`)}</h3>
                  <p className="pricing-desc">{t(`${plan.id}_sub`)}</p>
                  <div className="price">
                    <span className="currency">₪</span>
                    <span className="amount">{plan.amount}</span>
                    <span className="period">{t('p_mo')}</span>
                  </div>
                  <p className="setup-fee">{t(`${plan.id}_setup`)}</p>
                </div>
                <ul className="features-list">
                  {Array.from({ length: plan.features }, (_, f) => {
                    const label = t(`${plan.id}_f${f + 1}`);
                    // "Everything in X, plus:" is the first line on upper tiers
                    const isHeading = f === 0 && plan.id !== 'p1';
                    return (
                      <li key={f}>
                        <span className="check">✓</span> {isHeading ? <strong>{label}</strong> : <span>{label}</span>}
                      </li>
                    );
                  })}
                </ul>
                <div className="pricing-footer">
                  <a
                    href="#book"
                    onClick={(e) => { e.preventDefault(); openDemoModal(); }}
                    className={`${plan.recommended ? 'btn-primary' : 'btn-secondary'} btn-block`}
                  >
                    {t(plan.cta)}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="pricing-disclaimer text-center fade-up stagger-4">{t('p_disc')}</p>
        </div>
      </section>
    </div>
  );
}
