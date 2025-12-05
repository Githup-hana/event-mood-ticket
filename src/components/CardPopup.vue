<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
import EventPriceChooser from "./event/EventPriceChooser.vue";
import { useRouter } from "vue-router";
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
      scrim
      width="460"
      class="flex flex-col w-full sm:w-[860px] h-screen"
    >
      <header class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-semibold text-black">Warenkorb</h1>
        <button @click="dialog = false" class="text-black hover:text-white">✕</button>
      </header>

      <section v-if="(tickets || []).length === 0" class="text-black font-bold">
        Dein Warenkorb ist leer.
      </section>

      <section v-else class="flex flex-col flex-1 min-h-0">
        <div class="flex-1  pr-2 min-h-0">
          <ul class="space-y-2 w-full ">
              <li
                v-for="(ticket, idx) in tickets"
                :key="ticket.event?.id ?? idx"
                class="w-full border border-slate-800 rounded p-3 flex flex-col sm:flex-row gap-3"
              >
                <EventPriceChooser v-if="ticket.event" :event="ticket.event" />
              </li>
            </ul>
        </div>
           </section>
        <footer class="border-t border-slate-800 pt-4 fixed-bottom ">
          <div class="flex items-center justify-between p-4">
            <div class="text-black">
              Gesamtanzahl: <span class="font-medium text-indigo-">{{ cart.totalCount }}</span>
            </div>
            <div class="text-black">
              Gesamtpreis:
              <span class="font-medium text-indigo-">{{ cart.totalPrice.toFixed(2) }} €</span>
            </div>
          </div>

          <div class="flex justify-center gap-2 p-4">
            <button
              @click="continueShopping"
              class="bg-slate-700 text-slate-200 px-4 py-2 rounded hover:bg-slate-600"
            >
              Weiter einkaufen
            </button>
            <button
              @click="goToPayment"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Zur Kasse
            </button>
          </div>
        </footer>
   
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
