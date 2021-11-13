import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@fontsource/raleway/100.css'
import '@fontsource/raleway/300.css'
import '@fontsource/raleway/700.css'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faPowerOff, faRedoAlt, faBed, faUsers, faWindowRestore, faAngleRight, faMoon} from '@fortawesome/free-solid-svg-icons'

library.add(faPowerOff, faRedoAlt, faBed, faUsers, faWindowRestore, faAngleRight, faMoon)

window.addEventListener('GreeterReady', () => {
    createApp(App).use(router).mount('#app')
})
