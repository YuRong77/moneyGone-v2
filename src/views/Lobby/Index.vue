<script setup lang="ts">
import type { Transaction } from '@/types'
import { categoryAPI, transactionAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import { format, startOfDay, endOfDay } from "date-fns";
import { emitter } from '@/utils/emitter'

const categoriesStore = useCategoriesStore()

const records = ref<Transaction[]>([])

function getCategories() {
  categoryAPI.categoryList().then(res => {
    categoriesStore.setCategories(res)
  })
}

function getTodayRecord() {
  const data = {
    startDate: format(startOfDay(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfDay(new Date()), 'yyyy-MM-dd')
  }
  transactionAPI.transactionList(data).then(res => {
    records.value = res
  })
}

onMounted(() => {
  getCategories()
  getTodayRecord()
  emitter.on('refresh', getTodayRecord)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>
<template>
  <Header title="Lobby" />
  <div class="content">

    <CategoryTab />

    <div class="record">
      <div v-for="item in records" :key="item.id">
        {{ item.name }}
        {{ item.amount }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.record {
  margin-top: 10px;
}
</style>