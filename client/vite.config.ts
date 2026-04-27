import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
    },
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true, // Essential for Windows/WSL or systems where native events fail
    },
    hmr: {
      clientPort: 5173, // Ensures the browser connects to the correct port for HMR
    },
    proxy: {
      "/api": {
        target: "http://django:8000",
        changeOrigin: true,
      },
    },
  },
})
