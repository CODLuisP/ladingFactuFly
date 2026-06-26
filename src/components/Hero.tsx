import React, { useState, useEffect } from 'react';
import {
  FileText, Plus, Trash2, Send, MessageSquare, Check, Sparkles,
  ArrowRight, FileSignature, ShieldAlert, CheckCircle2, TrendingUp, Users, Smartphone, Zap, Globe, FileCheck2,
  X, Lightbulb, ArrowUp, Lock
} from 'lucide-react';
import { InvoiceItem, ClientSearchResult } from '../types';
import bgFactufly from '../public/ligth.jpg';
import bgFactuflyDark from '../public/ligth.jpg';
import desktopImg from '../public/desktop.png';
import { useNavigation } from '../context/NavigationContext';

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

  return (
    <section id="hero" className="relative -mt-16 min-h-screen flex flex-col justify-center pt-26 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-brand-light dark:bg-slate-950 transition-colors duration-300">
      {/* Brand background image — light theme */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none opacity-[0.25] dark:hidden mask-[linear-gradient(to_top,#000_25%,rgba(0,0,0,0.85)_48%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.15)_87%,transparent_100%)]"
        style={{ backgroundImage: `url(${bgFactufly})` }}
      />
      {/* Brand background image — dark theme */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none hidden dark:block dark:opacity-[0.035] mask-[linear-gradient(to_top,#000_25%,rgba(0,0,0,0.85)_48%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.15)_87%,transparent_100%)]"
        style={{ backgroundImage: `url(${bgFactuflyDark})` }}
      />
      {/* Theme tint over the image so it stays soft (light only) */}
      <div className="absolute inset-0 bg-slate-50/40 dark:bg-transparent pointer-events-none" />

      {/* Decorative Gradients (light only) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none dark:hidden" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Context Left */}
          <div className="lg:col-span-5 text-center lg:text-left">
            {/* SUNAT Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30 dark:border-emerald-900/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Homologado y Conectado con SUNAT
            </div>

            {/* Impactful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              La facturación electrónica en el Perú,{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent dark:from-indigo-400 dark:via-blue-400 dark:to-teal-400">
                ahora es simple.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Emite Boletas, Facturas y Guías de Remisión en segundos. Conectado con 
              <strong className="text-slate-900 dark:text-white font-semibold"> RENIEC</strong> para búsquedas por DNI, y con 
              <strong className="text-slate-900 dark:text-white font-semibold"> SUNAT</strong> para la validación instantánea de RUC.
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
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/60 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">{'< 1s'}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Emisión Instantánea</span>
              </div>
              <div className="text-center lg:text-left border-x border-slate-200 dark:border-slate-800/60 px-4">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">RENIEC</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">DNI/RUC Automatizado</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">OSE/PSE</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Certificado Incluido</span>
              </div>
            </div>
          </div>

          {/* Interactive SaaS Playground Right */}
          <div id="demo-section" className="lg:col-span-7 w-full">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-950/10 border border-slate-100 dark:border-slate-850 overflow-hidden">
              {/* Header Panel of Mockup */}
              <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                  </div>
                  <img src={desktopImg} alt="FactuFly Dashboard" className="ml-3 h-5 w-auto object-contain" />
                </div>

                {/* Simulated Tab controls */}
                <div className="flex items-center gap-1.5 bg-slate-200/50 dark:bg-slate-900 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('emitir')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'emitir'
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Emitir XML
                  </button>
                  <button
                    onClick={() => setActiveTab('reportes')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'reportes'
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Reportes Live
                  </button>
                  <button
                    onClick={() => setActiveTab('sunat_status')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === 'sunat_status'
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    SUNAT Monitor
                  </button>
                </div>
              </div>

              {/* Sandbox Tab Content */}
              <div className="p-6 min-h-[460px] flex flex-col justify-between relative">
                {errorNotice && (
                  <div className="absolute top-4 left-6 right-6 z-30 p-3.5 bg-rose-600 text-white rounded-2xl text-xs font-bold shadow-lg animate-in slide-in-from-top-2 duration-200 flex items-center justify-between border border-rose-500/30">
                    <span>{errorNotice}</span>
                    <button onClick={() => setErrorNotice(null)} className="font-black bg-rose-700 hover:bg-rose-800 w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer"><X className="w-3 h-3" strokeWidth={3} /></button>
                  </div>
                )}
                
                {/* 1. EMITIR INVOICE PLAYGROUND */}
                {activeTab === 'emitir' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {emissionStep === 'draft' && (
                      <>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                            Simulador de Emisión de Comprobantes
                          </h3>
                          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                            <button
                              onClick={() => setDocType('FACTURA')}
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                docType === 'FACTURA' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              Factura
                            </button>
                            <button
                              onClick={() => setDocType('BOLETA')}
                              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                docType === 'BOLETA' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              Boleta
                            </button>
                          </div>
                        </div>

                        {/* Search RENIEC / SUNAT */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850">
                          <form onSubmit={handleClientSearch} className="flex gap-2">
                            <div className="relative flex-1">
                              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-500 font-mono text-xs">
                                {docType === 'FACTURA' ? 'RUC:' : 'DNI/RUC:'}
                              </span>
                              <input
                                type="text"
                                maxLength={docType === 'FACTURA' ? 11 : 11}
                                placeholder={docType === 'FACTURA' ? 'Ingrese RUC (p.ej. 20554433221)' : 'DNI/RUC (p.ej. 10203040)'}
                                value={clientSearch}
                                onChange={(e) => setClientSearch(e.target.value.replace(/\D/g, ''))}
                                className="w-full pl-14 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-mono"
                              />
                            </div>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
                            >
                              {searchStatus === 'searching' ? 'Buscando...' : 'Consultar'}
                            </button>
                          </form>

                          {/* Client search result feedback */}
                          {selectedClient && (
                            <div className="mt-3 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                              <div className="mt-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 p-1 rounded-md">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">
                                  {selectedClient.name}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  {selectedClient.type}: {selectedClient.documentNumber}
                                  {selectedClient.address && ` | ${selectedClient.address}`}
                                </p>
                              </div>
                            </div>
                          )}

                          {!selectedClient && searchStatus === 'not_found' && (
                            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                              <ShieldAlert className="w-3.5 h-3.5" /> No encontrado. Ingrese un RUC/DNI válido.
                            </p>
                          )}

                          {!selectedClient && searchStatus === 'idle' && (
                            <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 italic flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" /> Tip: Presiona Consultar para simular la API de SUNAT/RENIEC.
                            </p>
                          )}
                        </div>

                        {/* Items Table inside Sandbox */}
                        <div className="border border-slate-100 dark:border-slate-850 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                          <div className="max-h-[140px] overflow-y-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-slate-850">
                                  <th className="p-2.5 pl-4">Descripción</th>
                                  <th className="p-2.5 text-center">Cant.</th>
                                  <th className="p-2.5 text-right">P. Unit</th>
                                  <th className="p-2.5 text-right pr-4">Total</th>
                                  <th className="p-2.5 text-center w-10"></th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                                {items.map((item) => (
                                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-300">
                                    <td className="p-2.5 pl-4 font-medium max-w-[150px] truncate">{item.description}</td>
                                    <td className="p-2.5 text-center font-mono">{item.quantity}</td>
                                    <td className="p-2.5 text-right font-mono">S/ {item.unitPrice.toFixed(2)}</td>
                                    <td className="p-2.5 text-right font-mono pr-4">S/ {(item.quantity * item.unitPrice).toFixed(2)}</td>
                                    <td className="p-2.5 text-center">
                                      <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 p-1 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                {items.length === 0 && (
                                  <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400 dark:text-slate-500 italic">
                                      No hay ítems en el comprobante. Agregue uno abajo.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {/* Quick Item Addition Bar */}
                          <form onSubmit={handleAddItem} className="bg-slate-50/50 dark:bg-slate-950/20 p-2.5 border-t border-slate-100 dark:border-slate-850 grid grid-cols-12 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Ej. Servicio de soporte"
                              value={newItemDesc}
                              onChange={(e) => setNewItemDesc(e.target.value)}
                              className="col-span-6 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs dark:text-white"
                            />
                            <input
                              type="number"
                              required
                              min="1"
                              value={newItemQty}
                              onChange={(e) => setNewItemQty(parseInt(e.target.value) || 1)}
                              className="col-span-2 text-center px-1.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs dark:text-white font-mono"
                            />
                            <input
                              type="number"
                              required
                              min="1"
                              value={newItemPrice}
                              onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
                              className="col-span-2 text-right px-1.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs dark:text-white font-mono"
                            />
                            <button
                              type="submit"
                              className="col-span-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" /> Añadir
                            </button>
                          </form>
                        </div>
                      </>
                    )}

                    {/* Emission Ceremony States */}
                    {emissionStep === 'signing' && (
                      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin flex items-center justify-center" />
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                            <FileSignature className="w-5 h-5 text-blue-500 animate-bounce" />
                            Firmando XML Digitalmente
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                            Generando archivo firmado digitalmente con certificado homologado de Factufly Perú.
                          </p>
                        </div>
                      </div>
                    )}

                    {emissionStep === 'sending' && (
                      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-red-500">
                            SUNAT
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                            Enviando a servidores de SUNAT
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                            Conectando de forma segura para obtener la respuesta de validación CDR.
                          </p>
                        </div>
                      </div>
                    )}

                    {emissionStep === 'completed' && (
                      <div className="space-y-4 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                            <Check className="w-6 h-6" strokeWidth={3} />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full uppercase">
                              CDR ACEPTADO POR SUNAT
                            </span>
                            <h4 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                              {docType === 'FACTURA' ? 'Factura' : 'Boleta'} {emittedNumber}
                            </h4>
                          </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl space-y-1.5 text-xs">
                          <p className="text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Estado de Emisión:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">Firmado & Aceptado</span>
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Hash Digital OSE:</span>
                            <span className="font-mono text-[10px] text-slate-500">b9a7f34cde568a719bf2ce683d789e90</span>
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 flex justify-between">
                            <span>Cliente:</span>
                            <span className="font-medium truncate max-w-[200px]">{selectedClient?.name}</span>
                          </p>
                          <p className="text-slate-900 dark:text-white font-bold flex justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800">
                            <span>Monto Total:</span>
                            <span>S/ {total.toFixed(2)}</span>
                          </p>
                        </div>

                        {/* Interactive sharing */}
                        <div className="space-y-3 pt-2">
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            Enviar comprobante por canales integrados:
                          </p>
                          
                          {/* WhatsApp sender mockup */}
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Smartphone className="absolute left-3 inset-y-0 my-auto w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                placeholder="WhatsApp (ej. 987654321)"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-white"
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (whatsappNumber.length >= 9) {
                                  setWhatsappSent(true);
                                } else {
                                  showError('Ingrese un número telefónico de 9 dígitos');
                                }
                              }}
                              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                whatsappSent ? 'bg-emerald-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              }`}
                            >
                              {whatsappSent ? <Check className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                              {whatsappSent ? 'Enviado' : 'Enviar'}
                            </button>
                          </div>

                          {/* Email sender mockup */}
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Send className="absolute left-3 inset-y-0 my-auto w-4 h-4 text-slate-400" />
                              <input
                                type="email"
                                placeholder="Email (ej. cliente@empresa.pe)"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (emailAddress.includes('@')) {
                                  setEmailSent(true);
                                } else {
                                  showError('Ingrese un correo electrónico válido');
                                }
                              }}
                              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                emailSent ? 'bg-indigo-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                              }`}
                            >
                              {emailSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                              {emailSent ? 'Enviado' : 'Enviar'}
                            </button>
                          </div>
                        </div>

                        {/* Button back */}
                        <div className="pt-2">
                          <button
                            onClick={resetSandbox}
                            className="w-full py-2.5 text-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-indigo-200 dark:border-indigo-900"
                          >
                            Emitir Otro Comprobante (Simulador)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. REPORTE AVANZADO TAB */}
                {activeTab === 'reportes' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <TrendingUp className="w-4.5 h-4.5 text-blue-500" />
                          Dashboard Analítico de Venta
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Resumen integrado de múltiples sucursales
                        </p>
                      </div>

                      {/* Period switches */}
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                        <button
                          onClick={() => setChartPeriod('weekly')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                            chartPeriod === 'weekly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Semana
                        </button>
                        <button
                          onClick={() => setChartPeriod('monthly')}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                            chartPeriod === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          Mensual
                        </button>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Monto Emitido</span>
                        <span className="block text-sm font-black text-slate-900 dark:text-white mt-0.5">S/ 48,250.00</span>
                        <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5"><ArrowUp className="w-2.5 h-2.5" strokeWidth={3} /> +12.4% este mes</span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Documentos</span>
                        <span className="block text-sm font-black text-slate-900 dark:text-white mt-0.5">1,240 XML</span>
                        <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5"><ArrowUp className="w-2.5 h-2.5" strokeWidth={3} /> 99.8% Aceptados</span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl">
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Clientes Unic.</span>
                        <span className="block text-sm font-black text-slate-900 dark:text-white mt-0.5">856 RUC/DNI</span>
                        <span className="text-[9px] text-blue-500 font-bold">RENIEC integrado</span>
                      </div>
                    </div>

                    {/* Interactive Custom SVG Chart */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl relative">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Ventas por {chartPeriod === 'weekly' ? 'Día de la Semana' : 'Meses del Semestre'} (Soles)
                      </p>

                      <div className="h-44 w-full flex items-end justify-between pt-6 px-2 relative">
                        {/* Custom visual horizontal grid lines */}
                        <div className="absolute top-6 left-0 right-0 border-t border-slate-200 dark:border-slate-800/40 pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200 dark:border-slate-800/40 pointer-events-none" />
                        <div className="absolute bottom-6 left-0 right-0 border-t border-slate-200 dark:border-slate-800/40 pointer-events-none" />

                        {activeChartData.map((d, index) => {
                          const percentage = (d.value / maxChartValue) * 100;
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center flex-1 group cursor-pointer relative"
                              onMouseEnter={() => setHoveredDataPoint({ day: d.label, val: d.value, docs: d.docs })}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            >
                              {/* Hover Indicator Box */}
                              <div
                                style={{ height: `${percentage}%` }}
                                className="w-8 sm:w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 hover:from-red-600 hover:to-red-500 dark:hover:from-red-500 dark:hover:to-red-400 transition-all duration-300 relative shadow-md flex items-end justify-center"
                              >
                                <span className="text-[9px] font-bold text-white opacity-0 group-hover:opacity-100 pb-1 transition-opacity">
                                  {d.label}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1.5 font-mono">
                                {d.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Mini Tooltip */}
                      <div className="min-h-[36px] mt-2 flex items-center justify-center">
                        {hoveredDataPoint ? (
                          <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-xl shadow-lg text-xs animate-in fade-in duration-100">
                            <span className="font-bold text-slate-800 dark:text-slate-200">{hoveredDataPoint.day}: </span>
                            <span className="text-blue-600 dark:text-blue-400 font-extrabold font-mono">S/ {hoveredDataPoint.val.toLocaleString()} </span>
                            <span className="text-slate-500 dark:text-slate-400 font-mono">({hoveredDataPoint.docs} comprobantes)</span>
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center italic">
                            Pasa el cursor sobre las barras para ver detalles interactivos.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SUNAT STATUS MONITOR TAB */}
                {activeTab === 'sunat_status' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Globe className="w-4.5 h-4.5 text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
                          Servidor SUNAT & OSE Real-time Monitor
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Estado de los servicios de facturación en Perú
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-ping" /> OPERATIVO
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Services Grid */}
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-300">SUNAT WS - Envío CPE</span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            99.94% <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-300">SUNAT WS - Guías Remisión</span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            99.91% <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-300">OSE Factufly Gateway (Backup)</span>
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            100% <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* OSE Auto-switching logs */}
                      <div className="p-3 bg-slate-900 dark:bg-slate-950 text-slate-200 rounded-xl font-mono text-[10px] space-y-1.5 h-[126px] overflow-y-auto">
                        <p className="text-slate-500">{'['}11:55:01{']'} Initializing CPE pipeline...</p>
                        <p className="text-emerald-400">{'['}11:55:02{']'} Connection to SUNAT WS established.</p>
                        <p className="text-slate-300">{'['}11:55:15{']'} Signed F001-0004128. Signed SHA-256 ok.</p>
                        <p className="text-emerald-400">{'['}11:55:16{']'} SUNAT Response: ACEPTADO CDR OK.</p>
                        <p className="text-slate-400">{'['}11:55:20{']'} AutoSync Queue: 0 pending items.</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-400 flex items-start gap-2.5">
                      <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <p>
                        <strong>Respaldo de OSE Factufly:</strong> Si el sistema de SUNAT se cae o presenta lentitud, Factufly guarda localmente los XMLs firmados de tu negocio, emite el comprobante y los sincroniza automáticamente apenas SUNAT restablece el servicio. ¡Tu negocio nunca se detiene!
                      </p>
                    </div>
                  </div>
                )}

                {/* Sub-footer showing IGV calculation & Emission CTA */}
                {activeTab === 'emitir' && emissionStep === 'draft' && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-0.5">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        Subtotal: <span className="font-mono text-slate-700 dark:text-slate-300">S/ {subtotal.toFixed(2)}</span>
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                        IGV (18% Incl.): <span className="font-mono text-slate-700 dark:text-slate-300">S/ {igv.toFixed(2)}</span>
                      </p>
                      <p className="text-slate-900 dark:text-white font-black text-sm">
                        TOTAL: <span className="font-mono text-blue-600 dark:text-blue-400">S/ {total.toFixed(2)}</span>
                      </p>
                    </div>
                    <button
                      onClick={triggerEmission}
                      className="px-6 py-3.5 text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer transform hover:scale-[1.02]"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      Emitir y Firmar XML SUNAT
                    </button>
                  </div>
                )}

                {/* Generic Tab-footers */}
                {activeTab === 'reportes' && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center flex items-center justify-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" /> Factufly te permite exportar reportes de ventas para declarar a tu contador en formatos XLS, CSV, PDF, o de forma directa mediante nuestra API de facturación electrónica peruana.
                  </p>
                )}

                {activeTab === 'sunat_status' && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500 shrink-0" /> Servidores de respaldo redundantes y distribuidos geográficamente en múltiples zonas en la nube para garantizar una disponibilidad global del 99.99%.
                  </p>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
