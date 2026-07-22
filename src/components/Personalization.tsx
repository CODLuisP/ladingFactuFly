import React from 'react';
import {
  LayoutDashboard, FileBarChart, Blocks,
  Gift, UserPlus, KeyRound, Building2, Rocket,
} from 'lucide-react';

const CUSTOM_EXAMPLES = [
  { icon: FileBarChart, title: 'Reportes a tu medida', desc: 'El reporte que necesites, con los datos que tú decidas.' },
  { icon: LayoutDashboard, title: 'Vistas personalizadas', desc: 'Adaptamos las pantallas a la forma de trabajar de tu negocio.' },
  { icon: Blocks, title: 'Módulos a pedido', desc: 'Agregamos o quitamos módulos según lo que realmente uses.' },
];

const ONBOARDING_STEPS = [
  { icon: UserPlus, title: 'Creamos tu cuenta', desc: 'Apenas adquieres tu plan, dejamos tu cuenta lista.' },
  { icon: KeyRound, title: 'Conectamos tus credenciales', desc: 'Enlazamos tu empresa con SUNAT de forma segura.' },
  { icon: Building2, title: 'Configuramos tu empresa', desc: 'Series, logo y datos listos a tu medida.' },
  { icon: Rocket, title: '¡A facturar!', desc: 'En minutos ya estás emitiendo comprobantes.' },
];

export default function Personalization() {
  return (
    <section id="personalizacion" className="py-20 bg-white dark:bg-surface-dark-1 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Personalization block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Un sistema que se adapta a ti, no al revés
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Ofrecemos facturación electrónica a todo tipo de negocios, pero lo que nos distingue es que
            <span className="font-semibold text-slate-900 dark:text-white"> lo personalizamos para ti</span>.
            Reportes, vistas o módulos: lo que se te ocurra, lo incorporamos.
          </p>

          {/* Zero cost badge */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white dark:bg-slate-900 rounded-2xl pl-3 pr-5 py-2.5 border border-slate-200/70 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">Personalización sin costo adicional</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CUSTOM_EXAMPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-3xl p-7 border border-slate-200/50 dark:border-slate-800/50"
              >
                <div className="w-13 h-13 p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Fast onboarding block */}
        <div className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center bg-white/15 text-white rounded-full px-3 py-1 text-xs font-semibold mb-4">
              Puesta en marcha exprés
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Operativo en minutos, no en semanas
            </p>
            <p className="text-indigo-100 mt-3 text-sm leading-relaxed">
              Nosotros nos encargamos de todo. Tú solo eliges tu plan y empiezas a facturar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ONBOARDING_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15"
                >
                  <span className="absolute top-4 right-5 text-3xl font-black text-white/20 leading-none select-none">
                    {i + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-white">{step.title}</h3>
                  <p className="text-xs text-indigo-100 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
