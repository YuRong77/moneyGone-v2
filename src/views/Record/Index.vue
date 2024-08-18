<script setup lang="ts">
import type { Transaction, TransactionTotal } from '@/types'
import { transactionAPI } from '@/apis'
import { format, startOfMonth, endOfMonth } from "date-fns";
import { emitter } from '@/utils/emitter'
import cat from '@/assets/images/png/cat.png'
import searchSvg from '@/assets/images/svg/search.svg'
import right from '@/assets/images/svg/right.svg'

const records = ref<TransactionTotal[]>([])

let rowDetails = ref<Transaction[] | null>(null)
let isVisible = ref(false)
let search = ref("")

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
  emitter.on('refresh', getMonthRecord)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})

</script>
<template>
  <Header title="Record" />
  <div class="content">
    <el-input class="mb-3" v-model="search" placeholder="Please Input">
      <template #prefix>
        <inline-svg :src="searchSvg" height="18" width="18"></inline-svg>
      </template>
    </el-input>
    <div class="totalItem" v-for="item in records" :key="item.date" @click="showDetails(item.details)">
      <div class="info">
        <div class="iconBox">
          <div class="icon" :style="{ backgroundImage: `url(${cat})` }"></div>
        </div>
        <div>
          <div>{{ item.date }}</div>
          <div>{{ item.totalAmount }}</div>
        </div>
      </div>
      <inline-svg :src="right" height="18" width="18"></inline-svg>
    </div>
  </div>
  <RecordDetail v-if="rowDetails" v-model:isVisible="isVisible" :rowDetails="rowDetails" />
</template>

<style lang="scss" scoped>
.content {
  padding-top: 80px;
}

.totalItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 10px;
  background: var(--card-color);
  border-radius: 12px;

  .info {
    display: flex;
    align-items: center;

    .iconBox {
      margin-right: 10px;
      padding: 4px;
      border-radius: 8px;
      background: wheat;

      .icon {
        width: 32px;
        height: 32px;
        background-position: center;
        background-size: cover;

      }
    }
  }
}
</style>