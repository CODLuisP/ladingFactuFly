import React from 'react';
import { motion, type Variants } from 'motion/react';

const variants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Envuelve una sección para que aparezca con animación suave al entrar en el viewport durante el scroll,
// sin alterar la altura natural del documento ni bloquear el scroll en dispositivos móviles.
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
