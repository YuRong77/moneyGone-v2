<script setup lang="ts">
import { authAPI } from '@/apis'
import { Storage } from '@/utils/localStorage'

const router = useRouter()
let email = ref('')
let password = ref('')
let rememberEmail = ref(false)

function login() {
  checkRemember()
  const data = {
    email: email.value,
    password: password.value
  }
  authAPI.login(data).then((res) => {
    localStorage.setItem('token', res.token)
    router.push({ name: 'Lobby' })
  })
}

function loginTest() {
  const data = {
    email: 'test@gmail.com',
    password: 'test1234'
  }
  authAPI.login(data).then((res) => {
    localStorage.setItem('token', res.token)
    router.push({ name: 'Lobby' })
  })
}

function checkRemember() {
  rememberEmail.value ? Storage.set('email', email.value) : Storage.remove('email')
}

onMounted(() => {
  localStorage.removeItem('token')
  const storageEmail = Storage.get('email')
  if (storageEmail) {
    email.value = storageEmail
    rememberEmail.value = true
  }
})
</script>

<template>
  <div class="login">
    <div class="topBox">
      <div>Login</div>
    </div>
    <el-input
      v-model="email"
      type="email"
      placeholder="請輸入信箱"
      class="popupInput mb-3"
    ></el-input>
    <el-input
      v-model="password"
      type="password"
      placeholder="請輸入密碼"
      class="popupInput"
    ></el-input>
    <div class="flex-sb-c mb-2">
      <el-checkbox v-model="rememberEmail" label="記住信箱" size="large" />
      <el-button link type="info" @click="router.push({ name: 'ForgotPassword' })"
        >忘記密碼?</el-button
      >
    </div>
    <el-button class="w-100" type="primary" round @click="login()">login</el-button>
    <el-divider>使用其他方式登入</el-divider>
    <el-button class="w-100" round @click="loginTest()">loginTest</el-button>
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
