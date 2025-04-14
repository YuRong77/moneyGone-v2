<script setup lang="ts">
import { authAPI } from './apis'
import { Storage } from '@/utils/localStorage'
import elTW from 'element-plus/es/locale/lang/zh-tw'
import elCn from 'element-plus/es/locale/lang/zh-cn'
import elEn from 'element-plus/es/locale/lang/en'
import elJa from 'element-plus/es/locale/lang/ja'
// import elKo from 'element-plus/es/locale/lang/ko'

const { locale } = useI18n()
const router = useRouter()

let isAlive = ref(true)
let isServerStart = ref(false)

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
    isAlive.value = false
    nextTick(() => {
      isAlive.value = true
    })
  },
  { immediate: true }
)

async function pingServer() {
  try {
    setTimeout(() => {
      if (!isServerStart.value) router.push({ name: 'ServerStart' })
    }, 4000)
    await authAPI.pingServer()
    isServerStart.value = true
  } catch (err) {
    router.push({ name: 'ServerStart' })
  }
}

onMounted(() => {
  pingServer()
})
</script>

<template>
  <el-config-provider :locale="currentLang">
    <RouterView v-if="isAlive" />
  </el-config-provider>
</template>

<style scoped></style>
