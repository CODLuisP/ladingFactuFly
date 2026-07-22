import React from 'react';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import footerBg from '../../public/footer.jpg';
import logoFactufly from '../../public/logofactuflyb.png';
import whatsappIcon from '../../public/comprobantes/whatsapp-icon.svg';

// Footer real: sección aparte, siempre oscura, con imagen de fondo.
export default function Footer() {
  const { scrollToSection } = useNavigation();

  return (
    <footer className="relative overflow-hidden text-slate-300 bg-[#04060d]">
      <img src={footerBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute inset-0 bg-[#04060d]/90 pointer-events-none" />

      <div className="relative z-10">

        {/* Brand + Nav + Resources */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#0f2e64] border border-white/10 shrink-0">
                <img src={logoFactufly} alt="FactuFly" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-lg font-black text-white">FactuFly</span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              FactuFly es el punto de venta y facturación electrónica todo en uno para negocios peruanos, homologado oficialmente como Proveedor de Servicios Electrónicos (PSE) ante la SUNAT. Vende, cobra y factura desde un solo sistema.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://factufly.ideatec.com.pe/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
                  Ingresar al Sistema
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('comprobantes')} className="hover:text-white transition-colors cursor-pointer">
                  Comprobantes que Emitimos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('caracteristicas')} className="hover:text-white transition-colors cursor-pointer">
                  Características Clave
                </button>
              </li>
              <li>
                <a href="/apifactufly" className="hover:text-white transition-colors">
                  API para Desarrolladores
                </a>
              </li>
              <li>
                <button onClick={() => scrollToSection('planes')} className="hover:text-white transition-colors cursor-pointer">
                  Planes y Precios
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 - Contacto y Soporte Directo */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest">Contacto y Soporte</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://wa.me/51952379386?text=Hola,%20necesito%20asesor%C3%ADa%20sobre%20FactuFly"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-2 text-slate-300"
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="w-3.5 h-3.5 shrink-0" />
                  Soporte WhatsApp (+51 952 379 386)
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ideatec.com.pe"
                  className="hover:text-white transition-colors inline-flex items-center gap-2 text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  info@ideatec.com.pe
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Av. Petit Thouars 1775, Int. 501, Lince, Lima — Perú</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>RUC 20601841038</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom: Copyright & Legal */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} FactuFly Perú. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Libro de Reclamaciones</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
