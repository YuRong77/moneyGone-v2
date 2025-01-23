<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()

let formRef = ref<FormInstance>()
let formData = ref({ password: '', checkPassword: '' })
const formRules = ref<FormRules>({
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
  checkPassword: [{ required: true, validator: validateCheckPassword, trigger: 'blur' }]
})
let isLoading = ref(false)
let isReset = ref(false)

function validateCheckPassword(rule: any, value: any, callback: any) {
  if (value === '') return callback(new Error('Please input the checkPassword'))
  if (value !== formData.value.password)
    return callback(new Error("password and checkPassword don't match!"))
  callback()
}

function resetPassword() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    const data = {
      password: formData.value.password,
      token: route.query.token as string
    }
    isLoading.value = true
    authAPI
      .resetPassword(data)
      .then((res) => {
        isReset.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="resetPassword">
    <div>重設密碼</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isReset">
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="請輸入密碼"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model="formData.checkPassword"
          type="password"
          placeholder="密碼確認"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-button class="w-100" type="primary" round :loading="isLoading" @click="resetPassword()"
        >重設密碼</el-button
      >
    </el-form>
    <el-result icon="success" title="成功修改" sub-title="返回重新登入" v-else>
      <template #extra>
        <el-button type="primary" @click="router.push({ name: 'Login' })">to login</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped></style>
