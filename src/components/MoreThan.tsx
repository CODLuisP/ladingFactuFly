import React from 'react';
import { FileText, Package, ShoppingCart, Shield, Zap, Building2 } from 'lucide-react';

import imgFacturacion from '../public/cards/facturacion.jpeg';
import imgStock from '../public/cards/stock.jpg';
import imgPOS from '../public/cards/puntoventa.jpeg';

export default function MoreThan() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-[#020817] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-[#a80a0a] bg-[#a80a0a]/10 uppercase tracking-widest mb-4">
            Sistema Todo en Uno
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Mucho más que <span className="text-[#a80a0a]">solo facturación</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            Un solo sistema que reemplaza varios programas. Esto es lo que obtienes, todo incluido.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">

          {/* BIG hero card — Facturación (image, spans 2x2) */}
          <article className="group relative col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-xl">
            <img src={imgFacturacion} alt="Facturación" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#041333]/55 to-transparent dark:from-[#1a0000] dark:via-[#4a0a0a]/55" />
            <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
              <Shield className="w-3 h-3" /> Homologado SUNAT
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white">Facturación Electrónica</h3>
              <p className="mt-2 text-sm text-white/75 max-w-md leading-relaxed">
                Boletas y facturas en menos de 20 segundos, con certificado digital incluido y cero multas garantizado.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Notas C/D y guías', 'Email + WhatsApp', 'DNI / RUC / CE'].map((t) => (
                  <span key={t} className="text-[11px] font-semibold text-white/90 bg-white/10 border border-white/15 px-2.5 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Stat tile — speed */}
          <article className="rounded-3xl bg-[#0f2e64] dark:bg-[#a80a0a] p-6 flex flex-col justify-between shadow-lg">
            <Zap className="w-7 h-7 text-white/80" />
            <div>
              <p className="text-4xl font-black text-white leading-none">&lt;20s</p>
              <p className="text-xs text-white/70 mt-2 uppercase tracking-wide">por comprobante</p>
            </div>
          </article>

          {/* Stat tile — multisucursal */}
          <article className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 flex flex-col justify-between shadow-sm">
            <Building2 className="w-7 h-7 text-[#0f2e64] dark:text-[#e05555]" />
            <div>
              <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">∞</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wide">sucursales · 1 RUC</p>
            </div>
          </article>

          {/* Stock card (image) */}
          <article className="group relative col-span-2 rounded-3xl overflow-hidden shadow-xl">
            <img src={imgStock} alt="Stock" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/90 via-[#020817]/50 to-transparent dark:from-[#1a0000]/90 dark:via-[#4a0a0a]/50" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center max-w-[70%]">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-white" />
                <h3 className="text-lg font-black text-white">Control de Stock</h3>
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                Inventario en tiempo real con código de barras, alertas de stock bajo y vinculación con proveedores.
              </p>
            </div>
          </article>

          {/* POS card (image, full-width banner) */}
          <article className="group relative col-span-2 lg:col-span-4 rounded-3xl overflow-hidden shadow-xl">
            <img src={imgPOS} alt="Punto de Venta" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/90 via-[#020817]/50 to-transparent dark:from-[#1a0000]/90 dark:via-[#4a0a0a]/50" />
            <div className="absolute inset-0 p-7 flex flex-col justify-center max-w-[60%]">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-white" />
                <h3 className="text-xl font-black text-white">Punto de Venta</h3>
              </div>
              <p className="text-sm text-white/75 leading-relaxed">
                Vende y factura desde una sola pantalla: efectivo, Yape, Plin y tarjeta, ticketera 58/80mm y gestión de proveedores y compras.
              </p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
