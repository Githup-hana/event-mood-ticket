<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const toggle = () => {
  locale.value = locale.value === 'de' ? 'en' : 'de'
}
</script>

<template>
  <button
    @click="toggle"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 transition-all duration-200 border border-yellow-400/30"
  >
    <v-icon color="#E8C547">mdi-earth</v-icon>
    <span class="text-sm font-medium">
      {{ locale === 'de' ? 'EN' : 'DE' }}
    </span>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
