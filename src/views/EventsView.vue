<template>
  
  <section class="events dark:bg-gray-900 min-h-screen transition-colors duration-200">
    <div v-if="loading" role="status" aria-live="polite" class="flex justify-center my-8">
      <svg class="animate-spin h-10 w-10 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span class="sr-only">Loading events…</span>
    </div>    <div v-else-if="error" class="error dark:text-red-400">{{ error }}</div>
    <ul
      v-else
      role="list"
      aria-label="Events list"
      class="list-none  my-8 mx-auto grid gap-4 box-border justify-items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
        <li v-for="event in events" :key="event.id" >
        <EventCard :event="event" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import EventCard from '@/components/event/EventCard.vue'
import useEvents from '@/composables/useEvents'
import type { Event } from '@/types/event'

const { events, loading, error, loadEvents } = useEvents()

onMounted(() => loadEvents())
</script>

<style scoped>
.error { color: #900; }
</style>