import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import Header from './components/layout/Header';
import Hero from './components/Hero';
import Sponsors from './components/Sponsors';
import DocumentTypes from './components/DocumentTypes';
import Features from './components/Features';
import Modules from './components/Modules';
import Personalization from './components/Personalization';
import ApiPage from './components/ApiPage';
import Industries from './components/Industries';
import Pricing from './components/Pricing';
import ContactSection from './components/ContactSection';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Ruta independiente: /apifactufly ya no vive dentro del scroll de la landing.
const isApiPage = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/apifactufly';

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-brand-light text-brand-dark'}`}>
      {isApiPage ? (
        <ApiPage />
      ) : (
        <>
          <Header />
          <main className="relative z-10">
            <Hero />
            <Sponsors />
            <DocumentTypes />
            <Features />
            <Modules />
            <Personalization />
            <Industries />
            <Pricing />
          </main>
          <ContactSection />
          <Footer />
        </>
      )}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
