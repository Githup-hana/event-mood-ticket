<template>
  <div class=" flex justify-center align-items-center h-screen  ">
  <v-card class="pa-4  my-6   " >
    <v-card-title class="text-h6 font-semibold h-10">
      Wähle deine Zahlungsmethode
    </v-card-title>

    <v-card-text>
      <v-radio-group v-model="payment"  >
        <v-row>
          
    <v-col cols="12 sm:6">
        <v-radio
          value="card"
          label="VISA / MasterCard"
          class="my-2"
          
          color="indigo"
        > </v-radio>
         <v-img :src="cards.visa" alt="VISA / MasterCard" max-width="60" class="ml-6"/>
            <v-dialog v-model="showCardDialog" width="680" persistent>
       
            <div style="display:flex;justify-content:center;padding:12px">
              <CardModal @close="showCardDialog = false" @pay="onCardPay" />
            </div>
          </v-dialog>
   </v-col>
        <v-col cols="12 sm:6 ">
        <v-radio
          value="paypal"
          label="PayPal"
          class="my-2"
    
          color="blue"
        > </v-radio>
          <v-img :src="cards.paypal" alt="PayPal" max-width="60" class="ml-6"/>
          <v-dialog v-model="showPaypalDialog" width="680" persistent>
       
            <div style="display:flex;justify-content:center;padding:12px">
              <PaypalModal @close="showPaypalDialog = false" @pay="onPaypalPay" />
            </div>
          </v-dialog>
        </v-col>

        
   <v-col cols="12 sm:6 "> <v-radio
          value="klarna"
          label="KLARNA PAY LATER / PAY NOW"
          class="my-2"
          color="green"
        > </v-radio>  <v-img :src="cards.klarna" alt="Klarna" max-width="60" class="ml-6"/> </v-col>

       
        </v-row>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-btn color="indigo" @click="confirmPayment" class="mx-auto">
        Weiter
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaypalModal from './PaypalModal.vue'
import CardModal from './CardModal.vue'

const payment = ref('card')
const showPaypalDialog = ref(false)
const showCardDialog = ref(false)

const confirmPayment = () => {
  if (payment.value === 'paypal') {
    showPaypalDialog.value = true
    return
  }
  alert(`Gewählte Zahlungsmethode: ${payment.value}`)
}
const cards = {
  'visa': '/logos/visa.svg',
  'mastercard': '/logos/mastercard.svg',
  'klarna': '/logos/klarna.png',
  'paypal': '/logos/paypal.svg'
 
}



function onPaypalPay(payload: { method: string; email?: string }) {
  
  if (payload.method === 'paypal') {
    alert(`PayPal selected — E-Mail: ${payload.email ?? '-'} `)
  } else if (payload.method === 'card') {
    alert('Switching to card payment (from Paypal modal)')
  }
  showPaypalDialog.value = false
}
function onCardPay(payload: { method: string }) {
  if (payload.method === 'card') {
    alert('Card payment confirmed (from Card modal)')
  }
  showCardDialog.value = false
}
watch(payment, (val) => {
  if (val === 'paypal') showPaypalDialog.value = true
  
  else showPaypalDialog.value = false
  if (val === 'card') showCardDialog.value = true
  else showCardDialog.value = false
})
</script>

<style scoped>

</style>
