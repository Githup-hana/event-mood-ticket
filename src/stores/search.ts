import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const locationQuery = ref('')

  function setLocationQuery(query: string) {
    locationQuery.value = query
  }

  function clearLocationQuery() {
    locationQuery.value = ''
  }

  return {
    locationQuery,
    setLocationQuery,
    clearLocationQuery
  }
})
