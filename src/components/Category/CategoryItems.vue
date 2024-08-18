<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { emitter } from '@/utils/emitter'
import cat from '@/assets/images/png/cat.png'

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
    <div class="categoryItem" v-for="category in categories" :key="category.id" @click="selectedCategory(category.id)">
      <div class="iconBox">
        <div class="icon" :style="{ backgroundImage: `url(${cat})` }"></div>
      </div>
      <div>{{ category.name }}</div>
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
  width: 40%;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--card-color);
  flex: 1 1 calc(50% - 10px);
  display: flex;
  align-items: center;

  .iconBox {
    margin-right: 10px;
    padding: 4px;
    border-radius: 8px;
    background: wheat;

    .icon {
      width: 24px;
      height: 24px;
      background-position: center;
      background-size: cover;

    }
  }
}
</style>