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
  const { range } = props.setting
  return props.data.categoriesDetails.map((item) => {
    let totalList = item.data
    if (range === 'firstHalf') totalList = item.data.slice(0, 15)
    if (range === 'secondHalf') totalList = item.data.slice(15)
    return { data: range ? totalList : item.data, name: item.name }
  })
})

const options = computed(() => {
  const totalList: number[] = props.data?.timePeriodTotal.map((_, index) => index + 1) || []
  const { range } = props.setting
  const viewList = !range
    ? totalList
    : range === 'firstHalf'
      ? totalList.slice(0, 15)
      : totalList.slice(15)
  return {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        speed: 200
      }
    },
    theme: {
      mode: 'light'
    },
    dataLabels: {
      //柱體中的值
      style: {
        fontSize: '9px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['white']
      },
      formatter: function (val: number, opts: any) {
        const total = opts.globals.stackedSeriesTotals[opts.dataPointIndex]
        const percentage = ((val / total) * 100).toFixed(0)
        return `${percentage}%`
      }
    },
    tooltip: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              dataLabels: {
                total: {
                  enabled: false
                }
              }
            }
          },
          legend: {
            position: 'bottom',
            offsetX: 0,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false, //垂直 or 水平
        borderRadius: 6,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
        dataLabels: {
          // 柱體上方值
          total: {
            enabled: true,
            formatter: (val: number, opts: any) => (val ? val : ''),
            style: {
              fontSize: '12px',
              fontWeight: 900
            }
          }
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: viewList
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      offsetY: 0
    }
  }
})
</script>

<template>
  <div class="barChart">
    <VueApexCharts
      :height="props.height || '100%'"
      width="100%"
      :options="options"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<style lang="scss" scoped>
.barChart {
  overflow: hidden;
  :deep(.apexcharts-canvas) {
    background: var(--card-color);
    border-radius: 12px;
    .apexcharts-svg {
      border-radius: 12px;
    }
  }
}
</style>
