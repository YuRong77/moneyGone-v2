<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const router = useRouter()

let isRegistered = ref(false)
let isLoading = ref(false)
let formRef = ref<FormInstance>()
const formData = ref({
  name: '',
  email: '',
  password: '',
  checkPassword: ''
})
const formRules = ref<FormRules>({
  name: [{ required: true, message: t('LC_TIPS_ACCOUNT_NAME'), trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: t('LC_TIPS_EMAIL'), trigger: 'blur' }],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: 'blur'
    }
  ],
  checkPassword: [
    {
      required: true,
      validator: validateCheckPassword,
      trigger: 'blur'
    }
  ]
})

function validatePassword(rule: any, value: any, callback: any) {
  //大小寫字母 數字 底線 -!@#$%^&*() 至少6字
  let regex = /^[-\w!@#$%^&*()]{6,}$/
  if (regex.test(value)) return callback()
  callback(new Error(t('LC_PASSWORD_TIPS')))
}

function validateCheckPassword(rule: any, value: any, callback: any) {
  if (value === '') return callback(new Error(t('LC_TIPS_PASSWORD_CHECK')))
  if (value !== formData.value.password) return callback(new Error(t('LC_MATCH_TIPS')))
  callback()
}

function register() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    const data = {
      userName: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    }
    isLoading.value = true
    authAPI
      .register(data)
      .then((res) => {
        isRegistered.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="register">
    <div class="title">{{ t('LC_REGISTER') }}</div>
    <div class="tips">{{ t('LC_REGISTER_TIPS') }}</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isRegistered">
      <el-form-item prop="name">
        <el-input
          v-model.trim="formData.name"
          :placeholder="t('LC_TIPS_ACCOUNT_NAME')"
          class="popupInput"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model.trim="formData.email"
          :placeholder="t('LC_TIPS_EMAIL')"
          class="popupInput"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formData.password"
          class="popupInput"
          :placeholder="t('LC_TIPS_PASSWORD')"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model.trim="formData.checkPassword"
          class="popupInput"
          :placeholder="t('LC_TIPS_PASSWORD_CHECK')"
          type="password"
        ></el-input>
      </el-form-item>

      <el-button class="w-100" type="primary" round :loading="isLoading" @click="register()">{{
        t('LC_SUBMIT')
      }}</el-button>
      <div class="mb-2"></div>
      <el-button class="w-100" round @click="router.push({ name: 'Login' })">{{
        t('LC_CANCEL')
      }}</el-button>
    </el-form>
    <el-result
      icon="success"
      :title="t('LC_REGISTER_SUCCESS')"
      :sub-title="t('LC_TO_LOGIN_TIPS')"
      v-else
    >
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
  margin-bottom: 10px;
  text-align: center;
}
.tips {
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-color);
}
</style>
