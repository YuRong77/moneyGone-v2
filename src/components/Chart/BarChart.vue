<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const series = ref([{
  name: 'PRODUCT A',
  data: [44, 55, 41, 67, 22, 43],
  color: '#546E7A'
}, {
  name: 'PRODUCT B',
  data: [13, 23, 20, 8, 13, 27],
  color: '#3dadd8'
}, {
  name: 'PRODUCT C',
  data: [11, 17, 15, 15, 21, 14],
  color: '#9cb6c0'
}, {
  name: 'PRODUCT D',
  data: [21, 7, 25, 13, 22, 8],
  color: '#d488d2'
}, {
  name: 'PRODUCT E',
  data: [21, 25, 22, 12, 29, null],
  color: '#ff5818'
}])

const options = ref({
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: false
    },
  },
  theme: {
    mode: 'light'
  },
  dataLabels: {
    style: {
      fontSize: '9px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: ['white']
    },
    formatter: function (val: number, opts: any) {
      const total = opts.globals.stackedSeriesTotals[opts.dataPointIndex];
      const percentage = (val / total * 100).toFixed(0);
      return `${percentage}%`;
    },
  },
  tooltip: {
    enabled: false,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      dataLabels: {
        enabled: false,
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
  }],
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        total: {
          enabled: true,
          formatter: (val: number, opts: any) => val,
          style: {
            fontSize: '12px',
            fontWeight: 900
          }
        }
      }
    },
  },
  xaxis: {
    type: 'category',
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'left',
    offsetY: 0
  }
},
)
</script>

<template>
  <div class="barChart">
    <VueApexCharts height="300" width="200%" :options="options" :series="series"></VueApexCharts>
  </div>
</template>

<style scoped>
.barChart {
  overflow: scroll;
}
</style>