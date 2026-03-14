import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './utils/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageModal from './components/LanguageModal';
// Placeholder imports for pages we are about to create
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import UseCases from './pages/UseCases';
import Pricing from './pages/Pricing';
import About from './pages/About';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguageModal />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
