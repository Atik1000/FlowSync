// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))
const mainCssPath = join(currentDir, './assets/css/main.css')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  css: [mainCssPath],

  // Disable in-dev TS checker plugin (vite-plugin-checker) to avoid ESM/require crash.
  // Use `npm run lint:types` to run full type-checking instead.
  typescript: {
    typeCheck: false
  },

  app: {
    head: {
      title: 'FlowSync – Smart Team Productivity Board',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Real-time productivity board with focus timers, analytics, and team activity.' }
      ]
    }
  }
})
