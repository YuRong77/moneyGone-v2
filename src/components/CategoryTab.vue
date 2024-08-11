<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['isSelected'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

</script>

<template>
  <div class="categories">
    <div v-for="category in categories" :key="category.id">
      {{ category.name }}
    </div>
  </div>
</template>



<style scoped></style>