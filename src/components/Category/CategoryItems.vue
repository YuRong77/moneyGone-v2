<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { emitter } from '@/utils/emitter'
import noData from '@/assets/images/svg/noData.svg'

const router = useRouter()
const emit = defineEmits(['isSelected'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

function selectedCategory(categoryId: number) {
  emitter.emit('newTransaction', categoryId)
  emit('isSelected')
}

function toSetting() {
  router.push({ name: 'Setting' })
  emitter.emit('closeDialog')
}
</script>

<template>
  <div>
    <div class="categories">
      <div
        class="categoryItem cardShadow"
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory(category.id)"
      >
        <CategoryIcon
          class="mr-2"
          :color="category.color"
          :url="category.imageUrl"
          :categoryName="category.name"
          :size="30"
        />
        <div class="name">{{ category.name }}</div>
      </div>
    </div>
    <el-empty
      v-if="categories.length === 0"
      :image="noData"
      :image-size="100"
      description="目前沒有任何分類"
    >
      <el-button type="primary" @click="toSetting()">前往新增</el-button>
    </el-empty>
  </div>
</template>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.categoryItem {
  padding: 8px;
  border-radius: 12px;
  background: var(--card-color);
  width: calc(50% - 10px);
  display: flex;
  align-items: center;
  cursor: pointer;
  .name {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
