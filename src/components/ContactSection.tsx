import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Send } from 'lucide-react';
import whatsappIcon from '../public/comprobantes/whatsapp-icon.svg';

// Sección de Contacto: sigue el tema claro/oscuro del sitio (no es el footer).
export default function ContactSection() {
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
    <section id="footer" className="bg-white text-slate-600 dark:bg-surface-dark-1 dark:text-slate-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Formulario (izquierda) */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-dark dark:text-white">¡Mensaje enviado con éxito!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                    Gracias por escribirnos. Un asesor de FactuFly se comunicará contigo al teléfono o correo brindado en menos de 15 minutos.
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
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white tracking-tight mt-1">
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
  className="w-full px-4 py-3 bg-white dark:bg-surface-dark-1 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
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
                    className="w-full px-4 py-3 bg-white dark:bg-surface-dark-1 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
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
                      placeholder="952379386"
                 className="w-full px-4 py-3 bg-white dark:bg-surface-dark-1 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
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
              className="w-full px-4 py-3 bg-white dark:bg-surface-dark-1 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-brand-dark dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
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
                  Al enviar, aceptas que FactuFly procese tus datos con fines comerciales conforme a la Ley N° 29733 (Protección de Datos Personales).
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">+51 952 379 386</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">Correo</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">info@ideatec.com.pe</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <img src={whatsappIcon} alt="" width={20} height={20} className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">WhatsApp</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">+51 952 379 386</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-brand-dark dark:text-white mt-3">Oficina</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Av. Petit Thouars 1775, Int. 501, Lince, Lima</p>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <iframe
                title="Ubicación FactuFly"
                src="https://maps.google.com/maps?q=Av.%20Petit%20Thouars%201775%20Lince%20Lima&z=15&output=embed"
                className="w-full h-48"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
