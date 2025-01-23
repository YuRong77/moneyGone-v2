import { createI18n } from 'vue-i18n'
import { Storage } from '@/utils/localStorage'
import zhTW from './lang/zh-tw.json'
import en from './lang/en.json'

let currentLang = Storage.get('lang') || 'zh-TW'

const i18n = createI18n({
  legacy: false,
  locale: currentLang,
  fallbackLocale: currentLang,
  messages: {
    'en-US': en,
    'zh-TW': zhTW
  }
})

export default i18n
