import React, { useState } from 'react';
import { FileText, CheckCircle, ArrowRight, Truck, RefreshCcw, ShieldCheck, QrCode, FileCheck } from 'lucide-react';

interface DocTypeItem {
  id: string;
  name: string;
  short: string;
  color: string;
  description: string;
  legalContext: string;
  sunatRule: string;
  fields: { label: string; val: string }[];
}

const DOCUMENTS: DocTypeItem[] = [
  {
    id: 'factura',
    name: 'Factura Electrónica',
    short: 'FT',
    color: 'from-blue-600 to-indigo-600',
    description: 'Documento comercial para operaciones B2B con derecho a crédito fiscal.',
    legalContext: 'Emitida obligatoriamente a empresas con RUC activo y habido.',
    sunatRule: 'Homologación instantánea con SUNAT en menos de 1 segundo.',
    fields: [
      { label: 'Serie y Correlativo', val: 'F001-0004182' },
      { label: 'RUC del Cliente', val: '20554433221' },
      { label: 'Razón Social', val: 'INVERSIONES PERÚ S.A.C.' },
      { label: 'Detalle de IGV', val: 'S/ 162.00 (Tasa 18%)' },
      { label: 'Firma Digital Hash', val: '4f92...bd8e' }
    ]
  },
  {
    id: 'boleta',
    name: 'Boleta de Venta Electrónica',
    short: 'BV',
    color: 'from-red-600 to-rose-600',
    description: 'Comprobante de pago para consumidores finales sin derecho a crédito fiscal.',
    legalContext: 'Obligatorio DNI para montos mayores a S/ 700.00.',
    sunatRule: 'Validación en línea conectada con la base de datos de RENIEC.',
    fields: [
      { label: 'Serie y Correlativo', val: 'B001-0012942' },
      { label: 'DNI / CE', val: '44556677' },
      { label: 'Adquirente', val: 'MENDOZA RUIZ, CARLOS' },
      { label: 'Exoneración IGV', val: 'No (Sujeto a gravamen)' },
      { label: 'Firma Digital Hash', val: '8c41...ee41' }
    ]
  },
  {
    id: 'nota_credito',
    name: 'Nota de Crédito Electrónica',
    short: 'NC',
    color: 'from-amber-500 to-orange-600',
    description: 'Documento para anular, corregir o aplicar descuentos sobre facturas o boletas emitidas.',
    legalContext: 'Debe hacer referencia obligatoria al comprobante original modificado.',
    sunatRule: 'Sincroniza el saldo comercial y crédito fiscal ante SUNAT de inmediato.',
    fields: [
      { label: 'Serie y Correlativo', val: 'FC01-0000215' },
      { label: 'Documento Afectado', val: 'F001-0004128' },
      { label: 'Sustento o Motivo', val: 'Anulación de la operación por devolución de mercadería' },
      { label: 'Monto Aplicado', val: '-S/ 540.00' },
      { label: 'Firma Digital Hash', val: '7d89...fa12' }
    ]
  },
  {
    id: 'nota_debito',
    name: 'Nota de Débito Electrónica',
    short: 'ND',
    color: 'from-purple-600 to-indigo-700',
    description: 'Documento para aplicar penalidades, cobro de intereses o aumentos de valor.',
    legalContext: 'Genera una obligación de pago adicional ligada a una factura previa.',
    sunatRule: 'Modifica el total tributario del período fiscal actual.',
    fields: [
      { label: 'Serie y Correlativo', val: 'FD01-0000104' },
      { label: 'Documento Afectado', val: 'F001-0004128' },
      { label: 'Sustento o Motivo', val: 'Mora en el pago o intereses financieros' },
      { label: 'Monto de Incremento', val: '+S/ 45.00' },
      { label: 'Firma Digital Hash', val: '2a41...cd31' }
    ]
  },
  {
    id: 'guia_remision',
    name: 'Guía de Remisión Remitente (GRE)',
    short: 'GR',
    color: 'from-emerald-600 to-teal-600',
    description: 'Documento electrónico obligatorio para sustentar el traslado de bienes en el Perú.',
    legalContext: 'Obligatoriedad total SUNAT 2024 para todo tipo de transporte.',
    sunatRule: 'Generación instantánea de QR oficial exigido en controles de carretera.',
    fields: [
      { label: 'Serie y Correlativo', val: 'T001-0001841' },
      { label: 'RUC del Transportista', val: '20412356789' },
      { label: 'Punto de Partida', val: 'Av. El Sol 124, Ate, Lima' },
      { label: 'Punto de Llegada', val: 'Jr. Pizarro 450, Trujillo' },
      { label: 'Vehículo / Licencia', val: 'F3D-851 / Q-412389' }
    ]
  }
];

