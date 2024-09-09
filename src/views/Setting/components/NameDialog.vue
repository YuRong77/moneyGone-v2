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
    <div class="content">
      <el-input class="popupInput" v-model="userName"></el-input>
    </div>
    <template #footer>
      <div>
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
        <el-button color="#208eef" class="mainBtn" @click="updateUserName()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  padding: 20px 0;
}
</style>
