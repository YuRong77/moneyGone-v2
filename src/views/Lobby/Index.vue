<script setup lang="ts">
import type { Overview } from '@/types'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'

const overview = ref<Overview>()

function getOverview() {
  transactionAPI.transactionOverview().then((res) => {
    overview.value = res
  })
}

onMounted(() => {
  getOverview()
  emitter.on('refresh', getOverview)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>

<template>
  <Header title="Lobby" />
  <div class="content">
    <Overview class="mb-5" :data="overview" />
    <CategoryItems class="mb-5" />
    <div class="record">
      <RecordItem v-for="item in overview?.todayRecords" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record {
  .recordItem:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>