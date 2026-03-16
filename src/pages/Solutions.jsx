import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
import InteractiveDemo from '../components/InteractiveDemo';
import useScrollReveal from '../utils/useScrollReveal';

export default function Solutions() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div id="solutions" ref={revealRef}>
      <section className="pain-points">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('prob_label')}</span>
            <h2>{t('prob_h2')}</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-card glass-panel fade-up stagger-1">
              <div className="stat-icon">⏱</div>
              <div className="stat-number">78%</div>
              <p>{t('prob_1')}</p>
            </div>
            <div className="stat-card glass-panel fade-up stagger-2">
              <div className="stat-icon">📵</div>
              <div className="stat-number">{t('prob_2_num')}</div>
              <p>{t('prob_2')}</p>
            </div>
            <div className="stat-card glass-panel fade-up stagger-3">
              <div className="stat-icon">🔄</div>
              <div className="stat-number">{t('prob_3_num')}</div>
              <p>{t('prob_3')}</p>
            </div>
            <div className="stat-card glass-panel fade-up stagger-4">
              <div className="stat-icon">🌙</div>
              <div className="stat-number">{t('prob_4_num')}</div>
              <p>{t('prob_4')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="solution">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('sol_label')}</span>
            <h2>{t('sol_h2')}</h2>
            <p className="section-subtitle">{t('sol_sub')}</p>
          </div>

          <div className="flow-diagram">
            <div className="flow-step glass-panel fade-up stagger-1">
              <div className="step-icon">💬</div>
              <h3>{t('sol_s1_h')}</h3>
              <p>{t('sol_s1_p')}</p>
            </div>
            <div className="flow-connector fade-up stagger-2"></div>
            <div className="flow-step glass-panel fade-up stagger-3">
              <div className="step-icon">🧠 <span className="floating-text" dir="rtl">שלום</span></div>
              <h3>{t('sol_s2_h')}</h3>
              <p>{t('sol_s2_p')}</p>
            </div>
            <div className="flow-connector fade-up stagger-4"></div>
            <div className="flow-step glass-panel fade-up stagger-5">
              <div className="step-icon">📅</div>
              <h3>{t('sol_s3_h')}</h3>
              <p>{t('sol_s3_p')}</p>
            </div>
          </div>
        </div>
      </section>
      <InteractiveDemo />
    </div>
  );
}
