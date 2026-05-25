import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const PWA_ICON = (size) =>
  `https://res.cloudinary.com/duzuguldp/image/upload/f_auto,q_auto,w_${size},h_${size},c_fill/new-jubba/static/new-jubba-logo`

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [],
      manifest: {
        name: 'New Jubba Restaurant',
        short_name: 'New Jubba',
        description:
          'New Jubba Restaurant — menu, dalab, iyo maamulka makhaayadda.',
        theme_color: '#263238',
        background_color: '#263238',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: PWA_ICON(192),
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: PWA_ICON(512),
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: PWA_ICON(512),
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html',
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api/staticforms': {
        target: 'https://api.staticforms.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/staticforms/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('recharts')) return 'charts'
          if (
            id.includes('react-router-dom') ||
            id.includes(`${'/'}react${'/'}`) ||
            id.includes('react-dom')
          ) {
            return 'react-vendor'
          }
          if (
            id.includes('axios') ||
            id.includes('lucide-react') ||
            id.includes('react-hot-toast')
          ) {
            return 'app-vendor'
          }
        },
      },
    },
  },
})
