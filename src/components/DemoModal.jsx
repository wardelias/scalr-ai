import React, { useState, useEffect } from 'react';
import { useModal } from '../utils/ModalContext';
import { useLanguage } from '../utils/LanguageContext';

// Values are sent to the CRM in English regardless of the visitor's language
const BUDGET_OPTIONS = [
  { value: 'Not running ads yet', key: 'budget_1' },
  { value: 'Under $5K', key: 'budget_2' },
  { value: '$5K – $10K', key: 'budget_3' },
  { value: '$10K – $30K', key: 'budget_4' },
  { value: '$30K+', key: 'budget_5' },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  ad_spend: '',
  company_url: '' // honeypot, hidden from people
};

export default function DemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useModal();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  // Lock page scroll behind the modal and close it with Escape
  useEffect(() => {
    if (!isDemoModalOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeDemoModal(); };
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [isDemoModalOpen, closeDemoModal]);

  if (!isDemoModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // api/lead.js forwards the lead to GoHighLevel and emails it
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, language: lang }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          closeDemoModal();
          setStatus('idle');
          setFormData(EMPTY_FORM);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeDemoModal}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={closeDemoModal} aria-label="Close">&times;</button>
        <h2 className="modal-title" id="modal-title">{t('nav_book')}</h2>
        
        {status === 'success' ? (
          <div className="modal-success-message fade-up visible">
            <div className="success-icon">✓</div>
            <h3>{t('form_success_title') || 'Success!'}</h3>
            <p>{t('form_success_desc') || 'We will be in touch shortly.'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="demo-form">
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="company_url">Leave this field empty</label>
              <input type="text" id="company_url" name="company_url" value={formData.company_url} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="name">{t('form_name') || 'Name'}</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" autoComplete="name" enterKeyHint="next" />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('form_email') || 'Email'}</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" autoComplete="email" autoCapitalize="none" enterKeyHint="next" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('form_phone') || 'Phone Number'}</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" autoComplete="tel" enterKeyHint="next" />
            </div>
            <div className="form-group">
              <label htmlFor="company">{t('form_company') || 'Company Name'}</label>
              <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className="form-input" autoComplete="organization" enterKeyHint="next" />
            </div>
            <div className="form-group">
              <label htmlFor="website">{t('form_website')} <span className="form-optional">{t('form_optional')}</span></label>
              <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} className="form-input" placeholder="yourstore.com" inputMode="url" autoComplete="url" autoCapitalize="none" autoCorrect="off" spellCheck="false" enterKeyHint="next" />
            </div>
            <div className="form-group">
              <label htmlFor="ad_spend">{t('form_budget')}</label>
              <select id="ad_spend" name="ad_spend" required value={formData.ad_spend} onChange={handleChange} className="form-input form-select">
                <option value="" disabled>{t('form_select')}</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t(opt.key)}</option>
                ))}
              </select>
            </div>
            
            {status === 'error' && (
              <div className="form-error">{t('form_error_msg') || 'There was an error submitting your request. Please try again.'}</div>
            )}
            
            <button type="submit" className="btn-primary btn-block modal-submit-btn" disabled={status === 'submitting'}>
              {status === 'submitting' ? (t('form_submitting') || 'Submitting...') : (t('form_submit') || 'Submit')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
