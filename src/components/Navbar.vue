<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Logo from '@/components/Logo.vue'
import Korb from '@/components/Korb.vue'  
import { ref } from 'vue'
import type { Event } from '@/types/event'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

</script>

<template>
 
  <nav class="app-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <RouterLink to="/"><Logo class="w-10 h-10 md:w-10 md:h-10 lg:w-16 lg:h-16" /></RouterLink>
      <div style="margin-left: auto; display:flex; align-items:center; gap:0.5rem">
      <div class="flex items-center gap-4">
        <form action="/events" method="GET">
  <input type="text" name="q" placeholder="Suche..." class="border border-yellow-500 rounded-md px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"/>
  <button type="submit" aria-label="Suche absenden" class="btn ">Suchen</button>
  
</form>


      <button 
        @click="themeStore.toggleTheme" 
        class="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        aria-label="Toggle Theme"
      >
        <svg v-if="!themeStore.isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </button>

      <Korb  />
    </div>
      </div>
    </div>
  </nav>

  <div >
    <RouterView />
  </div>
</template>

<style scoped>

.app-nav {
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
 
  background-color: #1B263B;

  color: white;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: background-color 0.2s ease;
}

:deep(.dark) .app-nav {
  background-color: #0f172a;
}

.nav-inner {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
 
  margin: 0 auto;
}
.nav-inner a {
  color: white;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
}
.nav-inner a:hover {
  background-color: rgba(255,255,255,0.06);
  border-radius: 4px;
}




</style>