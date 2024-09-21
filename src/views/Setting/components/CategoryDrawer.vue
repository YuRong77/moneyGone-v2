<script setup lang="ts">
import { imageAPI, categoryAPI } from '@/apis'
import type { Category } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import edit from '@/assets/images/svg/edit.svg'
import remove from '@/assets/images/svg/delete.svg'
import sort from '@/assets/images/svg/sort.svg'
import noData from '@/assets/images/svg/noData.svg'

const props = defineProps({
  isVisible: Boolean
})
const emit = defineEmits(['update:isVisible', 'getCategories'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

let isShowDetailDialog = ref(false)
const selectedItem = ref()
const images = ref()
let newCategory = ref('')
let isAddLoading = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function editDetail(item: Category) {
  isShowDetailDialog.value = true
  selectedItem.value = item
}

function addCategory() {
  isAddLoading.value = true
  categoryAPI
    .categoryCreate({ name: newCategory.value })
    .then(() => {
      emit('getCategories')
      newCategory.value = ''
    })
    .catch((err) => {})
    .finally(() => {
      isAddLoading.value = false
    })
}

function checkDelete(item: Category) {
  ElMessageBox.confirm(`確認要刪除分類 ${item.name} ?`, '注意', {
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteCategory(item.id)
    })
    .catch(() => {})
}

function deleteCategory(id: number) {
  categoryAPI.categoryDelete(id).then(() => {
    ElMessage({
      type: 'success',
      message: '成功刪除'
    })
    emit('getCategories')
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
  <el-drawer v-model="isVisibleModel" title="編輯分類" direction="btt" size="90%">
    <div class="flex-c-c mb-4">
      <el-input v-model="newCategory" :disabled="isAddLoading" class="popupInput mr-2"></el-input>
      <el-button color="#208eef" class="mainBtn" @click="addCategory()" :loading="isAddLoading"
        >add</el-button
      >
    </div>
    <div class="item cardShadow" v-for="item in categories" :key="item.id">
      <div class="name">
        <div>{{ item.name }}</div>
        <span>{{ item.shortcuts?.length }} 個子項目</span>
      </div>
      <div>
        <el-button link @click.stop="editDetail(item)">
          <inline-svg :src="edit" height="20" width="20" color="#208eef"></inline-svg>
        </el-button>
        <el-button link @click.stop="checkDelete(item)">
          <inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg>
        </el-button>
        <el-button link>
          <inline-svg :src="sort" height="20" width="20"></inline-svg>
        </el-button>
      </div>
    </div>
    <el-empty
      v-if="categories.length === 0"
      :image="noData"
      :image-size="100"
      description="目前沒有任何分類"
    />
    <template #footer>
      <div class="footer">
        <el-button plain class="mainBtn" @click="emit('update:isVisible', false)">cancel</el-button>
      </div>
    </template>
  </el-drawer>
  <CategoryDetailDialog
    v-if="isShowDetailDialog"
    v-model:isVisible="isShowDetailDialog"
    :category="selectedItem"
    @getImages="getImages"
    @getCategories="emit('getCategories')"
  />
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--card-color);
  cursor: pointer;
  .name {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: rgb(129, 129, 129);
      margin-left: 10px;
    }
  }
}
.footer .mainBtn {
  width: 100%;
}
</style>
