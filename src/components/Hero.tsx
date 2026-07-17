import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  FileText, Plus, Trash2, Send, MessageSquare, Check, Sparkles,
  ArrowRight, FileSignature, ShieldAlert, CheckCircle2, TrendingUp, Users, Smartphone, Zap, Globe, FileCheck2,
  X, Lightbulb, ArrowUp, Lock
} from 'lucide-react';
import { InvoiceItem, ClientSearchResult } from '../types';
import bgFactufly from '../public/ligth.jpg';
import bgFactuflyDark from '../public/ligth.jpg';
import videofondo from '../public/videofondo.mp4';
import videodark from '../public/dark.mp4';
import desktopImg from '../public/luis.png';
import fondoDark from '../public/fondodark.jpeg';
import desktopDark from '../public/desktop.png';
import sunatLogo from '../public/sunat.png';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

// Pre-defined clients for RENIEC / SUNAT Simulator
const SIMULATED_CLIENTS: ClientSearchResult[] = [
  { documentNumber: '10203040', type: 'DNI', name: 'CASTRO ALVAREZ, SOPHIA' },
  { documentNumber: '44556677', type: 'DNI', name: 'MENDOZA RUIZ, CARLOS' },
  { documentNumber: '20100100101', type: 'RUC', name: 'SUNAT PERÚ S.A.', address: 'Av. Garcilaso de la Vega 1472, Lima', status: 'ACTIVO', ubigeo: 'LIMA - LIMA - LIMA' },
  { documentNumber: '20554433221', type: 'RUC', name: 'INVERSIONES TECNOLÓGICAS FACTUFLY S.A.C.', address: 'Jr. de la Unión 321, Lima', status: 'ACTIVO', ubigeo: 'LIMA - LIMA - LIMA' },
  { documentNumber: '20601234567', type: 'RUC', name: 'ALIMENTOS Y BEBIDAS DEL SUR E.I.R.L.', address: 'Av. El Sol 450, Cusco', status: 'ACTIVO', ubigeo: 'CUSCO - CUSCO - CUSCO' },
];

