import { createApp } from 'vue'
import Secondary from './Secondary.vue'

window.addEventListener('GreeterReady', () => {
    createApp(Secondary).mount('#app')
})
