import React, { Suspense, lazy } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import Header from './components/layout/Header';
import Hero from './components/Hero';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Reveal from './components/Reveal';

// Secciones fuera de la primera pantalla: se cargan en chunks separados,
// solo cuando el navegador los necesita, para no inflar el bundle inicial.
const Sponsors = lazy(() => import('./components/Sponsors'));
const DocumentTypes = lazy(() => import('./components/DocumentTypes'));
const Features = lazy(() => import('./components/Features'));
const Modules = lazy(() => import('./components/Modules'));
const Personalization = lazy(() => import('./components/Personalization'));
const Industries = lazy(() => import('./components/Industries'));
const Pricing = lazy(() => import('./components/Pricing'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ApiPage = lazy(() => import('./components/ApiPage'));

// Ruta independiente: /apifactufly ya no vive dentro del scroll de la landing.
const isApiPage = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/apifactufly';

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-brand-light text-brand-dark'}`}>
      {isApiPage ? (
        <Suspense fallback={null}>
          <ApiPage />
        </Suspense>
      ) : (
        <>
          <Header />
          <main className="relative z-10 overflow-x-clip">
            <Hero />
            <Suspense fallback={null}><Reveal><Sponsors /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><DocumentTypes /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><Features /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><Modules /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><Personalization /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><Industries /></Reveal></Suspense>
            <Suspense fallback={null}><Reveal><Pricing /></Reveal></Suspense>
          </main>
          <Suspense fallback={null}><Reveal><ContactSection /></Reveal></Suspense>
          <Suspense fallback={null}><Reveal><Footer /></Reveal></Suspense>
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
