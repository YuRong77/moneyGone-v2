<script setup lang="ts">
import { authAPI } from '@/apis'

const router = useRouter()
let email = ref('')
let password = ref('')

function login() {
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
onMounted(() => {
  localStorage.removeItem('token')
})
</script>

<template>
  <div class="login">
    <div class="card">
      <el-input v-model="email" type="text"></el-input>
      <el-input v-model="password" type="password"></el-input>
      <el-button type="primary" @click="login()">login</el-button>
      <el-button type="primary" @click="loginTest()">loginTest</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  .card {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
