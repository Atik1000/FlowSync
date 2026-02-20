<template>
  <div class="flex h-full flex-col gap-4">
    <section class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="page-title">
          Analytics
        </h1>
        <p class="page-subtitle">
          Understand how your team executes work over time.
        </p>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ScoreCard
        class="lg:col-span-1"
        :score="score"
        :trend="trend"
        :level="level"
      />
      <ProductivityChart
        class="lg:col-span-2"
        :series="series"
      />
    </section>

    <section class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <HeatmapGrid :heatmap="completionHeatmap" />
      <FocusTimeChart :series="series" />
    </section>
  </div>
</template>

<script setup lang="ts">
import AppCard from '~/components/shared/AppCard.vue'
import ScoreCard from '~/components/analytics/ScoreCard.vue'
import ProductivityChart from '~/components/analytics/ProductivityChart.vue'
import HeatmapGrid from '~/components/analytics/HeatmapGrid.vue'
import FocusTimeChart from '~/components/analytics/FocusTimeChart.vue'
import { useAnalytics } from '~/composables/useAnalytics'

definePageMeta({
  middleware: 'auth'
})

const { score, trend, level, series, completionHeatmap, recompute } = useAnalytics()

onMounted(() => {
  recompute()
})
</script>

