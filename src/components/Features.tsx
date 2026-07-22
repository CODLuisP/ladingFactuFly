import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, Search, Smartphone, Barcode, ArrowRightLeft,
  Hand, FileText, Printer, Percent
} from 'lucide-react';
import whatsappIcon from '../public/comprobantes/whatsapp-icon.svg';
import gmailIcon from '../public/comprobantes/gmail.svg';
import iphoneFrame from '../public/comprobantes/iphone.png';
import logoFactufly from '../public/logofactufly.jpeg';

export default function Features() {
  // Plantilla activa del simulador de notificación (email/WhatsApp)
  const [notificationType, setNotificationType] = useState<'whatsapp' | 'email'>('whatsapp');

  return (
    <section id="caracteristicas" className="py-16 bg-brand-light dark:bg-surface-dark-2 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            ¿Qué características tiene FactuFly?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-5 text-base sm:text-lg leading-relaxed">
            Una plataforma intuitiva y de alto rendimiento que cumple con el 100% de las exigencias tributarias y automatiza las tareas administrativas más complejas de tu negocio.
          </p>
        </div>

        {/* Bento grid de características */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-5 items-stretch">

          {/* TIPO DE CAMBIO (S/ → $) — entra desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-1 md:col-span-2 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Tipo de cambio S/ → $</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Conectado al tipo de cambio para emitir también en dólares.
            </p>
          </motion.div>

          {/* ENVÍO POR EMAIL Y WHATSAPP (mockup dentro de iPhone) — entra desde abajo (columna del medio) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-2 md:col-span-2 md:row-span-2 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Envío por Email y WhatsApp
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm leading-relaxed">
              Envía facturas y boletas directo al WhatsApp o correo de tus clientes, sin descargas ni reenvíos.
            </p>

            {/* Toggle WhatsApp / Email */}
            <div className="mt-5 flex gap-2 justify-center">
              <button
                onClick={() => setNotificationType('whatsapp')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-full cursor-pointer flex items-center gap-1.5 transition-colors ${
                  notificationType === 'whatsapp' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <img src={whatsappIcon} alt="" width={16} height={16} className="w-4 h-4" /> WhatsApp
              </button>
              <button
                onClick={() => setNotificationType('email')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-full cursor-pointer flex items-center gap-1.5 transition-colors ${
                  notificationType === 'email' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <img src={gmailIcon} alt="" width={16} height={16} className="w-4 h-4" /> Email
              </button>
            </div>

            {/* iPhone con la pantalla transparente; el contenido va detrás del marco */}
            <div className="mt-5 flex-1 flex items-end justify-center">
              <div className="relative w-full max-w-[210px] aspect-[640/1280] drop-shadow-xl">
                {/* Pantalla (detrás del marco) */}
                <div
                  className="absolute overflow-hidden bg-white"
                  style={{ top: '0%', left: '4%', right: '4%', bottom: '2.2%', borderRadius: '26px' }}
                >
                  {notificationType === 'whatsapp' ? (
                    <div className="w-full h-full flex flex-col bg-[#e5ddd5] dark:bg-[#0b141a]">
                      {/* Barra de estado + cabecera de chat */}
                      <div className="bg-[#075E54] text-white pt-5">
                        <div className="flex items-center justify-between px-3 pb-0.5 text-[7px] font-semibold text-white/90">
                          <span>9:41</span>
                          <span>WhatsApp</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 pb-2">
                          <img src={logoFactufly} alt="FactuFly" width={28} height={28} className="w-7 h-7 rounded-full object-cover shrink-0" />
                          <div className="leading-tight min-w-0">
                            <p className="text-[10px] font-bold truncate">FactuFly</p>
                            <p className="text-[7px] text-white/70">en línea</p>
                          </div>
                        </div>
                      </div>
                      {/* Mensaje entrante */}
                      <div className="flex-1 p-2.5">
                        <div className="bg-white dark:bg-[#202c33] rounded-lg rounded-tl-none p-2 shadow-sm max-w-[94%]">
                          <p className="text-[8.5px] font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                            <img src={whatsappIcon} alt="" width={10} height={10} className="w-2.5 h-2.5" /> FactuFly
                          </p>
                          <p className="text-[8.5px] leading-snug text-slate-700 dark:text-slate-100">
                            Hola <b>Carlos</b> <Hand className="inline w-2.5 h-2.5 text-amber-500 align-text-bottom" />, tu <b>Factura F001-0004128</b> fue emitida por <b>S/ 150.00</b>.
                          </p>
                          <div className="mt-1.5 p-1 bg-slate-50 dark:bg-slate-800 rounded flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-red-500 shrink-0" />
                            <span className="text-[7.5px] text-slate-600 dark:text-slate-300 truncate">F001-0004128.pdf</span>
                          </div>
                          <p className="text-[6.5px] text-slate-400 text-right mt-1">10:24 ✓✓</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col bg-white dark:bg-slate-900">
                      {/* Barra de estado + cabecera Gmail */}
                      <div className="pt-5 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between px-3 pb-0.5 text-[7px] font-semibold text-slate-400">
                          <span>9:41</span>
                          <span>Gmail</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 pb-2">
                          <img src={gmailIcon} alt="" width={16} height={16} className="w-4 h-4" />
                          <span className="text-[10px] font-bold text-slate-800 dark:text-white">Recibidos</span>
                        </div>
                      </div>
                      {/* Correo */}
                      <div className="flex-1 p-2.5 space-y-2">
                        <p className="text-[9px] font-bold text-slate-900 dark:text-white leading-snug">Nuevo Comprobante de Pago Electrónico</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[9px] flex items-center justify-center font-black shrink-0">F</div>
                          <div className="leading-tight min-w-0">
                            <p className="text-[8px] font-semibold text-slate-800 dark:text-slate-200 truncate">FactuFly</p>
                            <p className="text-[7px] text-slate-400 truncate">comprobantes@ideatec.com.pe</p>
                          </div>
                        </div>
                        <p className="text-[8px] text-slate-600 dark:text-slate-300 leading-snug">Estimado Carlos, adjuntamos su Boleta de Venta Electrónica homologada.</p>
                        <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="text-[7.5px] text-slate-600 dark:text-slate-300 truncate">CPE-B001-0012942.PDF · 34 KB</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Marco del iPhone por encima */}
                <img src={iphoneFrame} alt="" className="absolute inset-0 w-full h-full pointer-events-none select-none" />
              </div>
            </div>
          </motion.div>

          {/* Búsqueda RENIEC / SUNAT — entra desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-1 md:col-span-2 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Búsqueda RENIEC y SUNAT</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Ingresa un DNI o RUC y Factufly trae los datos validados desde RENIEC y SUNAT al instante.
            </p>
          </motion.div>

          {/* Permisos y roles — entra desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-1 md:col-span-2 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Permisos y Roles de Usuario</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Asigna roles a vendedores, administradores y contadores para proteger tu información confidencial.
            </p>
          </motion.div>

          {/* Código de barras — entra desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-2 md:col-span-2 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Barcode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Código de barras</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Vende escaneando y mantén tu inventario siempre al día.
            </p>
          </motion.div>

          {/* Ticketera térmica — entra desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-1 md:col-span-3 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Adaptación a Ticketera Térmica</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Imprime en formato ticket ajustado automáticamente al ancho de tu impresora térmica —58 mm o 80 mm—.
            </p>
          </motion.div>

          {/* IGV configurable — entra desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="sm:col-span-1 md:col-span-3 bg-white dark:bg-surface-dark-1 rounded-3xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">IGV Configurable por Tipo de Negocio</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
              Aplica 18% o 10.5% (restaurantes y hoteles, Ley MYPE) y el total se recalcula solo.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
