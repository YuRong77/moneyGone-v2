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
  <el-dialog v-model="isVisibleModel" title="Tips" width="90%">
    <div v-for="item in props.rowDetails" :key="item.id">
      {{ item.name }}
      {{ item.amount }}
    </div>
    <template #footer>
      <div></div>
    </template>
  </el-dialog>
</template>

<style scoped></style>