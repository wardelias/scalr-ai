import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import useScrollReveal from '../utils/useScrollReveal';

const demoDataAr = {
    dental: {
        whatsapp: [
            { sender: 'lead', text: 'مرحباً، أبحث عن طبيب أسنان لعلاج العصب', time: '10:02' },
            { sender: 'ai', text: 'أهلاً بك! 😊 بالتأكيد، يمكننا المساعدة. لدينا متخصصون في علاج العصب. هل يمكنني طرح بعض الأسئلة السريعة؟', time: '10:02' },
            { sender: 'lead', text: 'نعم بالتأكيد', time: '10:03' },
            { sender: 'ai', text: 'ممتاز. هل تشعر بألم حالياً أم أنه إجراء مخطط له؟', time: '10:03' },
            { sender: 'lead', text: 'أشعر بالألم منذ أسبوع', time: '10:04' },
            { sender: 'ai', text: 'أفهم ذلك، من المهم معالجته بسرعة. لدينا موعد متاح غداً في الساعة 10:00 مع الدكتور سمير. هل يناسبك؟', time: '10:04' },
            { sender: 'lead', text: 'نعم، ممتاز', time: '10:05' },
            { sender: 'ai', text: 'رائع! ✅ تم تأكيد الموعد. ستصلك رسالة تذكير غداً صباحاً. أتمنى لك الشفاء العاجل! 🙏', time: '10:05' }
        ],
        phoneLang: 'العربية',
        phoneTranscript: '"مرحباً، شكراً لاتصالك بمركز طب الأسنان. أنا المساعدة الرقمية. كيف يمكنني مساعدتك؟... فهمت أنك تعاني من الألم، دعنا نجد لك موعداً عاجلاً..."',
        duration: '0:34'
    },
    beauty: {
        whatsapp: [
            { sender: 'lead', text: 'مرحباً، كم تكلفة تمليس الشعر؟', time: '14:15' },
            { sender: 'ai', text: 'أهلاً بك! 😊 يبدأ التمليس لدينا من 350 شيكل للشعر القصير و550 شيكل للشعر الطويل. ما هو طول شعرك؟', time: '14:15' },
            { sender: 'lead', text: 'طويل، تحت الأكتاف', time: '14:16' },
            { sender: 'ai', text: 'جميل! تمليس الشعر الطويل بـ 550 شيكل ويستغرق حوالي 3 ساعات. لدينا موعد متاح يوم الثلاثاء الساعة 11:00 أو الخميس الساعة 14:00. ما الذي يناسبك؟', time: '14:16' },
            { sender: 'lead', text: 'الخميس من فضلك', time: '14:18' },
            { sender: 'ai', text: 'ممتاز! ✅ تم حجز موعدك يوم الخميس الساعة 14:00 مع ليلى. يرجى القدوم بشعر جاف. نراك قريباً! 💇‍♀️', time: '14:18' }
        ],
        phoneLang: 'العربية',
        phoneTranscript: '"مرحباً، لقد وصلت إلى ستوديو الجمال. يسعدني مساعدتك في حجز موعد. ما هو الإجراء الذي يهمك؟..."',
        duration: '0:42'
    },
    realestate: {
        whatsapp: [
            { sender: 'lead', text: 'مرحباً، رأيت الشقة في حيفا. هل لا تزال متاحة؟', time: '09:30' },
            { sender: 'ai', text: 'أهلاً بك! نعم، الشقة في شارع الاستقلال لا تزال متاحة. 4 غرف، طابق 3، شرفة مشمسة. السعر 2,850,000 شيكل. هل ترغب في حجز جولة؟', time: '09:30' },
            { sender: 'lead', text: 'نعم، ما هي الميزانية المطلوبة؟', time: '09:32' },
            { sender: 'ai', text: 'هذه الشقة بـ 2,850,000 شيكل. لدينا أيضاً خيارات تبدأ من 2,200,000 في المنطقة. ما هي ميزانيتك التقريبية؟', time: '09:32' },
            { sender: 'lead', text: 'حتى 2.5', time: '09:35' },
            { sender: 'ai', text: 'ممتاز، لدي 3 شقق مناسبة. هل يمكننا تحديد موعد للجولة يوم الجمعة صباحاً؟', time: '09:35' },
            { sender: 'lead', text: 'يناسبني', time: '09:38' },
            { sender: 'ai', text: '✅ تم حجز الجولة يوم الجمعة الساعة 10:00. سأرسل لك العناوين في رسالة منفصلة. إلى اللقاء!', time: '09:38' }
        ],
        phoneLang: 'العربية',
        phoneTranscript: '"مرحباً، شكراً لاتصالك. كيف يمكنني مساعدتك؟... لدينا شقق في المنطقة التي تبحث عنها..."',
        duration: '1:15'
    },
    medical: {
        whatsapp: [
            { sender: 'lead', text: 'مرحباً، أبحث عن زراعة الأسنان. ما هي الأسعار؟', time: '16:00' },
            { sender: 'ai', text: 'أهلاً بك! نحن نعمل مع أفضل عيادات طب الأسنان لإجراءات الزراعة. تبدأ الزرعة الواحدة من 750 دولاراً تشمل التاج. كم زرعة تحتاج؟', time: '16:00' },
            { sender: 'lead', text: 'أحتاج 4 زرعات، فك علوي', time: '16:05' },
            { sender: 'ai', text: 'فهمت. بالنسبة لـ 4 زرعات علوية، التكلفة التقريبية بين 3000-4000 دولار حسب خطة العلاج المحددة. يشمل ذلك استشارة مجانية وأشعة بانورامية. من أين ستأتي؟', time: '16:05' },
            { sender: 'lead', text: 'من قطر', time: '16:08' },
            { sender: 'ai', text: 'رائع! لدينا العديد من المرضى من قطر. يمكننا ترتيب الاستقبال من المطار، والفندق القريب من العيادة، والترجمة. هل ترغب في تحديد موعد لاستشارة فيديو مجانية مع الطبيب؟', time: '16:08' },
            { sender: 'lead', text: 'نعم من فضلك', time: '16:10' },
            { sender: 'ai', text: '✅ ممتاز! سأوصلك بمنسق المرضى لدينا لتحديد الموعد. ستصلك رسالة خلال ساعة. شكراً لك! 🙏', time: '16:10' }
        ],
        phoneLang: 'العربية',
        phoneTranscript: '"مرحباً، شكراً لاتصالك. أنا المساعد الذكي للسياحة العلاجية. يمكنني مساعدتك في الأسعار والمواعيد وترتيبات السفر. ما الإجراء الذي يهمك؟..."',
        duration: '0:55'
    }
};

