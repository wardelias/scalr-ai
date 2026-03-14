document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Management
    let currentLang = 'en';
    const langModal = document.getElementById('lang-modal');
    const navLangSelect = document.getElementById('nav-lang-select');
    
    // Check local storage for existing preference
    const savedLang = localStorage.getItem('scalr_lang');
    if (savedLang) {
        setLanguage(savedLang);
        langModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    } else {
        // Show modal by default
        langModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }

    // Modal buttons
    document.querySelectorAll('.lang-btn, .lang-btn-main').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            setLanguage(lang);
            langModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            localStorage.setItem('scalr_lang', lang);
        });
    });

    // Nav select
    if (navLangSelect) {
        navLangSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            localStorage.setItem('scalr_lang', e.target.value);
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update direction
        if (lang === 'he' || lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl-mode');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl-mode');
        }

        // Update Nav Select value
        if (navLangSelect) navLangSelect.value = lang;

        // Apply translations
        const trans = translations[lang];
        if (trans) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (trans[key]) {
                    el.innerHTML = trans[key]; // use innerHTML incase there are nested tags, or simple textContent
                }
            });
            // Update placeholders or other attributes if needed
            document.title = trans.meta_title || document.title;
        }

        // Re-render demo if needed
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            renderDemo(activeTab.dataset.target);
        }
    }

    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
        });
    }

    // 3. Demo Data
    const demoData = {
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

    const whatsappContent = document.getElementById('whatsapp-content');
    const phoneLang = document.getElementById('phone-lang');
    const phoneTranscript = document.getElementById('phone-transcript');
    const playerTimer = document.querySelector('.player-timer');

    function renderDemo(type) {
        const data = demoData[type];
        if (!data) return;

        // Render WhatsApp with staggered animation
        whatsappContent.innerHTML = '';
        const isEnglish = data.phoneLang === 'English';
        
        data.whatsapp.forEach((msg, index) => {
            const div = document.createElement('div');
            div.className = `wa-msg wa-${msg.sender}`;
            // Set RTL if not English
            if (!isEnglish) div.setAttribute('dir', 'rtl');
            else div.setAttribute('dir', 'ltr');
            
            div.style.animationDelay = `${index * 0.15}s`;
            
            div.innerHTML = `
                <div class="wa-time" style="float: ${isEnglish ? 'right' : 'left'}">${msg.time}</div>
                ${msg.text}
            `;
            whatsappContent.appendChild(div);
        });

        // Set timeout to scroll to bottom
        setTimeout(() => {
            whatsappContent.scrollTo({ top: whatsappContent.scrollHeight, behavior: 'smooth' });
        }, 100);

        // Update Phone Data
        phoneLang.textContent = data.phoneLang;
        phoneTranscript.textContent = data.phoneTranscript;
        playerTimer.textContent = data.duration;
        
        if (!isEnglish) phoneTranscript.setAttribute('dir', 'rtl');
        else phoneTranscript.setAttribute('dir', 'ltr');
    }

    // 4. Tab Switching
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class
            tab.classList.add('active');
            // Render Demo
            renderDemo(tab.dataset.target);
        });
    });

    // Initialize first tab
    if (tabs.length > 0) renderDemo('dental');

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Play Button Animation
    const playBtn = document.getElementById('play-demo-btn');
    const playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
    const waveformBars = document.querySelectorAll('.player-waveform .bar');
    
    let isPlaying = false;
    let waveInterval;

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playBtn.classList.add('playing');
                playIcon.textContent = '⏸';
                // animate waveform
                waveInterval = setInterval(() => {
                    waveformBars.forEach(bar => {
                        const height = Math.random() * 30 + 10;
                        bar.style.height = `${height}px`;
                    });
                }, 100);
            } else {
                playBtn.classList.remove('playing');
                playIcon.textContent = '▶';
                clearInterval(waveInterval);
                waveformBars.forEach(bar => {
                    bar.style.height = '3px';
                });
            }
        });
    }
});
