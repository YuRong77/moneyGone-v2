// test/setup.ts
import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import router from '@/router'
import { createPinia } from 'pinia'

const pinia = createPinia()

// const mockElDialog = {
//   name: 'ElDialog',
//   template: '<div><slot></slot><slot name="footer"></slot></div>'
// }
// const mockElButton = {
//   name: 'ElButton',
//   template: '<button><slot></slot></button>'
// }

// 將套件注入所有測試
config.global.plugins = [ElementPlus, pinia] //router 待確認

config.global.components = {
  'inline-svg': {
    props: ['src', 'height', 'width', 'color'],
    template: '<div class="mock-svg">{{ src }}</div>'
  }
  // 'el-dialog': mockElDialog,
  // 'el-button': mockElButton
}
