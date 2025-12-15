<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import EventCard from '@/components/event/EventCard.vue'
import useEvents from '@/composables/useEvents'
import { useSearchStore } from '@/stores/search'

const { t } = useI18n()
const { events, loading, error, loadEvents } = useEvents()
const searchStore = useSearchStore()

onMounted(() => loadEvents())
</script>

<template>
  <section class="events dark:bg-gray-900 min-h-screen transition-colors duration-200">
    <div v-if="loading" role="status" aria-live="polite" class="flex justify-center my-8">
      <svg class="animate-spin h-10 w-10 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span class="sr-only">{{ t('events.loading') }}</span>
    </div>

    <div v-else-if="error" class="error dark:text-red-400">{{ error }}</div>

    <div v-else-if="events.length === 0 && searchStore.locationQuery" class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto mb-4 text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">{{ t('events.noEvents') }}</p>
      <button 
        @click="searchStore.clearLocationQuery()" 
        class="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
      >
        {{ t('events.showAll') }}
      </button>
    </div>

    <ul
      v-else
      role="list"
      :aria-label="t('nav.events')"
      class="list-none my-8 mx-auto grid gap-4 box-border justify-items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
      <li v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.error {
  color: #900;
}
</style>