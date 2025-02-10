<script setup lang="ts">
import { authAPI } from '@/apis'
import { Storage } from '@/utils/localStorage'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const { t, locale } = useI18n()

let formRef = ref<FormInstance>()
let formData = ref({ email: '', password: '' })
const formRules = ref<FormRules>({
  email: [{ required: true, type: 'email', message: t('LC_TIPS_EMAIL'), trigger: 'blur' }],
  password: [{ required: true, message: t('LC_TIPS_PASSWORD'), trigger: 'blur' }]
})
let rememberEmail = ref(false)
let isLoading = ref(false)

function login() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    checkRemember()
    const data = {
      email: formData.value.email,
      password: formData.value.password
    }
    isLoading.value = true
    authAPI
      .login(data)
      .then((res) => {
        Storage.set('token', res.token)
        locale.value = res.lang
        router.push({ name: 'Lobby' })
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}

function loginTest() {
  isLoading.value = true
  authAPI
    .testLogin()
    .then((res) => {
      Storage.set('token', res.token)
      locale.value = res.lang
      router.push({ name: 'Lobby' })
    })
    .catch((err) => {})
    .finally(() => {
      isLoading.value = false
    })
}

function checkRemember() {
  rememberEmail.value ? Storage.set('email', formData.value.email) : Storage.remove('email')
}

onMounted(() => {
  localStorage.removeItem('token')
  const storageEmail = Storage.get('email')
  if (storageEmail) {
    formData.value.email = storageEmail
    rememberEmail.value = true
  }
})
</script>

<template>
  <div class="login">
    <div class="topBox">
      <div>{{ t('LC_LOGIN') }}</div>
    </div>
    <el-form ref="formRef" :model="formData" :rules="formRules">
      <el-form-item prop="email">
        <el-input
          v-model.trim="formData.email"
          type="email"
          :placeholder="t('LC_TIPS_EMAIL')"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formData.password"
          type="password"
          :placeholder="t('LC_TIPS_PASSWORD')"
          class="popupInput"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex-sb-c mb-2">
      <el-checkbox v-model="rememberEmail" :label="t('LC_EMAIL_REMEMBER')" size="large" />
      <el-button link type="info" @click="router.push({ name: 'ForgotPassword' })"
        >{{ t('LC_FORGOT_PASSWORD') }}?</el-button
      >
    </div>
    <el-button class="w-100" type="primary" round :loading="isLoading" @click="login()">{{
      t('LC_LOGIN')
    }}</el-button>
    <el-divider>{{ t('LC_OTHER_LOGIN') }}</el-divider>
    <el-button class="w-100" round :loading="isLoading" @click="loginTest()">{{
      t('LC_USE_TEST_ACCOUNT')
    }}</el-button>
    <div class="registerTips">
      {{ t('LC_NO_ACCOUNT') }}
      <el-button link type="primary" @click="router.push({ name: 'Register' })">{{
        t('LC_REGISTER')
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: var(--text-color);
}

// .login {
//   width: 100%;
//   .el-form {
//     width: 100%;
//   }
// }
.topBox {
  text-align: center;
  margin-bottom: 20px;
}

.registerTips {
  margin-top: 40px;
  font-size: 14px;
  text-align: center;

  .el-button {
    padding: 0 0 4px;
  }
}
</style>
