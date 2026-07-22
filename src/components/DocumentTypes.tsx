import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import logoFactufly from '../public/logofactufly.jpeg';
import qrComprobante from '../public/comprobantes/qr.png';
import logoSunat from '../public/logoSUNAT.webp';

interface ResumenRow { label: string; val: string; }

interface DocTypeItem {
  id: string;
  name: string;
  short: string;
  color: string;
  description: string;
  // --- Datos que se pintan en la vista previa del comprobante ---
  title: string;          // Título dentro del recuadro (FACTURA ELECTRÓNICA, etc.)
  serie: string;          // N° de comprobante
  clienteLabel: string;   // 'R.U.C.' | 'DNI'
  clienteDoc: string;
  cliente: string;
  direccion: string;
  fechaEmision: string;
  fechaVenc: string;
  tipoPago: string;
  item: { cant: string; unid: string; desc: string; vunit: string; pvent: string; total: string };
  letras: string;
  resumen: ResumenRow[];  // Filas del cuadro Resumen (la última es el IMPORTE TOTAL)
}

const EMISOR = {
  nombre: 'FACTUFLY DEMOSTRACIÓN S.A.C.',
  razon: 'FACTUFLY DEMOSTRACIÓN SOCIEDAD ANÓNIMA CERRADA',
  direccion: 'AV. PETIT THOUARS 1775, INT. 501, LINCE, LIMA — PERÚ',
  contacto: 'Telf/WhatsApp: 952379386  |  Email: info@ideatec.com.pe',
  ruc: '20601841038',
};

