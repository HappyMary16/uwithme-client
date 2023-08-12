import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1024
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      manifest: false,
      injectManifest: {
        globPatterns: ['**/*.{html,js,css,png,json}']
      }
    })
  ]
})