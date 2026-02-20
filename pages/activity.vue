<template>
  <div class="flex h-full flex-col gap-4">
    <section class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="page-title">
          Activity
        </h1>
        <p class="page-subtitle">
          A timeline of task creation, moves, completions, and focus sessions.
        </p>
      </div>
    </section>

    <section class="card flex min-h-[280px] flex-col p-4">
      <div
        class="scroll-y-soft relative -mx-1 flex-1 px-1 py-1"
        style="max-height: 480px"
      >
        <ol
          v-if="items.length"
          class="space-y-3 border-l border-slate-200 pl-3 dark:border-slate-800"
        >
          <ActivityItem
            v-for="item in items"
            :key="item.id"
            :activity="item"
          />
        </ol>
        <div
          v-else
          class="flex h-full items-center justify-center text-xs text-slate-400"
        >
          No activity yet. Interact with the board to generate events.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ActivityItem from '~/components/activity/ActivityItem.vue'
import { useActivityStore } from '~/stores/activity.store'

definePageMeta({
  middleware: 'auth'
})

const activityStore = useActivityStore()
const { ordered: items } = storeToRefs(activityStore)
</script>

