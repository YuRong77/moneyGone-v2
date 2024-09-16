<script setup lang="ts">
import { authAPI } from '@/apis'

const route = useRoute()
const router = useRouter()

let password = ref('')
let checkPassword = ref('')

function resetPassword() {
  const data = {
    password: password.value,
    token: route.query.token as string
  }
  authAPI.resetPassword(data).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="">
    <div>重設密碼</div>
    <el-input
      v-model="password"
      type="password"
      placeholder="請輸入密碼"
      class="popupInput mb-3"
    ></el-input>
    <el-button class="w-100" type="primary" round @click="resetPassword()">重設密碼</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
