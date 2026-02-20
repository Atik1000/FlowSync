<template>
  <div class="h-44">
    <Bar
      v-if="chartData.labels.length"
      :data="chartData"
      :options="options"
    />
    <div
      v-else
      class="flex h-full items-center justify-center text-xs text-slate-400"
    >
      Not enough data yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  BarElement
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Completed tasks',
      data: props.values,
      backgroundColor: '#4f46e5'
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: { color: '#64748b', font: { size: 10 } },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#94a3b8', font: { size: 10 } },
      grid: { color: 'rgba(148, 163, 184, 0.2)' }
    }
  }
}
</script>

