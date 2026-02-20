<template>
  <div class="page-container">
    <aside class="sidebar">
      <div class="flex items-center justify-between gap-3 px-4 py-4">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary-600 text-sm font-semibold text-white shadow-soft">
            FS
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">
              FlowSync
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Team Productivity
            </p>
          </div>
        </div>
        <button
          type="button"
          class="hidden rounded-full border border-slate-200 bg-slate-50 p-1 text-xs text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 md:inline-flex"
          @click="toggleTheme"
        >
          <span v-if="isDark">☾</span>
          <span v-else>☼</span>
        </button>
      </div>

      <nav class="mt-2 flex-1 space-y-1 px-3 py-2 text-sm">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-nav-item"
          :class="{ 'sidebar-nav-item-active': route.path === item.to }"
        >
          <span class="text-base">{{ item.icon }}</span>
          <span class="truncate">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <footer class="mt-auto border-t border-slate-200 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div class="flex items-center justify-between">
          <span>Workspace</span>
          <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Beta
          </span>
        </div>
      </footer>
    </aside>

    <div class="main-content">
      <header class="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-3 dark:border-slate-800/80 dark:bg-slate-950/80">
        <div class="flex items-center gap-3 md:hidden">
          <button
            type="button"
            class="rounded-full border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            @click="toggleTheme"
          >
            <span v-if="isDark">☾</span>
            <span v-else>☼</span>
          </button>
          <h1 class="text-sm font-semibold text-slate-900 dark:text-slate-50">
            FlowSync
          </h1>
        </div>

        <div class="hidden items-center gap-2 md:flex">
          <p class="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            FlowSync
          </p>
          <span class="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Smart team productivity board
          </p>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <AppButton
            variant="ghost"
            class="hidden md:inline-flex"
            @click="navigateTo('/board')"
          >
            Board
          </AppButton>
          <AppButton
            variant="ghost"
            class="hidden sm:inline-flex"
            @click="navigateTo('/analytics')"
          >
            Analytics
          </AppButton>
          <AppButton
            variant="primary"
            @click="navigateTo('/board')"
          >
            + New Task
          </AppButton>
        </div>
      </header>

      <main class="page-inner">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'
import { useRoute, useRouter } from '#imports'
import { useTheme } from '~/composables/useTheme'

const route = useRoute()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()

const navItems = [
  { to: '/board', label: 'Board', icon: '⏱' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
  { to: '/activity', label: 'Activity', icon: '🕒' }
] as const

function navigateTo(path: string) {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

