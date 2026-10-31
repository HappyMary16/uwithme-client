import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{html,js,css,png,json}']
      }
    })
  ],
  server: {
    host: true,
    port: 3000
  },
  build: {
    chunkSizeWarningLimit: 1024
  }
})