export default function Hero() {
  const { scrollToSection } = useNavigation();
  const { darkMode } = useTheme();

  // ===== Container Scroll Animation (3D tilt → flat) para el dashboard en dark =====
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'center start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  // Entra inclinada (40 → 0) y luego se eleva para tapar el texto antes de que el sticky se suelte
  const translateY = useTransform(scrollYProgress, [0, 0.4, 1], [40, 0, -320]);
  // Playground dashboard states
  const [activeTab, setActiveTab] = useState<'emitir' | 'reportes' | 'sunat_status'>('emitir');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  
  const showError = (msg: string) => {
    setErrorNotice(msg);
    setTimeout(() => {
      setErrorNotice(current => current === msg ? null : current);
    }, 4000);
  };
  
  // Invoice state
  const [docType, setDocType] = useState<'BOLETA' | 'FACTURA'>('FACTURA');
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientSearchResult | null>({
    documentNumber: '20554433221',
    type: 'RUC',
    name: 'INVERSIONES TECNOLÓGICAS FACTUFLY S.A.C.',
    address: 'Jr. de la Unión 321, Lima',
    status: 'ACTIVO'
  });
  const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
  
  // Invoice items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Licencia Factufly ERP - Suscripción Anual', quantity: 1, unitPrice: 450 },
    { id: '2', description: 'Consultoría e Implementación SUNAT / OSE', quantity: 1, unitPrice: 150 },
  ]);

  // Invoice emission wizard state
  const [emissionStep, setEmissionStep] = useState<'draft' | 'signing' | 'sending' | 'completed'>('draft');
  const [emittedNumber, setEmittedNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Item input states for sandbox
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(50);

  // SVG Chart interactive state
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ day: string; val: number; docs: number } | null>(null);

  // Search RENIEC / SUNAT Simulation
  const handleClientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientSearch.trim()) return;

    setSearchStatus('searching');
    setTimeout(() => {
      const found = SIMULATED_CLIENTS.find(c => c.documentNumber === clientSearch.trim());
      if (found) {
        setSelectedClient(found);
        setSearchStatus('found');
      } else {
        // Generate random plausible name
        const isRuc = clientSearch.length === 11;
        const isDni = clientSearch.length === 8;
        if (isRuc) {
          const generatedRuc: ClientSearchResult = {
            documentNumber: clientSearch,
            type: 'RUC',
            name: `CONSTRUCTORA Y SERVICIOS INTEGRALES ${clientSearch.substring(4, 8)} S.A.C.`,
            address: 'Av. Javier Prado Este 2540, San Borja, Lima',
            status: 'ACTIVO',
            ubigeo: 'LIMA - LIMA - SAN BORJA'
          };
          setSelectedClient(generatedRuc);
          setSearchStatus('found');
        } else if (isDni) {
          const generatedDni: ClientSearchResult = {
            documentNumber: clientSearch,
            type: 'DNI',
            name: `GARCIA PALOMINO, ALEJANDRO ${clientSearch.substring(4, 7)}`
          };
          setSelectedClient(generatedDni);
          setSearchStatus('found');
        } else {
          setSearchStatus('not_found');
          setSelectedClient(null);
        }
      }
    }, 800);
  };

  // Add Item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemDesc.trim()) return;
    const item: InvoiceItem = {
      id: Date.now().toString(),
      description: newItemDesc,
      quantity: newItemQty,
      unitPrice: newItemPrice
    };
    setItems([...items, item]);
    setNewItemDesc('');
    setNewItemQty(1);
    setNewItemPrice(50);
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculation
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  // Invoice emission timeline
  const triggerEmission = () => {
    if (!selectedClient) {
      showError('Por favor, busque y seleccione un cliente con DNI o RUC primero.');
      return;
    }
    if (items.length === 0) {
      showError('Agregue al menos un producto o servicio.');
      return;
    }

    setEmissionStep('signing');
    
    // Simulate SUNAT/OSE Web-Service Handshake
    setTimeout(() => {
      setEmissionStep('sending');
      setTimeout(() => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const prefix = docType === 'FACTURA' ? 'F001' : 'B001';
        setEmittedNumber(`${prefix}-${randomNum.toString().padStart(8, '0')}`);
        setEmissionStep('completed');
      }, 1000);
    }, 1200);
  };

  // Reset Sandbox
  const resetSandbox = () => {
    setEmissionStep('draft');
    setWhatsappSent(false);
    setEmailSent(false);
    setWhatsappNumber('');
    setEmailAddress('');
  };

  // Render SVG Charts dynamically
  const weeklyData = [
    { label: 'Lun', value: 1200, docs: 12 },
    { label: 'Mar', value: 1900, docs: 18 },
    { label: 'Mié', value: 1400, docs: 15 },
    { label: 'Jue', value: 2600, docs: 24 },
    { label: 'Vie', value: 3200, docs: 31 },
    { label: 'Sáb', value: 1500, docs: 14 },
    { label: 'Dom', value: 800, docs: 8 },
  ];

  const monthlyData = [
    { label: 'Ene', value: 14500, docs: 130 },
    { label: 'Feb', value: 18900, docs: 172 },
    { label: 'Mar', value: 24200, docs: 215 },
    { label: 'Abr', value: 29800, docs: 260 },
    { label: 'May', value: 34500, docs: 310 },
    { label: 'Jun', value: 41200, docs: 395 },
  ];

  const activeChartData = chartPeriod === 'weekly' ? weeklyData : monthlyData;
  const maxChartValue = Math.max(...activeChartData.map(d => d.value));

  // ===== DARK: Container Scroll Animation (tilt 3D → plano) + tarjeta que sube tapando el texto =====
  if (darkMode) {
    return (
      <section id="hero" className="relative -mt-16 bg-[#05070f]">
        {/* Pista de scroll: el texto queda fijo mientras el dashboard sube encima */}
        <div className="relative pb-[100px]">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
            {/* Fondo */}
            <img
              src={fondoDark}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* Viñeta para fundir el fondo con la sección */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070f]/70 via-transparent to-[#05070f] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070f] via-transparent to-[#05070f] pointer-events-none" />

            <div className="relative w-full max-w-4xl mx-auto px-6 -mt-70 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full text-xs font-medium text-white/80 border border-white/15 bg-white/5 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                100% Homologado y Conectado con SUNAT
              </div>

              {/* Titular */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                La facturación electrónica en el Perú,{' '}
                <span className="italic font-serif font-normal text-white/95">ahora es simple.</span>
              </h1>

              {/* Subtítulo */}
              <p className="text-[15px] text-white/60 max-w-lg mx-auto leading-relaxed mb-9">
                Emite Boletas, Facturas y Guías de Remisión en segundos. Homologado por{' '}
                <img src={sunatLogo} alt="SUNAT" className="inline h-4 align-middle mx-0.5" /> cero multas garantizado.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => scrollToSection('planes')}
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full shadow-lg shadow-blue-900/40 transition-all cursor-pointer border border-white/20"
                >
                  Comienza Gratis
                </button>
                <button
                  onClick={() => scrollToSection('demo-section')}
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-white rounded-full transition-all cursor-pointer"
                >
                  Probar Simulador
                </button>
              </div>
            </div>
          </div>

          {/* Container Scroll Animation: la tarjeta arranca al pie, se aplana y sube tapando el texto */}
          <div
            id="demo-section"
            ref={scrollRef}
            className="relative z-20 w-full max-w-6xl mx-auto px-6 -mt-[35vh]"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{
                rotateX,
                scale,
                translateY,
                transformStyle: 'preserve-3d',
                boxShadow:
                  '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -15px rgba(59,130,246,0.35)',
              }}
              className="rounded-2xl border border-white/10 bg-[#080b16] p-2 will-change-transform"
            >
              <img
                src={desktopDark}
                alt="FactuFly Dashboard"
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative -mt-16 min-h-screen flex flex-col justify-center pt-26 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-brand-light dark:bg-[#000814] transition-colors duration-300">
      {/* Video de fondo — light */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60 dark:hidden"
        src={videofondo}
        autoPlay
        loop
        muted
        ref={el => { if (el) el.playbackRate = 0.6; }}
        playsInline
      />
      {/* Video de fondo — dark */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 hidden dark:block"
        src={videodark}
        autoPlay
        loop
        muted
        ref={el => { if (el) el.playbackRate = 0.6; }}
        playsInline
      />
      {/* Overlay suave sobre el video */}
      <div className="absolute inset-0 bg-brand-light/60 dark:bg-[#000814]/50 pointer-events-none" />

      {/* Decorative Gradients (light only) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none dark:hidden" />

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Context Left */}
          <div className="lg:col-span-5 text-center lg:text-left">
            {/* SUNAT Badge */}
            <div className="inline-flex items-center gap-1.5 py-1.5 rounded-full text-xs font-semibold   text-emerald-700 dark:text-emerald-400   mb-6">
             
              100% Homologado y Conectado con SUNAT
            </div>

            {/* Impactful Headline */}
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              La facturación electrónica en el Perú,{' '}
              <span className="text-[#a80a0a] dark:text-[#e05555]">
                ahora es simple.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Emite Boletas, Facturas, Guías de Remisión y otros comprobantes en segundos. Homologado por{' '}
              <img src={sunatLogo} alt="SUNAT" className="inline h-4 align-middle mx-0.5" /> cero multas garantizado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button
                onClick={() => scrollToSection('planes')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-750 rounded-2xl shadow-xl shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border border-indigo-600/10"
              >
                Comienza Gratis <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => scrollToSection('demo-section')}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Probar Simulador
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">{'< 20s'}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Emisión Instantánea</span>
              </div>
              <div className="text-center lg:text-left px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">RENIEC</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">DNI/RUC Automatizado</span>
              </div>
              <div className="text-center lg:text-left px-4 py-3 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/60 dark:border-white/10">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">OSE/PSE</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Certificado Incluido</span>
              </div>
            </div>
          </div>

          {/* Desktop Screenshot Right */}
          <div id="demo-section" className="lg:col-span-7 w-full  px-10">
            <div className="relative rounded-3xl  overflow-hidden">
              {/* Desktop Screenshot */}
              <img src={desktopImg} alt="FactuFly Dashboard" className="w-full h-auto object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
