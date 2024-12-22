import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(Notifications)
app.use(pinia)
app.mount('#app')
