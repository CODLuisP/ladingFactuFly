import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DocumentTypes from './components/DocumentTypes';
import Features from './components/Features';
import ApiSection from './components/ApiSection';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-brand-light text-brand-dark'}`}>
      <Header />
      <main className="relative z-10">
        <Hero />
        <DocumentTypes />
        <Features />
        <ApiSection />
        <Pricing />
      </main>
      <Footer />
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
