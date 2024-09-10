<script setup lang="ts">
import type { Chart } from '@/types'

const chartData = inject('chartData') as Chart
const setting = inject('setting') as { type: string; range: string | null }
const chartType = inject('chartType')
</script>

<template>
  <div class="donutView">
    <DonutChart :data="chartData" :setting="setting" height="280px" />
    <div class="categories">
      <div class="subTitle">類別明細</div>
      <div class="cardList">
        <div class="card" v-for="item in chartData.categoriesTotal">
          {{ item.name }}
          {{ item.totalAmount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.donutChart {
  margin-bottom: 15px;
}
.subTitle {
  margin-bottom: 10px;
}
.cardList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .card {
    background: var(--card-color);
    border-radius: 12px;
    padding: 10px;
    flex: 1 1 calc(50% - 10px);
  }
}
</style>
