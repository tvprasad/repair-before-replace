import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'node-fetch': path.resolve(process.cwd(), 'src/polyfills/node-fetch.ts'),
      'form-data': path.resolve(process.cwd(), 'src/polyfills/form-data.ts'),
      'node:stream/web': path.resolve(process.cwd(), 'src/polyfills/empty.ts'),
      'fs': path.resolve(process.cwd(), 'src/polyfills/empty-module.ts'),
      'path': path.resolve(process.cwd(), 'src/polyfills/empty-module.ts')
    }
  },
  plugins: [
    react(), 
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  }
})
