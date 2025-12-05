import { ref } from 'vue'
import { fetchEventById } from '@/services/eventService'

export default function useEvent() {
  const events = ref<Record<string, any>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEvent(id: string) {
    loading.value = true
    error.value = null

    try {
  
      if (events.value[id]) return events.value[id]

      const data = await fetchEventById(id)
      events.value[id] = data
      return data
    } catch (err: any) {
      error.value = err?.message ?? String(err)
    } finally {
      loading.value = false
    }
  }

  return { events, loading, error, loadEvent }
}
