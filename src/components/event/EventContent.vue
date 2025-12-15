<template>
  
    <div class="detail-inner bg-yellow-50 shadow-2xl border border-gray-200 rounded-3xl p-6 sm:p-8 w-full max-w-3xl mx-auto my-10">

   
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div class="info-item flex items-start gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100">
            <v-icon size="28" style="color: #1B263B; flex-shrink: 0;">mdi-map-marker</v-icon>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ t('event.location') }}</div>
              <div class="text-base font-bold text-gray-900 mt-1">{{ event?.venue?.name }}</div>
              <div class="text-sm text-gray-600 mt-1">{{ event?.venue?.street }}, {{ event?.venue?.city }}</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-3 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-100">
             <v-icon size="28" style="color: #1B263B; flex-shrink: 0;">mdi-ticket-confirmation</v-icon>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ t('event.capacity') }}</div>
              <div class="text-base font-bold text-gray-900 mt-1">{{ event?.seats ?? "n/a" }}</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors border border-green-100">
           <v-icon size="28" style="color: #1B263B; flex-shrink: 0;">mdi-door-open</v-icon>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ t('event.doorOpen') }}</div>
              <div class="text-base font-bold text-gray-900 mt-1">{{ formattedTimeDoorOpen }}</div>
            </div>
          </div>

          <div class="info-item flex items-start gap-3 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-colors border border-red-100">
           <v-icon size="28" style="color: #1B263B; flex-shrink: 0;">mdi-door-closed</v-icon>
            <div class="min-w-0">
              <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide">{{ t('event.doorClose') }}</div>
              <div class="text-base font-bold text-gray-900 mt-1">{{ formattedTimeDoorClose }}</div>
            </div>
          </div>

        </div>
      </div>

    
      <v-card variant="outlined" class="pa-4 mb-10" rounded="lg">
        <Description :event="event" :previewLimit="100" />
      </v-card>

      <v-row align="center" justify="space-between" class="pt-6 border-t border-gray-200">
        <v-col cols="12" sm="6">
          <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('event.priceFrom') }}</div>
          <div class="text-3xl font-bold text-gray-900">{{ event?.minPrice?.value ?? event?.maxPrice?.value }} <span class="text-lg">€</span></div>
        </v-col>

        <v-col cols="12" sm="6" class="text-right">
          <button @click="addToCart" class="btn btn--primary px-8 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            {{ t('event.addToCart') }} 🛒
          </button>
        </v-col>
      </v-row>

    </div>
 
</template>



<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { useI18n } from 'vue-i18n'
import Description from "./EventDescription.vue";
import type { EventContentProps } from "@/types/event";
import { useCartStore } from "@/stores/cart";

const { t } = useI18n()
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
