<template>
  <div class=" flex justify-center align-items-center h-screen card-modal ">
    <v-card class="pa-4 my-6 w-full max-w-lg">

   <v-row class="mb-4" align="center" justify="space-between">
  <v-col cols="6">
    <v-card-subtitle class="font-weight-bold">Credit card</v-card-subtitle>
  </v-col>

  <v-col cols="6" class="d-flex   align-center" style="gap:2px">
    <v-img src="/logos/visa.svg" width="40" height="24" />
    <v-img src="/logos/mastercard.svg" width="40" height="24" />
  </v-col>
</v-row>

      <v-card-text>
    
       <v-text-field label="Card number" v-model="cardNumber" placeholder="•••• •••• •••• ••••" />
          <div style="display:flex;gap:12px">
            <v-text-field style="flex:1" label="Expiration date (MM / YY)" v-model="expiry" />
            <v-text-field style="width:140px" label="Security code" v-model="cvc" />
          </div>
          <v-text-field label="Name on card" v-model="nameOnCard" />
        
       
      </v-card-text>
     
        <v-btn color="indigo w-full" class="mx-auto" @click="confirmPayment">
          Pay Now
        </v-btn> 
        
    
   
     

       <v-card-actions class="justify-center">
      <v-btn  @click="cancel">Cancel and return to Eventshop</v-btn>
    </v-card-actions>
  
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')
const nameOnCard = ref('')
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'pay', payload: { method: string; details?: Record<string, any> }): void
}>()

function cancel() {
  emits('close')
}
const confirmPayment = () => {
 
  emits('pay', { method: 'card', details: { cardNumber: cardNumber.value.slice(-4), name: nameOnCard.value } })
  emits('close')
}

</script>

<style scoped>
</style>
