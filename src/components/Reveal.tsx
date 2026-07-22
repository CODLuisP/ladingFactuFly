import React, { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'motion/react';

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  minHeight?: string;
  rootMargin?: string;
}

// Envuelve una sección para que no cargue JS/imágenes ni se monte en el DOM
// hasta que el usuario se aproxime haciendo scroll (300px antes).
export default function Reveal({
  children,
  delay = 0,
  minHeight = '100px',
  rootMargin = '300px 0px',
}: RevealProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isInView, rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: !isInView ? minHeight : undefined }}>
      {isInView ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={variants}
          transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}
