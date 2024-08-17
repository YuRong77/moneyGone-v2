<script setup lang="ts">
import { chartAPI } from '@/apis';
import type { Chart } from '@/types'
import { emitter } from '@/utils/emitter'

let chartType = ref('year')
let chartRange = ref<string | null>(null)
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

function getChart() {
  const data = {
    type: chartType.value,
    year: 2024,
    month: 8
  }
  chartAPI.getChart(data).then(res => {
    chartData.value = res
  })
}

function toggleType() {
  if (chartType.value === 'year') return chartType.value = 'month'
  chartType.value = 'year'
}

onMounted(() => {
  getChart()
  emitter.on('refresh', getChart)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>

<template>
  <Header title="Chart" />
  <div class="content">
    <div>
      <BarChart :data="chartData" :setting="setting" />
    </div>
    <el-button @click="toggleType()">toggle type</el-button>
    <div>{{ chartType }}</div>
    <el-button @click="chartRange = 'firstHalf'">range 1</el-button>
    <el-button @click="chartRange = 'secondHalf'">range 2</el-button>
    <br>
    <div class="donutArea">
      <DonutChart :data="chartData" :setting="setting" />
      <div class="topExpense">
        <div v-for="item in chartData?.topExpense" :key="item.id">
          {{ item.categoryName }}
          {{ item.amount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.donutArea {
  display: flex;
}
</style>