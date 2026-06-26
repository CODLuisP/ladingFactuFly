import React, { useState } from 'react';
import { Check, Info, ShieldAlert, Sparkles, Building2, Smartphone, Users, Zap } from 'lucide-react';
import { PricingPlan } from '../types';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanModal, setSelectedPlanModal] = useState<{name: string; period: string} | null>(null);

  const plans: PricingPlan[] = [
    {
      name: 'Emprendedor',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'Ideal para profesionales independientes, consultores y emprendimientos que recién comienzan.',
      features: [
        'Hasta 100 Comprobantes / mes',
        '1 Sucursal autorizada',
        '1 Usuario (Cajero)',
        'Boletas y Facturas ilimitadas',
        'Certificado Digital GRATIS incluido',
        'Consulta RENIEC/SUNAT básica',
        'Envío por Email (Plantilla Estándar)'
      ],
      cta: 'Iniciar Prueba Gratis'
    },
    {
      name: 'PYME',
      priceMonthly: 119,
      priceAnnual: 95,
      description: 'Para empresas en pleno crecimiento que necesitan control multisucursal y reportes avanzados.',
      features: [
        'Hasta 1,500 Comprobantes / mes',
        'Hasta 5 Sucursales',
        'Usuarios ilimitados con Roles',
        'Boletas, Facturas y Guías (GRE)',
        'Certificado Digital GRATIS incluido',
        'Consulta RENIEC/SUNAT ilimitada',
        'Envío por WhatsApp y Email',
        'Reportes Contables Excel/Ple',
        'API RESTful Básica'
      ],
      cta: 'Empezar con Plan PYME',
      badge: 'Más Vendido',
      popular: true
    },
    {
      name: 'Corporativo',
      priceMonthly: 249,
      priceAnnual: 199,
      description: 'Perfecto para medianas y grandes empresas con altos volúmenes de facturación y requerimientos API.',
      features: [
        'Comprobantes ILIMITADOS',
        'Sucursales ILIMITADAS',
        'Usuarios ilimitados con Roles',
        'Todos los tipos de CPE + GRE',
        'Firma Digital de Alta Capacidad',
        'Envío por WhatsApp y Email propios',
        'API RESTful Avanzada (OpenAPI)',
        'Soporte 24/7 y Account Manager',
        'Diseño de PDF personalizado'
      ],
      cta: 'Contactar un Asesor'
    }
  ];

  return (
    <section id="planes" className="py-20 bg-brand-light dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Zap className="w-4 h-4" /> Planes y Precios Factufly
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            Planes flexibles que crecen junto a tu negocio
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Todos nuestros planes incluyen el certificado digital exigido por la SUNAT de manera gratuita y están homologados al 100%. Sin costos de instalación ocultos.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-200/50 dark:bg-slate-900 rounded-2xl border border-slate-200/20 dark:border-slate-800/20">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                billingPeriod === 'monthly' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Facturación Mensual
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                billingPeriod === 'annual' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Facturación Anual
              <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                -20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const currentPrice = billingPeriod === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
            return (
              <div
                key={index}
                className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 border transition-all flex flex-col justify-between ${
                  plan.popular
                    ? 'border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/20 scale-[1.02] z-10'
                    : 'border-slate-200/40 dark:border-slate-800/40 hover:shadow-lg hover:shadow-slate-500/5 hover:-translate-y-1'
                }`}
              >
                {/* Popular Tag Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  
                  {/* Plan Description */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>

                  {/* Plan Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">S/</span>
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
                      {currentPrice}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ mes</span>
                  </div>

                  {/* Soles Note */}
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 italic">
                    Precios facturados mensualmente más IGV (18%). {billingPeriod === 'annual' && 'Pago anual único.'}
                  </p>

                  {/* Features List */}
                  <div className="mt-8 space-y-3.5">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      ¿Qué incluye este plan?
                    </p>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <div className="p-0.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-md shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      if (plan.name === 'Corporativo') {
                        const contactEl = document.getElementById('footer');
                        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        setSelectedPlanModal({ name: plan.name, period: billingPeriod === 'monthly' ? 'Mensual' : 'Anual' });
                      }
                    }}
                    className={`w-full py-3.5 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-slate-900 hover:bg-slate-850 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-md shadow-slate-900/10'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-transparent dark:border-slate-850'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Peruvian Guarantee / Info footer inside plans */}
        <div className="mt-12 p-4 bg-indigo-50/30 dark:bg-slate-900/40 border border-indigo-200/20 dark:border-indigo-900/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-5 h-5 text-indigo-500 shrink-0" />
          <p className="leading-relaxed text-center sm:text-left">
            <strong>¿Ya tienes tu propio Certificado Digital?</strong> No te preocupes. Si prefieres utilizar tu propia firma digital emitida por cualquier Entidad de Registro autorizada en el Perú, puedes cargar tu archivo PFX/P12 en el panel de Factufly sin pagar ningún costo adicional.
          </p>
        </div>

      </div>

      {/* Modern Custom Success Dialog Modal (Replaces browser Alert) */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200/50 dark:border-slate-800/50 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7" strokeWidth={2.5} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  ¡Excelente elección!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Has seleccionado el plan <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedPlanModal.name}</span> en modalidad de facturación <span className="font-bold">{selectedPlanModal.period}</span>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-left border border-slate-100 dark:border-slate-850 space-y-2">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Próximos pasos de Registro:</p>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>Validación instantánea de RUC con SUNAT</li>
                  <li>Configuración de Firma Digital Homologada</li>
                  <li>Carga de datos de sucursal inicial</li>
                </ul>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Regresar
                </button>
                <button
                  onClick={() => {
                    setSelectedPlanModal(null);
                    const footerEl = document.getElementById('footer');
                    if (footerEl) footerEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-500/10 transition-colors cursor-pointer"
                >
                  Completar Registro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
