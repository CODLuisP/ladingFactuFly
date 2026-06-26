import React, { useState } from 'react';
import {
  Building2, Users, Search, Mail, Smartphone, BarChart3, Code, CheckCircle, XCircle,
  ShieldCheck, ArrowRight, Zap, RefreshCw, KeyRound, Check, Laptop, Copy,
  Hand, FileText, FileSpreadsheet, Package
} from 'lucide-react';
import { ClientSearchResult } from '../types';

// Pre-defined clients for RENIEC / SUNAT Simulator
const MOCK_RENIEC_SUNAT: ClientSearchResult[] = [
  { documentNumber: '10002000', type: 'DNI', name: 'QUISPE MENDOZA, MARIA ALICIA' },
  { documentNumber: '40506070', type: 'DNI', name: 'RODRIGUEZ SANCHEZ, JUAN LUIS' },
  { documentNumber: '20100114211', type: 'RUC', name: 'TELEFÓNICA DEL PERÚ S.A.A.', address: 'Av. Arequipa 1155, Lima', status: 'ACTIVO', ubigeo: 'LIMA - LIMA - LIMA' },
  { documentNumber: '20215412478', type: 'RUC', name: 'TIENDAS POR DEPARTAMENTO RIPLEY S.A.', address: 'Av. Las Begonias 545, San Isidro', status: 'ACTIVO', ubigeo: 'LIMA - LIMA - SAN ISIDRO' },
];

