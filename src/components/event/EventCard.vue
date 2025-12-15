

<template>
  <RouterLink :to="{ name: 'eventDetail', params: { id: props.event.id } }" class=" block  no-underline" :aria-label="`Details öffnen für ${props.event.title}`">
<div class="event-card mx-auto my-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow  duration-300 ease-in-out dark:bg-gray-800">   
    <div class=" w-full"> <img :src="imgSrc" :alt="props.event.title" /></div>

    <div class="w-full event-content-box bg-[#E8C547] dark:bg-yellow-600 font-extrabold text-[#1A1A1A] dark:text-gray-100 h-full p-8">
      <p v-if="props.event.image?.credit">Bild: {{ props.event.image.credit }}</p>
      <h2 class="titel leading-relaxed">{{ props.event.title }}</h2>
      <p>{{ formattedDate }} - {{ formattedTime }}</p>
      <p>{{ props.event.venue.name }}, {{ props.event.venue.city }}</p>
      <button class="event-btn " >{{ buttonText }}</button>
    </div></div>
  </RouterLink>
</template>

<style scoped>
.event-card {

  border-radius: 8px;
  width: 80%;
  height: 420px;
  overflow: hidden;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.event-card img {

  width: 100%;
 height: auto;       
  object-fit: cover;    
  display: block;

   overflow: hidden;
 
  will-change: transform;
  cursor: default;
  
}
.event-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 12px 28px rgba(0,0,0,0.16);

}
.event-btn {
  width: 80%;
  padding: 0.5rem 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  background: oklch(85.2% 0.199 91.936);
  color: #111;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
}
.event-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  filter: brightness(.98);
}
.event-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.event-btn:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(34,197,94,0.12);
}
.event-content-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  height: 200px;
  
}
.titel {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  ;
}

.event-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  object-position: center top;
  display: block;

  transition: transform .1s ease;
}

.event-card:hover .event-btn {
  transform: translateY(-2px);
  
}
</style>
<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '@/types/event'



const props = defineProps<{ event: Event }>()

const imgSrc = computed(() =>
  props.event.image?.id
    ? `https://www.eventim-light.com/de/api/image/${props.event.image.id}/shop_cover_v3/webp`
    : '/placeholder.webp'
)
const formattedDate = computed(() =>
  new Date(props.event.start).toLocaleDateString('de-DE', {
  
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
)

const formattedTime = computed(() =>
  new Date(props.event.start).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })
)

const buttonText = computed(() => {
  if (props.event.sold_out) return 'Ausverkauft'
  const p = props.event.minPrice
  if (!p || p.value == null) return 'Mehr erfahren'
  return `Ab ${typeof p.value === 'number' ? p.value.toFixed(2) : p.value} €`
})
</script>
