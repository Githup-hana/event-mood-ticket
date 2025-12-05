<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Logo from '@/components/Logo.vue'
import Korb from '@/components/Korb.vue'  
import { ref } from 'vue'
import type { Event } from '@/types/event'
const showCart = ref(false)
</script>

<template>
 
  <nav class="app-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <RouterLink to="/"><Logo class="w-10 h-10 md:w-10 md:h-10 lg:w-16 lg:h-16" /></RouterLink>
      <div style="margin-left: auto; display:flex; align-items:center; gap:0.5rem">
      <div class="flex items-center gap-4">
        <form action="/search" method="GET">
  <input type="text" name="q" placeholder="Suche..." class="border   border-yellow-500 rounded-md px-2 py-1"/>
  <button type="submit" aria-label="Suche absenden" class="btn ">Suchen</button>
  
</form>

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