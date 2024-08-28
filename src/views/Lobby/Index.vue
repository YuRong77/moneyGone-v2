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
    <h4 class="subTitle">概要</h4>
    <Overview class="mb-10" :data="overview" />
    <h4 class="subTitle">分類</h4>
    <CategoryItems class="mb-10" />
    <h4 class="subTitle">本日花費</h4>
    <div class="record">
      <RecordItem v-for="item in overview?.todayRecords" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subTitle {
  margin-bottom: 10px;
}

.record {
  .recordItem:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
