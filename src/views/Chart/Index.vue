<script setup lang="ts">
import { chartAPI } from '@/apis'
import type { Chart } from '@/types'
import { emitter } from '@/utils/emitter'
import { getYear, getMonth, getDate } from 'date-fns'

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
  const data = {
    type: chartType.value,
    year: getYear(date.value),
    month: getMonth(date.value) + 1
  }
  chartAPI.getChart(data).then((res) => {
    chartData.value = res
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
  <Header title="Chart">
    <template #right>
      <DatePicker v-model:date="date" :type="chartType" />
    </template>
  </Header>
  <div class="content">
    <div class="chartType">
      <el-segmented v-model="viewType" :options="['bar', 'donut']" />
      <div class="switchBar">
        <el-switch
          v-model="chartType"
          active-text="年報表"
          inactive-text="月報表"
          active-value="year"
          inactive-value="month"
        />
        <el-switch
          v-if="viewType === 'bar' && chartRange && chartType === 'month'"
          v-model="chartRange"
          active-text="下半月"
          inactive-text="上半月"
          active-value="secondHalf"
          inactive-value="firstHalf"
        />
      </div>
    </div>
    <BarView v-if="viewType === 'bar'" />
    <DonutView v-else />
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
