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
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-black/20 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
    >
      {/* Anillo de pulso para llamar la atención sin ser invasivo */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <img src={whatsappIcon} alt="" width={28} height={28} className="relative w-7 h-7 brightness-0 invert" />
    </a>
  );
}
