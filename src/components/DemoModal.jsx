import React, { useState } from 'react';
import { useModal } from '../utils/ModalContext';
import { useLanguage } from '../utils/LanguageContext';

export default function DemoModal() {
  const { isDemoModalOpen, closeDemoModal } = useModal();
  const { t, currentLang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  if (!isDemoModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // GHL Webhook URL provided by user
    const webhookUrl = 'https://services.leadconnectorhq.com/hooks/5mx08gT5SXJptjzoBMQ9/webhook-trigger/36aa89fe-2406-45f1-8418-c7fa4c1203c5';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          closeDemoModal();
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', company: '' });
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
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} dir={currentLang === 'he' || currentLang === 'ar' ? 'rtl' : 'ltr'}>
        <button className="modal-close" onClick={closeDemoModal}>&times;</button>
        <h2 className="modal-title">{t('nav_book')}</h2>
        
        {status === 'success' ? (
          <div className="modal-success-message fade-up visible">
            <div className="success-icon">✓</div>
            <h3>{t('form_success_title') || 'Success!'}</h3>
            <p>{t('form_success_desc') || 'We will be in touch shortly.'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="demo-form">
            <div className="form-group">
              <label htmlFor="name">{t('form_name') || 'Name'}</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('form_email') || 'Email'}</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('form_phone') || 'Phone Number'}</label>
              <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" dir="ltr" />
            </div>
            <div className="form-group">
              <label htmlFor="company">{t('form_company') || 'Company Name'}</label>
              <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className="form-input" />
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
