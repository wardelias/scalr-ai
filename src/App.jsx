import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageModal from './components/LanguageModal';
import Home from './pages/Home';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguageModal />
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
    </LanguageProvider>
  );
}

export default App;
