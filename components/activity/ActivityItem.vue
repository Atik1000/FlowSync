<template>
  <li class="relative pl-6">
    <span class="absolute left-0 top-2 h-2 w-2 rounded-full" :class="dotClass" />
    <div class="flex items-center justify-between gap-3">
      <p class="text-sm text-slate-800 dark:text-slate-100">
        {{ activity.message }}
      </p>
      <p class="shrink-0 text-[11px] text-slate-400">
        {{ timeAgo }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Activity } from '~/types/domain'

const props = defineProps<{
  activity: Activity
}>()

const dotClass = computed(() => {
  switch (props.activity.type) {
    case 'create':
      return 'bg-primary-500'
    case 'move':
      return 'bg-amber-500'
    case 'complete':
      return 'bg-emerald-500'
    case 'focus':
      return 'bg-sky-500'
    default:
      return 'bg-slate-400'
  }
})

const timeAgo = computed(() => {
  const ts = new Date(props.activity.timestamp).getTime()
  const diff = Date.now() - ts
  const minutes = Math.round(diff / (1000 * 60))
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
})
</script>

