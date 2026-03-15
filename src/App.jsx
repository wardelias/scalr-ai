import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageModal from './components/LanguageModal';
import Home from './pages/Home';
import { ModalProvider } from './utils/ModalContext';
import DemoModal from './components/DemoModal';

function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <BrowserRouter>
          <LanguageModal />
          <DemoModal />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* All other sections are now on the Home page */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ModalProvider>
    </LanguageProvider>
  );
}

export default App;
