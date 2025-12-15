<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import CartPopup from '@/components/CardPopup.vue'

const cart = useCartStore()

</script>

<template>
  <button 
    aria-label="Warenkorb" 
    @click="cart.showCartPopup = true" 
    class="relative focus:outline-none p-2 rounded-lg hover:bg-yellow-500/10 transition-all duration-200"
  >
    <ShoppingCartIcon class="w-7 h-7 text-yellow-400" />
    <span 
      v-if="cart.totalCount > 0"
      class="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center font-semibold"
    >
      {{ cart.totalCount }}
    </span>
  </button>
  <CartPopup v-model="cart.showCartPopup" />
</template>
