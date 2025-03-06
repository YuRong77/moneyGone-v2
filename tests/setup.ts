// test/setup.ts
import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import router from '@/router'
import { createPinia } from 'pinia'
import i18n from '@/locales/i18n'
import { createRouter, createMemoryHistory } from 'vue-router'

const pinia = createPinia()

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'Lobby', component: { template: '<div>Lobby</div>' } },
    { path: '/record', name: 'Record', component: { template: '<div>Record</div>' } },
    { path: '/chart', name: 'Chart', component: { template: '<div>Chart</div>' } },
    { path: '/setting', name: 'Setting', component: { template: '<div>Setting</div>' } },
    { path: '/login', name: 'Login', component: { template: '<div>Login</div>' } },
    { path: '/register', name: 'Register', component: { template: '<div>Register</div>' } },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: { template: '<div>ForgotPassword</div>' }
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: { template: '<div>ResetPassword</div>' }
    }
  ]
})
// const mockElDialog = {
//   name: 'ElDialog',
//   template: '<div><slot></slot><slot name="footer"></slot></div>'
// }
// const mockElButton = {
//   name: 'ElButton',
//   template: '<button><slot></slot></button>'
// }

// 將套件注入所有測試
config.global.plugins = [ElementPlus, pinia, i18n, router]

config.global.components = {
  'inline-svg': {
    props: ['src', 'height', 'width', 'color'],
    template: '<div class="mock-svg">{{ src }}</div>'
  }
  // 'el-dialog': mockElDialog,
  // 'el-button': mockElButton
}
