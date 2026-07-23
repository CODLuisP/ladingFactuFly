import sponsor01 from '../assets/sponsors/sponsor01.webp';
import sponsor02 from '../assets/sponsors/sponsor02.webp';
import sponsor03 from '../assets/sponsors/sponsor03.webp';
import sponsor04 from '../assets/sponsors/sponsor04.webp';
import sponsor05 from '../assets/sponsors/sponsor05.webp';
import sponsor06 from '../assets/sponsors/sponsor06.webp';
import sponsor07 from '../assets/sponsors/sponsor07.webp';
import LazyImage from './common/LazyImage';

const SPONSORS = [sponsor01, sponsor02, sponsor03, sponsor04, sponsor05, sponsor06, sponsor07];

export default function Sponsors() {
  // Se duplica la lista para que el bucle del carrusel sea continuo (loop infinito sin salto).
  const track = [...SPONSORS, ...SPONSORS];

  return (
    <section className="py-14 md:py-16 overflow-hidden bg-white dark:bg-surface-dark-1 border-y border-slate-100 dark:border-white/5 transition-colors duration-300">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-10 px-6">
        Empresas que ya confían en nosotros
      </h2>

      <div className="relative">
        {/* Degradados en los bordes para que los logos se desvanezcan */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white dark:from-surface-dark-1 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white dark:from-surface-dark-1 to-transparent" />

        {/* Pista: se mueve -50% (una copia entera) y se reinicia sin salto. Pausa al pasar el mouse. */}
        <div className="flex w-max animate-[sponsors-marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((src, i) => (
            <div key={i} className="mx-8 sm:mx-12 flex shrink-0 items-center">
              <LazyImage
                src={src}
                alt="Empresa cliente"
                width={120}
                height={32}
                rootMargin="100px"
                imgClassName="h-7 sm:h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity brightness-0 dark:brightness-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sponsors-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