export default function Features() {
  // Feature Subsections Active States
  const [activeBranch, setActiveBranch] = useState<'miraflores' | 'san_isidro' | 'arequipa'>('miraflores');
  const [activeRole, setActiveRole] = useState<'admin' | 'facturador' | 'contador'>('admin');
  
  // RENIEC search simulator state
  const [searchDoc, setSearchDoc] = useState('');
  const [searchResult, setSearchResult] = useState<ClientSearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchAlert, setSearchAlert] = useState<string | null>(null);

  // Email/WhatsApp simulated phone active template
  const [notificationType, setNotificationType] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleReniecSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchDoc.trim()) return;

    setSearching(true);
    setSearchAlert(null);
    setSearchResult(null);

    setTimeout(() => {
      setSearching(false);
      const found = MOCK_RENIEC_SUNAT.find(item => item.documentNumber === searchDoc.trim());
      if (found) {
        setSearchResult(found);
      } else {
        const isRuc = searchDoc.length === 11;
        const isDni = searchDoc.length === 8;

        if (isRuc) {
          setSearchResult({
            documentNumber: searchDoc,
            type: 'RUC',
            name: `AGROINDUSTRIAS ${searchDoc.substring(3, 7)} DEL PERÚ S.A.C.`,
            address: 'Panamericana Sur Km 14.5, Villa El Salvador, Lima',
            status: 'ACTIVO',
            ubigeo: 'LIMA - LIMA - VILLA EL SALVADOR'
          });
        } else if (isDni) {
          setSearchResult({
            documentNumber: searchDoc,
            type: 'DNI',
            name: `HUAMAN ALVAREZ, ROSA ELVIRA`
          });
        } else {
          setSearchAlert('Formato incorrecto. Ingrese DNI (8 dígitos) o RUC (11 dígitos).');
        }
      }
    }, 600);
  };

  // Branch data
  const BRANCHES_DATA = {
    miraflores: {
      address: 'Av. Larco 450, Miraflores - Lima',
      series: 'Facturas: F001 | Boletas: B001 | Guías: T001',
      users: 4,
      monthlySales: 'S/ 38,400.00',
      uptime: '99.98%'
    },
    san_isidro: {
      address: 'Av. Andrés Reyes 320, San Isidro - Lima',
      series: 'Facturas: F002 | Boletas: B002 | Guías: T002',
      users: 6,
      monthlySales: 'S/ 54,120.00',
      uptime: '100%'
    },
    arequipa: {
      address: 'Calle Mercaderes 112, Centro Histórico - Arequipa',
      series: 'Facturas: F003 | Boletas: B003 | Guías: T003',
      users: 3,
      monthlySales: 'S/ 19,850.00',
      uptime: '99.95%'
    }
  };

  // Roles permissions data
  const ROLES_PERMISSIONS = {
    admin: {
      desc: 'Acceso total y configuración global del sistema de facturación.',
      perms: [
        { name: 'Emitir Boletas y Facturas', ok: true },
        { name: 'Configurar Sucursales y Series', ok: true },
        { name: 'Crear y Eliminar Usuarios', ok: true },
        { name: 'Descargar Reportes Contables', ok: true },
        { name: 'Configurar API Keys de Integración', ok: true },
      ]
    },
    facturador: {
      desc: 'Enfocado en la venta del día a día y cobranzas directas.',
      perms: [
        { name: 'Emitir Boletas y Facturas', ok: true },
        { name: 'Configurar Sucursales y Series', ok: false },
        { name: 'Crear y Eliminar Usuarios', ok: false },
        { name: 'Descargar Reportes Contables', ok: false },
        { name: 'Configurar API Keys de Integración', ok: false },
      ]
    },
    contador: {
      desc: 'Acceso a métricas de impuestos, descargas XML/XLSX y auditorías.',
      perms: [
        { name: 'Emitir Boletas y Facturas', ok: false },
        { name: 'Configurar Sucursales y Series', ok: false },
        { name: 'Crear y Eliminar Usuarios', ok: false },
        { name: 'Descargar Reportes Contables', ok: true },
        { name: 'Configurar API Keys de Integración', ok: false },
      ]
    }
  };

  return (
    <section id="caracteristicas" className="py-20 bg-brand-light dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Zap className="w-4.5 h-4.5" /> Características de Factufly
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            Todo lo que necesitas para escalar la gestión de tu negocio
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Diseñamos una plataforma intuitiva y de alto rendimiento que cumple con el 100% de las exigencias tributarias, automatizando las tareas administrativas más complejas.
          </p>
        </div>

        {/* Feature Bento Grid (Interactive Components) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. CLIENTS CONNECTED WITH RENIEC/SUNAT (Interactive Simulator) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Búsqueda Automatizada RENIEC y SUNAT
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Olvídate de digitar nombres o direcciones manualmente. Al ingresar un número de DNI o RUC, Factufly se conecta automáticamente con RENIEC y SUNAT para recuperar los datos validados al instante.
              </p>

              {/* RENIEC Search Sandbox Widget */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-850/80">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pruébalo aquí (Simulador en Tiempo Real)</span>
                
                <form onSubmit={handleReniecSearch} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={11}
                    value={searchDoc}
                    onChange={(e) => setSearchDoc(e.target.value.replace(/\D/g, ''))}
                    placeholder="Escribe DNI o RUC (ej: 40506070 o 20100114211)"
                    className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    {searching ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Buscar'}
                  </button>
                </form>

                {searchAlert && (
                  <p className="text-[11px] text-red-500 font-medium mt-2 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 shrink-0" /> {searchAlert}
                  </p>
                )}

                {searchResult && (
                  <div className="mt-4 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1.5 text-xs animate-in slide-in-from-top-2 duration-200">
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      {searchResult.name}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      Tipo: <span className="font-bold">{searchResult.type}</span> | Documento: <span className="font-bold">{searchResult.documentNumber}</span>
                    </p>
                    {searchResult.address && (
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        <strong>Dirección:</strong> {searchResult.address}
                      </p>
                    )}
                    {searchResult.status && (
                      <div className="flex gap-2 pt-1">
                        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          Estado: {searchResult.status}
                        </span>
                        <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                          Habido: SÍ
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sincronizado con bases oficiales del estado
            </div>
          </div>

          {/* 2. MULTISUCURSAL (Interactive Branch Switcher) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Facturación Multisucursal Inteligente
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Centraliza múltiples locales bajo un mismo RUC. Configura series de comprobantes personalizadas por cada establecimiento y supervisa las ventas en tiempo real sin salir de la plataforma central.
              </p>

              {/* Branch Selector Interactive Widget */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-850/80">
                <div className="flex gap-1 bg-slate-200/60 dark:bg-slate-900 p-1 rounded-xl">
                  {Object.keys(BRANCHES_DATA).map((key) => {
                    const isActive = activeBranch === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveBranch(key as any)}
                        className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                          isActive ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {key.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>

                {/* Display branch metrics */}
                <div className="mt-4 space-y-2.5 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in duration-200">
                  <p className="flex justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-1.5">
                    <span className="text-slate-400">Dirección Física:</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">{BRANCHES_DATA[activeBranch].address}</span>
                  </p>
                  <p className="flex justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-1.5">
                    <span className="text-slate-400">Series Autorizadas:</span>
                    <span className="font-mono font-bold text-red-600 dark:text-red-400">{BRANCHES_DATA[activeBranch].series}</span>
                  </p>
                  <p className="flex justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-1.5">
                    <span className="text-slate-400">Usuarios Activos:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{BRANCHES_DATA[activeBranch].users} cajeros</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Ventas Facturadas:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{BRANCHES_DATA[activeBranch].monthlySales} / mes</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Control absoluto de tucursales e inventario
            </div>
          </div>

          {/* 3. GESTIÓN DE PERMISOS POR USUARIO (Interactive Role Visualizer) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Permisos y Roles de Usuario
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Protege tu información comercial. Limita el acceso a reportes confidenciales otorgando roles específicos para vendedores, administradores y contadores externos.
              </p>

              {/* Roles Selector Widget */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-850/80">
                <div className="grid grid-cols-3 gap-1 bg-slate-200/60 dark:bg-slate-900 p-1 rounded-xl mb-3">
                  {(['admin', 'facturador', 'contador'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveRole(role)}
                      className={`text-[10px] text-center py-1.5 font-bold rounded-lg transition-all capitalize cursor-pointer ${
                        activeRole === role ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 italic">
                  &ldquo;{ROLES_PERMISSIONS[activeRole].desc}&rdquo;
                </p>

                {/* Permissions Check List */}
                <div className="space-y-1.5 text-[11px]">
                  {ROLES_PERMISSIONS[activeRole].perms.map((perm, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">{perm.name}</span>
                      {perm.ok ? (
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={3} />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Auditoría total de acciones del usuario
            </div>
          </div>

          {/* 4. SEND COMPROBANTES BY WHATSAPP AND EMAIL (Interactive Mockup) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Envío por Email y WhatsApp
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Sin descargas previas ni reenvíos engorrosos. Envía facturas y boletas directamente a los celulares o bandejas de tus clientes mediante flujos automáticos desde el sistema.
              </p>

              {/* Simulated Phone Notification Screen */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-850/80">
                <div className="flex gap-2 justify-center mb-3">
                  <button
                    onClick={() => setNotificationType('whatsapp')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer ${
                      notificationType === 'whatsapp' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    WhatsApp Template
                  </button>
                  <button
                    onClick={() => setNotificationType('email')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer ${
                      notificationType === 'email' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Email PDF
                  </button>
                </div>

                {/* Display phone content */}
                {notificationType === 'whatsapp' ? (
                  <div className="bg-emerald-50 dark:bg-slate-950 border border-emerald-200/50 p-2.5 rounded-xl space-y-1.5 font-sans text-[10px] text-slate-700 dark:text-slate-300">
                    <p className="font-bold text-emerald-700 dark:text-emerald-400">Factufly Notificaciones</p>
                    <p className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-emerald-100 dark:border-emerald-950 leading-relaxed text-slate-800 dark:text-slate-300">
                      Hola <strong>CARLOS MENDOZA</strong> <Hand className="inline w-3 h-3 text-amber-500 align-text-bottom" />, tu <strong>Factura F001-0004128</strong> ha sido emitida con éxito por S/ 150.00. Descarga tu PDF y XML oficial aquí: <span className="text-blue-500 font-mono">f.pe/F001-4128</span>
                    </p>
                  </div>
                ) : (
                  <div className="bg-indigo-50/50 dark:bg-slate-950 border border-indigo-200/50 p-2.5 rounded-xl space-y-1 text-[10px] text-slate-700 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">De: comprobantes@factufly.pe</p>
                    <p className="font-semibold text-slate-900 dark:text-white">Asunto: Nuevo Comprobante de Pago Electrónico</p>
                    <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-850 mt-1.5 text-slate-800 dark:text-slate-400">
                      <p>Estimado Carlos, adjuntamos los archivos correspondientes a su Boleta de Venta Electrónica.</p>
                      <div className="mt-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded flex items-center justify-between text-[9px] text-slate-500">
                        <span className="flex items-center gap-1.5"><FileText className="w-3 h-3 text-red-500" /> CPE-B001-0012942.PDF (34KB)</span>
                        <span className="text-blue-500 font-bold">Ver</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Notificaciones instantáneas garantizadas
            </div>
          </div>

          {/* 5. ADVANCED REPORTS (Interactive Chart Selector) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Reportes y Descarga Contable
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Exporta la información de tus ventas de forma limpia y ordenada. Descarga reportes agrupados por mes, día o por producto, listos para enviar a tu contador en formato Excel o CSV.
              </p>

              {/* Graphic element showing report files download simulation */}
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-850/80 space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Exportación Contable Autorizada</span>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs cursor-pointer hover:border-indigo-500 transition-colors">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Reporte Tributario Mensual (Excel)</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">XLSX</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs cursor-pointer hover:border-indigo-500 transition-colors">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-indigo-600" /> Registro de Ventas Oficial (Ple)</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">TXT</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 flex items-center justify-between text-xs cursor-pointer hover:border-blue-500 transition-colors">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Consolidado CDR Aceptado (Sunat)</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">ZIP</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Reportes con formato oficial para SUNAT
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
