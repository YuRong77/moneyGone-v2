<script setup lang="ts">
import { chartAPI } from '@/apis'
import type { Chart } from '@/types'
import { emitter } from '@/utils/emitter'
import { getYear, getMonth, getDate } from 'date-fns'
import { loading } from '@/utils/loading'
import house from '@/assets/images/svg/house.svg'

const { t } = useI18n()

let date = ref<Date>(new Date())
let viewType = ref<'bar' | 'donut'>('bar')
let chartType = ref<'year' | 'month'>('month')
let chartRange = ref<string | null>(getDate(new Date()) < 16 ? 'firstHalf' : 'secondHalf')
const chartData = ref<Chart | null>(null)

const setting = computed(() => {
  return {
    type: chartType.value,
    range: chartRange.value
  }
})

watch(chartType, (val) => {
  if (val === 'year') chartRange.value = null
  if (val === 'month') chartRange.value = 'firstHalf'
  getChart()
})

watch(
  date,
  () => {
    getChart()
  },
  { immediate: true }
)

function getChart() {
  loading.open()
  const data = {
    type: chartType.value,
    year: getYear(date.value),
    month: getMonth(date.value) + 1
  }
  chartAPI
    .getChart(data)
    .then((res) => {
      chartData.value = res
    })
    .catch(() => {})
    .finally(() => {
      loading.close()
    })
}

onMounted(() => {
  emitter.on('refresh', getChart)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})

provide('chartData', chartData)
provide('setting', setting)
provide('date', date)
</script>

<template>
  <Header :title="t('LC_CHART')">
    <template #right>
      <DatePicker v-model:date="date" :type="chartType" />
    </template>
  </Header>
  <div class="content">
    <div class="chartType">
      <el-segmented
        v-model="viewType"
        :options="[
          { label: t('LC_BAR_CHART'), value: 'bar' },
          { label: t('LC_DONUT_CHART'), value: 'donut' }
        ]"
      />
      <div class="switchBar">
        <el-switch
          v-model="chartType as string"
          :active-text="t('LC_YEAR_REPORT')"
          :inactive-text="t('LC_MONTH_REPORT')"
          active-value="year"
          inactive-value="month"
        />
        <el-switch
          v-if="viewType === 'bar' && chartRange && chartType === 'month'"
          v-model="chartRange as string"
          :active-text="t('LC_SECOND_HALF')"
          :inactive-text="t('LC_FIRST_HALF')"
          active-value="secondHalf"
          inactive-value="firstHalf"
        />
      </div>
    </div>
    <div v-if="chartData?.topExpense.length !== 0">
      <BarView v-if="viewType === 'bar'" />
      <DonutView v-else />
    </div>
    <el-empty
      v-else
      :style="{ height: 'calc(100dvh - 270px)' }"
      :image="house"
      :image-size="200"
      :description="t('LC_CHART_EMPTY')"
    />
  </div>
</template>

<style lang="scss" scoped>
.chartType {
  .switchBar {
    display: flex;
    justify-content: space-between;
  }
  :deep(.el-segmented) {
    width: 100%;
    padding: 4px;
    margin-bottom: 10px;
    --el-segmented-bg-color: #e6e8ed;
    --el-segmented-item-selected-color: var(--title-color);
    --el-segmented-item-selected-bg-color: white;
    --el-border-radius-base: 18px;
    .el-segmented__item.is-selected {
      box-shadow: 5px 6px 20px #2c4f730a;
    }
    .el-segmented__item {
      padding: 8px;
    }
  }
}
</style>