const demoDataHe = {
    dental: {
        whatsapp: [
            { sender: 'lead', text: 'שלום, אני מחפש רופא שיניים לטיפול שורש', time: '10:02' },
            { sender: 'ai', text: 'שלום! 😊 בהחלט, אשמח לעזור. אצלנו יש מומחים לטיפולי שורש. אפשר לשאול כמה שאלות קצרות?', time: '10:02' },
            { sender: 'lead', text: 'כן בטח', time: '10:03' },
            { sender: 'ai', text: 'מעולה. האם יש לך כאב כרגע או שזה טיפול מתוכנן?', time: '10:03' },
            { sender: 'lead', text: 'יש לי כאב כבר שבוע', time: '10:04' },
            { sender: 'ai', text: 'הבנתי, חשוב לטפל בזה מהר. יש לנו תור פנוי מחר ב-10:00 עם ד"ר כהן. מתאים?', time: '10:04' },
            { sender: 'lead', text: 'מעולה כן', time: '10:05' },
            { sender: 'ai', text: 'נהדר! ✅ נקבע. תקבל תזכורת מחר בבוקר. רפואה שלמה! 🙏', time: '10:05' }
        ],
        phoneLang: 'Hebrew',
        phoneTranscript: '"שלום, תודה שהתקשרת למרפאת השיניים. אני העוזרת הדיגיטלית. איך אוכל לעזור?... הבנתי שיש לך כאב, בוא נמצא לך תור דחוף..."',
        duration: '0:34'
    },
    beauty: {
        whatsapp: [
            { sender: 'lead', text: 'היי, כמה עולה החלקה?', time: '14:15' },
            { sender: 'ai', text: 'היי! 😊 ההחלקה אצלנו מתחילה מ-₪350 לשיער קצר ו-₪550 לשיער ארוך. מה אורך השיער שלך?', time: '14:15' },
            { sender: 'lead', text: 'ארוך, מתחת לכתפיים', time: '14:16' },
            { sender: 'ai', text: 'יופי! ההחלקה לשיער ארוך ₪550 ולוקחת כ-3 שעות. יש לנו מקום ביום שלישי ב-11:00 או חמישי ב-14:00. מה מתאים?', time: '14:16' },
            { sender: 'lead', text: 'חמישי בבקשה', time: '14:18' },
            { sender: 'ai', text: 'מושלם! ✅ קבעתי לך חמישי ב-14:00 עם מיכל. שימי לב להגיע עם שיער יבש. נתראה! 💇‍♀️', time: '14:18' }
        ],
        phoneLang: 'Hebrew',
        phoneTranscript: '"היי, הגעת לסטודיו ביוטי. אשמח לעזור לך לקבוע תור. איזה טיפול מעניין אותך?..."',
        duration: '0:42'
    },
    realestate: {
        whatsapp: [
            { sender: 'lead', text: 'שלום, ראיתי את הדירה ברחובות. עדיין פנויה?', time: '09:30' },
            { sender: 'ai', text: 'שלום! כן, הדירה ברחוב הרצל 45 עדיין פנויה. 4 חדרים, קומה 3, מרפסת שמש. מחיר ₪2,850,000. רוצה לקבוע סיור?', time: '09:30' },
            { sender: 'lead', text: 'כן, מה התקציב המינימלי?', time: '09:32' },
            { sender: 'ai', text: 'הדירה הזו ₪2,850,000. יש לנו גם אפשרויות מ-₪2,200,000 באזור. מה התקציב שלך בערך?', time: '09:32' },
            { sender: 'lead', text: 'עד 2.5', time: '09:35' },
            { sender: 'ai', text: 'מעולה, יש לי 3 דירות מתאימות. אפשר לקבוע סיור ביום שישי בבוקר?', time: '09:35' },
            { sender: 'lead', text: 'מתאים', time: '09:38' },
            { sender: 'ai', text: '✅ קבעתי סיור ליום שישי 10:00. אשלח לך את הכתובות בהודעה נפרדת. להתראות!', time: '09:38' }
        ],
        phoneLang: 'Arabic',
        phoneTranscript: '"مرحبا، شكراً لاتصالك. كيف بقدر اساعدك؟... عندنا شقق بالمنطقة اللي بتدور عليها..."',
        duration: '1:15'
    },
    medical: {
        whatsapp: [
            { sender: 'lead', text: 'Hi, I\'m looking for dental implants in Israel. What are the prices?', time: '16:00' },
            { sender: 'ai', text: 'Hello! Welcome 😊 We work with top dental clinics in Israel for implant procedures. A single implant starts from $750 including the crown. How many implants do you need?', time: '16:00' },
            { sender: 'lead', text: 'I need 4 implants, upper jaw', time: '16:05' },
            { sender: 'ai', text: 'Got it. For 4 upper implants, you\'re looking at approximately $3,000-$4,000 depending on the specific treatment plan. This includes a free consultation, panoramic X-ray, and a personalized quote. Where are you traveling from?', time: '16:05' },
            { sender: 'lead', text: 'Turkey', time: '16:08' },
            { sender: 'ai', text: 'Great! We have many patients from Turkey. We can arrange airport pickup, hotel near the clinic, and translation. Want to schedule a free video consultation with the doctor?', time: '16:08' },
            { sender: 'lead', text: 'Yes please', time: '16:10' },
            { sender: 'ai', text: '✅ Perfect! I\'ll connect you with our patient coordinator to schedule. You\'ll get a link within the hour. Thank you! 🙏', time: '16:10' }
        ],
        phoneLang: 'English',
        phoneTranscript: '"Hello, thank you for calling. I\'m the AI assistant for medical tourism in Israel. I can help you with pricing, scheduling, and travel arrangements. What procedure are you interested in?..."',
        duration: '0:55'
    }
};

