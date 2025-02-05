<script setup lang="ts">
import { Storage } from '@/utils/localStorage'
import elTW from 'element-plus/es/locale/lang/zh-tw'
import elCn from 'element-plus/es/locale/lang/zh-cn'
import elEn from 'element-plus/es/locale/lang/en'
import elJa from 'element-plus/es/locale/lang/ja'
// import elKo from 'element-plus/es/locale/lang/ko'

const { locale } = useI18n()

const currentLang = computed(() => {
  if (locale.value === 'zh-TW') return elTW
  if (locale.value === 'zh-CN') return elCn
  if (locale.value === 'en-US') return elEn
  if (locale.value === 'ja-JP') return elJa
  // if (locale.value === 'ko-KR') return elKo
  return elTW
})

watch(
  locale,
  (val) => {
    var html = document.documentElement
    html.setAttribute('lang', val)
    Storage.set('lang', val)
  },
  { immediate: true }
)
</script>

<template>
  <el-config-provider :locale="currentLang">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
