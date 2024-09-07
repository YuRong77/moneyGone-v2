<script setup lang="ts">
import { emitter } from '@/utils/emitter'
import type { Transaction, NewTransaction } from '@/types'
import { format } from 'date-fns'

let transactionData = ref<Transaction | NewTransaction>()
let isVisible = ref(false)

function newTransaction(categoryId: number) {
  const data = {
    name: '',
    amount: null,
    note: '',
    categoryId: categoryId,
    createdAt: format(new Date(), 'yyyy-MM-dd')
  }
  transactionData.value = data
  isVisible.value = true
}

function editTransaction(data: Transaction) {
  transactionData.value = data
  isVisible.value = true
}

onMounted(() => {
  emitter.on('newTransaction', newTransaction)
  emitter.on('editTransaction', editTransaction)
})
onBeforeUnmount(() => {
  emitter.off('newTransaction')
  emitter.off('editTransaction')
})
</script>

<template>
  <div class="main appWidth">
    <RouterView />
    <Footer />
  </div>
  <Transaction
    v-if="isVisible && transactionData"
    v-model:isVisible="isVisible"
    :transactionData="transactionData"
  />
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--background-color);

  .content {
    flex: 1;
    padding: 90px 15px 92px; //header + 20 footer + 20
  }
}
</style>