export default function InteractiveDemo() {
    const { t, currentLang } = useLanguage();
    const [activeTab, setActiveTab] = useState('dental');
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveHeights, setWaveHeights] = useState(new Array(20).fill(3));
    const [demoMode, setDemoMode] = useState('mock'); // 'mock' or 'live'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const revealRef = useScrollReveal();

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setWaveHeights(prev => prev.map(() => Math.random() * 30 + 10));
            }, 100);
        } else {
            setWaveHeights(new Array(20).fill(3));
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlay = () => setIsPlaying(!isPlaying);

    const handleCallMe = async (e) => {
        e.preventDefault();
        if (!phoneNumber) return;
        
        setCallStatus('loading');
        try {
            const response = await fetch('https://api.vapi.ai/call', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_VAPI_PRIVATE_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assistantId: '8c684b05-641c-4318-a6f6-ab5c5b13e339',
                    phoneNumberId: '49bdf887-40bd-40e1-aea2-c4d30a4a196b',
                    customer: { number: phoneNumber }
                })
            });

            if (response.ok) {
                setCallStatus('success');
                setTimeout(() => setCallStatus('idle'), 5000);
            } else {
                setCallStatus('error');
                setTimeout(() => setCallStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Vapi Error:', error);
            setCallStatus('error');
            setTimeout(() => setCallStatus('idle'), 5000);
        }
    };

    const data = (currentLang === 'ar' ? demoDataAr : demoDataHe)[activeTab];
    const isEnglish = activeTab === 'medical'; // medical tourism is English-centric

    return (
        <section className="demo-section" id="demo" ref={revealRef}>
            <div className="container">
                <div className="section-header text-center fade-up">
                    <span className="section-label">{t('demo_label')}</span>
                    <h2>{t('demo_h2')}</h2>
                    <p className="section-subtitle">{t('demo_sub')}</p>
                </div>

                <div className="demo-tabs fade-up stagger-1">
                    {['dental', 'beauty', 'realestate', 'medical'].map((tab, i) => (
                        <button 
                            key={tab} 
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {t(`demo_t${i + 1}`)}
                        </button>
                    ))}
                </div>

                <div className="demo-container glass-panel fade-up stagger-2">
                    <div className="demo-columns">
                        {/* WhatsApp Mockup */}
                        <div className="demo-column whatsapp-mockup">
                            <h3 className="column-title">{t('demo_col1')}</h3>
                            <div className="whatsapp-container">
                                {data.whatsapp.map((msg, index) => (
                                    <div 
                                        key={index}
                                        className={`wa-msg wa-${msg.sender}`} 
                                        dir={isEnglish ? 'ltr' : 'rtl'}
                                        style={{ animationDelay: `${index * 0.15}s` }}
                                    >
                                        <div className="wa-time" style={{ float: isEnglish ? 'right' : 'left' }}>
                                            {msg.time}
                                        </div>
                                        {msg.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Phone Mockup */}
                        <div className="demo-column phone-mockup">
                            <div className="column-header-with-toggle">
                                <h3 className="column-title">{t('demo_col2')}</h3>
                                <div className="demo-mode-toggle">
                                    <button 
                                        className={`mode-toggle-btn ${demoMode === 'mock' ? 'active' : ''}`}
                                        onClick={() => setDemoMode('mock')}
                                    >
                                        Mock
                                    </button>
                                    <button 
                                        className={`mode-toggle-btn ${demoMode === 'live' ? 'active' : ''}`}
                                        onClick={() => setDemoMode('live')}
                                    >
                                        Live
                                    </button>
                                </div>
                            </div>

                            <div className="phone-container">
                                {demoMode === 'mock' ? (
                                    <>
                                        <div className="audio-player glass-panel-inner">
                                            <div className="player-header">
                                                <div className="player-icon">📞</div>
                                                <div className="player-info">
                                                    <div className="player-title">{t('demo_ai_voice')}</div>
                                                    <div className="player-lang">{data.phoneLang}</div>
                                                </div>
                                                <div className="player-timer">{data.duration}</div>
                                            </div>
                                            <div className="waveform-container player-waveform">
                                                {waveHeights.map((height, i) => (
                                                    <div 
                                                    key={i} 
                                                    className="bar" 
                                                    style={{ height: `${height}px` }}
                                                    />
                                                ))}
                                            </div>
                                            <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={handlePlay}>
                                                <span className="play-icon">{isPlaying ? '⏸' : '▶'}</span>
                                            </button>
                                        </div>
                                        <div className="transcript-container glass-panel-inner">
                                            <p className="transcript-caption">{t('demo_live_trans')}</p>
                                            <p className="transcript-text" dir={isEnglish ? 'ltr' : 'rtl'}>
                                                {data.phoneTranscript}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="live-demo-container glass-panel-inner">
                                        <h4 className="live-title">{t('demo_live_title')}</h4>
                                        <div className="live-option">
                                            <span className="option-label">{t('demo_call_me')}</span>
                                            <form className="call-me-form" onSubmit={handleCallMe}>
                                                <input 
                                                    type="tel" 
                                                    placeholder={t('demo_phone_placeholder')}
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="phone-input"
                                                    required
                                                />
                                                <button 
                                                    type="submit" 
                                                    className={`call-btn${callStatus !== 'idle' && callStatus !== 'loading' ? ' ' + callStatus : ''}`}
                                                    disabled={callStatus === 'loading'}
                                                >
                                                    {callStatus === 'loading' ? t('demo_calling') : t('demo_call_btn')}
                                                </button>
                                            </form>
                                            {callStatus === 'success' && <p className="status-msg success">{t('demo_call_success')}</p>}
                                            {callStatus === 'error' && <p className="status-msg error">{t('demo_call_error')}</p>}
                                        </div>
                                        <div className="divider"><span>OR</span></div>
                                        <div className="live-option">
                                            <span className="option-label">{t('demo_call_ai')}</span>
                                            <a 
                                                href="tel:+97233823299" 
                                                className="ai-phone-number-btn"
                                            >
                                                {t('demo_ai_num')}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="demo-cta text-center fade-up stagger-3">
                    <a href="#book" className="inline-link">
                        <span>{t('demo_cta')}</span> <span style={{ display: 'inline-block' }}>{t('demo_dir_arrow')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
