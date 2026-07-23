import sponsor01 from '../assets/sponsors/sponsor01.webp';
import sponsor02 from '../assets/sponsors/sponsor02.webp';
import sponsor03 from '../assets/sponsors/sponsor03.webp';
import sponsor04 from '../assets/sponsors/sponsor04.webp';
import sponsor05 from '../assets/sponsors/sponsor05.webp';
import sponsor06 from '../assets/sponsors/sponsor06.webp';
import sponsor07 from '../assets/sponsors/sponsor07.webp';

const SPONSORS = [sponsor01, sponsor02, sponsor03, sponsor04, sponsor05, sponsor06, sponsor07];

export default function Sponsors() {
  // Se duplica la lista para un bucle continuo e infinito sin saltos
  const track = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section className="py-10 sm:py-14 overflow-hidden bg-white dark:bg-surface-dark-1 border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
      <h2 className="text-center text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-800 dark:text-white mb-6 sm:mb-10 px-4">
        Empresas que ya confían en nosotros
      </h2>

      <div className="relative">
        {/* Degradados laterales para desvanecimiento elegante */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-10 bg-gradient-to-r from-white dark:from-surface-dark-1 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-10 bg-gradient-to-l from-white dark:from-surface-dark-1 to-transparent" />

        {/* Pista continua con aceleración por Hardware GPU para evitar congelamientos */}
        <div
          className="flex w-max animate-[sponsors-marquee_25s_linear_infinite] sm:animate-[sponsors-marquee_35s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ willChange: 'transform' }}
        >
          {track.map((src, i) => (
            <div key={i} className="mx-4 sm:mx-8 md:mx-10 flex shrink-0 items-center">
              <img
                src={src}
                alt="Empresa cliente"
                width={100}
                height={26}
                loading="lazy"
                decoding="async"
                className="h-5 sm:h-7 md:h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity brightness-0 dark:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sponsors-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
      `}</style>
    </section>
  );
}
