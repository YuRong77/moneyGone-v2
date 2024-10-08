<script setup lang="ts">
import type { Transaction, TransactionTotal } from '@/types'
import { transactionAPI } from '@/apis'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { emitter } from '@/utils/emitter'
import { priceFormat } from '@/utils/priceFormat'
import { loading } from '@/utils/loading'
import searchSvg from '@/assets/images/svg/search.svg'
import house from '@/assets/images/svg/house.svg'
import right from '@/assets/images/svg/right.svg'

let date = ref<Date>(new Date())
const records = ref<TransactionTotal[]>([])
let rowDetails = ref<Transaction[] | null>(null)
let isVisible = ref(false)
let search = ref('')

const recordsFilter = computed(() => {
  if (!search.value) return records.value
  return records.value.filter((item) =>
    item.details.find(
      (_item) => _item.categoryName.includes(search.value) || _item.name.includes(search.value)
    )
  )
})

watch(
  date,
  () => {
    getMonthRecord()
  },
  { immediate: true }
)

function getTopExpenseItem(item: TransactionTotal) {
  return item.details.reduce((max, item) => {
    return item.amount > max.amount ? item : max
  }, item.details[0])
}

function showDetails(details: Transaction[]) {
  rowDetails.value = details
  isVisible.value = true
}

function getMonthRecord() {
  const data = {
    startDate: format(startOfMonth(date.value), 'yyyy-MM-dd'),
    endDate: format(endOfMonth(date.value), 'yyyy-MM-dd')
  }
  loading.open()
  transactionAPI
    .transactionTotalList(data)
    .then((res) => {
      records.value = res
    })
    .catch((err) => {})
    .finally(() => {
      isVisible.value = false
      loading.close()
    })
}

onMounted(() => {
  emitter.on('refresh', getMonthRecord)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>
<template>
  <Header title="Record">
    <template #right>
      <DatePicker v-model:date="date" type="month" />
    </template>
  </Header>
  <div class="content">
    <el-input class="search cardShadow mb-5" v-model="search" placeholder="Please Input">
      <template #prefix>
        <inline-svg :src="searchSvg" height="18" width="18"></inline-svg>
      </template>
    </el-input>
    <div
      class="totalItem cardShadow"
      v-for="item in recordsFilter"
      :key="item.date"
      @click="showDetails(item.details)"
    >
      <div class="info">
        <div class="iconBox" :style="{ background: `${getTopExpenseItem(item).categoryColor}` }">
          <div
            class="icon"
            :style="{ backgroundImage: `url(${getTopExpenseItem(item).imageUrl})` }"
          ></div>
        </div>
        <div>
          <div class="date">{{ item.date }}</div>
          <div class="amount">$ {{ priceFormat(item.totalAmount) }}</div>
        </div>
      </div>
      <inline-svg :src="right" color="#ababab" height="18" width="18"></inline-svg>
    </div>
    <el-empty
      v-if="recordsFilter.length === 0"
      :style="{ height: 'calc(100dvh - 235px)' }"
      :image="house"
      :image-size="200"
      description="這個月還沒有消費"
    />
  </div>
  <RecordDrawer v-if="rowDetails" v-model:isVisible="isVisible" :rowDetails="rowDetails" />
</template>

<style lang="scss" scoped>
.content {
  padding-top: 80px;
}

.search {
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 12px;
    padding: 6px 10px;
  }
}

.totalItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 16px;
  background: var(--card-color);
  border-radius: 12px;
  cursor: pointer;

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
    .date {
      font-size: 14px;
      color: #8d8d8d;
    }
    .amount {
      font-weight: 500;
    }
  }
}
</style>
