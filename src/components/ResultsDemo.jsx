import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Ellipsis, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';
import { useModal } from '../utils/ModalContext';
import useScrollReveal from '../utils/useScrollReveal';

// Illustrative 30-day snapshots per vertical. ROAS is derived (revenue / spend).
const VERTICALS = {
    fashion: {
        product: '👖',
        handle: 'yourbrand.style',
        likes: '2,481',
        duration: '0:15',
        gradient: 'linear-gradient(135deg, #fde8dc 0%, #f4b8a3 100%)',
        before: { spend: 42000, revenue: 71400, cpa: 168 },
        after: { spend: 78000, revenue: 265200, cpa: 85 },
    },
    beauty: {
        product: '🧴',
        handle: 'yourbrand.beauty',
        likes: '5,102',
        duration: '0:12',
        gradient: 'linear-gradient(135deg, #fde6f3 0%, #f2b3d6 100%)',
        before: { spend: 28000, revenue: 50400, cpa: 112 },
        after: { spend: 54000, revenue: 199800, cpa: 55 },
    },
    home: {
        product: '🛋️',
        handle: 'yourbrand.home',
        likes: '1,873',
        duration: '0:21',
        gradient: 'linear-gradient(135deg, #e9eedf 0%, #bccca6 100%)',
        before: { spend: 55000, revenue: 88000, cpa: 344 },
        after: { spend: 96000, revenue: 297600, cpa: 177 },
    },
    health: {
        product: '🍵',
        handle: 'yourbrand.wellness',
        likes: '3,390',
        duration: '0:18',
        gradient: 'linear-gradient(135deg, #dceff9 0%, #a6d2ee 100%)',
        before: { spend: 35000, revenue: 66500, cpa: 135 },
        after: { spend: 70000, revenue: 273000, cpa: 66 },
    },
};

const TABS = ['fashion', 'beauty', 'home', 'health'];
const DAYS = 30;

// Deterministic pseudo-random so the chart looks the same on every render
function seeded(seed) {
    let s = seed;
    return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
}

// Daily revenue bars as % of the vertical's best day. Before = flat, after = ramping up.
function buildSeries(vertical, seed) {
    const rand = seeded(seed);
    const before = [];
    const after = [];
    for (let i = 0; i < DAYS; i++) {
        before.push((vertical.before.revenue / DAYS) * (0.8 + 0.4 * rand()));
        after.push((vertical.after.revenue / DAYS) * (0.55 + 0.9 * (i / (DAYS - 1))) * (0.85 + 0.3 * rand()));
    }
    const max = Math.max(...before, ...after);
    return {
        before: before.map((v) => (v / max) * 100),
        after: after.map((v) => (v / max) * 100),
    };
}

const SERIES = Object.fromEntries(TABS.map((tab, i) => [tab, buildSeries(VERTICALS[tab], i + 7)]));

const formatCurrency = (n) => `₪${Math.round(n).toLocaleString('en-US')}`;
const formatRoas = (n) => `${n.toFixed(2)}x`;

function formatChange(from, to) {
    const pct = Math.round(((to - from) / from) * 100);
    return `${pct >= 0 ? '+' : '−'}${Math.abs(pct)}%`;
}

