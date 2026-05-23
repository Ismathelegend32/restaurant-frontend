import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
