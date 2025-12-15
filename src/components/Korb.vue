<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import CartPopup from '@/components/CardPopup.vue'

const cart = useCartStore()

</script>

<template>
  <button aria-label="Warenkorb" @click="cart.showCartPopup = true" class="relative focus:outline-none">
    <ShoppingCartIcon class="w-7 h-7 text-white" />
     <span v-if="cart.totalCount > 0"
          class="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5">
      {{ cart.totalCount }}
    </span>
  </button>
  <CartPopup v-model="cart.showCartPopup" />
</template>
