import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Category } from '@/types'

export const useCategoriesStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  function setCategories(val: Category[]) {
    categories.value = val
  }

  return { categories, setCategories }
})
