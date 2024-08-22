<script setup lang="ts">
import type { Overview } from '@/types'

const props = defineProps<{ data: Overview | undefined }>()

const colors = [
  { color: '#1989fa', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#f56c6c', percentage: 100 },
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

function priceFormat(value: number) {
  if (!value) return 0
  return new Intl.NumberFormat("zh-TW", {
    style: "decimal",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

</script>

<template>
  <div class="overview">
    <div>
      <div>{{ props.data?.dailyTotal }}</div>
      <div>{{ props.data?.monthlyTotal }}</div>
    </div>
    <div>
      <el-progress type="dashboard" :percentage="displayInfo.percent" :color="colors" :stroke-width="10">
        <template #default="{ percentage }">
          <div>{{ displayInfo.percentStr }}</div>
          <div>剩餘{{ priceFormat(displayInfo.remainingBudget!) }}</div>
        </template>
      </el-progress>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview {
  background: var(--card-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 12px 65px 12px 12px;
}
</style>
