<script setup lang="ts">
import { authAPI } from '@/apis'

const router = useRouter()

function login() {
  const data = {
    email: "test@gmail.com",
    password: "test1234"
  }
  authAPI.login(data).then(res => {
    localStorage.setItem("token", res.token)
    router.push({ name: 'Lobby' })
  })
}

</script>

<template>
  <div>
    login
    <el-button type="primary" @click="login()">login</el-button>
  </div>
</template>



<style scoped></style>