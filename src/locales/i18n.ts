import { createI18n } from 'vue-i18n'
import { Storage } from '@/utils/localStorage'
import zhTW from './lang/zh-TW.json'
import zhCN from './lang/zh-CN.json'
import enUS from './lang/en-US.json'
import jaJP from './lang/ja-JP.json'

let currentLang = Storage.get('lang') || 'zh-TW'

const i18n = createI18n({
  legacy: false,
  locale: currentLang,
  fallbackLocale: currentLang,
  messages: {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP
  }
})

export default i18n
