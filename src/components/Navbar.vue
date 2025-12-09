<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Logo from '@/components/Logo.vue'
import Korb from '@/components/Korb.vue'  
import { ref } from 'vue'
import type { Event } from '@/types/event'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

</script>

<template>
 
  <nav class="app-nav" role="navigation" aria-label="Main navigation">
    <div class="nav-inner">
      <!-- Logo -->
      <RouterLink to="/" @click="mobileMenuOpen = false">
        <Logo class="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="desktop-nav">
        <form action="/events" method="GET" class="search-form">
          <input 
            type="text" 
            name="q" 
            placeholder="Suche..." 
            class="search-input"
          />
          <button type="submit" aria-label="Suche absenden" class="btn">Suchen</button>
        </form>

        <button 
          @click="themeStore.toggleTheme" 
          class="theme-toggle"
          aria-label="Toggle Theme"
        >
          <svg v-if="!themeStore.isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </button>

        <Korb />
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMobileMenu" 
        class="mobile-menu-button"
        aria-label="Toggle Mobile Menu"
      
      >
        <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-show="mobileMenuOpen" class="mobile-menu">
        <form action="/events" method="GET" class="mobile-search-form">
          <input 
            type="text" 
            name="q" 
            placeholder="Suche..." 
            class="search-input mobile"
          />
          <button type="submit" aria-label="Suche absenden" class="btn">Suchen</button>
        </form>

        <div class="mobile-actions">
          <button 
            @click="themeStore.toggleTheme" 
            class="mobile-theme-toggle"
            aria-label="Toggle Theme"
          >
            <svg v-if="!themeStore.isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <span>{{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>

          <div @click="mobileMenuOpen = false">
            <Korb />
          </div>
        </div>
      </div>
    </Transition>
  </nav>

  <div>
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
  flex-direction: column;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: background-color 0.2s ease;
}


:deep(.dark) .app-nav {
  background-color: #0f172a;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  height: 64px;
  margin: 0 auto;
}

.nav-inner a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-inner a:hover {
  opacity: 0.8;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  margin-left: auto;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
}

.search-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
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

.search-input.mobile {
  width: 100%;
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
}

.btn:hover {
  background-color: #f59e0b;
}

.theme-toggle {
  padding: 0.5rem;
  border-radius: 9999px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.mobile-menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .mobile-menu-button {
    display: none;
  }
}

/* Mobile Menu */
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: inherit;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-search-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.mobile-theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile Menu Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .search-input {
    min-width: 200px;
  }
}

@media (min-width: 1024px) {
  .nav-inner {
    padding: 0 2rem;
  }
  
  .search-input {
    min-width: 250px;
  }
}
</style>