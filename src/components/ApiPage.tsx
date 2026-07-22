import React from 'react';
import Header from './layout/Header';
import ContactSection from './ContactSection';
import Footer from './layout/Footer';
import ApiSection from './ApiSection';
import Reveal from './Reveal';

// Página independiente para /apifactufly — no forma parte del scroll de la landing.
export default function ApiPage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        <Reveal><ApiSection /></Reveal>
      </main>
      <Reveal><ContactSection /></Reveal>
      <Footer />
    </>
  );
}
