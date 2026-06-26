import React, { useState } from 'react';
import { Code, Terminal, Copy, Check, TerminalSquare, ExternalLink, Zap, Network, ArrowRight } from 'lucide-react';
import { ApiLanguage } from '../types';

const CODE_SAMPLES: Record<ApiLanguage, string> = {
  curl: `curl -X POST "https://api.factufly.pe/v1/invoices" \\
  -H "Authorization: Bearer ff_live_98a7c2b3d..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "tipo_comprobante": "FACTURA",
    "serie": "F001",
    "cliente_tipo_documento": "RUC",
    "cliente_numero_documento": "20554433221",
    "items": [
      {
        "descripcion": "Desarrollo de Software a Medida",
        "cantidad": 1,
        "precio_unitario": 2500.00
      }
    ]
  }'`,
  nodejs: `const response = await fetch('https://api.factufly.pe/v1/invoices', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ff_live_98a7c2b3d...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tipo_comprobante: 'FACTURA',
    serie: 'F001',
    cliente_tipo_documento: 'RUC',
    cliente_numero_documento: '20554433221',
    items: [
      {
        descripcion: 'Desarrollo de Software a Medida',
        cantidad: 1,
        precio_unitario: 2500.00
      }
    ]
  })
});

const data = await response.json();
console.log(\`Factura emitida: \${data.comprobante_numero}\`);`,
  python: `import requests

url = "https://api.factufly.pe/v1/invoices"
headers = {
    "Authorization": "Bearer ff_live_98a7c2b3d...",
    "Content-Type": "application/json"
}
payload = {
    "tipo_comprobante": "FACTURA",
    "serie": "F001",
    "cliente_tipo_documento": "RUC",
    "cliente_numero_documento": "20554433221",
    "items": [
        {
            "descripcion": "Desarrollo de Software a Medida",
            "cantidad": 1,
            "precio_unitario": 2500.00
        }
    ]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
  php: `<?php
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.factufly.pe/v1/invoices",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    "tipo_comprobante" => "FACTURA",
    "serie" => "F001",
    "cliente_tipo_documento" => "RUC",
    "cliente_numero_documento" => "20554433221",
    "items" => [
      [
        "descripcion" => "Desarrollo de Software a Medida",
        "cantidad" => 1,
        "precio_unitario" => 2500.00
      ]
    ]
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer ff_live_98a7c2b3d...",
    "Content-Type: application/json"
  ],
]);
$response = curl_exec($curl);
$data = json_decode($response, true);
echo "Factura emitida: " . $data['comprobante_numero'];`
};

const JSON_MOCK_RESPONSE = `{
  "status": "success",
  "comprobante_numero": "F001-0000412",
  "sunat_cdr_status": "ACEPTADO",
  "xml_hash": "a1b2c3d4e5f6g7h8i9j0",
  "urls": {
    "pdf": "https://cdn.factufly.pe/pdf/F001-0000412.pdf",
    "xml": "https://cdn.factufly.pe/xml/F001-0000412.xml",
    "cdr": "https://cdn.factufly.pe/cdr/F001-0000412_cdr.xml"
  },
  "emision_datetime": "2026-06-23T11:55:00-05:00"
}`;

export default function ApiSection() {
  const [activeLang, setActiveLang] = useState<ApiLanguage>('curl');
  const [copied, setCopied] = useState(false);
  
  // Interactive testing states
  const [apiExecutionState, setApiExecutionState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [apiLatency, setApiLatency] = useState<number | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SAMPLES[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateApiCall = () => {
    setApiExecutionState('loading');
    setTimeout(() => {
      setApiLatency(Math.floor(25 + Math.random() * 20));
      setApiExecutionState('success');
    }, 900);
  };

  return (
    <section id="api-section" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* API Info Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
              <Code className="w-4.5 h-4.5" /> API Factufly para Desarrolladores
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              Integra facturación electrónica en tu propio ERP, CRM o tienda online
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              ¿Tienes tu propio software y solo necesitas la conexión con SUNAT? La API RESTful de Factufly fue diseñada por desarrolladores para desarrolladores. Integra boletas, facturas y guías de remisión en menos de una mañana mediante simples peticiones HTTPS.
            </p>

            {/* List of features */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Respuestas en menos de 45 milisegundos</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Infraestructura hiper-escalable en la nube con latencia optimizada.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0 mt-0.5">
                  <Network className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">SDKs en múltiples lenguajes</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ejemplos listos en JS, Python, PHP, Java, Ruby y documentación OpenAPI.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#planes"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-300"
              >
                Ver planes de la API <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://api.factufly.pe/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                Ir a Documentación Técnica <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interactive Code Playground Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-slate-950/20">
              
              {/* Terminal Title Bar */}
              <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">POST /v1/invoices</span>
                </div>

                {/* Language switcher tab controls */}
                <div className="flex items-center gap-1">
                  {(['curl', 'nodejs', 'python', 'php'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        setCopied(false);
                      }}
                      className={`px-2 py-1 text-[10px] font-mono font-bold rounded transition-all uppercase cursor-pointer ${
                        activeLang === lang ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {lang === 'nodejs' ? 'Node' : lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Screen Wrapper */}
              <div className="p-5 font-mono text-xs text-slate-300 relative bg-slate-900/90 h-[240px] overflow-auto">
                <pre className="whitespace-pre overflow-x-auto leading-relaxed">{CODE_SAMPLES[activeLang]}</pre>
                
                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-800 p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copiar código al portapapeles"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* API Integration Interactive Sandbox Console */}
              <div className="bg-slate-950 border-t border-slate-800 p-5 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-850/50 flex-wrap gap-2">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Consola de Pruebas en Vivo</span>
                  
                  <button
                    onClick={simulateApiCall}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <TerminalSquare className="w-3.5 h-3.5" /> Enviar Petición API
                  </button>
                </div>

                {/* Simulated response logs */}
                <div className="mt-4 min-h-[140px] text-[11px] space-y-2">
                  {apiExecutionState === 'idle' && (
                    <p className="text-slate-500 italic text-center py-8">
                      Haz clic en &ldquo;Enviar Petición API&rdquo; para simular la integración con tus propios servidores.
                    </p>
                  )}

                  {apiExecutionState === 'loading' && (
                    <div className="space-y-1 text-slate-400">
                      <p className="text-yellow-400">{'['}POST{']'} Connecting to https://api.factufly.pe/v1/invoices...</p>
                      <p className="animate-pulse">{'['}PENDING{']'} Sending secure JSON payload, verifying token auth...</p>
                      <p className="animate-pulse">{'['}PENDING{']'} SUNAT Handshake & OSE certification signature ceremony...</p>
                    </div>
                  )}

                  {apiExecutionState === 'success' && (
                    <div className="space-y-2 text-slate-300">
                      <div className="flex justify-between text-emerald-400 font-bold border-b border-slate-900 pb-1">
                        <span>HTTP/1.1 201 Created</span>
                        <span>{apiLatency}ms (Latencia SUNAT)</span>
                      </div>
                      <pre className="max-h-[100px] overflow-y-auto bg-slate-900/50 p-2.5 rounded-lg text-emerald-300 border border-slate-800/40 text-[10px] leading-relaxed">
                        {JSON_MOCK_RESPONSE}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
