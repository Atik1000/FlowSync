<template>
  <AppCard
    title="Tasks completed per week"
    subtitle="See how many tasks your team completes over time."
  >
    <Suspense>
      <LazyBarChart
        :labels="labels"
        :values="values"
      />
      <template #fallback>
        <div class="skeleton h-40 w-full" />
      </template>
    </Suspense>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from '~/components/shared/AppCard.vue'
import type { ProductivityPoint } from '~/stores/analytics.store'

const props = defineProps<{
  series: ProductivityPoint[]
}>()

const labels = computed(() => props.series.map((p) => p.date))
const values = computed(() => props.series.map((p) => p.completedCount))

const LazyBarChart = defineAsyncComponent(async () => {
  const mod = await import('~/components/analytics/internal/BarChart.vue')
  return mod.default
})
</script>

