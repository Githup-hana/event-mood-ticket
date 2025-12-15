<template>
  
    <div class="detail-inner bg-yellow-50 shadow-xl border border-black/5 rounded-2xl p-4 w-full max-w-2xl mx-auto my-10">

   
      <v-row justify="center" class="mb-10 text-center">
        <v-col cols="12">
          <h1 class="text-h3 text-black font-weight-bold">
            {{ event?.title }}
          </h1>

          <div class="text-subtitle-1 mt-4 text-grey-darken-1">
            {{ event?.subtitle }}
          </div>

          <div class="text-grey-darken-1 mt-1">
            {{ formattedDate }} — {{ formattedTime }}
          </div>
        </v-col>
      </v-row>

   
      <v-row class="mb-10">
        <v-col cols="12">
      <div class="w-full rounded-lg overflow-hidden max-h-[400px] mx-auto">
  <img
    :src="imgSrcComputed"
    :alt="event?.title"
    class="w-full h-auto object-contain"
  />
</div>
        </v-col>
      </v-row>

  
  
      <div class="mb-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          <div class="info-item flex items-start gap-2 sm:gap-3 pb-4 border-b border-gray-200">
            <v-icon size="24" sm:size="30" style="color: #1B263B;">mdi-map-marker</v-icon>
            <div class="min-w-0">
              <div class="text-base sm:text-h6 font-weight-semibold">Veranstaltungsort</div>
              <div class="text-sm sm:text-body-2 text-gray-600">{{ event?.venue?.name }}</div>
              <div class="text-sm sm:text-body-2 text-gray-600">{{ event?.venue?.street }}, {{ event?.venue?.city }}</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-2 sm:gap-3 pb-4 border-b border-gray-200">
             <v-icon size="24" sm:size="30" style="color: #1B263B;">mdi-ticket-confirmation</v-icon>
            <div class="min-w-0">
              <div class="text-base sm:text-h6 font-weight-semibold">Tickets</div>
              <div class="text-sm sm:text-body-2 text-gray-600">{{ event?.seats ?? "n/a" }} Plätze</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-2 sm:gap-3">
           <v-icon size="24" sm:size="30" style="color: #1B263B;">mdi-clock-outline</v-icon>
            <div class="min-w-0">
              <div class="text-base sm:text-h6 font-weight-semibold">Doors Open</div>
              <div class="text-sm sm:text-body-2 text-gray-600">{{ formattedTimeDoorOpen }}</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-2 sm:gap-3">
           
           
              <v-icon size="24" sm:size="30" style="color: #1B263B;">mdi-lock</v-icon>
            <div class="min-w-0">
              <div class="text-base sm:text-h6 font-weight-semibold">Doors Close</div>
              <div class="text-sm sm:text-body-2 text-gray-600">{{ formattedTimeDoorClose }}</div>
            </div>
          </div>

        </div>
      </div>

    
      <v-card variant="outlined" class="pa-4 mb-10" rounded="lg">
        <Description :event="event" :previewLimit="100" />
      </v-card>

      <v-row align="center" justify="space-between">
        <v-col cols="6">
          <div class="text-h6 font-weight-bold">
            Preis:
            <span class="text-h5">{{ event?.maxPrice?.value }} €</span>
          </div>
        </v-col>

        <v-col cols="6" class="text-right">
          <button @click="addToCart" class="btn btn--primary px-6 py-3 text-base font-semibold">
            In den Warenkorb
          </button>
        </v-col>
      </v-row>

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
