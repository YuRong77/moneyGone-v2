<script setup lang="ts">
import type { Overview } from '@/types'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'
import { loading } from '@/utils/loading'
import cashRain from '@/assets/images/svg/cashRain.svg'
import right from '@/assets/images/svg/right.svg'

const { t } = useI18n()
const router = useRouter()

const overview = ref<Overview>()

function getOverview() {
  loading.open()
  transactionAPI
    .transactionOverview()
    .then((res) => {
      overview.value = res
    })
    .catch(() => {})
    .finally(() => {
      loading.close()
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
  <Header :title="t('LC_LOBBY')" />
  <div class="content">
    <div class="titleBar">
      <h4 class="title">{{ t('LC_OVERVIEW') }}</h4>
      <div class="link" data-test="toChart" @click="router.push({ name: 'Chart' })">
        <span>{{ t('LC_VIEW_CHART') }}</span>
        <inline-svg :src="right" color="#8d8d8d" height="20" width="24"></inline-svg>
      </div>
    </div>
    <Overview class="mb-10" :data="overview" />
    <div class="titleBar">
      <h4 class="title">{{ t('LC_CATEGORY') }}</h4>
      <div class="link" data-test="toSetting" @click="router.push({ name: 'Setting' })">
        <span>{{ t('LC_EDIT_CATEGORY') }}</span>
        <inline-svg :src="right" color="#8d8d8d" height="20" width="20"></inline-svg>
      </div>
    </div>
    <CategoryItems class="mb-10" />
    <div class="titleBar">
      <h4 class="title">{{ t('LC_SPEND_TODAY') }}</h4>
      <div class="link" data-test="toRecord" @click="router.push({ name: 'Record' })">
        <span>{{ t('LC_VIEW_RECORD') }}</span>
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
        :description="t('LC_NO_SPEND')"
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
    cursor: pointer;
    span {
      font-size: 14px;
      color: #8d8d8d;
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
