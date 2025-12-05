import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    server: {
    proxy: {
      '/api/event': {
        target: 'https://www.eventim-light.com',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api\/event/, '/de/a/5da03c56503ca200015df6cb/api/event'),
      },
    },
  },
})
