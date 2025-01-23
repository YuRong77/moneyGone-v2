<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

let formRef = ref<FormInstance>()
let formData = ref({ email: '' })
const formRules = ref<FormRules>({
  email: [{ required: true, type: 'email', message: 'Please input email', trigger: 'blur' }]
})
let isLoading = ref(false)
let isSendEmail = ref(false)

function sendResetEmail() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    isLoading.value = true
    authAPI
      .sendResetEmail({ email: formData.value.email })
      .then((res) => {
        isSendEmail.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="">
    <div>忘記密碼</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isSendEmail">
      <el-form-item prop="email">
        <el-input
          v-model="formData.email"
          type="email"
          placeholder="請輸入信箱"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-button class="w-100" type="primary" round :loading="isLoading" @click="sendResetEmail()"
        >發送密碼重設郵件</el-button
      >
      <div class="mb-2"></div>
      <el-button class="w-100" round @click="router.push({ name: 'Login' })">取消</el-button>
    </el-form>
    <el-result icon="success" title="已發送郵件至信箱" sub-title="請至信箱查看重設郵件" v-else>
      <template #extra>
        <el-button type="primary" @click="router.push({ name: 'Login' })">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped></style>
