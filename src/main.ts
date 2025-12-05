import './assets/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import Logo from '@/components/Logo.vue'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(vuetify)

app.use(pinia)

app.use(router)
app.component('Logo', Logo)

app.mount('#app')
