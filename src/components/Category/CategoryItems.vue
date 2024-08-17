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
    <div class="categoryItem" v-for="category in categories" :key="category.id" @click="selectedCategory(category.id)">
      {{ category.name }}
    </div>
  </div>
</template>

<style scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.categoryItem {
  width: 40%;
  padding: 10px;
  border-radius: 12px;
  background: var(--card-color);
  flex: 1 1 calc(50% - 10px);
}
</style>