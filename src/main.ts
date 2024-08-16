import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.scss'
import 'element-plus/dist/index.css'
import InlineSvg from 'vue-inline-svg'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('inline-svg', InlineSvg)

app.mount('#app')
