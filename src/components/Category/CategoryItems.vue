<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { emitter } from '@/utils/emitter'

const emit = defineEmits(['isSelected'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

function selectedCategory(categoryId: number) {
  emitter.emit('newTransaction', categoryId)
  emit('isSelected')
}
</script>

<template>
  <div class="categories">
    <div
      class="categoryItem cardShadow"
      v-for="category in categories"
      :key="category.id"
      @click="selectedCategory(category.id)"
    >
      <div class="iconBox" :style="{ background: `${category.color}` }">
        <div class="icon" :style="{ backgroundImage: `url(${category.imageUrl})` }"></div>
      </div>
      <div class="name">{{ category.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.categoryItem {
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--card-color);
  flex: 1 1 calc(50% - 10px);
  display: flex;
  align-items: center;
  cursor: pointer;

  .iconBox {
    margin-right: 10px;
    padding: 4px;
    border-radius: 8px;

    .icon {
      width: 24px;
      height: 24px;
      background-position: center;
      background-size: cover;
    }
  }
  .name {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
