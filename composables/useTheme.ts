import { onMounted, ref } from 'vue'

const isDarkRef = ref(false)
const STORAGE_KEY = 'flowsync-theme'

export function useTheme() {
  function applyTheme(dark: boolean) {
    isDarkRef.value = dark
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  function toggleTheme() {
    applyTheme(!isDarkRef.value)
    window.localStorage.setItem(STORAGE_KEY, isDarkRef.value ? 'dark' : 'light')
  }

  onMounted(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark') {
      applyTheme(true)
    } else if (stored === 'light') {
      applyTheme(false)
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
    }
  })

  return {
    isDark: isDarkRef,
    toggleTheme
  }
}

