<script setup lang="ts">
import type { Overview } from '@/types'
import { priceFormat } from '@/utils/priceFormat'

const props = defineProps<{ data: Overview | undefined }>()

const colors = [
  { color: '#1989fa', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#f56c6c', percentage: 100 }
]

//TODO: 負數 預設10000
const displayInfo = computed(() => {
  if (!props.data) return {}
  const { monthlyTotal, monthlyBudget } = props.data
  const remainingBudget = monthlyBudget - monthlyTotal
  const percent = (monthlyTotal / monthlyBudget) * 100
  return {
    remainingBudget,
    percent: percent >= 100 ? 100 : percent,
    percentStr: `${percent.toFixed()}%`
  }
})
</script>

<template>
  <div class="overview cardShadow">
    <div>
      <div class="mb-3">
        <div class="label">今日花費</div>
        <div class="amount">$ {{ priceFormat(props.data?.dailyTotal) }}</div>
      </div>
      <div>
        <div class="label">本月花費</div>
        <div class="amount">$ {{ priceFormat(props.data?.monthlyTotal) }}</div>
      </div>
    </div>
    <el-progress
      type="dashboard"
      :percentage="displayInfo.percent"
      :color="colors"
      :stroke-width="10"
    >
      <template #default="{ percentage }">
        <div class="percent">{{ displayInfo.percentStr }}</div>
        <div class="over">剩餘 ${{ priceFormat(displayInfo.remainingBudget!) }}</div>
      </template>
    </el-progress>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  background: var(--card-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px 15px 15px;
  border-radius: 12px 80px 12px 12px;
  .label {
    font-size: 14px;
    color: #8d8d8d;
    margin-bottom: 4px;
  }
  .amount {
    font-size: 18px;
    font-weight: 500;
  }
}
.el-progress {
  padding-top: 10px;
  .percent {
    margin-bottom: 8px;
  }
  .over {
    font-size: 14px;
  }
}
</style>
