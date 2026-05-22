import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function devIndexPlugin() {
  return {
    name: 'dev-index',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/' || path === '/index.html') {
          req.url = '/index.dev.html'
        }
        next()
      })
    },
  }
}

export default defineConfig(({ command, mode }) => ({
  base: mode === 'production' ? '/my-ecommerce-project/' : '/',
  plugins: [react(), command === 'serve' ? devIndexPlugin() : null].filter(Boolean),
}))
