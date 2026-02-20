<template>
  <AppCard
    title="Productivity heatmap"
    subtitle="Each square represents completed tasks for a day."
  >
    <div class="mt-2 grid grid-cols-7 gap-1 text-[10px] text-slate-400">
      <span class="text-right text-[10px] text-slate-400">M</span>
      <span class="text-right text-[10px] text-slate-400">T</span>
      <span class="text-right text-[10px] text-slate-400">W</span>
      <span class="text-right text-[10px] text-slate-400">T</span>
      <span class="text-right text-[10px] text-slate-400">F</span>
      <span class="text-right text-[10px] text-slate-400">S</span>
      <span class="text-right text-[10px] text-slate-400">S</span>
    </div>
    <div class="mt-1 grid max-h-40 grid-cols-7 gap-1 overflow-y-auto pt-1">
      <div
        v-for="day in paddedDays"
        :key="day.date"
        class="aspect-square w-full rounded-[6px]"
        :class="dayClass(day.value)"
        :title="`${day.date} – ${day.value} completed`"
      />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import AppCard from '~/components/shared/AppCard.vue'

const props = defineProps<{
  heatmap: { date: string; value: number }[]
}>()

const paddedDays = computed(() => {
  const days = [...props.heatmap]
  const today = new Date().toISOString().slice(0, 10)
  if (!days.length) {
    return [{ date: today, value: 0 }]
  }
  return days
})

function dayClass(value: number) {
  if (value === 0) return 'bg-slate-100 dark:bg-slate-800'
  if (value <= 1) return 'bg-emerald-100 dark:bg-emerald-900/60'
  if (value <= 3) return 'bg-emerald-300 dark:bg-emerald-700'
  return 'bg-emerald-500 dark:bg-emerald-500'
}
</script>

