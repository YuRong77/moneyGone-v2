<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'

const props = defineProps({
  isVisible: Boolean,
  lang: String
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

let lang = ref(cloneDeep(props.lang))
const langList = ['zh-TW', 'zh-CN', 'en-US', 'ja-JP']

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateUserName() {
  userAPI
    .updateUser({ lang: lang.value })
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
  <el-dialog v-model="isVisibleModel" title="修改語系" width="90%">
    <div class="langList">
      <div
        v-for="item in langList"
        :key="item"
        :class="{ active: item === lang }"
        @click="lang = item"
      >
        {{ item }}
      </div>
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
        <el-button @click="updateUserName()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.langList {
  .active {
    background: wheat;
  }
}
</style>
