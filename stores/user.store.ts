import { defineStore } from 'pinia'

interface UserState {
  id: string | null
  name: string | null
  role: 'admin' | 'member' | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    name: null,
    role: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.id,
    displayName: (state) => state.name ?? 'Guest',
    isAdmin: (state) => state.role === 'admin'
  },
  actions: {
    login(name: string, role: 'admin' | 'member' = 'member') {
      this.id = crypto.randomUUID()
      this.name = name
      this.role = role
      this.token = 'mock-token'
    },
    logout() {
      this.id = null
      this.name = null
      this.role = null
      this.token = null
    }
  }
})

