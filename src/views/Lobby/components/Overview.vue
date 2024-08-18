<script setup lang="ts">
import type { Overview } from '@/types'

const props = defineProps<{ data: Overview | undefined }>()

let percentage = ref(10)

</script>

<template>
  <div class="overview">
    <div>
      <div>{{ props.data?.todayTotal }}</div>
      <div>{{ props.data?.monthTotal }}</div>
    </div>
    <div>
      <el-progress type="dashboard" :percentage="percentage" />
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
