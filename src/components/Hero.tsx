import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

import { InvoiceItem, ClientSearchResult } from '../types';

import fondoDark from '../public/fondodark.jpg';
import fondoLight from '../public/fondoligth.jpg';
import desktopDark from '../public/desktopdark.webp';
import desktopLight from '../public/desktopligth.webp';
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

  // ===== Container Scroll Animation (3D tilt → plano) para el dashboard en dark =====
  // La imagen va absoluta dentro del escenario sticky; el progreso se mide sobre
  // la pista de scroll (start→end del pineado). Al no estar en el flujo, no deja hueco.
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });
  // Precarga las dos imágenes del dashboard para que el cambio de modo sea instantáneo
  // (cada PNG pesa ~6.5 MB y, si no, recién se descarga al togglear).
  useEffect(() => {
    [desktopDark, desktopLight, fondoDark, fondoLight].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const rotateX = useTransform(scrollYProgress, [0, 0.4], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  // Peek abajo → se aplana → sube hasta CENTRARSE tapando el texto (en 0.85 y se mantiene).
  // El valor final (16vh) deja el mismo espacio arriba y abajo, en vez de fondo muerto abajo.
  const imageY = useTransform(scrollYProgress, [0, 0.4, 0.85], ['58vh', '46vh', '16vh']);
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
    { id: '2', description: 'Consultoría e Implementación SUNAT', quantity: 1, unitPrice: 150 },
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
    
    // Simulate SUNAT Web-Service Handshake
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
      <section id="hero" className="relative -mt-16 bg-surface-dark-1">
        {/* Pista de scroll: su altura define cuánto dura el pineado y la animación */}
        <div ref={scrollRef} className="relative h-[135vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Fondo */}
            <img
              src={fondoDark}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* Viñeta para fundir el fondo con la sección */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface-dark-1/70 via-transparent to-surface-dark-1 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-1 via-transparent to-surface-dark-1 pointer-events-none" />

            {/* Texto (fijo, centrado) */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl mx-auto px-6 -mt-82 text-center">
                {/* Badge */}
                {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full text-xs font-medium text-white/80 border border-white/15 bg-white/5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  100% Homologado y Conectado con SUNAT
                </div> */}

                {/* Titular */}
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
                >
                  Tu punto de venta y facturación electrónica,{' '}
                  <span className="italic font-serif font-normal text-white/95">ahora en un solo sistema.</span>
                </motion.h1>

                {/* Subtítulo */}
                <motion.p
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[15px] font-semibold text-slate-300 max-w-xl mx-auto leading-relaxed mb-8"
                >
                  Vende, cobra y emite boletas, facturas y guías en segundos — con control de inventario y reportes. Homologado por{' '}
                  <img src={sunatLogo} alt="SUNAT" className="inline h-6 align-middle mx-0.5" />{' '}
                  <span className="font-extrabold text-white">SUNAT</span>, cero multas.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <button
                    onClick={() => scrollToSection('planes')}
                    className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full shadow-lg shadow-blue-900/40 transition-all cursor-pointer border border-white/20"
                  >
                    Comienza Gratis
                  </button>
                  <a
                    href="https://factufly.ideatec.com.pe/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-white rounded-full transition-all cursor-pointer text-center inline-block"
                  >
                    Ingresar al Sistema
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Dashboard: absoluto dentro del escenario. Arranca abajo (peek), se aplana y
                sube tapando el texto. Al no estar en el flujo, no deja hueco al terminar. */}
            <div
              id="demo-section"
              className="absolute z-20 inset-x-0 top-0 w-full max-w-6xl mx-auto px-6 pointer-events-none"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                style={{
                  rotateX,
                  scale,
                  y: imageY,
                  transformStyle: 'preserve-3d',
                }}
                className="will-change-transform"
              >
                {/* Sin caja rectangular: el drop-shadow respeta la transparencia del PNG,
                    así el borde/sombra sigue la silueta real (ventana, impresora y celular). */}
                <img
                  src={desktopDark}
                  alt="FactuFly Dashboard"
                  className="w-full h-auto"
                  style={{
                    filter:
                      'drop-shadow(0 24px 34px rgba(0,0,0,0.65)) drop-shadow(0 0 34px rgba(59,130,246,0.28))',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===== LIGHT: mismo layout/animación que el dark, con fondo claro (fondoligth) =====
  return (
    <section id="hero" className="relative -mt-16 bg-[#eef3fc]">
      {/* Pista de scroll: su altura define cuánto dura el pineado y la animación */}
      <div ref={scrollRef} className="relative h-[135vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Fondo */}
          <img
            src={fondoLight}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          {/* Viñeta para fundir el fondo con la sección */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3fc]/70 via-transparent to-[#eef3fc] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef3fc] via-transparent to-[#eef3fc] pointer-events-none" />

          {/* Texto (fijo, centrado) */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-6 -mt-82 text-center">
              {/* Badge */}
              {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full text-xs font-medium text-slate-700 border border-slate-300/70 bg-white/70 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                100% Homologado y Conectado con SUNAT
              </div> */}

              {/* Titular */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
              >
                Tu punto de venta y facturación electrónica,{' '}
                <span className="italic font-serif font-normal text-slate-900/90">ahora en un solo sistema.</span>
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-[15px] font-semibold text-slate-700 max-w-xl mx-auto leading-relaxed mb-8"
              >
                Vende, cobra y emite boletas, facturas y guías en segundos  con control de inventario y reportes. Homologado por{' '}
                <img src={sunatLogo} alt="SUNAT" className="inline h-6 align-middle mx-0.5" />{' '}
                <span className="font-extrabold text-blue-900">SUNAT</span>, cero multas.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <button
                  onClick={() => scrollToSection('planes')}
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full shadow-lg shadow-blue-600/25 transition-all cursor-pointer border border-blue-700/20"
                >
                  Comienza Gratis
                </button>
                <a
                  href="https://factufly.ideatec.com.pe/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50 rounded-full transition-all cursor-pointer border border-slate-200 text-center inline-block"
                >
                  Ingresar al Sistema
                </a>
              </motion.div>
            </div>
          </div>

          {/* Dashboard: absoluto dentro del escenario. Arranca abajo (peek), se aplana y
              sube tapando el texto. Al no estar en el flujo, no deja hueco al terminar. */}
          <div
            id="demo-section"
            className="absolute z-20 inset-x-0 top-0 w-full max-w-6xl mx-auto px-6 pointer-events-none"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{
                rotateX,
                scale,
                y: imageY,
                transformStyle: 'preserve-3d',
              }}
              className="will-change-transform"
            >
              {/* Sin caja rectangular: el drop-shadow respeta la transparencia del PNG,
                  así el borde/sombra sigue la silueta real (ventana, impresora y celular). */}
              <img
                src={desktopLight}
                alt="FactuFly Dashboard"
                className="w-full h-auto"
                style={{
                  filter:
                    'drop-shadow(0 24px 34px rgba(37,99,235,0.22)) drop-shadow(0 0 30px rgba(59,130,246,0.20))',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
