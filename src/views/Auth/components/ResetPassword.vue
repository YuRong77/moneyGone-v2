<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

let formRef = ref<FormInstance>()
let formData = ref({ password: '', checkPassword: '' })
const formRules = ref<FormRules>({
  password: [{ required: true, message: t('LC_TIPS_PASSWORD'), trigger: 'blur' }],
  checkPassword: [{ required: true, validator: validateCheckPassword, trigger: 'blur' }]
})
let isLoading = ref(false)
let isReset = ref(false)

function validateCheckPassword(rule: any, value: any, callback: any) {
  if (value === '') return callback(new Error(t('LC_TIPS_PASSWORD_CHECK')))
  if (value !== formData.value.password) return callback(new Error(t('LC_MATCH_TIPS')))
  callback()
}

function resetPassword() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    const data = {
      password: formData.value.password,
      token: route.query.token as string
    }
    isLoading.value = true
    authAPI
      .resetPassword(data)
      .then((res) => {
        isReset.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="resetPassword">
    <div class="title">{{ t('LC_RESET_PASSWORD') }}</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isReset">
      <el-form-item prop="password">
        <el-input
          class="popupInput"
          v-model="formData.password"
          :placeholder="t('LC_TIPS_PASSWORD')"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          class="popupInput"
          v-model="formData.checkPassword"
          :placeholder="t('LC_TIPS_PASSWORD_CHECK')"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-button class="w-100" type="primary" round :loading="isLoading" @click="resetPassword()">{{
        t('LC_RESET_PASSWORD')
      }}</el-button>
    </el-form>
    <el-result icon="success" :title="t('LC_EDIT_SUCCESS')" :sub-title="t('LC_RE_LOGIN')" v-else>
      <template #extra>
        <el-button type="primary" @click="router.push({ name: 'Login' })">{{
          t('LC_TO_LOGIN')
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
