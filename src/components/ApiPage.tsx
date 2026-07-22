import React from 'react';
import Header from './layout/Header';
import ContactSection from './ContactSection';
import Footer from './layout/Footer';
import ApiSection from './ApiSection';

// Página independiente para /apifactufly — no forma parte del scroll de la landing.
export default function ApiPage() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        <ApiSection />
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
