// Post-build step: bake one static page per language (dist/index.html and dist/he/index.html)
// and emit SEO / AI-crawler files, so search engines, link previews and AI assistants get the
// full content without running JavaScript.
//
// The public URL comes from SITE_URL, or on Vercel from VERCEL_PROJECT_PRODUCTION_URL.
// Without one, URL-dependent tags (canonical, hreflang, og:url, og:image, sitemap) are skipped.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { translations, BRAND, LANGUAGES } from '../src/utils/translations.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const rawUrl = process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || '';
const siteUrl = rawUrl.replace(/\/+$/, '');
const absolute = (path) => `${siteUrl}${path}`;
const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_NAMES = { en: 'English', he: 'Hebrew' };
const INSTAGRAM = translations.en.f_insta_link;
const WHATSAPP = 'https://wa.me/972544799652';

const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
// JSON inside <script> must not be able to close the tag
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

// ── Structured data: one shared organization, plus a page + FAQ per language ──
function structuredData(lang) {
  const copy = translations[lang];
  const pageUrl = absolute(LANGUAGES[lang].path);
  const orgId = absolute('/#organization');
  const siteId = absolute('/#website');

  const organization = {
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: BRAND,
    url: absolute('/'),
    description: copy.meta_desc,
    slogan: `${copy.hero_h1_1} ${copy.hero_h1_2}`,
    knowsAbout: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Media Buying', 'E-commerce Marketing', 'Performance Marketing', 'Conversion Rate Optimization', 'Klaviyo Email Marketing', 'TikTok Ads', 'Google Ads'],
    availableLanguage: LANG_CODES.map((code) => LANGUAGE_NAMES[code]),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${pageUrl}#book`,
      availableLanguage: LANG_CODES.map((code) => LANGUAGE_NAMES[code]),
    },
    sameAs: [INSTAGRAM],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.svc_h2,
      itemListElement: range(6).map((n) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: copy[`svc_${n}_h`], description: copy[`svc_${n}_p`], provider: { '@id': orgId } },
      })),
    },
    ...(siteUrl && { logo: absolute('/apple-touch-icon.png'), image: absolute(LANGUAGES[lang].ogImage) }),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': siteId,
        name: BRAND,
        url: absolute('/'),
        inLanguage: LANG_CODES,
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.meta_title,
        description: copy.meta_desc,
        inLanguage: lang,
        isPartOf: { '@id': siteId },
        about: { '@id': orgId },
        ...(siteUrl && { primaryImageOfPage: absolute(LANGUAGES[lang].ogImage) }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: range(6).map((n) => ({
          '@type': 'Question',
          name: copy[`faq_${n}_q`],
          acceptedAnswer: { '@type': 'Answer', text: copy[`faq_${n}_a`] },
        })),
      },
    ],
  };
}

function headTags(lang) {
  const copy = translations[lang];
  const info = LANGUAGES[lang];
  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="${info.locale}" />`,
    ...LANG_CODES.filter((code) => code !== lang).map((code) => `<meta property="og:locale:alternate" content="${LANGUAGES[code].locale}" />`),
    `<meta property="og:title" content="${escapeHtml(copy.meta_title)}" />`,
    `<meta property="og:description" content="${escapeHtml(copy.og_desc)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(copy.og_image_alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(copy.meta_title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(copy.og_desc)}" />`,
  ];
  if (siteUrl) {
    tags.push(
      `<link rel="canonical" href="${absolute(info.path)}" />`,
      ...LANG_CODES.map((code) => `<link rel="alternate" hreflang="${code}" href="${absolute(LANGUAGES[code].path)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${absolute(LANGUAGES.en.path)}" />`,
      `<meta property="og:url" content="${absolute(info.path)}" />`,
      `<meta property="og:image" content="${absolute(info.ogImage)}" />`,
      `<meta name="twitter:image" content="${absolute(info.ogImage)}" />`,
    );
  }
  tags.push(`<link rel="alternate" type="text/markdown" title="${BRAND} for AI assistants" href="/llms.txt" />`);
  tags.push(jsonLd(structuredData(lang)));
  return tags.join('\n    ');
}

// ── Plain-text / Markdown versions for AI assistants (llmstxt.org) ──
const LLM_HEADINGS = {
  en: { services: 'Services', method: 'Method', process: 'How we work (first 30 days)', faq: 'FAQ', contact: 'Contact', problem: 'The problem we solve' },
  he: { services: 'שירותים', method: 'השיטה', process: 'איך אנחנו עובדים (30 הימים הראשונים)', faq: 'שאלות נפוצות', contact: 'יצירת קשר', problem: 'הבעיה שאנחנו פותרים' },
};

function contactLines(lang) {
  const copy = translations[lang];
  return [
    `- ${copy.btn_book_your}: ${absolute(LANGUAGES[lang].path)}#book`,
    `- WhatsApp: ${WHATSAPP}`,
    `- Instagram: ${INSTAGRAM}`,
  ];
}

