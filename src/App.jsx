import React from 'react';
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingBlobs from './components/FloatingBlobs';
import Home from './pages/Home';
import { ModalProvider } from './utils/ModalContext';
import DemoModal from './components/DemoModal';

// Single-page site: every path renders Home (vercel.json rewrites all routes to index.html)
function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <FloatingBlobs />
        <DemoModal />
        <Navbar />
        <main id="main">
          <Home />
        </main>
        <Footer />
      </ModalProvider>
    </LanguageProvider>
  );
}

export default App;
