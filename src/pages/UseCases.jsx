import React from 'react';
import { useLanguage } from '../utils/LanguageContext';
// Link import removed for single-page layout
import useScrollReveal from '../utils/useScrollReveal';

export default function UseCases() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <div id="use-cases" ref={revealRef}>
      <section className="use-cases">
        <div className="container">
          <div className="section-header text-center fade-up">
            <span className="section-label">{t('cases_label')}</span>
            <h2>{t('cases_h2')}</h2>
          </div>

          <div className="cases-carousel-wrapper">
            <button className="carousel-btn prev" onClick={(e) => {
              const el = e.target.closest('.cases-carousel-wrapper').querySelector('.cases-carousel');
              el.scrollBy({ left: -300, behavior: 'smooth' });
            }}>
              &lt;
            </button>

            <div className="cases-carousel">
              <div className="case-card glass-panel fade-up stagger-1">
                <div className="case-icon">🩺</div>
                <h3>{t('c1_h')}</h3>
                <p>{t('c1_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
              <div className="case-card glass-panel fade-up stagger-2">
                <div className="case-icon">✨</div>
                <h3>{t('c2_h')}</h3>
                <p>{t('c2_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
              <div className="case-card glass-panel fade-up stagger-3">
                <div className="case-icon">🏢</div>
                <h3>{t('c3_h')}</h3>
                <p>{t('c3_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
              <div className="case-card glass-panel fade-up stagger-4">
                <div className="case-icon">🌍</div>
                <h3>{t('c4_h')}</h3>
                <p>{t('c4_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
              <div className="case-card glass-panel fade-up stagger-5">
                <div className="case-icon">⚖️</div>
                <h3>{t('c5_h')}</h3>
                <p>{t('c5_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
              <div className="case-card glass-panel fade-up stagger-6">
                <div className="case-icon">🚗</div>
                <h3>{t('c6_h')}</h3>
                <p>{t('c6_p')}</p>
                <a href="#book" className="learn-more">
                  <span>{t('learn_more')}</span> <span>{t('demo_dir_arrow')}</span>
                </a>
              </div>
            </div>

            <button className="carousel-btn next" onClick={(e) => {
              const el = e.target.closest('.cases-carousel-wrapper').querySelector('.cases-carousel');
              el.scrollBy({ left: 300, behavior: 'smooth' });
            }}>
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
