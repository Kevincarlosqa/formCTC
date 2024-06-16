import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    // Descomenta esto si necesitas agregar la política de seguridad de contenido
    createHtmlPlugin({
      inject: {
        injectData: {
          head: `
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
          `,
        },
      },
    }),
  ],
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/db': {
  //       target: 'http://sheets.devcrackthecode.net/api/v1', // URL base de tu servidor NocoDB
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/db/, '') // Ajusta según la estructura de tu API
  //     }
  //   }
  // }
});
