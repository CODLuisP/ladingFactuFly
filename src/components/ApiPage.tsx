import React, { useEffect } from 'react';
import Header from './layout/Header';
import ContactSection from './ContactSection';
import Footer from './layout/Footer';
import ApiSection from './ApiSection';
import Reveal from './Reveal';

// Página independiente para /apifactufly — no forma parte del scroll de la landing.
export default function ApiPage() {
  useEffect(() => {
    // SEO dinámico para la página de API de Facturación Electrónica en Perú
    document.title = "API Facturación Electrónica Perú | FactuFly REST API SUNAT";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Integra la API RESTful de FactuFly para facturación electrónica en Perú. Emisión directa de comprobantes SUNAT desde tu propio software.');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://facturacion.ideatec.com.pe/apifactufly');
    }

    return () => {
      document.title = "FactuFly | Sistema de Punto de Venta (POS) y Facturación Electrónica en Perú";
      if (metaDesc) {
        metaDesc.setAttribute('content', 'FactuFly es el sistema de punto de venta (POS) y facturación electrónica homologado por SUNAT para negocios en Perú. Emite boletas, facturas y guías en segundos.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://facturacion.ideatec.com.pe/');
      }
    };
  }, []);

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
