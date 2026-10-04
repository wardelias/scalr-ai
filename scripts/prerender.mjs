// Post-build step: bake the rendered page into dist/index.html and emit SEO files,
// so crawlers and link previews get the full content without running JavaScript.
//
// The public URL comes from SITE_URL, or on Vercel from VERCEL_PROJECT_PRODUCTION_URL.
// Without one, URL-dependent tags (canonical, og:url, og:image, sitemap) are skipped.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { translations, BRAND } from '../src/utils/translations.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const rawUrl = process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || '';
const siteUrl = rawUrl.replace(/\/+$/, '');
const pageUrl = siteUrl ? `${siteUrl}/` : '';
const copy = translations.en;

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
// JSON inside <script> must not be able to close the tag
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const description = 'Scalr is a Meta ads agency for e-commerce brands. We plan, launch, and scale Facebook & Instagram campaigns — with the creative, tracking, and CRO behind them.';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: BRAND,
  description,
  slogan: `${copy.hero_h1_1} ${copy.hero_h1_2}`,
  telephone: '+972-54-479-9652',
  address: { '@type': 'PostalAddress', addressCountry: 'IL' },
  sameAs: [copy.f_insta_link],
  knowsAbout: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'Media Buying', 'E-commerce Marketing', 'Performance Marketing', 'Conversion Rate Optimization', 'Klaviyo Email Marketing', 'TikTok Ads', 'Google Ads'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [1, 2, 3, 4, 5, 6].map((n) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: copy[`svc_${n}_h`], description: copy[`svc_${n}_p`] },
    })),
  },
  ...(siteUrl && { url: pageUrl, logo: `${siteUrl}/apple-touch-icon.png`, image: `${siteUrl}/og-image.png` }),
};

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
    '@type': 'Question',
    name: copy[`faq_${n}_q`],
    acceptedAnswer: { '@type': 'Answer', text: copy[`faq_${n}_a`] },
  })),
};

const headTags = [
  ...(siteUrl ? [
    `<link rel="canonical" href="${escapeAttr(pageUrl)}" />`,
    `<meta property="og:url" content="${escapeAttr(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeAttr(`${siteUrl}/og-image.png`)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(`${siteUrl}/og-image.png`)}" />`,
  ] : []),
  jsonLd(organization),
  jsonLd(faq),
].join('\n    ');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const indexPath = resolve(dist, 'index.html');
let html = readFileSync(indexPath, 'utf-8');
if (!html.includes('<div id="root"></div>') || !html.includes('<!--app-head-->')) {
  throw new Error('prerender: placeholders not found in dist/index.html');
}
html = html
  .replace('<!--app-head-->', headTags)
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, html);

writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
if (siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`);
}

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote dist/index.html (${Math.round(appHtml.length / 1024)} KB of HTML)${siteUrl ? ` for ${siteUrl}` : ' — no SITE_URL, skipped canonical/og:url/sitemap'}`);
