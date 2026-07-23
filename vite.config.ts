import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import type { Plugin } from 'vite';

/**
 * Plugin que mueve el CSS del <link> bloqueante a una inyección asíncrona
 * vía JS, eliminando la advertencia "Render-blocking requests" de Lighthouse.
 */
function cssAsyncPlugin(): Plugin {
  return {
    name: 'css-async-inject',
    enforce: 'post',
    transformIndexHtml(html) {
      // Convierte <link rel="stylesheet"> en preload + onload para no bloquear el render
      return html.replace(
        /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)"\s*\/?>/g,
        `<link rel="preload" as="style" href="$1" onload="this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="$1" /></noscript>`
      );
    },
  };
}

export default defineConfig(() => {
  return {
    publicDir: 'public',
    plugins: [react(), tailwindcss(), cssAsyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3001,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
