import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Явно указываем
    emptyOutDir: true // Очищаем перед сборкой
  },
  server: {
      allowedHosts: ['outspokenly-engaged-redstart.cloudpub.ru']
  }
})