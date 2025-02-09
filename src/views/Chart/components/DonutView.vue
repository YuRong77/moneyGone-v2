<script setup lang="ts">
import type { Chart } from '@/types'
import { priceFormat } from '@/utils/priceFormat'
import searchSvg from '@/assets/images/svg/search.svg'

const { t } = useI18n()

const chartData = inject('chartData') as Ref<Chart>
const setting = inject('setting') as Ref<{ type: string; range: string | null }>

let isShowCategoryDrawer = ref(false)
let selectedCategory = ref<number | null>(null)

function showCategoryDetails(id: number) {
  selectedCategory.value = id
  isShowCategoryDrawer.value = true
}
</script>

<template>
  <div class="donutView">
    <DonutChart :data="chartData" :setting="setting" height="280px" />
    <div class="categories">
      <div class="subTitle">{{ t('LC_CATEGORY_DETAILS') }}</div>
      <div class="cardList">
        <div class="card cardShadow" v-for="item in chartData.categoriesTotal">
          <div class="info">
            <CategoryIcon
              class="mr-2"
              :color="item.color"
              :url="item.imageUrl"
              :categoryName="item.name"
              :size="36"
            />
            <div>
              <div class="name">{{ item.name }}</div>
              <div class="amount">$ {{ priceFormat(item.totalAmount) }}</div>
            </div>
          </div>
          <el-button link type="primary" @click="showCategoryDetails(item.id)">
            <inline-svg :src="searchSvg" height="18" width="18"></inline-svg>
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <CategoryItemsDrawer
    v-if="selectedCategory && isShowCategoryDrawer"
    v-model:isVisible="isShowCategoryDrawer"
    :categoryId="selectedCategory"
  />
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
    width: calc(50% - 5px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      display: flex;
      align-items: center;

      .name {
        font-size: 14px;
        color: #8d8d8d;
      }
      .amount {
        font-weight: 500;
      }
    }
  }
}
</style>
