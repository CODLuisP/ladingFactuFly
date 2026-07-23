import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '../../context/NavigationContext';
import logoFactufly from '../../assets/logofactuflyb.png';
import logoFactuflyWebp from '../../assets/logofactuflyb.webp';

// La página de la API vive en su propia ruta, fuera del scroll de la landing.
const isApiPage = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/apifactufly';

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
    { label: 'Módulos', id: 'modulos' },
    { label: 'Planes y Precios', id: 'planes' },
  ];

  // Si estamos en /apifactufly, los anclajes de la landing deben navegar de vuelta
  // a "/" + el hash; el navegador hace scroll al elemento automáticamente al cargar.
  const sectionHref = (id: string) => (isApiPage ? `/#${id}` : `#${id}`);

  const handleNavClick = (id: string) => {
    if (isApiPage) {
      window.location.href = `/#${id}`;
      return;
    }
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-white/10' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => (isApiPage ? (window.location.href = '/') : handleNavClick('hero'))}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0f2e64] shadow-md shadow-brand-red/25 border border-white/10">
              <picture>
                <source srcSet={logoFactuflyWebp} type="image/webp" />
                <img src={logoFactufly} alt="FactuFly" width={24} height={24} loading="eager" fetchPriority="high" decoding="async" className="w-6 h-6 object-contain" />
              </picture>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-dark dark:text-white flex items-center">
                Factu<span className="text-[#a80a0a] dark:text-[#e67b87]">Fly</span>
              </span>
              <span className="hidden min-[1285px]:flex text-[9px] font-bold tracking-widest text-slate-800 dark:text-white uppercase -mt-0.5 items-center gap-0.5">
                 Sistema de facturación electrónica
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                onClick={(e) => {
                  if (!isApiPage) {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }
                }}
                className="text-sm font-semibold text-slate-600 hover:text-brand-red dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}

            {/* API Integración: página independiente (/apifactufly), estilo diferenciado */}
            <a
              href="/apifactufly"
              className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isApiPage
                  ? 'text-white bg-indigo-600 border-indigo-600'
                  : 'text-indigo-600 dark:text-white border-indigo-200 dark:border-slate-800 bg-indigo-50/60 dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> API Integración
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle checked={darkMode} onChange={toggleDarkMode} />

            <a
              href="https://factufly.ideatec.com.pe/"
              target="_blank"
              rel="noreferrer"
              className="hidden min-[1285px]:inline-block px-4 py-2 text-sm font-semibold text-slate-600 dark:text-white/90 hover:text-brand-red dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-slate-200/60 dark:border-white/20"
            >
              Ingresar al Sistema
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle checked={darkMode} onChange={toggleDarkMode} />

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
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                onClick={(e) => {
                  if (!isApiPage) {
                    e.preventDefault();
                    handleNavClick(item.id);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-brand-red hover:bg-slate-100 dark:text-blue-100/90 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* API Integración: página independiente, al final y con estilo diferenciado */}
            <a
              href="/apifactufly"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isApiPage
                  ? 'text-white bg-indigo-600'
                  : 'text-indigo-600 dark:text-white bg-indigo-50 dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4" /> API Integración
            </a>

            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col gap-3 px-4">
              <a
                href="https://factufly.ideatec.com.pe/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-sm font-semibold text-brand-red dark:text-white bg-brand-red/10 dark:bg-white/10 rounded-xl hover:bg-brand-red/20 dark:hover:bg-white/20 transition-all block"
              >
                Ingresar al Sistema
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
