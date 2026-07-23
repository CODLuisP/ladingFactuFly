import React from 'react';
import {
  Pill, Flower2, Cake, Shirt, Wrench, Store, Check, X, Laptop, Dog
} from 'lucide-react';

const INDUSTRIES = [
  { icon: Pill, name: 'Farmacias y Boticas' },
  { icon: Flower2, name: 'Florerías' },
  { icon: Cake, name: 'Pastelerías' },
  { icon: Shirt, name: 'Tiendas de Ropa' },
  { icon: Wrench, name: 'Ferreterías' },
  { icon: Store, name: 'Bodegas y Minimarkets' },
  { icon: Laptop, name: 'Tecnología' },
  { icon: Dog, name: 'Veterinarias y Pet Shops' },
];

type CellValue = boolean | 'parcial';
const COMPARISON: { feature: string; us: CellValue; others: CellValue }[] = [
  { feature: 'Punto de venta + facturación en un solo sistema', us: true, others: false },
  { feature: 'Inventario con código de barras y alertas de stock', us: true, others: false },
  { feature: 'Módulo de proveedores y compras incluido', us: true, others: false },
  { feature: 'Búsqueda ilimitada por DNI, RUC y CE', us: true, others: 'parcial' },
  { feature: 'Impresión en ticketera 58mm y 80mm', us: true, others: 'parcial' },
  { feature: 'Emisión en soles y dólares con tipo de cambio', us: true, others: false },
  { feature: 'Envío automático por Email y WhatsApp', us: true, others: 'parcial' },
  { feature: 'Multisucursal sin costo adicional', us: true, others: false },
  { feature: 'Un solo monto, todo ilimitado (sin niveles ni bloqueos)', us: true, others: false },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
        <Check className="w-4 h-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === 'parcial') {
    return <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Limitado</span>;
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
      <X className="w-4 h-4" strokeWidth={3} />
    </span>
  );
}

export default function Industries() {
  return (
    <section id="rubros" className="py-20 bg-white dark:bg-surface-dark-1 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sistema de punto de venta (POS) adaptado a cualquier rubro en Perú
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Sea cual sea tu giro comercial, FactuFly se configura a la medida de tu operación. Estos son algunos de los negocios (restaurantes, bodegas, minimarkets, ferreterías, tiendas) que facturan con nosotros.
          </p>
        </div>

        {/* Industry chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{ind.name}</span>
              </div>
            );
          })}
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              ¿Por qué elegir FactuFly?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm">
              Compara lo que obtienes con nosotros frente a un sistema de facturación tradicional.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm dark:bg-slate-900">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 sm:px-7 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center">Característica</span>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider w-20 text-center">FactuFly</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider w-20 text-center">Otros</span>
            </div>

            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_auto] gap-4 px-5 sm:px-7 py-4 items-center border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 ${
                  i % 2 === 1 ? 'bg-slate-50/40 dark:bg-slate-950/50' : 'bg-white dark:bg-slate-900'
                }`}
              >
                <span className="text-sm text-slate-700 dark:text-slate-200">{row.feature}</span>
                <span className="w-20 flex justify-center"><Cell value={row.us} /></span>
                <span className="w-20 flex justify-center"><Cell value={row.others} /></span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="#planes"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-750 rounded-2xl shadow-xl shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all hover:-translate-y-0.5"
            >
              Empieza gratis hoy mismo
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
