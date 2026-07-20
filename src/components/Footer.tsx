import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import whatsappIcon from '../public/comprobantes/whatsapp-icon.svg';

export default function Footer() {
  const { scrollToSection } = useNavigation();
  // Contact Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <footer id="footer" className="bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">

      {/* Upper Section: Contacto (formulario + datos + mapa) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Formulario (izquierda) */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark dark:text-white">¡Mensaje enviado con éxito!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                    Gracias por escribirnos. Un asesor de Factufly se comunicará contigo al teléfono o correo brindado en menos de 15 minutos.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-brand-dark dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Contáctanos</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-brand-dark dark:text-white tracking-tight mt-1">
                    Ponte en contacto
                  </h2>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nombre</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correo</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Celular / WhatsApp</label>
                    <input
                      type="text"
                      required
                      maxLength={9}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="987654321"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-600 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos qué necesitas..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  {submitting ? <>Enviando...</> : <><Send className="w-4 h-4" /> Enviar mensaje</>}
                </button>

                <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                  Al enviar, aceptas que Factufly procese tus datos con fines comerciales conforme a la Ley N° 29733 (Protección de Datos Personales).
                </p>
              </form>
            )}
          </div>

          {/* Info de contacto + mapa (derecha) */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Asesoría SUNAT gratuita</span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight mt-1 leading-tight">
              ¿Listo para dar el gran salto tecnológico?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-3">
              Déjanos tus datos y un especialista tributario se pondrá en contacto contigo en menos de 15 minutos para resolver tus dudas sobre homologación, certificado digital y emisión electrónica, sin costo alguno.
            </p>

            {/* Grid de datos de contacto */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 mt-8">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">Teléfono</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">(01) 640-9821</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">Correo</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ventas@factufly.pe</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <img src={whatsappIcon} alt="" className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">WhatsApp</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">+51 987 654 321</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">Oficina</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Av. Larco 450, Miraflores, Lima</p>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <iframe
                title="Ubicación FactuFly"
                src="https://maps.google.com/maps?q=Av.%20Larco%20450%20Miraflores%20Lima&z=15&output=embed"
                className="w-full h-48 grayscale-[20%] dark:grayscale dark:contrast-125 dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Middle Section: Footer Sitemap Links & Sunat PSE Seal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-red-600 text-white font-extrabold italic text-sm">
              F
            </div>
            <span className="text-lg font-black text-brand-dark dark:text-white">Factufly</span>
          </div>

          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Factufly es el software de facturación electrónica líder en Perú, homologado oficialmente como Proveedor de Servicios Electrónicos (PSE) ante la SUNAT. Conectamos la administración comercial de las empresas peruanas con la modernidad tecnológica.
          </p>

          {/* SUNAT PSE Compliance Seal */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
            <ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0" />
            <div>
              <span className="block text-[8px] font-black tracking-widest text-slate-500 uppercase">PROVEEDOR AUTORIZADO</span>
              <span className="block text-[10px] font-bold text-brand-dark dark:text-white uppercase -mt-0.5">PSE SUNAT PERÚ</span>
            </div>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => scrollToSection('hero')} className="hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer">
                Inicio / Demo
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('comprobantes')} className="hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer">
                Comprobantes que Emitimos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('caracteristicas')} className="hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer">
                Características Clave
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('api-section')} className="hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer">
                API para Desarrolladores
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('planes')} className="hover:text-brand-dark dark:hover:text-white transition-colors cursor-pointer">
                Planes y Precios
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2 - SUNAT context */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest">Recursos SUNAT</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://www.sunat.gob.pe/" target="_blank" rel="noreferrer" className="hover:text-brand-dark dark:hover:text-white transition-colors inline-flex items-center gap-1">
                Portal de la SUNAT Oficial <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.reniec.gob.pe/" target="_blank" rel="noreferrer" className="hover:text-brand-dark dark:hover:text-white transition-colors inline-flex items-center gap-1">
                Consulta RENIEC Oficial <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-dark dark:hover:text-white transition-colors">
                Verificación de Comprobantes (CDR)
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-dark dark:hover:text-white transition-colors">
                Descarga de Certificado Digital
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright & Legal Notice */}
      <div className="bg-slate-50 dark:bg-slate-950 py-6 text-center text-[11px] text-slate-500 border-t border-slate-200 dark:border-slate-900 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Factufly Perú. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 justify-center">
            Hecho con <Heart className="w-3 h-3 text-red-500 fill-current" /> para las empresas peruanas.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-dark dark:hover:text-slate-300">Términos y Condiciones</a>
            <a href="#" className="hover:text-brand-dark dark:hover:text-slate-300">Libro de Reclamaciones</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
