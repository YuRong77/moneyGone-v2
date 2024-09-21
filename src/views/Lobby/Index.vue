<script setup lang="ts">
import type { Overview } from '@/types'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'
import cashRain from '@/assets/images/svg/cashRain.svg'
import right from '@/assets/images/svg/right.svg'

const router = useRouter()

const overview = ref<Overview>()

function getOverview() {
  transactionAPI.transactionOverview().then((res) => {
    overview.value = res
  })
}

onMounted(() => {
  getOverview()
  emitter.on('refresh', getOverview)
})
onBeforeUnmount(() => {
  emitter.off('refresh')
})
</script>

<template>
  <Header title="Lobby" />
  <div class="content">
    <div class="titleBar">
      <h4 class="title">概要</h4>
      <div class="link" @click="router.push({ name: 'Chart' })">
        <span>查看圖表</span>
        <inline-svg :src="right" color="#8d8d8d" height="20" width="24"></inline-svg>
      </div>
    </div>
    <Overview class="mb-10" :data="overview" />
    <div class="titleBar">
      <h4 class="title">分類</h4>
      <div class="link" @click="router.push({ name: 'Setting' })">
        <span>編輯分類</span>
        <inline-svg :src="right" color="#8d8d8d" height="20" width="20"></inline-svg>
      </div>
    </div>
    <CategoryItems class="mb-10" />
    <div class="titleBar">
      <h4 class="title">本日花費</h4>
      <div class="link" @click="router.push({ name: 'Record' })">
        <span>查看紀錄</span>
        <inline-svg :src="right" color="#8d8d8d" height="20" width="24"></inline-svg>
      </div>
    </div>
    <div class="record">
      <RecordItem v-for="item in overview?.todayRecords" :key="item.id" :item="item" />
      <el-empty
        v-if="overview?.todayRecords.length === 0"
        class="cardShadow"
        :image="cashRain"
        :image-size="250"
        description="今天還沒有錢錢犧牲"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.titleBar {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .link {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #8d8d8d;
      // color: #208eef;
    }
  }
}

.record {
  .recordItem:not(:last-child) {
    margin-bottom: 15px;
  }
}
.el-empty {
  border-radius: 12px;
  background: var(--card-color);
}
</style>
