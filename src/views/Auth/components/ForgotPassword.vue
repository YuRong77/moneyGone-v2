<script setup lang="ts">
import { authAPI } from '@/apis'

const router = useRouter()
let email = ref('')

function sendResetEmail() {
  authAPI.sendResetEmail({ email: email.value }).then((res) => {
    console.log(res, 'res')
  })
}
</script>

<template>
  <div class="">
    <div>忘記密碼</div>
    <el-input
      v-model="email"
      type="email"
      placeholder="請輸入信箱"
      class="popupInput mb-3"
    ></el-input>
    <el-button class="w-100" type="primary" round @click="sendResetEmail()"
      >發送密碼重設郵件</el-button
    >
    <div class="mb-2"></div>
    <el-button class="w-100" round @click="router.push({ name: 'Login' })">取消</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
