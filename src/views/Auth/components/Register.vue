<script setup lang="ts">
import { authAPI } from '@/apis'

const route = useRoute()
const router = useRouter()
const formData = ref({
  name: '',
  email: '',
  password: '',
  checkPassword: ''
})

function register() {
  const data = {
    userName: formData.value.name,
    email: formData.value.email,
    password: formData.value.password
  }
  authAPI.register(data).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="">
    <div>註冊</div>
    <el-input v-model="formData.name" placeholder="請輸入名稱" class="popupInput mb-3"></el-input>
    <el-input v-model="formData.email" placeholder="請輸入信箱" class="popupInput mb-3"></el-input>
    <el-input
      v-model="formData.password"
      placeholder="請輸入密碼"
      class="popupInput mb-3"
    ></el-input>
    <el-button class="w-100" type="primary" round @click="register()">註冊</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
