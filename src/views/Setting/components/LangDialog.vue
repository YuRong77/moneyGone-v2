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
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
        <el-button color="#208eef" class="mainBtn" @click="updateUserName()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.langList {
  padding: 20px 0 0;
  div {
    padding: 10px 8px;
    text-align: center;
    font-size: 16px;
    border-radius: 12px;
    border: 2px solid rgb(26 45 65 / 14%);
    margin-bottom: 20px;
  }
  .active {
    border-color: #208eef;
  }
}
</style>
