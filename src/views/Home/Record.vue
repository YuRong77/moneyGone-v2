<script setup lang="ts">
import type { Transaction, TransactionTotal } from '@/types'
import { transactionAPI } from '@/apis'
import { format, startOfMonth, endOfMonth } from "date-fns";

const records = ref<TransactionTotal[]>([])

let rowDetails = ref<Transaction[] | null>(null)
let isVisible = ref(false)

function showDetails(details: Transaction[]) {
  rowDetails.value = details
  isVisible.value = true
}

function getMonthRecord() {
  const data = {
    startDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(new Date()), 'yyyy-MM-dd')
  }
  transactionAPI.transactionTotalList(data).then(res => {
    records.value = res
  })
}

onMounted(() => {
  getMonthRecord()
})

</script>
<template>
  <div>
    <div v-for="item in records" :key="item.date" @click="showDetails(item.details)">
      {{ item.date }}
      {{ item.totalAmount }}
    </div>
  </div>
  <RecordDetail v-if="rowDetails" v-model:isVisible="isVisible" :rowDetails="rowDetails" />
</template>



<style scoped></style>