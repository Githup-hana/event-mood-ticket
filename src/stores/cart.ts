// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Event } from '@/types/event'
import type { CartEntry } from '@/types/event'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Record<string, CartEntry>>({})
  const showCartPopup = ref(false) 

  const addOrUpdate = (event: Event, qtyMin: number, qtyMax: number) => {
    items.value[event.id] = { event, qtyMin: qtyMin ?? 0, qtyMax: qtyMax ?? 0 }
  }

  const remove = (eventId: string) => {
    delete items.value[eventId]
  }

  const totalCount = computed(() =>
    Object.values(items.value).reduce((sum, i) => sum + (i.qtyMin ?? 0) + (i.qtyMax ?? 0), 0)
  )

  const totalPrice = computed(() =>
    Object.values(items.value).reduce((sum, i) => {
      const min = i.event?.minPrice?.value ?? 0
      const max = i.event?.maxPrice?.value ?? 0
      return sum + (i.qtyMin ?? 0) * min + (i.qtyMax ?? 0) * max
    }, 0)
  )

  const entries = computed<CartEntry[]>(() =>
    Object.values(items.value).map(i => ({ event: i.event ?? null, qtyMin: i.qtyMin ?? 0, qtyMax: i.qtyMax ?? 0 }))
  )

  const getItem = (eventId: string): CartEntry => items.value[eventId] ?? { event: null, qtyMin: 0, qtyMax: 0 }

  return { items, entries, getItem, addOrUpdate, remove, totalCount, totalPrice, showCartPopup }
}, {
  persist: true 
})
