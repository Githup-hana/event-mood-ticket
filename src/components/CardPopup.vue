<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import EventPriceChooser from "./event/EventPriceChooser.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);
const dialog = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

const router = useRouter();

const cart = useCartStore();
const { entries: tickets } = storeToRefs(cart);

const removeItem = (ticket: any) => {
  const id = ticket?.event?.id;
  if (!id) return;
  cart.remove(id);
};

const continueShopping = () => {
  dialog.value = false;

  router.push({ name: "events" }).catch(() => {});
};

const goToPayment = () => {
  dialog.value = false;
  router.push({ name: "payment" }).catch(() => {});
};
</script>

<template>
  <teleport to="body">
    <v-navigation-drawer
      v-model="dialog"
      location="end"
      temporary
      :scrim="false"
      width="460"
    
      class="flex flex-col w-full sm:w-[860px] h-screen !overflow-hidden"
    >
      <header class="flex items-center justify-between mb-4 flex-shrink-0 p-4">
        <h1 class="text-xl font-bold text-indigo-600 ml-4">{{ t('cart.title') }}</h1>
        <button @click="dialog = false" class="text-black hover:text-white">✕</button>
      </header>

      <section v-if="(tickets || []).length === 0" class="text-black font-bold p-4 flex-shrink-0">
        {{ t('cart.empty') }}
      </section>

      <div v-else class="flex flex-col h-full">
        <div class="flex-1  px-4 pb-4">
          <ul class="space-y-2 w-full">
            <li
              v-for="(ticket, idx) in tickets"
              :key="ticket.event?.id ?? idx"
              class="w-full"
            >
              <EventPriceChooser v-if="ticket.event" :event="ticket.event" />
            </li>
          </ul>
        </div>

        <footer class="sticky bottom-0 border-t border-slate-800 pt-4 bg-white shadow-lg">
          <div class="flex items-center justify-between p-4">
            <div class="text-black">
              {{ t('cart.totalCount') }}: <span class="font-medium text-indigo-">{{ cart.totalCount }}</span>
            </div>
            <div class="text-black">
              {{ t('cart.total') }}:
              <span class="font-medium text-indigo-">{{ cart.totalPrice.toFixed(2) }} €</span>
            </div>
          </div>

          <div class="flex justify-center gap-2 p-4">
            <button
              @click="continueShopping"
              class="bg-slate-700 text-slate-200 px-4 py-2 rounded hover:bg-slate-600"
            >
              {{ t('cart.continue') }}
            </button>
            <button
              @click="goToPayment"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              {{ t('cart.checkout') }}
            </button>
          </div>
        </footer>
      </div>
    </v-navigation-drawer>
  </teleport>
</template>
<style>
.card-modal {
  width: 520px;
  padding: 28px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}
</style>
