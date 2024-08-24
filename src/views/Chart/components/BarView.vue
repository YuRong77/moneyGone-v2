<script setup lang="ts">
import type { Chart } from '@/types'
import { format } from 'date-fns'
import svg1st from '@/assets/images/svg/1st.svg'
import svg2st from '@/assets/images/svg/2st.svg'
import svg3st from '@/assets/images/svg/3st.svg'

const chartData = inject('chartData') as Chart
const setting = inject('setting')
const chartType = inject('chartType')

function getIcon(idx: number) {
  if (idx === 0) return svg1st
  if (idx === 1) return svg2st
  if (idx === 2) return svg3st
  return ''
}
</script>

<template>
  <div class="barView">
    <BarChart :data="chartData" :setting="setting" height="250px" />
    <div class="topExpense">
      <div class="title">本月 Top 5 花費</div>
      <div class="itemList">
        <div class="item" v-for="(item, index) in chartData?.topExpense" :key="item.id">
          <div class="flexBox">
            <div class="iconBox">
              <inline-svg
                v-if="index < 3"
                :src="getIcon(index)"
                height="28"
                width="28"
              ></inline-svg>
              <div v-else>{{ index + 1 }}</div>
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
</template>

<style lang="scss" scoped>
.topExpense {
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .itemList {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 8px 10px 8px 0;
      background: var(--card-color);
      border-radius: 12px;
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
</style>
