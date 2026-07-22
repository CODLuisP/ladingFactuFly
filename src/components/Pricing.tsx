import React, { useState } from 'react';
import { Check, Info, Infinity as InfinityIcon, MessageCircle } from 'lucide-react';

const INCLUDED = [
  'Boletas, Facturas, Notas de Crédito y Débito, y Guías de Remisión',
  'Comprobantes electrónicos ilimitados',
  'Sucursales ilimitadas',
  'Usuarios ilimitados con roles y permisos',
  'Punto de venta (POS) e inventario con código de barras',
  'Consulta automática RENIEC / SUNAT (DNI, RUC y CE)',
  'Envío por WhatsApp y Email',
  'Ticketera térmica de 58 mm y 80 mm',
  'Tipo de cambio S/ → $ para emitir en dólares',
  'IGV configurable (18 % o 10.5 %)',
  'Reportes y control de caja (Excel, CSV y PDF)',
  'Certificado Digital SUNAT incluido gratis',
];

const UNLIMITED = [
  { label: 'Comprobantes' },
  { label: 'Sucursales' },
  { label: 'Usuarios' },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const goToContact = () => {
    const el = document.getElementById('footer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="planes" className="py-20 bg-brand-light dark:bg-surface-dark-2 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Un solo plan, con todo incluido
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Un único precio con <span className="font-semibold text-slate-900 dark:text-white">comprobantes, sucursales y usuarios ilimitados</span>. Certificado digital gratis y homologado al 100%, sin costos ocultos.
          </p>

          {/* Toggle Mensual / Anual */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-900 rounded-2xl border border-slate-200/20 dark:border-slate-800/20">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                billingPeriod === 'monthly' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                billingPeriod === 'annual' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pago Anual
              <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Ahorra
              </span>
            </button>
          </div>
        </div>

        {/* Plan único */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-indigo-200/60 dark:border-indigo-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-500/5 overflow-hidden grid grid-cols-1 md:grid-cols-2">

            {/* Izquierda: propuesta + CTA */}
            <div className="p-8 sm:p-9 flex flex-col justify-between bg-gradient-to-br from-indigo-50/60 to-white dark:from-indigo-950/20 dark:to-slate-900 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-400/20 bg-white/70 dark:bg-indigo-500/10">
                  Plan único · Todo incluido
                </span>

                <h3 className="mt-5 text-2xl font-extrabold text-slate-900 dark:text-white">FactuFly Completo</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Todas las funciones, sin límites, con {billingPeriod === 'monthly' ? 'un precio fijo mensual' : 'un precio fijo anual'}. Nada de niveles ni funciones bloqueadas.
                </p>

                {/* Ilimitados */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {UNLIMITED.map((u) => (
                    <div key={u.label} className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-3 text-center">
                      <InfinityIcon className="w-5 h-5 mx-auto text-indigo-600 dark:text-indigo-400" />
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{u.label}</span>
                    </div>
                  ))}
                </div>

                {/* Precio → asesor */}
                <div className="mt-6 rounded-2xl bg-white dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800 p-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Precio único, conversado contigo</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Definimos el precio de tu {billingPeriod === 'monthly' ? 'plan mensual' : 'plan anual'} según tu negocio. Escríbenos y un asesor te lo explica al detalle.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={goToContact}
                  className="w-full py-3.5 px-4 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Conversar con un asesor
                </button>
                <p className="mt-2 text-[11px] text-center text-slate-400 dark:text-slate-500">
                  Sin costos de instalación ocultos · Certificado digital gratis
                </p>
              </div>
            </div>

            {/* Derecha: todo lo que incluye */}
            <div className="p-8 sm:p-9 dark:bg-surface-dark-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
                Todo lo que incluye (sin excepciones)
              </p>
              <ul className="space-y-3">
                {INCLUDED.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="p-0.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-md shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nota: certificado propio */}
        <div className="mt-10 max-w-4xl mx-auto p-4 bg-indigo-50/30 dark:bg-slate-900/40 border border-indigo-200/20 dark:border-indigo-900/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-5 h-5 text-indigo-500 shrink-0" />
          <p className="leading-relaxed text-center sm:text-left">
            <strong>¿Ya tienes tu propio Certificado Digital?</strong> Si prefieres usar tu propia firma emitida por cualquier Entidad de Registro autorizada en el Perú, puedes cargar tu archivo PFX/P12 en el panel de FactuFly sin ningún costo adicional.
          </p>
        </div>

      </div>
    </section>
  );
}
