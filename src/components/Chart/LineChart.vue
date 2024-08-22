<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { Chart } from '@/types'

const props = defineProps<{ data: Chart | null; setting: { type: string; range: string | null } }>()

const series = computed(() => {
  if (!props.data) return []
  return props.data.categoriesDetails.map((item) => {
    return {
      name: item.name,
      data: item.data
    }
  })
})

const options = computed(() => {
  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      width: 2
    },
    labels: [''],
    theme: {
      mode: 'light'
    },
    tooltip: {
      enabled: false
    },
    legend: {
      show: false
    }
  }
})
</script>

<template>
  <div class="lineChart">
    <VueApexCharts height="100%" width="100%" :options="options" :series="series"></VueApexCharts>
  </div>
</template>

<style lang="scss" scoped>
.lineChart {
  background: var(--card-color);
  border-radius: 12px;
}
</style>
