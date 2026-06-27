import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Check, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '../context/NavigationContext';
import logoFactufly from '../public/logofactuflyb.png';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { scrollToSection } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Comprobantes', id: 'comprobantes' },
    { label: 'Características', id: 'caracteristicas' },
    { label: 'API Integración', id: 'api-section' },
    { label: 'Planes y Precios', id: 'planes' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('hero')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0f2e64] shadow-md shadow-brand-red/25 border border-white/10">
              <img src={logoFactufly} alt="Factufly" className="w-6 h-6 object-contain" />
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center" title="SUNAT Homologado">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-dark dark:text-white flex items-center">
                Factu<span className="text-[#a80a0a]">Fly</span><span className="text-[#de350b] font-black"></span>
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-slate-800 dark:text-blue-200/70 uppercase -mt-0.5 flex items-center gap-0.5">
                 Sistema de facturación electrónica 
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-semibold text-slate-600 hover:text-brand-red dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors border border-slate-200/60 dark:border-white/15 cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-brand-blue" />}
            </button>

            <button
              onClick={() => handleNavClick('demo-section')}
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-white/90 hover:text-brand-red dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-slate-200/60 dark:border-white/20"
            >
              Ver Demo
            </button>

            <button
              onClick={() => handleNavClick('planes')}
              className="px-5 py-2 text-sm font-bold text-white bg-brand-red hover:bg-[#0a2049] rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              Empieza Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-brand-blue" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-brand-red hover:bg-slate-100 dark:text-blue-100/90 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col gap-3 px-4">
              <button
                onClick={() => handleNavClick('demo-section')}
                className="w-full py-3 text-center text-sm font-semibold text-brand-red dark:text-white bg-brand-red/10 dark:bg-white/10 rounded-xl hover:bg-brand-red/20 dark:hover:bg-white/20 transition-all"
              >
                Ver Demo Interactiva
              </button>
              <button
                onClick={() => handleNavClick('planes')}
                className="w-full py-3 text-center text-sm font-bold text-white bg-brand-red hover:bg-[#0a2049] rounded-xl shadow-md transition-all"
              >
                Empieza Gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
