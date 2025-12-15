<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchQuery = ref('')
const searchStore = useSearchStore()

const handleSearch = (event: Event) => {
  event.preventDefault()
  const location = searchQuery.value.trim()
  searchStore.setLocationQuery(location)
  emit('search-submitted')
}

const emit = defineEmits(['search-submitted'])
</script>

<template>
  <form @submit="handleSearch" class="search-form">
    <input 
      v-model="searchQuery"
      type="text" 
      placeholder="Stadt oder Ort eingeben..." 
      class="search-input"
      @keyup.enter="handleSearch"
    />
    <button type="submit" aria-label="Nach Events suchen" class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline-block">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
      <span class="ml-1">Suchen</span>
    </button>
  </form>
</template>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

.search-input {
  border: 1px solid #fbbf24;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: white;
  color: #1f2937;
  outline: none;
  transition: all 0.2s;
  min-width: 150px;
  flex: 1;
}

.search-input:focus {
  border-color: #f59e0b;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
}

:deep(.dark) .search-input {
  background-color: #1f2937;
  color: white;
  border-color: #fbbf24;
}

.btn {
  background-color: #fbbf24;
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
}

.btn:hover {
  background-color: #f59e0b;
}

@media (min-width: 768px) {
  .search-input {
    min-width: 200px;
  }
}

@media (min-width: 1024px) {
  .search-input {
    min-width: 250px;
  }
}
</style>
