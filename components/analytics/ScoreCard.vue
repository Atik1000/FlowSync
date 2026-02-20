<template>
  <AppCard
    title="Performance score"
    subtitle="Composite score based on completions, focus time, and consistency."
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {{ score }}<span class="text-base text-slate-400">/100</span>
          </p>
          <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Level: <span class="font-medium">{{ level }}</span>
          </p>
        </div>
        <span
          class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
          :class="trendClass"
        >
          <span v-if="trend === 'up'">▲</span>
          <span v-else-if="trend === 'down'">▼</span>
          <span v-else>▬</span>
          <span class="uppercase tracking-[0.16em]">Trend</span>
        </span>
      </div>

      <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          class="h-full rounded-full bg-primary-600 transition-all"
          :style="{ width: `${score}%` }"
        />
      </div>

      <p class="text-xs text-slate-500 dark:text-slate-400">
        Higher scores reward consistent completions, focused work sessions, and on-time delivery.
      </p>
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from '~/components/shared/AppCard.vue'
import type { StoreValue } from 'pinia'
import type { useAnalyticsStore } from '~/stores/analytics.store'

const props = defineProps<{
  score: number
  trend: StoreValue<typeof useAnalyticsStore>['trend']
  level: string
}>()

const trendClass = computed(() => {
  if (props.trend === 'up') {
    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100'
  }
  if (props.trend === 'down') {
    return 'bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-100'
  }
  return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
})
</script>

