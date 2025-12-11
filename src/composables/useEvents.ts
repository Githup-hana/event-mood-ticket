import { ref, computed } from 'vue'
import { fetchEvents } from '@/services/eventService'
import { useSearchStore } from '@/stores/search'

export default function useEvents() {
  const events = ref<any[]>([])
  const loading = ref(false)
  const error = ref('')
  const searchStore = useSearchStore()

  async function loadEvents() {
    loading.value = true
    error.value = ''
    try {
      events.value = await fetchEvents()
    } catch (err: any) {
      error.value = err?.message ?? String(err)
    } finally {
      loading.value = false
    }
  }

  const filteredEvents = computed(() => {
    if (!searchStore.locationQuery.trim()) {
      return events.value
    }
    const query = searchStore.locationQuery.toLowerCase().trim()
    return events.value.filter(event => {
      const city = event.venue?.city?.toLowerCase() || ''
      return city.includes(query)
    })
  })

  return { 
    events: filteredEvents, 
    loading, 
    error, 
    loadEvents
  }
}
