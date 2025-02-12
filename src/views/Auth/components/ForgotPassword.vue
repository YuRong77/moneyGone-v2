<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const router = useRouter()

let formRef = ref<FormInstance>()
let formData = ref({ email: '' })
const formRules = ref<FormRules>({
  email: [{ required: true, type: 'email', message: t('LC_TIPS_EMAIL'), trigger: 'blur' }]
})
let isLoading = ref(false)
let isSendEmail = ref(false)

function sendResetEmail() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    isLoading.value = true
    authAPI
      .sendResetEmail({ email: formData.value.email })
      .then((res) => {
        isSendEmail.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="">
    <div class="title">{{ t('LC_FORGOT_PASSWORD') }}</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isSendEmail">
      <el-form-item prop="email" class="mb-3">
        <el-input
          v-model="formData.email"
          type="email"
          :placeholder="t('LC_TIPS_EMAIL')"
          class="popupInput"
        ></el-input>
      </el-form-item>
      <el-button
        class="w-100"
        type="primary"
        round
        :loading="isLoading"
        @click="sendResetEmail()"
        >{{ t('LC_SEND_RESET_EMAIL') }}</el-button
      >
      <div class="mb-2"></div>
      <el-button class="w-100" round @click="router.push({ name: 'Login' })">{{
        t('LC_CANCEL')
      }}</el-button>
    </el-form>
    <el-result
      icon="success"
      :title="t('LC_IS_SEND_EMAIL')"
      :sub-title="t('LC_PLEASE_CHECK')"
      v-else
    >
      <template #extra>
        <el-button type="primary" @click="router.push({ name: 'Login' })">{{
          t('LC_CLOSE')
        }}</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
}
</style>
