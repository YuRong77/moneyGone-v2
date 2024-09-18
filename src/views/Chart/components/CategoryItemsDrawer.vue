<script setup lang="ts">
import { transactionAPI } from '@/apis'
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'
import type { Transaction } from '@/types'

const props = defineProps({
  isVisible: Boolean,
  categoryId: Number
})
const emit = defineEmits(['update:isVisible'])
const setting = inject('setting') as Ref<{ type: string; range: string | null }>
const date = inject('date') as Ref<Date>

const listData = ref<Transaction[]>([])
const limit = 10
let page = ref(1)
let isLoading = ref(false)
let isBottomReached = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const currentDate = computed(() => {
  if (setting.value.type === 'month') {
    return {
      startDate: startOfMonth(date.value),
      endDate: endOfMonth(date.value)
    }
  }
  return {
    startDate: startOfYear(date.value),
    endDate: endOfYear(date.value)
  }
})

const disableLoad = computed(() => isLoading.value || isBottomReached.value)

function getList() {
  const data = {
    startDate: format(currentDate.value.startDate, 'yyyy-MM-dd'),
    endDate: format(currentDate.value.endDate, 'yyyy-MM-dd'),
    categoryId: props.categoryId,
    page: page.value,
    limit
  }
  isLoading.value = true
  transactionAPI
    .transactionList(data)
    .then((res) => {
      listData.value = [...listData.value, ...res.result]
      if (listData.value.length >= res.total) return (isBottomReached.value = true)
      page.value += 1
    })
    .catch((err) => {})
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <el-drawer
    v-model="isVisibleModel"
    title="詳情"
    direction="btt"
    size="90%"
    class="categoryItemsDrawer"
  >
    <div class="content" v-infinite-scroll="getList" :infinite-scroll-disabled="disableLoad">
      <RecordItem v-for="item in listData" :key="item.id" :item="item" />
      <div style="height: 1px"></div>
    </div>
    <template #footer>
      <div>
        <el-button plain class="mainBtn w-100" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss">
.categoryItemsDrawer {
  .content {
    padding: 12px;
    height: 100%;
  }
  .recordItem {
    margin-bottom: 12px;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
