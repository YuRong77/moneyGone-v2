<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { Chart } from '@/types'

const props = defineProps<{
  data: Chart | null
  setting: { type: string; range: string | null }
  height?: string
}>()

const series = computed(() => {
  if (!props.data) return []
  return props.data.categoriesTotal.map((item) => item.totalAmount)
})

const options = computed(() => {
  return {
    chart: {
      type: 'donut'
    },
    dataLabels: {
      enabled: false
    },
    labels: props.data?.categoriesTotal.map((item) => item.name) || [],
    // colors: props.data?.categoriesTotal.map(item => item.color) || [],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '80%',
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '16px',
              formatter: (val: number) => val
            },
            total: {
              show: true,
              label: props.setting.type === 'month' ? '本月總和' : '年度總和',
              fontSize: '12px',
              fontFamily: 'Noto Sans TC, sans-serif',
              formatter: (opts: any) =>
                opts.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0)
            }
          }
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none' // 禁用點擊後的顏色變化
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    theme: {
      mode: 'light'
    }
  }
})
</script>

<template>
  <div class="donutChart">
    <VueApexCharts
      :height="props.height || '100%'"
      width="100%"
      :options="options"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<style lang="scss" scoped>
.donutChart .vue-apexcharts {
  overflow: hidden;
  border-radius: 12px;

  :deep(.apexcharts-canvas) {
    background: var(--card-color);
  }
}
</style>
