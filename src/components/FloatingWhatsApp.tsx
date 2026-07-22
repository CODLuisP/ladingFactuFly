import whatsappIcon from '../public/comprobantes/whatsapp-icon.svg';

const WHATSAPP_NUMBER = '51952379386';
const DEFAULT_MESSAGE = 'Hola, quiero más información sobre FactuFly.';

export default function FloatingWhatsApp() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed right-5 sm:right-6 z-[9999] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-2xl shadow-black/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 touch-none select-none"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Anillo de pulso sutil */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping pointer-events-none" />
      <img src={whatsappIcon} alt="WhatsApp" width={28} height={28} loading="lazy" decoding="async" className="relative z-10 w-7 h-7 brightness-0 invert" />
    </a>
  );
}