export default function DocumentTypes() {
  const [selectedDocId, setSelectedDocId] = useState('factura');
  const activeDoc = DOCUMENTS.find(d => d.id === selectedDocId) || DOCUMENTS[0];

  return (
    <section id="comprobantes" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <FileCheck className="w-4.5 h-4.5" /> Comprobantes de Pago
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-2">
            Emite todos los documentos exigidos por la SUNAT
          </p>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Soporte total para el ecosistema tributario peruano, optimizado con firma digital instantánea, envío seguro a servidores OSE/SUNAT y descarga automática de archivos XML y CDR.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left list of selectors */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
            {DOCUMENTS.map((doc) => {
              const isActive = doc.id === selectedDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-slate-50 dark:bg-slate-950 border-indigo-500/30 dark:border-indigo-400/30 shadow-md shadow-indigo-500/5'
                      : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20'
                  }`}
                >
                  {/* Left Icon with gradient indicator */}
                  <div className={`w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br ${doc.color} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                    {doc.short}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {doc.description}
                    </p>
                  </div>

                  <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${
                    isActive ? 'translate-x-1.5 text-indigo-600 dark:text-indigo-400' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Document Visualizer (PDF Mockup) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between relative shadow-inner overflow-hidden">
              
              {/* Background watermark */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none flex items-center justify-center">
                <span className="text-[120px] font-black tracking-widest italic select-none">FACTUFLY</span>
              </div>

              {/* PDF Header Mock */}
              <div className="relative z-10">
                <div className="flex justify-between items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 flex-wrap">
                  <div>
                    {/* Fake company info representing the emitter */}
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm tracking-tight text-indigo-600 dark:text-indigo-400 uppercase">Factufly Demostración S.A.C.</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 max-w-[220px] leading-tight">
                      Jr. de la Unión 123, Oficina 401, Cercado de Lima<br />
                      contacto@factufly.pe | (01) 604-9872
                    </p>
                  </div>

                  {/* SUNAT Official Ticket Header */}
                  <div className="px-4 py-3 bg-white dark:bg-slate-900 border-2 border-red-500/80 rounded-xl text-center min-w-[180px] shadow-sm">
                    <span className="block text-[10px] font-black text-slate-900 dark:text-white font-mono uppercase tracking-wider">R.U.C. 20608754123</span>
                    <span className="block text-xs font-bold text-red-600 dark:text-red-400 my-0.5 uppercase tracking-tight">
                      {activeDoc.name}
                    </span>
                    <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                      {activeDoc.fields[0].val}
                    </span>
                  </div>
                </div>

                {/* Doc Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-200 dark:border-slate-800 text-xs">
                  <div className="space-y-1">
                    {activeDoc.fields.slice(1, 3).map((field, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">{field.label}:</span>{' '}
                        <span className="font-mono">{field.val}</span>
                      </p>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {activeDoc.fields.slice(3).map((field, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">{field.label}:</span>{' '}
                        <span className="font-mono">{field.val}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Simulated Table of Goods */}
                <div className="py-6">
                  <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Detalle del Comprobante</p>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                        <th className="pb-2">CANT.</th>
                        <th className="pb-2 pl-4">DESCRIPCIÓN</th>
                        <th className="pb-2 text-right">VALOR COMPRA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      <tr>
                        <td className="py-3 font-mono">1.00</td>
                        <td className="py-3 pl-4 font-medium text-slate-900 dark:text-white">
                          Adquisición de Licencias de Software de Gestión de Facturación Electrónica Factufly
                        </td>
                        <td className="py-3 text-right font-mono">S/ 900.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PDF Footer Mockup with SUNAT Legals and QR Code */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center relative z-10">
                {/* SUNAT Legal footnote and certificate details */}
                <div className="sm:col-span-9 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" /> Autorizado por SUNAT como PSE
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                    Representación impresa del comprobante electrónico homologado. Este documento puede ser consultado en el portal oficial utilizando el código hash digital provisto.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[9px] font-mono">
                      Regla SUNAT: {activeDoc.sunatRule}
                    </span>
                    <span className="bg-slate-200/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[9px] font-mono">
                      Normativa: {activeDoc.legalContext}
                    </span>
                  </div>
                </div>

                {/* Simulated QR Code representing Peruvian mandatory QR */}
                <div className="sm:col-span-3 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center relative group cursor-help" title="QR SUNAT Oficial">
                    <QrCode className="w-full h-full text-slate-900" />
                    {/* Micro overlay tag */}
                    <span className="absolute -bottom-1 bg-red-600 text-[8px] text-white px-1 rounded font-bold uppercase tracking-tight">SUNAT</span>
                  </div>
                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-mono mt-1.5 uppercase">Firma Válida</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
