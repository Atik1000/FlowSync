<template>
  <AppModal
    v-model="internalModel"
    title="Create task"
    subtitle="Let FlowSync suggest the right priority based on title, description, and deadline."
  >
    <form
      id="create-task-form"
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div class="space-y-2">
        <label class="text-xs font-medium text-slate-600 dark:text-slate-300">
          Title
        </label>
        <input
          v-model="title"
          type="text"
          required
          class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          placeholder="e.g. Polish onboarding experience"
        >
      </div>

      <div class="space-y-2">
        <label class="text-xs font-medium text-slate-600 dark:text-slate-300">
          Description
        </label>
        <textarea
          v-model="description"
          rows="3"
          class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          placeholder="Add context so the AI can suggest a better priority..."
        />
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-xs font-medium text-slate-600 dark:text-slate-300">
            Deadline
          </label>
          <input
            v-model="deadline"
            type="date"
            required
            class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          >
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium text-slate-600 dark:text-slate-300">
            Initial column
          </label>
          <select
            v-model="column"
            class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          >
            <option value="backlog">
              Backlog
            </option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="review">
              Review
            </option>
            <option value="done">
              Done
            </option>
          </select>
        </div>
      </div>

      <p
        v-if="aiReasoning"
        class="rounded-xl bg-primary-50/80 px-3 py-2 text-xs text-primary-900 dark:bg-primary-700/20 dark:text-primary-100"
      >
        <span class="font-semibold">AI suggestion:</span>
        {{ aiReasoning }}
      </p>
    </form>

    <template #footer>
      <AppButton
        variant="ghost"
        type="button"
        @click="internalModel = false"
      >
        Cancel
      </AppButton>
      <AppButton
        form="create-task-form"
        type="submit"
        :loading="isSubmitting"
      >
        Create task
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppModal from '~/components/shared/AppModal.vue'
import AppButton from '~/components/shared/AppButton.vue'
import type { TaskColumn } from '~/types/domain'
import { useTask } from '~/composables/useTask'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { createTask } = useTask()

const title = ref('')
const description = ref('')
const deadline = ref<string>('')
const column = ref<TaskColumn>('backlog')
const isSubmitting = ref(false)
const aiReasoning = ref('')

const internalModel = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      aiReasoning.value = ''
    }
  }
)

async function handleSubmit() {
  if (!title.value || !deadline.value) return
  isSubmitting.value = true
  try {
    const result = await createTask({
      title: title.value,
      description: description.value,
      deadline: deadline.value,
      column: column.value
    })
    aiReasoning.value = result.aiReasoning
    title.value = ''
    description.value = ''
    deadline.value = ''
    column.value = 'backlog'
    internalModel.value = false
  } finally {
    isSubmitting.value = false
  }
}
</script>