const DOCUMENTS: DocTypeItem[] = [
  {
    id: 'factura',
    name: 'Factura Electrónica',
    short: 'FT',
    color: 'from-blue-600 to-indigo-600',
    description: 'Documento comercial para operaciones B2B con derecho a crédito fiscal.',
    title: 'FACTURA ELECTRÓNICA',
    serie: 'F001-00015163',
    clienteLabel: 'R.U.C.',
    clienteDoc: '20553871256',
    cliente: 'COMBUSTIBLES Y CONTRATISTAS GENERALES S.A.C.',
    direccion: 'CAL. CAJABAMBA MZA. A LOTE 31 DPTO. 3, SAN MARTÍN DE PORRES, LIMA',
    fechaEmision: '18/07/2026 12:12:54',
    fechaVenc: '18/07/2026',
    tipoPago: 'Contado',
    item: { cant: '1.00', unid: 'NIU', desc: 'Venta de dispositivo GPS Teltonika, modelo FMC234, para placa AML-757', vunit: 'S/ 245.76', pvent: 'S/ 290.00', total: 'S/ 290.00' },
    letras: 'SON DOSCIENTOS NOVENTA CON 00/100 SOLES',
    resumen: [
      { label: 'Op. Gravadas', val: 'S/ 245.76' },
      { label: 'Op. Exoneradas', val: 'S/ 0.00' },
      { label: 'Op. Inafectas', val: 'S/ 0.00' },
      { label: 'I.G.V. (18%)', val: 'S/ 44.24' },
      { label: 'IMPORTE TOTAL', val: 'S/ 290.00' },
    ],
  },
  {
    id: 'boleta',
    name: 'Boleta de Venta Electrónica',
    short: 'BV',
    color: 'from-red-600 to-rose-600',
    description: 'Comprobante de pago para consumidores finales sin derecho a crédito fiscal.',
    title: 'BOLETA DE VENTA ELECTRÓNICA',
    serie: 'B001-00012942',
    clienteLabel: 'DNI',
    clienteDoc: '44556677',
    cliente: 'MENDOZA RUIZ, CARLOS ALBERTO',
    direccion: 'AV. LOS ÁLAMOS NRO. 245, LOS OLIVOS, LIMA LIMA',
    fechaEmision: '18/07/2026 15:04:21',
    fechaVenc: '18/07/2026',
    tipoPago: 'Contado',
    item: { cant: '1.00', unid: 'ZZ', desc: 'Servicio de instalación y configuración de equipo GPS vehicular', vunit: 'S/ 84.75', pvent: 'S/ 100.00', total: 'S/ 100.00' },
    letras: 'SON CIEN CON 00/100 SOLES',
    resumen: [
      { label: 'Op. Gravadas', val: 'S/ 84.75' },
      { label: 'Op. Exoneradas', val: 'S/ 0.00' },
      { label: 'Op. Inafectas', val: 'S/ 0.00' },
      { label: 'I.G.V. (18%)', val: 'S/ 15.25' },
      { label: 'IMPORTE TOTAL', val: 'S/ 100.00' },
    ],
  },
  {
    id: 'nota_credito',
    name: 'Nota de Crédito Electrónica',
    short: 'NC',
    color: 'from-amber-500 to-orange-600',
    description: 'Documento para anular, corregir o aplicar descuentos sobre comprobantes emitidos.',
    title: 'NOTA DE CRÉDITO ELECTRÓNICA',
    serie: 'FC01-00000215',
    clienteLabel: 'R.U.C.',
    clienteDoc: '20553871256',
    cliente: 'COMBUSTIBLES Y CONTRATISTAS GENERALES S.A.C.',
    direccion: 'CAL. CAJABAMBA MZA. A LOTE 31 DPTO. 3, SAN MARTÍN DE PORRES, LIMA',
    fechaEmision: '19/07/2026 09:31:08',
    fechaVenc: '19/07/2026',
    tipoPago: 'Contado',
    item: { cant: '1.00', unid: 'NIU', desc: 'Anulación por devolución de mercadería — Ref. Factura F001-00015163', vunit: '-S/ 245.76', pvent: '-S/ 290.00', total: '-S/ 290.00' },
    letras: 'SON DOSCIENTOS NOVENTA CON 00/100 SOLES (NOTA DE CRÉDITO)',
    resumen: [
      { label: 'Op. Gravadas', val: '-S/ 245.76' },
      { label: 'Op. Exoneradas', val: 'S/ 0.00' },
      { label: 'Op. Inafectas', val: 'S/ 0.00' },
      { label: 'I.G.V. (18%)', val: '-S/ 44.24' },
      { label: 'IMPORTE TOTAL', val: '-S/ 290.00' },
    ],
  },
  {
    id: 'nota_debito',
    name: 'Nota de Débito Electrónica',
    short: 'ND',
    color: 'from-purple-600 to-indigo-700',
    description: 'Documento para aplicar penalidades, cobro de intereses o aumentos de valor.',
    title: 'NOTA DE DÉBITO ELECTRÓNICA',
    serie: 'FD01-00000104',
    clienteLabel: 'R.U.C.',
    clienteDoc: '20553871256',
    cliente: 'COMBUSTIBLES Y CONTRATISTAS GENERALES S.A.C.',
    direccion: 'CAL. CAJABAMBA MZA. A LOTE 31 DPTO. 3, SAN MARTÍN DE PORRES, LIMA',
    fechaEmision: '20/07/2026 11:47:33',
    fechaVenc: '20/07/2026',
    tipoPago: 'Crédito',
    item: { cant: '1.00', unid: 'ZZ', desc: 'Interés por mora en el pago — Ref. Factura F001-00015163', vunit: 'S/ 38.14', pvent: 'S/ 45.00', total: 'S/ 45.00' },
    letras: 'SON CUARENTA Y CINCO CON 00/100 SOLES',
    resumen: [
      { label: 'Op. Gravadas', val: 'S/ 38.14' },
      { label: 'Op. Exoneradas', val: 'S/ 0.00' },
      { label: 'Op. Inafectas', val: 'S/ 0.00' },
      { label: 'I.G.V. (18%)', val: 'S/ 6.86' },
      { label: 'IMPORTE TOTAL', val: 'S/ 45.00' },
    ],
  },
  {
    id: 'guia_remision',
    name: 'Guía de Remisión Remitente (GRE)',
    short: 'GR',
    color: 'from-emerald-600 to-teal-600',
    description: 'Documento electrónico obligatorio para sustentar el traslado de bienes en el Perú.',
    title: 'GUÍA DE REMISIÓN REMITENTE',
    serie: 'T001-00001841',
    clienteLabel: 'R.U.C.',
    clienteDoc: '20412356789',
    cliente: 'TRANSPORTES LOGÍSTICOS DEL SUR S.A.C.',
    direccion: 'JR. PIZARRO NRO. 450, TRUJILLO, LA LIBERTAD',
    fechaEmision: '21/07/2026 08:15:00',
    fechaVenc: '—',
    tipoPago: 'No aplica',
    item: { cant: '2.00', unid: 'NIU', desc: 'Traslado de mercadería: dispositivos GPS Teltonika FMC234', vunit: '—', pvent: '—', total: '—' },
    letras: 'TRASLADO DE BIENES — MOTIVO: VENTA CON ENTREGA A TERCEROS',
    resumen: [
      { label: 'Punto de Partida', val: 'Av. El Sol 124, Ate' },
      { label: 'Punto de Llegada', val: 'Jr. Pizarro 450, Trujillo' },
      { label: 'Vehículo / Placa', val: 'F3D-851' },
      { label: 'Peso Bruto Total', val: '1.20 KGM' },
      { label: 'MODALIDAD DE TRASLADO', val: 'Transporte Público' },
    ],
  },
];

