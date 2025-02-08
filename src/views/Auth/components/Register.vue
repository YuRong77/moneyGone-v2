<script setup lang="ts">
import { authAPI } from '@/apis'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

let isRegistered = ref(false)
let isLoading = ref(false)
let formRef = ref<FormInstance>()
const formData = ref({
  name: '',
  email: '',
  password: '',
  checkPassword: ''
})
const formRules = ref<FormRules>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: 'Please input email', trigger: 'blur' }],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: 'blur'
    }
  ],
  checkPassword: [
    {
      required: true,
      validator: validateCheckPassword,
      trigger: 'blur'
    }
  ]
})

function validatePassword(rule: any, value: any, callback: any) {
  //大小寫字母 數字 底線 -!@#$%^&*() 至少6字
  let regex = /^[-\w!@#$%^&*()]{6,}$/
  if (regex.test(value)) return callback()
  callback(new Error('Please input the password 至少6'))
}

function validateCheckPassword(rule: any, value: any, callback: any) {
  if (value === '') return callback(new Error('Please input the checkPassword'))
  if (value !== formData.value.password)
    return callback(new Error("password and checkPassword don't match!"))
  callback()
}

function register() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    const data = {
      userName: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    }
    isLoading.value = true
    authAPI
      .register(data)
      .then((res) => {
        isRegistered.value = true
      })
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
      })
  })
}
</script>

<template>
  <div class="register">
    <div>註冊</div>
    <el-form ref="formRef" :model="formData" :rules="formRules" v-if="!isRegistered">
      <el-form-item prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="請輸入名稱"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model.trim="formData.email"
          placeholder="請輸入信箱"
          class="popupInput mb-3"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="formData.password"
          class="popupInput mb-3"
          placeholder="請輸入密碼"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model.trim="formData.checkPassword"
          class="popupInput mb-3"
          placeholder="密碼確認"
          type="password"
        ></el-input>
      </el-form-item>

      <el-button class="w-100" type="primary" round :loading="isLoading" @click="register()"
        >註冊</el-button
      >
    </el-form>
    <el-result icon="success" title="註冊成功" sub-title="請返回登入頁登入" v-else>
      <template #extra>
        <el-button type="primary" @click="router.push({ name: 'Login' })">to login</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped></style>
