// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  css: ['./assets/css/main.css'],

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
