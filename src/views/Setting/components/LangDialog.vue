<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'
import { Storage } from '@/utils/localStorage'
import { langList } from '@/types/constants'
import { showMessage } from '@/utils/message'

const props = defineProps({
  isVisible: Boolean,
  lang: String
})
const emit = defineEmits(['update:isVisible', 'getProfile'])
const { t, locale } = useI18n()

let lang = ref(cloneDeep(props.lang))
let isLoading = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateLang() {
  isLoading.value = true
  userAPI
    .updateUser({ lang: lang.value })
    .then((res) => {
      locale.value = lang.value as string
      Storage.set('lang', lang.value)
      showMessage(t('LC_EDIT_SUCCESS'))
    })
    .catch((err) => {})
    .finally(() => {
      isLoading.value = false
      emit('update:isVisible', false)
      emit('getProfile')
    })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" :title="t('LC_EDIT_LANG')" width="90%">
    <div class="langList">
      <div
        v-for="item in langList"
        :key="item.value"
        :class="{ active: item.value === lang }"
        @click="lang = item.value"
      >
        {{ item.text }}
      </div>
    </div>
    <template #footer>
      <div>
        <el-button
          data-test="lang_cancel_btn"
          color="#f1f1f1"
          class="mainBtn"
          @click="emit('update:isVisible', false)"
          >{{ t('LC_CANCEL') }}</el-button
        >
        <el-button
          data-test="lang_submit_btn"
          color="#208eef"
          class="mainBtn"
          :loading="isLoading"
          @click="updateLang()"
          >{{ t('LC_SUBMIT') }}</el-button
        >
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
