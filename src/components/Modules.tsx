import React from 'react';
import {
  Boxes, ShoppingCart, Package, Truck, Users, BarChart3, Settings2, Building2,
  Camera, ScanLine, PackageCheck, BellRing, ArrowRight
} from 'lucide-react';
import whatsappIcon from '../public/comprobantes/whatsapp-icon.svg';

interface ModuleItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  bullets: string[];
}

const MODULES: ModuleItem[] = [
  {
    icon: ShoppingCart,
    title: 'Punto de Venta (POS)',
    desc: 'Vende y factura en segundos desde una sola pantalla, lista para mostrador.',
    bullets: ['Cobro rápido por producto o código de barras', 'Impresión automática al confirmar la venta'],
  },
  {
    icon: Package,
    title: 'Productos e Inventario',
    desc: 'Controla tu stock en tiempo real con o sin código de barras.',
    bullets: ['Alertas de stock bajo para reponer a tiempo', 'Vinculación directa con tus proveedores'],
  },
  {
    icon: Truck,
    title: 'Proveedores y Compras',
    desc: 'Registra tus proveedores y todas las compras que les realizas.',
    bullets: ['Historial de compras por proveedor', 'Reposición de stock conectada al inventario'],
  },
  {
    icon: Users,
    title: 'Clientes',
    desc: 'Administra tu cartera de clientes con datos validados automáticamente.',
    bullets: ['Búsqueda por DNI, RUC y CE (Carnet de Extranjería)', 'Datos traídos al instante de RENIEC y SUNAT'],
  },
  {
    icon: BarChart3,
    title: 'Reportes y Control de Caja',
    desc: 'Conoce tus ventas del día, semana, mes, año o fechas específicas.',
    bullets: ['Top de productos, medios de pago y arqueo de caja', 'Exporta a Excel, CSV o PDF para tu contador'],
  },
  {
    icon: Settings2,
    title: 'Configuración de Empresa',
    desc: 'Personaliza tu sistema con la identidad de tu negocio.',
    bullets: ['Logo propio en comprobantes y tickets', 'Series y correlativos de cada comprobante'],
  },
  {
    icon: Building2,
    title: 'Multisucursal',
    desc: 'Administra varias sucursales bajo un mismo sistema y RUC.',
    bullets: ['Series independientes por establecimiento', 'Ventas consolidadas de todos tus locales'],
  },
  {
    icon: Boxes,
    title: 'Usuarios y Accesos',
    desc: 'Define qué puede ver y hacer cada persona en tu negocio.',
    bullets: ['Roles para cajeros, administradores y contadores', 'Auditoría completa de cada acción'],
  },
];

// GUARDADO: bloque original "Detalles que marcan la diferencia" (reemplazado por el flujo de código de barras y stock).
// import { Printer, ArrowLeftRight, Percent, IdCard, Send } from 'lucide-react';
// const DIFFERENTIATORS = [
//   { icon: Printer, title: 'Ticketera 58mm y 80mm', desc: 'Impresión automática según la configuración de tu impresora.' },
//   { icon: ArrowLeftRight, title: 'Tipo de cambio S/ → $', desc: 'Conectado al tipo de cambio para emitir también en dólares.' },
//   { icon: Percent, title: 'IGV 18% o 10.5%', desc: 'Se ajusta automáticamente al régimen de tu negocio.' },
//   { icon: IdCard, title: 'DNI, RUC y CE', desc: 'Búsqueda automática de clientes nacionales y extranjeros.' },
//   { icon: Send, title: 'Email y WhatsApp', desc: 'Envío automático del comprobante apenas se emite.' },
//   { icon: Barcode, title: 'Código de barras', desc: 'Vende escaneando y mantén tu inventario siempre al día.' },
// ];

const BARCODE_STEPS = [
  { icon: Camera, title: 'Registra tu producto', desc: 'Súbele una foto y genera su código de barras al instante.' },
  { icon: ScanLine, title: 'Escanea y vende', desc: 'Cobra en segundos leyendo el código desde el POS.' },
  { icon: PackageCheck, title: 'Stock en tiempo real', desc: 'Cada venta descuenta el inventario automáticamente.' },
];

export default function Modules() {
  return (
    <section id="modulos" className="pt-20 bg-white dark:bg-surface-dark-1 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            ¿Factufly es solo un sistema de facturación electrónica?
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            No. Factufly es mucho más: es un <span className="font-semibold text-slate-900 dark:text-white">punto de venta completo</span> que,
            además de la facturación electrónica, integra inventario, compras, clientes, reportes y caja
            en los módulos que verás a continuación. Olvídate de pagar por varios programas separados.
          </p>
        </div>

        {/* Modules grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center mb-5 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{mod.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{mod.desc}</p>
                <ul className="mt-4 space-y-2">
                  {mod.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barcode & smart stock — fondo a todo el ancho */}
      <div className="mt-20 py-14 sm:py-16 bg-blue-50 dark:bg-surface-dark-2 border-y border-blue-100/70 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Escanea, vende y nunca te quedes sin stock
            </p>
          </div>

          {/* Flow steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 items-stretch">
            {BARCODE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.title}>
                  <div className="relative flex flex-col items-center text-center bg-white dark:bg-surface-dark-1 rounded-3xl p-7 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                    <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 dark:text-slate-800 leading-none select-none">
                      {i + 1}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < BARCODE_STEPS.length - 1 && (
                    <div className="hidden md:flex items-center justify-center -mx-1 shrink-0">
                      <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* WhatsApp stock alerts highlight */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-10 shadow-lg overflow-hidden">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-xs font-semibold mb-4">
                <BellRing className="w-4 h-4" /> Alertas por WhatsApp
              </div>
              <h4 className="text-2xl font-bold tracking-tight">
                Configura un stock mínimo y entérate por WhatsApp
              </h4>
              <p className="text-indigo-100 mt-3 text-sm leading-relaxed">
                Cuando un producto llega a su stock mínimo, Factufly te avisa por WhatsApp para que
                repongas a tiempo. Y en cuanto vuelves a cargar stock, recibes otra alerta de que el
                producto ya está disponible.
              </p>
              <div className="flex flex-wrap gap-4 mt-5">
                <span className="inline-flex items-center gap-2 text-sm text-white font-medium">
                  <BellRing className="w-5 h-5" /> Aviso de stock mínimo
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white font-medium">
                  <PackageCheck className="w-5 h-5" /> Aviso de stock disponible
                </span>
              </div>
            </div>

            {/* Mock WhatsApp notifications */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <img src={whatsappIcon} alt="" width={24} height={24} loading="lazy" decoding="async" className="w-6 h-6" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Factufly</span>
                  <span className="ml-auto text-[11px] text-slate-400">ahora</span>
                </div>
                <div className="mt-3 space-y-2.5">
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl rounded-tl-sm p-3">
                    <p className="text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed">
                      ⚠️ <span className="font-semibold">Stock mínimo alcanzado</span><br />
                      Coca Cola 500ml — quedan <span className="font-semibold">3 unidades</span> (mínimo: 10).
                    </p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl rounded-tl-sm p-3">
                    <p className="text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed">
                      ✅ <span className="font-semibold">Stock disponible</span><br />
                      Coca Cola 500ml — repuesto, ahora <span className="font-semibold">48 unidades</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
