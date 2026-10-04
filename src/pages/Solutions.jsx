import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import useScrollReveal from '../utils/useScrollReveal';

const PROBLEMS = [
  { icon: '⏳', num: 'prob_1_num', p: 'prob_1' },
  { icon: '🔍', num: 'prob_2_num', p: 'prob_2' },
  { icon: '💸', num: 'prob_3_num', p: 'prob_3' },
  { icon: '🤷', num: 'prob_4_num', p: 'prob_4' },
];

export default function Solutions() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div id="solutions" ref={revealRef}>
      <section className="pain-points">
        <div className="orb orb-blue orb-sol-1" aria-hidden="true" />
        <div className="orb orb-cyan orb-sol-2" aria-hidden="true" />
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('prob_label')}</span>
            <h2>{t('prob_h2')}</h2>
          </div>

          <div className="stats-grid">
            {PROBLEMS.map((item, i) => (
              <div key={item.num} className={`stat-card glass-panel fade-up stagger-${i + 1}`}>
                <div className="stat-icon">{item.icon}</div>
                <div className="stat-number" dir="auto">{t(item.num)}</div>
                <p>{t(item.p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution" id="method">
        <div className="orb orb-indigo orb-sol-1" aria-hidden="true" />
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('sol_label')}</span>
            <h2>{t('sol_h2')}</h2>
            <p className="section-subtitle">{t('sol_sub')}</p>
          </div>

          <div className="flow-diagram">
            <div className="flow-step glass-panel fade-up stagger-1">
              <div className="step-icon">🔎</div>
              <h3>{t('sol_s1_h')}</h3>
              <p>{t('sol_s1_p')}</p>
            </div>
            <div className="flow-connector fade-up stagger-2"></div>
            <div className="flow-step glass-panel fade-up stagger-3">
              <div className="step-icon">🎬 <span className="floating-text" dir="ltr">{t('sol_floating_text')}</span></div>
              <h3>{t('sol_s2_h')}</h3>
              <p>{t('sol_s2_p')}</p>
            </div>
            <div className="flow-connector fade-up stagger-4"></div>
            <div className="flow-step glass-panel fade-up stagger-5">
              <div className="step-icon">📈</div>
              <h3>{t('sol_s3_h')}</h3>
              <p>{t('sol_s3_p')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
