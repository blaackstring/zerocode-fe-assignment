import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   build: {
    chunkSizeWarningLimit: 1000 // increase limit (default is 500)
  },
  plugins: [react(), tailwindcss(),],
  server:{
    proxy:{
      '/api':'http://localhost:3000'
    }
  }
})
