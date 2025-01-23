<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  isVisible: Boolean,
  userName: String
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

let formData = ref({ userName: cloneDeep(props.userName) })
let formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
  userName: [{ required: true, message: 'Please input name', trigger: 'change' }]
})
let isLoading = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateUserName() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    isLoading.value = true
    userAPI
      .updateUser({ name: formData.value.userName })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
        emit('update:isVisible', false)
        emit('getProfile')
      })
  })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" title="修改暱稱" width="90%">
    <div class="content">
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item prop="userName">
          <el-input
            class="popupInput"
            v-model.trim="formData.userName"
            placeholder="請輸入暱稱"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
        <el-button color="#208eef" class="mainBtn" :loading="isLoading" @click="updateUserName()"
          >submit</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  padding: 20px 0;
}
</style>