function useAnimatedNumber(target, duration = 700) {
    const [value, setValue] = useState(target);
    const valueRef = useRef(target);

    useEffect(() => {
        const from = valueRef.current;
        if (from === target) return;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const start = performance.now();
        let frame;

        const tick = (now) => {
            const progress = reduceMotion ? 1 : Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = from + (target - from) * eased;
            valueRef.current = next;
            setValue(next);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, duration]);

    return value;
}

function KpiTile({ label, value, format, delta, tone }) {
    const animated = useAnimatedNumber(value);
    return (
        <div className="kpi-tile glass-panel-inner">
            <div className="kpi-label">{label}</div>
            <div className="kpi-value"><bdi>{format(animated)}</bdi></div>
            <span className={`kpi-delta ${tone}`}><bdi>{delta}</bdi></span>
        </div>
    );
}

export default function ResultsDemo() {
    const { t } = useLanguage();
    const { openDemoModal } = useModal();
    const [activeTab, setActiveTab] = useState('fashion');
    const [mode, setMode] = useState('before'); // 'before' | 'after'
    const revealRef = useScrollReveal();
    const containerRef = useRef(null);
    const touchedRef = useRef(false);

    // Play the before → after transition once, when the dashboard first scrolls into view
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let timer;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect();
                timer = setTimeout(() => {
                    if (!touchedRef.current) setMode('after');
                }, 900);
            }
        }, { threshold: 0.2 });
        observer.observe(el);
        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);

    const selectMode = (next) => {
        touchedRef.current = true;
        setMode(next);
    };

    const vertical = VERTICALS[activeTab];
    const stats = vertical[mode];
    const base = vertical.before;
    const isAfter = mode === 'after';
    const series = SERIES[activeTab][mode];

    const kpis = [
        { key: 'spend', label: t('res_kpi_spend'), value: stats.spend, format: formatCurrency, from: base.spend, tone: 'neutral' },
        { key: 'revenue', label: t('res_kpi_revenue'), value: stats.revenue, format: formatCurrency, from: base.revenue, tone: 'up' },
        { key: 'roas', label: t('res_kpi_roas'), value: stats.revenue / stats.spend, format: formatRoas, from: base.revenue / base.spend, tone: 'up' },
        { key: 'cpa', label: t('res_kpi_cpa'), value: stats.cpa, format: formatCurrency, from: base.cpa, tone: 'up' },
    ];

    return (
        <section className="demo-section" id="results" ref={revealRef}>
            <div className="container">
                <div className="section-header text-center fade-up">
                    <span className="section-label">{t('res_label')}</span>
                    <h2>{t('res_h2')}</h2>
                    <p className="section-subtitle">{t('res_sub')}</p>
                </div>

                <div className="demo-tabs fade-up stagger-1">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            aria-pressed={activeTab === tab}
                            onClick={(e) => {
                                setActiveTab(tab);
                                // On mobile the tab row scrolls sideways — bring the picked tab into view
                                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            }}
                        >
                            {t(`res_t${i + 1}`)}
                        </button>
                    ))}
                </div>

                <div className="demo-container glass-panel fade-up stagger-2" ref={containerRef}>
                    <div className="demo-columns">
                        {/* Ad creative mockup */}
                        <div className="demo-column">
                            <h3 className="column-title">{t('res_col1')}</h3>
                            <div className="ad-mockup" key={activeTab}>
                                <div className="ad-header">
                                    <div className="ad-avatar"><span>{vertical.handle[0].toUpperCase()}</span></div>
                                    <div className="ad-brand">
                                        <bdi className="ad-handle">{vertical.handle}</bdi>
                                        <span className="ad-sponsored">{t('res_sponsored')}</span>
                                    </div>
                                    <Ellipsis size={20} className="ad-more" aria-hidden="true" />
                                </div>

                                <div className="ad-media" style={{ background: vertical.gradient }}>
                                    <span className="ad-variant">{t('res_variant')}</span>
                                    <span className="ad-duration">
                                        <Play size={10} fill="currentColor" /> <bdi>{vertical.duration}</bdi>
                                    </span>
                                    <span className="ad-product" aria-hidden="true">{vertical.product}</span>
                                    <span className="ad-hook">{t(`res_${activeTab}_hook`)}</span>
                                </div>

                                <div className="ad-cta">
                                    <span>{t('res_shop_now')}</span>
                                    <ChevronRight size={18} className="ad-cta-arrow" />
                                </div>

                                <div className="ad-actions" aria-hidden="true">
                                    <Heart size={22} />
                                    <MessageCircle size={22} />
                                    <Send size={22} />
                                    <Bookmark size={22} className="ad-save" />
                                </div>
                                <div className="ad-likes"><bdi>{vertical.likes}</bdi> {t('res_likes')}</div>
                                <p className="ad-caption">
                                    <strong><bdi>{vertical.handle}</bdi></strong> {t(`res_${activeTab}_caption`)}
                                </p>
                            </div>
                        </div>

                        {/* Ads Manager snapshot */}
                        <div className="demo-column">
                            <div className="column-header-with-toggle">
                                <h3 className="column-title">{t('res_col2')}</h3>
                                <div className="demo-mode-toggle">
                                    <button
                                        className={`mode-toggle-btn ${!isAfter ? 'active' : ''}`}
                                        aria-pressed={!isAfter}
                                        onClick={() => selectMode('before')}
                                    >
                                        {t('res_before')}
                                    </button>
                                    <button
                                        className={`mode-toggle-btn ${isAfter ? 'active' : ''}`}
                                        aria-pressed={isAfter}
                                        onClick={() => selectMode('after')}
                                    >
                                        {t('res_after')}
                                    </button>
                                </div>
                            </div>

                            <div className="ads-dashboard">
                                <div className="kpi-grid">
                                    {kpis.map((kpi) => (
                                        <KpiTile
                                            key={kpi.key}
                                            label={kpi.label}
                                            value={kpi.value}
                                            format={kpi.format}
                                            delta={isAfter ? formatChange(kpi.from, kpi.value) : t('res_baseline')}
                                            tone={isAfter ? kpi.tone : 'neutral'}
                                        />
                                    ))}
                                </div>

                                <div className="rev-chart glass-panel-inner">
                                    <p className="transcript-caption">{t('res_chart')}</p>
                                    <div className={`chart-bars ${mode}`} aria-hidden="true">
                                        {series.map((height, i) => (
                                            <div
                                                key={i}
                                                className="chart-bar"
                                                style={{ height: `${Math.max(height, 3)}%`, transitionDelay: `${i * 12}ms` }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="change-box glass-panel-inner">
                                    <p className="transcript-caption">{isAfter ? t('res_changed') : t('res_found')}</p>
                                    <ul className="change-list" key={`${activeTab}-${mode}`}>
                                        {[1, 2, 3].map((n) => (
                                            <li key={n} style={{ animationDelay: `${n * 0.08}s` }}>
                                                <span className={`change-mark ${isAfter ? 'fixed' : 'found'}`}>{isAfter ? '✓' : '!'}</span>
                                                <span>{t(`res_${activeTab}_${isAfter ? 'c' : 'f'}${n}`)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="res-note fade-up stagger-3">{t('res_note')}</p>

                <div className="demo-cta text-center fade-up stagger-3">
                    <a href="#book" className="inline-link" onClick={(e) => { e.preventDefault(); openDemoModal(); }}>
                        <span>{t('res_cta')}</span> <span style={{ display: 'inline-block' }} aria-hidden="true">{t('demo_dir_arrow')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
