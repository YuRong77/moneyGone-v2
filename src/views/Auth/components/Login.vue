<script setup lang="ts">
import { authAPI } from '@/apis'
import { Storage } from '@/utils/localStorage'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

let formRef = ref<FormInstance>()
let formData = ref({ email: '', password: '' })
const formRules = ref<FormRules>({
  email: [{ required: true, type: 'email', message: 'Please input email', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
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
        localStorage.setItem('token', res.token)
        router.push({ name: 'Lobby' })
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}

function loginTest() {
  const data = {
    email: 'test@gmail.com',
    password: 'test1234'
  }
  isLoading.value = true
  authAPI
    .login(data)
    .then((res) => {
      localStorage.setItem('token', res.token)
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
      <div>Login</div>
    </div>
    <el-form ref="formRef" :model="formData" :rules="formRules">
      <el-form-item prop="email">
        <el-input
          v-model.trim="formData.email"
          type="email"
          placeholder="請輸入信箱"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formData.password"
          type="password"
          placeholder="請輸入密碼"
          class="popupInput"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="flex-sb-c mb-2">
      <el-checkbox v-model="rememberEmail" label="記住信箱" size="large" />
      <el-button link type="info" @click="router.push({ name: 'ForgotPassword' })"
        >忘記密碼?</el-button
      >
    </div>
    <el-button class="w-100" type="primary" round :loading="isLoading" @click="login()"
      >login</el-button
    >
    <el-divider>使用其他方式登入</el-divider>
    <el-button class="w-100" round :loading="isLoading" @click="loginTest()">loginTest</el-button>
    <div class="registerTips">
      還沒有帳號碼?
      <el-button link type="primary" @click="router.push({ name: 'Register' })">註冊帳號</el-button>
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
