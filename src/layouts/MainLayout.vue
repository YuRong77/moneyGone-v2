<script setup lang="ts">
import { emitter } from '@/utils/emitter'
import type { Transaction as ITransaction, NewTransaction } from '@/types'

let transactionData = ref<ITransaction | NewTransaction | null>(null)
let isVisible = ref(false)

function newTransaction(categoryId: number) {
  const data = {
    name: '',
    amount: null,
    note: '',
    categoryId: categoryId
  }
  transactionData.value = data
  isVisible.value = true
}

onMounted(() => {
  emitter.on('newTransaction', newTransaction)
})
onBeforeUnmount(() => {
  emitter.off('newTransaction')
})

</script>

<template>
  <div class="main appWidth">
    <RouterView />
    <Footer />
  </div>
  <Transaction v-if="transactionData" v-model:isVisible="isVisible" :transactionData="transactionData" />
</template>



<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--background-color);

  .content {
    flex: 1;
    padding: 100px 15px 82px; //header + 20 footer + 10
  }
}
</style>