function llmsSummary() {
  const en = translations.en;
  const he = translations.he;
  return [
    `# ${BRAND}`,
    '',
    `> ${en.meta_desc}`,
    '',
    `${en.hero_sub}`,
    '',
    `- Website (English): ${absolute(LANGUAGES.en.path)}`,
    `- Website (Hebrew / עברית): ${absolute(LANGUAGES.he.path)}`,
    `- Languages: English, Hebrew`,
    `- Focus: Meta (Facebook & Instagram) ads, creative production, tracking, CRO, and retention for e-commerce brands`,
    '',
    `## ${LLM_HEADINGS.en.services}`,
    '',
    ...range(6).map((n) => `- **${en[`svc_${n}_h`]}**: ${en[`svc_${n}_p`]}`),
    '',
    `## ${LLM_HEADINGS.en.process}`,
    '',
    ...range(4).map((n) => `- **${en[`hiw_${n}_h`]}**: ${en[`hiw_${n}_p`]}`),
    '',
    `## ${LLM_HEADINGS.en.contact}`,
    '',
    ...contactLines('en'),
    '',
    `## עברית`,
    '',
    `> ${he.meta_desc}`,
    '',
    ...range(6).map((n) => `- **${he[`svc_${n}_h`]}**: ${he[`svc_${n}_p`]}`),
    '',
    `## Optional`,
    '',
    `- [Full site content in English and Hebrew](${absolute('/llms-full.txt')}): every section, including the FAQ`,
    '',
  ].join('\n');
}

function llmsFullSection(lang) {
  const c = translations[lang];
  const h = LLM_HEADINGS[lang];
  return [
    `# ${c.meta_title}`,
    '',
    `URL: ${absolute(LANGUAGES[lang].path)}`,
    '',
    `## ${c.hero_h1_1} ${c.hero_h1_2}`,
    '',
    c.hero_sub,
    '',
    `## ${h.problem}: ${c.prob_h2}`,
    '',
    ...range(4).map((n) => `- **${c[`prob_${n}_num`]}** ${c[`prob_${n}`]}`),
    '',
    `## ${h.method}: ${c.sol_h2}`,
    '',
    c.sol_sub,
    '',
    ...range(3).map((n) => `- **${c[`sol_s${n}_h`]}**: ${c[`sol_s${n}_p`]}`),
    '',
    `## ${h.services}: ${c.svc_h2}`,
    '',
    ...range(6).map((n) => `- **${c[`svc_${n}_h`]}**: ${c[`svc_${n}_p`]}`),
    '',
    `## ${h.process}`,
    '',
    ...range(4).map((n) => `- **${c[`hiw_${n}_h`]}**: ${c[`hiw_${n}_p`]}`),
    '',
    `## ${h.faq}`,
    '',
    ...range(6).flatMap((n) => [`### ${c[`faq_${n}_q`]}`, '', c[`faq_${n}_a`], '']),
    `## ${h.contact}`,
    '',
    c.cta_sub,
    '',
    ...contactLines(lang),
    '',
  ].join('\n');
}

// ── Pages ──
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = readFileSync(resolve(dist, 'index.html'), 'utf-8');
for (const placeholder of ['<div id="root"></div>', '<!--app-head-->', '<html lang="en">', '<title>']) {
  if (!template.includes(placeholder)) throw new Error(`prerender: "${placeholder}" not found in dist/index.html`);
}

for (const lang of LANG_CODES) {
  const copy = translations[lang];
  const info = LANGUAGES[lang];
  const appHtml = render(lang);
  // Replacer functions, so "$" sequences in the content (e.g. "$$$") aren't treated as patterns
  const html = template
    .replace('<html lang="en">', () => `<html lang="${lang}" dir="${info.dir}">`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(copy.meta_title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, () => `<meta name="description" content="${escapeHtml(copy.meta_desc)}" />`)
    .replace('<!--app-head-->', () => headTags(lang))
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);

  const outFile = resolve(dist, `.${info.path}index.html`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`prerender: ${info.path} (${lang}, ${Math.round(appHtml.length / 1024)} KB of HTML)`);
}

// ── robots.txt: everyone welcome, AI assistants named explicitly ──
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot',
];
writeFileSync(resolve(dist, 'robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  '# AI assistants and answer engines may read and cite this site',
  ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}`),
  'Allow: /',
  ...(siteUrl ? ['', `Sitemap: ${absolute('/sitemap.xml')}`] : []),
  '',
].join('\n'));

// ── sitemap.xml with hreflang alternates ──
if (siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...LANG_CODES.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absolute(LANGUAGES[code].path)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(LANGUAGES.en.path)}" />`,
  ].join('\n');
  writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANG_CODES.map((code) => `  <url>
    <loc>${absolute(LANGUAGES[code].path)}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`).join('\n')}
</urlset>
`);
}

// ── llms.txt (summary) and llms-full.txt (all content, both languages) ──
writeFileSync(resolve(dist, 'llms.txt'), llmsSummary());
writeFileSync(resolve(dist, 'llms-full.txt'), LANG_CODES.map(llmsFullSection).join('\n---\n\n'));

rmSync(ssrDir, { recursive: true, force: true });
console.log(siteUrl ? `prerender: URLs use ${siteUrl}` : 'prerender: no SITE_URL — skipped canonical/hreflang/og:url/sitemap');
