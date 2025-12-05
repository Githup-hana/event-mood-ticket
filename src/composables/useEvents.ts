import { ref } from 'vue'
import { fetchEvents } from '@/services/eventService'

export default function useEvents() {
  const events = ref<any[]>([])
  const loading = ref(false)
  const error = ref('')

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

  return { events, loading, error, loadEvents }
}
