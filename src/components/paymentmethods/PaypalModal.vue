<template>
  <v-card class="payment-modal h-screen">
     <div style="display:flex;gap:2px">
      <v-img src="/logos/paypal.svg" max-width="40" />
    <v-card-title class="justify-center font-weight-bold">PayPal</v-card-title>
   
         </div>
    <v-card-title class="text-center ">Enter your email address to get started.</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email or mobile number"
          type="email"
          dense
          outlined
        />
        <v-row class="mt-4">
          <v-col cols="12">
            <v-btn color="primary" block rounded @click="next">Next</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn variant="outlined" block rounded @click="payCard">Pay with Debit or Credit Card</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn text small @click="cancel">Cancel and return to Eventshop</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'pay', payload: { method: string; email?: string }): void
}>()

const email = ref('')

function next() {
  emits('pay', { method: 'paypal', email: email.value })
  emits('close')
}

function payCard() {
  emits('pay', { method: 'card' })
  emits('close')
}

function cancel() {
  emits('close')
}
</script>

<style scoped>
.payment-modal { width:520px; max-width:92vw; padding:38px; border-radius:8px; }
</style>
