<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const seriesPie = ref([44, 55, 41, 67, 22])

const optionsPie = ref({
  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: true
  },
  fill: {
    type: 'gradient',
  },
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon', 'banana'],
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: '70%',
        labels: {
          show: true,
          value: {
            show: true,
            fontSize: '30px',
            formatter: (val: number) => val
          },
          total: {
            show: true,
            label: '本月總和',
            formatter: (opts: any) => (opts.globals.seriesTotals.reduce((a: number, b: number) => {
              return a + b
            }, 0))
          }
        }
      },
    }
  },
  legend: {
    show: false
  },
  theme: {
    mode: 'light',
  }
})
</script>

<template>
  <VueApexCharts height="300" :options="optionsPie" :series="seriesPie"></VueApexCharts>
</template>

<style scoped></style>