import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';


export default defineConfig({
  plugins: [react()
    , 
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
server: {
  proxy: {
    '/api': {
      target: 'http://sheets.devcrackthecode.net', // URL base de tu servidor NocoDB
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/api/v1/db/data/v1') // Ajusta según la estructura de tu API
    }
  },
  port: 3000
}
})
