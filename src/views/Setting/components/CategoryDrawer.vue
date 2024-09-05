<script setup lang="ts">
import { imageAPI, categoryAPI } from '@/apis'
import type { Category } from '@/types'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'

const props = defineProps({
  isVisible: Boolean
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

let isShowDetailDialog = ref(false)
const selectedItem = ref()
const images = ref()
let newCategory = ref('')

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function editDetail(item: Category) {
  isShowDetailDialog.value = true
  selectedItem.value = item
}

function addCategory() {
  categoryAPI.categoryCreate({ name: newCategory.value }).then(() => {
    getCategories()
    newCategory.value = ''
  })
}

function deleteCategory(id: number) {
  categoryAPI.categoryDelete(id).then(() => {
    getCategories()
  })
}

function getCategories() {
  categoryAPI.categoryList().then((res) => {
    categoriesStore.setCategories(res)
  })
}

function getImages() {
  imageAPI
    .getImages()
    .then((res) => {
      images.value = res
    })
    .catch((err) => {})
    .finally(() => {})
}

onMounted(() => {
  getImages()
})

provide('images', images)
</script>

<template>
  <el-drawer v-model="isVisibleModel" title="編輯分類" direction="btt" size="100%">
    <el-input v-model="newCategory"></el-input>
    <el-button @click="addCategory()">add category</el-button>
    <div class="item" v-for="item in categories" :key="item.id" @click="editDetail(item)">
      <div>
        {{ item.name }}
        <span>{{ item.shortcuts?.length }} 個子項目</span>
      </div>
      <div>
        <el-button type="danger" @click.stop="deleteCategory(item.id)">delete</el-button>
      </div>
    </div>
  </el-drawer>
  <CategoryDetailDialog
    v-if="isShowDetailDialog"
    v-model:isVisible="isShowDetailDialog"
    :category="selectedItem"
  />
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 8px;
  background: rgb(255, 235, 197);

  cursor: pointer;
  span {
    color: rgb(129, 129, 129);
    margin-left: 10px;
  }
}
</style>
