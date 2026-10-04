import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LANGUAGES, langFromPath } from './utils/translations';

const lang = langFromPath(window.location.pathname);
// Pre-rendered pages already carry these; the dev server serves one shell for every path
document.documentElement.lang = lang;
document.documentElement.dir = LANGUAGES[lang].dir;

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

// Production builds ship pre-rendered HTML (scripts/prerender.mjs); dev starts empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
