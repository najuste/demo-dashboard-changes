import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://najuste.github.io/demo-dashboard-changes/ on GitHub
// Pages, so assets must resolve under that sub-path. Locally (dev/preview)
// the base stays '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/demo-dashboard-changes/' : '/',
  plugins: [react()],
}))
