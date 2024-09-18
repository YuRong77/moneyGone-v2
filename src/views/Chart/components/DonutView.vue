<script setup lang="ts">
import type { Chart } from '@/types'
import { priceFormat } from '@/utils/priceFormat'
import searchSvg from '@/assets/images/svg/search.svg'

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
      <div class="subTitle">類別明細</div>
      <div class="cardList">
        <div class="card cardShadow" v-for="item in chartData.categoriesTotal">
          <div class="info">
            <div class="iconBox" :style="{ background: `${item.color}` }">
              <div class="icon" :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
            </div>
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

      .iconBox {
        margin-right: 10px;
        padding: 4px;
        border-radius: 8px;
        background: wheat;

        .icon {
          width: 28px;
          height: 28px;
          background-position: center;
          background-size: cover;
        }
      }
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
