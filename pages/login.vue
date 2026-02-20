<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <div class="card w-full max-w-md p-6 shadow-soft">
      <header class="mb-5 space-y-1">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
          FlowSync
        </p>
        <h1 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome back
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Sign in with a name to enter your workspace. This is a mock login for demo purposes.
        </p>
      </header>

      <form
        class="space-y-4"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-2">
          <label class="text-xs font-medium text-slate-600 dark:text-slate-300">
            Name
          </label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
            placeholder="e.g. John Doe"
          >
        </div>

        <AppButton
          type="submit"
          block
        >
          Continue to FlowSync
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '~/components/shared/AppButton.vue'
import { useUserStore } from '~/stores/user.store'

definePageMeta({
  layout: false
})

const name = ref('')
const userStore = useUserStore()
const router = useRouter()

function handleLogin() {
  if (!name.value.trim()) return
  userStore.login(name.value.trim(), 'member')
  router.push('/board')
}
</script>

