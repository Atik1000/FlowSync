import { useUserStore } from '../stores/user.store'

declare const defineNuxtRouteMiddleware: any
declare const navigateTo: (path: string) => any

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (to.path === '/login') return

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

