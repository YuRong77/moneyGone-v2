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

const { t } = useI18n()

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
  <Header :title="t('LC_RECORD')">
    <template #right>
      <DatePicker v-model:date="date" type="month" />
    </template>
  </Header>
  <div class="content">
    <el-input
      class="search cardShadow mb-5"
      v-model="search"
      :placeholder="t('LC_TIPS_RECORD')"
      data-test="recordSearch"
    >
      <template #prefix>
        <inline-svg :src="searchSvg" height="18" width="18"></inline-svg>
      </template>
    </el-input>
    <div
      class="totalItem cardShadow"
      v-for="item in recordsFilter"
      :key="item.date"
      @click="showDetails(item.details)"
      data-test="totalItem"
    >
      <div class="info">
        <CategoryIcon
          class="mr-2"
          :color="getTopExpenseItem(item).categoryColor"
          :url="getTopExpenseItem(item).imageUrl"
          :categoryName="getTopExpenseItem(item).categoryName"
        />
        <div>
          <div class="date">{{ item.date }}</div>
          <div class="amount">$ {{ priceFormat(item.totalAmount) }}</div>
        </div>
      </div>
      <inline-svg :src="right" color="#ababab" height="18" width="18"></inline-svg>
    </div>
    <el-empty
      v-if="recordsFilter.length === 0"
      data-test="emptyRecord"
      :style="{ height: 'calc(100dvh - 235px)' }"
      :image="house"
      :image-size="200"
      :description="search ? `${t('LC_SEARCH_EMPTY')} '${search}'` : t('LC_RECORD_EMPTY')"
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
  padding: 8px 10px;
  margin-bottom: 16px;
  background: var(--card-color);
  border-radius: 12px;
  cursor: pointer;

  .info {
    display: flex;
    align-items: center;
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
