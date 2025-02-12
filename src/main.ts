import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import '@/assets/css/index.scss'
import InlineSvg from 'vue-inline-svg'
import i18n from './locales/i18n'
import * as Sentry from '@sentry/vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.component('inline-svg', InlineSvg)

const env = import.meta.env
if (env.MODE === 'production' && env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration({ router })],
    release: env.VITE_APP_VERSION,
    environment: env.MODE
  })
}

app.mount('#app')
