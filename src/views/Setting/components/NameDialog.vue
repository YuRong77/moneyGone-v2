<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'

const props = defineProps({
  isVisible: Boolean,
  userName: String
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

let userName = ref(cloneDeep(props.userName))

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateUserName() {
  userAPI
    .updateUser({ name: userName.value })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {})
    .finally(() => {
      emit('update:isVisible', false)
      emit('getProfile')
    })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" title="修改暱稱" width="90%">
    <div>
      <el-input v-model="userName"></el-input>
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
        <el-button @click="updateUserName()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
