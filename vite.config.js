import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { browserslistToTargets } from 'lightningcss'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    lightningcss: {
      // Ensure -webkit-backdrop-filter is preserved for Safari/WebKit
      targets: browserslistToTargets([
        '>= 0.25%',
        'last 2 versions',
        'not dead',
        'Safari >= 14',
        'iOS >= 14',
      ]),
    },
  },
})
