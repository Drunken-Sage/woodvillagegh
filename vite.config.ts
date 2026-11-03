import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "node:path";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/woodvillagegh/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    }
})
