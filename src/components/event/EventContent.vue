<template>
  <div class="detail-container bg-yellow-100 min-h-screen py-10 px-4" style="width:100vw; position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw;">
    <div class="detail-inner bg-white shadow-xl border border-black/5 rounded-2xl p-6  ">

      <header class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold text-[#1B263B]">
          {{ props.event?.title }}
        </h1>
        <p class="text-lg text-gray-600">{{ props.event?.subtitle }}</p>
        <div class="text-gray-500 mt-1">
          {{ formattedDate }} — {{ formattedTime }}
        </div>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 gap-10 w-1/2">

       
        <section class="w-full h-30%">
          <img
            :src="imgSrcComputed"
            :alt="props.event?.title"
            class="rounded-xl h-auto w-full shadow-lg border   object-cover"
          />
        </section>

       
        <section class="flex flex-col gap-6">

      
          <div class="grid grid-cols-1 gap-4">

            <div class="info-card">
              <div class="icon">📍</div>
              <div>
                <div class="info-title">Veranstaltungsort</div>
                <div class="info-sub">
                  {{ props.event?.venue?.name }}  
                </div>
                <div class="info-sub">
                  {{ props.event?.venue?.street }}, {{ props.event?.venue?.city }}
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="icon">🕒</div>
              <div>
                <div class="info-title">Doors Open</div>
                <div class="info-sub">{{ formattedTimeDoorOpen }}</div>
              </div>
            </div>
            <div class="w-10 h-2"></div>

            <div class="info-card">
              <div class="icon">🔒</div>
              <div>
                <div class="info-title">Doors Close</div>
                <div class="info-sub">{{ formattedTimeDoorClose }}</div>
              </div>
            </div>

            <div class="info-card">
              <div class="icon">🎫</div>
              <div>
                <div class="info-title">Tickets</div>
                <div class="info-sub">
                  {{ props.event?.seats ?? 'n/a' }} Plätze
                </div>
              </div>
            </div>

          </div>

          
          <div class="description-box p-4 rounded-xl border border-black/5">
            <Description v-if="props.event" :event="props.event" :previewLimit="0" />
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="text-xl font-bold text-[#1B263B]">
              Preis:
              <span class="text-2xl">{{ props.event?.maxPrice?.value ?? '—' }} €</span>
            </div>
            <button class="btn btn--primary" @click="addToCart">
              Add To Bag
            </button>
          </div>

        </section>
      </main>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import Description from "./EventDescription.vue";
import type { EventContentProps } from "@/types/event";
import { useCartStore } from "@/stores/cart";
const cart = useCartStore();

const props = defineProps<EventContentProps>();
const { event } = toRefs(props);

const imgSrcComputed = computed(
  () =>
    props.imgSrc ??
    (props.event?.image?.id
      ? `https://www.eventim-light.com/de/api/image/${props.event.image.id}/shop_cover_v3/webp`
      : "/placeholder.webp")
);
const formattedDate = computed(
  () =>
    props.formattedDate ??
    (props.event?.start
      ? new Date(props.event.start).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "")
);
const formattedTime = computed(
  () =>
    props.formattedTime ??
    (props.event?.start
      ? new Date(props.event.start).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "")
);

const formattedTimeDoorOpen = computed(
  () =>
    props.formattedTime ??
    (props.event?.doorsOpen
      ? new Date(props.event.doorsOpen).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "")
);
const formattedTimeDoorClose = computed(
  () =>
    props.formattedTime ??
    (props.event?.doorsClose
      ? new Date(props.event.doorsClose).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "")
);

function addToCart() {
  if (!props.event) return;

  const existing = cart.getItem(props.event.id);
  const min = existing?.qtyMin ?? 0;
  const max = existing?.qtyMax ?? 0;
  cart.addOrUpdate(props.event, min, max + 1);
}
</script>

<style scoped>

</style>