export default function DocumentTypes() {
  const [selectedDocId, setSelectedDocId] = useState('factura');
  const activeDoc = DOCUMENTS.find(d => d.id === selectedDocId) || DOCUMENTS[0];
  const { item, resumen } = activeDoc;
  const lastRow = resumen[resumen.length - 1];

  return (
    <section id="comprobantes" className="py-20 bg-white dark:bg-surface-dark-1 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            ¿Qué documentos puedes emitir ante SUNAT?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-5 text-base sm:text-lg leading-relaxed">
            Facturas, boletas, notas de crédito y débito, y guías de remisión — todos homologados, con firma digital instantánea y envío directo a los servidores de SUNAT.
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
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-br from-indigo-600 to-blue-700 border-transparent shadow-lg shadow-indigo-500/25 -translate-y-0.5'
                      : 'bg-brand-light dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className={`font-bold text-sm transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {doc.name}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      isActive ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {doc.description}
                    </p>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                    isActive ? 'translate-x-1.5 text-white' : 'text-slate-400 group-hover:translate-x-1'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: vista previa realista del comprobante (papel blanco tipo PDF) */}
          <div className="lg:col-span-7 flex relative">
            {/* Sello SUNAT: superpuesto en la esquina superior derecha */}
            <img
              src={logoSunat}
              alt="100% Integrado con SUNAT"
              className="absolute -top-9 -right-10 sm:-top-8 sm:-right-5 w-15 sm:w-15 drop-shadow-lg z-10 pointer-events-none select-none"
            />
            <div className="w-full bg-white text-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">

              {/* Cabecera: emisor + recuadro de RUC / tipo de documento */}
              <div className="p-4 sm:p-6 flex justify-between items-start gap-2 sm:gap-4 flex-nowrap">
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-md shrink-0 shadow-md overflow-hidden">
                    <img src={logoFactufly} alt="FactuFly" width={72} height={72} className="w-full h-full object-cover" />
                    {/* Capa indicando que aquí va el logo del cliente */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-white text-center leading-tight">Tu Logo</span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-base lg:text-lg font-black text-brand-blue leading-tight truncate sm:whitespace-normal">{EMISOR.nombre}</h3>
                    <p className="text-[8.5px] sm:text-[9.5px] text-slate-500 mt-0.5 sm:mt-1 leading-snug">
                      {EMISOR.razon}<br />
                      Dir. Fiscal: {EMISOR.direccion}<br />
                      {EMISOR.contacto}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 border-2 border-brand-blue rounded-md text-center min-w-[150px] sm:min-w-[180px] max-w-[200px] overflow-hidden text-[9.5px] sm:text-[11px] font-bold">
                  <div className="px-2 py-1 sm:px-3 sm:py-1.5 text-slate-800">R.U.C. {EMISOR.ruc}</div>
                  <div className="px-2 py-1 sm:px-3 sm:py-1.5 text-white bg-brand-blue uppercase tracking-tight">{activeDoc.title}</div>
                  <div className="px-2 py-1 sm:px-3 sm:py-1.5 text-slate-800 border-t border-slate-200">N° {activeDoc.serie}</div>
                </div>
              </div>

              {/* Banda de datos del cliente */}
              <div className="mx-5 sm:mx-6 rounded-md bg-slate-100 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[11px] leading-tight">
                <div className="space-y-1">
                  <p><span className="font-bold text-brand-blue">Cliente:</span> {activeDoc.cliente}</p>
                  <p><span className="font-bold text-brand-blue">{activeDoc.clienteLabel}:</span> {activeDoc.clienteDoc}</p>
                  <p><span className="font-bold text-brand-blue">Dirección:</span> {activeDoc.direccion}</p>
                </div>
                <div className="space-y-1">
                  <p><span className="font-bold text-brand-blue">Fecha Emisión:</span> {activeDoc.fechaEmision}</p>
                  <p><span className="font-bold text-brand-blue">Tipo Pago:</span> {activeDoc.tipoPago}</p>
                  <p><span className="font-bold text-brand-blue">Fecha Vencimiento:</span> {activeDoc.fechaVenc}</p>
                </div>
              </div>

              {/* Tabla de ítems */}
              <div className="px-5 sm:px-6 mt-4 overflow-x-auto">
                <table className="w-full text-[11px] min-w-[480px]">
                  <thead>
                    <tr className="bg-brand-blue text-white text-left">
                      <th className="py-1.5 px-2 font-bold first:rounded-l-md">Item</th>
                      <th className="py-1.5 px-2 font-bold">Cant.</th>
                      <th className="py-1.5 px-2 font-bold">Unid.</th>
                      <th className="py-1.5 px-2 font-bold">Descripción</th>
                      <th className="py-1.5 px-2 font-bold text-right">V.Unit.</th>
                      <th className="py-1.5 px-2 font-bold text-right">P.Vent.</th>
                      <th className="py-1.5 px-2 font-bold text-right rounded-r-md">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-2 align-top">1</td>
                      <td className="py-2.5 px-2 align-top">{item.cant}</td>
                      <td className="py-2.5 px-2 align-top">{item.unid}</td>
                      <td className="py-2.5 px-2 align-top font-medium text-slate-900">{item.desc}</td>
                      <td className="py-2.5 px-2 align-top text-right font-mono whitespace-nowrap">{item.vunit}</td>
                      <td className="py-2.5 px-2 align-top text-right font-mono whitespace-nowrap">{item.pvent}</td>
                      <td className="py-2.5 px-2 align-top text-right font-mono whitespace-nowrap">{item.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Monto en letras */}
              <div className="px-5 sm:px-6 mt-3">
                <p className="text-[11px] font-bold text-slate-700 uppercase">{activeDoc.letras}</p>
              </div>

              {/* Pie: QR + Resumen */}
              <div className="px-5 sm:px-6 py-5 mt-auto flex justify-between items-end gap-6 flex-wrap">
                <img src={qrComprobante} alt="Código QR SUNAT" width={96} height={96} className="w-24 h-24 object-contain" />

                <div className="w-full sm:w-60 text-[11px]">
                  <p className="font-bold text-brand-blue mb-1">Resumen</p>
                  <div className="border border-slate-200 rounded-md overflow-hidden divide-y divide-slate-200">
                    {resumen.slice(0, -1).map((row) => (
                      <div key={row.label} className="flex justify-between px-3 py-1.5">
                        <span className="text-slate-600">{row.label}</span>
                        <span className="font-mono text-slate-800">{row.val}</span>
                      </div>
                    ))}
                    <div className="flex justify-between px-3 py-1.5 bg-brand-blue text-white font-bold">
                      <span className="uppercase">{lastRow.label}</span>
                      <span className="font-mono">{lastRow.val}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leyenda inferior */}
              <div className="px-5 sm:px-6 py-2.5 border-t border-slate-200 flex justify-between items-center gap-3 text-[9px] text-slate-400 flex-wrap">
                <span>Representación Impresa de {activeDoc.title} - Autorizado por SUNAT</span>
                <span>Pág. 1</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
