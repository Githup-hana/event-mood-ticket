<template>
  <div id="event-description" class=" max-w-none">
    <p v-if="!expanded" class="whitespace-pre-wrap">{{ previewText }}</p>
    <div v-else v-html="event?.description"></div>
    <button
      v-if="isLong"
      @click="toggle"
      class="mt-2 text-sm text-indigo-300 underline"
      :aria-expanded="expanded"
      aria-controls="event-description"
    >
      {{ expanded ? 'Weniger' : 'Mehr' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Event } from '@/types/event'

const props = defineProps<{ event: Event | null; previewLimit?: number }>()

const PREVIEW_LIMIT = props.previewLimit ?? 100

const expanded = ref(false)
const rawDescription = computed(() => props.event?.description ?? '')
const plainText = computed(() => {
  try {
    const d = document.createElement('div')
    d.innerHTML = rawDescription.value
    return d.textContent || d.innerText || ''
  } catch (e) {
    return rawDescription.value
  }
})

const isLong = computed(() => plainText.value.length > PREVIEW_LIMIT)
const previewText = computed(() => (isLong.value ? plainText.value.slice(0, PREVIEW_LIMIT).trim() + '…' : plainText.value))
const toggle = () => (expanded.value = !expanded.value)
</script>

<style scoped>

</style>

