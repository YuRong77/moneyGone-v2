<script setup lang="ts">
import type { PropType } from 'vue'
import type { Transaction } from '@/types'

const props = defineProps({
  isVisible: Boolean,
  rowDetails: {
    type: Array as PropType<Transaction[]>,
    required: true
  }
})
const emit = defineEmits(['update:isVisible'])

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})
</script>

<template>
  <el-drawer v-model="isVisibleModel" title="詳情" direction="btt" size="90%">
    <RecordItem v-for="item in rowDetails" :key="item.id" :item="item" />
    <template #footer>
      <div>
        <el-button plain class="mainBtn" @click="emit('update:isVisible', false)">cancel</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.recordItem {
  margin-bottom: 12px;
}
.mainBtn {
  width: 100%;
}
</style>
