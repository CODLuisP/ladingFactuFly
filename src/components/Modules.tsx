import React from 'react';
import {
  Boxes, ShoppingCart, Package, Truck, Users, BarChart3, Settings2, Building2,
  Printer, ArrowLeftRight, Percent, IdCard, AlertTriangle, Barcode, Wallet, Send
} from 'lucide-react';

interface ModuleItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  bullets: string[];
}

const MODULES: ModuleItem[] = [
  {
    icon: ShoppingCart,
    title: 'Punto de Venta (POS)',
    desc: 'Vende y factura en segundos desde una sola pantalla, lista para mostrador.',
    color: 'from-indigo-600 to-blue-600',
    bullets: ['Cobro rápido por producto o código de barras', 'Impresión automática al confirmar la venta'],
  },
  {
    icon: Package,
    title: 'Productos e Inventario',
    desc: 'Controla tu stock en tiempo real con o sin código de barras.',
    color: 'from-emerald-600 to-teal-600',
    bullets: ['Alertas de stock bajo para reponer a tiempo', 'Vinculación directa con tus proveedores'],
  },
  {
    icon: Truck,
    title: 'Proveedores y Compras',
    desc: 'Registra tus proveedores y todas las compras que les realizas.',
    color: 'from-amber-500 to-orange-600',
    bullets: ['Historial de compras por proveedor', 'Reposición de stock conectada al inventario'],
  },
  {
    icon: Users,
    title: 'Clientes',
    desc: 'Administra tu cartera de clientes con datos validados automáticamente.',
    color: 'from-rose-600 to-red-600',
    bullets: ['Búsqueda por DNI, RUC y CE (Carnet de Extranjería)', 'Datos traídos al instante de RENIEC y SUNAT'],
  },
  {
    icon: BarChart3,
    title: 'Reportes y Control de Caja',
    desc: 'Conoce tus ventas del día, semana, mes, año o fechas específicas.',
    color: 'from-violet-600 to-indigo-700',
    bullets: ['Top de productos, medios de pago y arqueo de caja', 'Exporta a Excel, CSV o PDF para tu contador'],
  },
  {
    icon: Settings2,
    title: 'Configuración de Empresa',
    desc: 'Personaliza tu sistema con la identidad de tu negocio.',
    color: 'from-slate-600 to-slate-800',
    bullets: ['Logo propio en comprobantes y tickets', 'Series y correlativos de cada comprobante'],
  },
  {
    icon: Building2,
    title: 'Multisucursal',
    desc: 'Administra varias sucursales bajo un mismo sistema y RUC.',
    color: 'from-cyan-600 to-blue-700',
    bullets: ['Series independientes por establecimiento', 'Ventas consolidadas de todos tus locales'],
  },
  {
    icon: Boxes,
    title: 'Usuarios y Accesos',
    desc: 'Define qué puede ver y hacer cada persona en tu negocio.',
    color: 'from-fuchsia-600 to-purple-700',
    bullets: ['Roles para cajeros, administradores y contadores', 'Auditoría completa de cada acción'],
  },
];

const DIFFERENTIATORS = [
  { icon: Printer, title: 'Ticketera 58mm y 80mm', desc: 'Impresión automática según la configuración de tu impresora.' },
  { icon: ArrowLeftRight, title: 'Tipo de cambio S/ → $', desc: 'Conectado al tipo de cambio para emitir también en dólares.' },
  { icon: Percent, title: 'IGV 18% o 10.5%', desc: 'Se ajusta automáticamente al régimen de tu negocio.' },
  { icon: IdCard, title: 'DNI, RUC y CE', desc: 'Búsqueda automática de clientes nacionales y extranjeros.' },
  { icon: Send, title: 'Email y WhatsApp', desc: 'Envío automático del comprobante apenas se emite.' },
  { icon: Barcode, title: 'Código de barras', desc: 'Vende escaneando y mantén tu inventario siempre al día.' },
];

export default function Modules() {
  return (
    <section id="modulos" className="py-20 bg-brand-light dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Wallet className="w-4.5 h-4.5" /> Sistema Todo en Uno
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            Un solo sistema para administrar todo tu negocio
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Factufly no es solo facturación: es un punto de venta completo que integra inventario, compras,
            clientes, reportes y caja. Olvídate de pagar por varios programas separados.
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
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} text-white flex items-center justify-center mb-5 shadow-md`}>
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

        {/* Differentiators strip */}
        <div className="mt-14">
          <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
            Detalles que marcan la diferencia
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFFERENTIATORS.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex items-start gap-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50"
                >
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{d.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
