import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { websiteBuildPlugin } from './scripts/site-build.js'
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), websiteBuildPlugin(mode)],
  build: { sourcemap: false },
  test: { environment: 'node', include: ['src/**/*.test.{js,jsx}'] },
}))
