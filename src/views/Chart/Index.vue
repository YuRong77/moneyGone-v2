<script setup lang="ts">
import { chartAPI } from '@/apis'
import type { Chart } from '@/types'
import { emitter } from '@/utils/emitter'
import { format, getYear, getMonth } from 'date-fns'
import svg1st from '@/assets/images/svg/1st.svg'
import svg2st from '@/assets/images/svg/2st.svg'
import svg3st from '@/assets/images/svg/3st.svg'

let date = ref<Date>(new Date())
let chartType = ref<'year' | 'month'>('year')
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

function getIcon(idx: number) {
  if (idx === 0) return svg1st
  if (idx === 1) return svg2st
  if (idx === 2) return svg3st
  return ''
}

onMounted(() => {
  emitter.on('refresh', getChart)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>

<template>
  <Header title="Chart">
    <template #right>
      <DatePicker v-model:date="date" :type="chartType" />
    </template>
  </Header>
  <div class="content">
    <div class="chartType">
      <el-segmented v-model="chartType" :options="['year', 'month']" />
    </div>
    <BarChart :data="chartData" :setting="setting" height="200px" />
    <el-segmented
      v-if="chartType === 'month'"
      v-model="chartRange"
      :options="['firstHalf', 'secondHalf']"
    />
    <div class="donutArea">
      <div>
        <DonutChart :data="chartData" :setting="setting" />
        <LineChart :data="chartData" :setting="setting" />
      </div>
      <div class="topExpense">
        <div class="title">本月 Top 3 花費</div>
        <div class="itemList">
          <div class="item" v-for="(item, index) in chartData?.topExpense" :key="item.id">
            <div class="flexBox">
              <div class="iconBox">
                <inline-svg :src="getIcon(index)" height="28" width="28"></inline-svg>
              </div>
              <div>
                <div class="name">{{ item.name }}</div>
                <div class="date">{{ format(item.createdAt, 'yyyy-MM-dd') }}</div>
              </div>
            </div>
            <div class="amount">
              {{ item.amount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.barChart {
  margin: 10px 0 20px;
}
.donutChart {
  margin-bottom: 20px;
}
.lineChart {
}
.donutArea {
  display: flex;
  & > div {
    flex: 1;
  }
}
.topExpense {
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .itemList {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 8px;
      .flexBox {
        display: flex;
        align-items: center;
      }
      .iconBox {
        min-width: 50px;
        text-align: center;
      }
      .name {
        font-size: 14px;
      }
      .date {
        font-size: 12px;
      }
      .amount {
        font-size: 14px;
      }
    }
  }
}
.chartType .el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}
</style>
