<script setup lang="ts">
import { computed } from "vue";
import type { Event } from "@/types/event";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{ event: Event }>();
const cart = useCartStore();
const imgSrc = computed(() =>
  props.event.image?.id
    ? `https://www.eventim-light.com/de/api/image/${props.event.image.id}/shop_cover_v3/webp`
    : "/placeholder.webp"
);

const item = computed(() => cart.getItem(props.event.id) ?? { qtyMin: 0, qtyMax: 0 });

const incMin = () => cart.addOrUpdate(props.event, item.value.qtyMin + 1, item.value.qtyMax);
const decMin = () =>
  cart.addOrUpdate(props.event, Math.max(0, item.value.qtyMin - 1), item.value.qtyMax);
const incMax = () => cart.addOrUpdate(props.event, item.value.qtyMin, item.value.qtyMax + 1);
const decMax = () =>
  cart.addOrUpdate(props.event, item.value.qtyMin, Math.max(0, item.value.qtyMax - 1));

const totalTickets = computed(() => (item.value.qtyMin ?? 0) + (item.value.qtyMax ?? 0));
const totalPrice = computed(() => {
  const min = props.event.minPrice?.value ?? 0;
  const max = props.event.maxPrice?.value ?? 0;
  return (item.value.qtyMin ?? 0) * min + (item.value.qtyMax ?? 0) * max;
});

const remove = () => {
  if (!props.event?.id) return;
  cart.remove(props.event.id);
};
</script>

<template>
  <div
    class="price-box w-full flex flex-col sm:flex-row border p-2 border-slate-800 rounded-lg shadow-md"
  >
  
    <div class="w-[30%]">
      <div class="flex-shrink-0 w-full  mb-3 sm:mb-0 sm:mr-4">
        <img :src="imgSrc" alt="ticket" class="w-full h-40 sm:h-28 object-cover rounded" />
      </div>
      <div class=" flex-shrink-0   d-flex flex-wrap font-medium text-indigo-100 mb-2 break-words">{{ props.event.title }}</div>
    </div>

    
    <div class="flex-1 min-w-0 space-y-2 ml-4">
    
        <h2 class="text-sm font-semibold text-indigo-100 mb-3">Freie Platzwahl</h2>

          <v-row ><v-col  cols="6"> <div class="text-sm text-slate-300">Normalpreis</div>
            <div class="text-sm font-small text-indigo-50">
              {{ props.event.maxPrice?.value ?? "—" }} €
            </div>
            </v-col> <v-col cols="6"> <div class="flex items-center ">
            <button aria-label="Verringern Normalpreis" @click="decMax" class="maxmin-button">
              −
            </button>
            <div class="w-10 text-center text-sm font-medium text-indigo-50">{{ item.qtyMax }}</div>
            <button aria-label="Erhöhen Normalpreis" @click="incMax" class="maxmin-button">
              +
            </button>
          </div></v-col></v-row>
          
         
      

  
          <v-row><v-col cols="6">   <div class="text-sm text-slate-300">Ermäßigt</div>
            <div class="text-sm font-medium text-indigo-50">
              {{ props.event.minPrice?.value ?? "—" }} €
            </div></v-col><v-col cols="6"><div class="flex items-center ">
            <button aria-label="Verringern Ermäßigt" @click="decMin" class="maxmin-button">
              −
            </button>
            <div class="w-10 text-center text-sm font-medium text-indigo-50">{{ item.qtyMin }}</div>
            <button aria-label="Erhöhen Ermäßigt" @click="incMin" class="maxmin-button">+</button>
          </div></v-col></v-row>
         
         
          
   
      </div>

    <div
      class="w-full sm:w-24 flex-shrink-0 flex flex-col items-end sm:items-end justify-between gap-2 pl-0 sm:pl-4 mt-3 sm:mt-0"
    >
      <div class="text-sm text-slate-300">{{ totalTickets }} Tickets</div>
    <!--   <div class="text-lg font-medium text-indigo-50">{{ totalPrice.toFixed(2) }} €</div> -->
      <button
        v-if="totalTickets > 0"
        @click="remove"
        class="text-sm text-red-400 hover:text-red-300"
      >
        Entfernen
      </button>
    </div>
  </div>
</template>
<style scoped>
.ticket img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.maxmin-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem; 
  background-color: rgba(30, 41, 59, 0.4); 
  padding: 0.5rem; 
  border-radius: 0.25rem; 
}

.maxmin-button {
  width: 26px;
  height: 26px;

  background-color: #fbbf24;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;
  transition: 0.15s ease;
}

.maxmin-button:hover {
  background-color: #fbbe24c7;
  transform: scale(1.07);
}

.maxmin-button:active {
  transform: scale(0.95);
}

.maxmin-button:focus {
  box-shadow: 0 0 0 3px #818cf8;
}
.price-box {
  background-color: #1e293b;
}
</style>
