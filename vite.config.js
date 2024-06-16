import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
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
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://sheets.devcrackthecode.net',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
