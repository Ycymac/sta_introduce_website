import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './styles/tokens.css'
import './styles/global.css'
import './styles/motion.css'
import './styles/portal.css'

createApp(App).use(pinia).use(router).mount('#app')
