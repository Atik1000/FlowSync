import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (to.path === '/login') return

  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

