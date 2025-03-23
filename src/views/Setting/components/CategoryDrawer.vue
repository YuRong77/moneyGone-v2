<script setup lang="ts">
import { imageAPI, categoryAPI } from '@/apis'
import type { Category, NewCategory } from '@/types'
import { ElMessageBox } from 'element-plus'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { showMessage } from '@/utils/message'
import edit from '@/assets/images/svg/edit.svg'
import remove from '@/assets/images/svg/delete.svg'
import sort from '@/assets/images/svg/sort.svg'
import noData from '@/assets/images/svg/noData.svg'

const { t } = useI18n()
const props = defineProps({
  isVisible: Boolean
})
const emit = defineEmits(['update:isVisible', 'getCategories'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

let isShowDetailDialog = ref(false)
const selectedItem = ref()
const images = ref()

let isDeleteLoading = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function editDetail(item: Category | NewCategory) {
  isShowDetailDialog.value = true
  selectedItem.value = item
}

function addCategory() {
  const newCategory = {
    name: '',
    color: '#208eef',
    imageId: null,
    shortcuts: []
  }
  editDetail(newCategory)
}

function checkDelete(item: Category) {
  ElMessageBox.confirm(`${t('LC_CATEGORY_DELETE', { name: item.name })}`, t('LC_WARN'), {
    confirmButtonText: t('LC_DELETE'),
    cancelButtonText: t('LC_CANCEL'),
    type: 'warning'
  })
    .then(() => {
      deleteCategory(item.id)
    })
    .catch(() => {})
}

function deleteCategory(id: number) {
  isDeleteLoading.value = true
  categoryAPI
    .categoryDelete(id)
    .then(() => {
      showMessage(t('LC_DELETE_SUCCESS'))
      emit('getCategories')
    })
    .catch((err) => {})
    .finally(() => {
      isDeleteLoading.value = false
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
  <el-drawer v-model="isVisibleModel" :title="t('LC_EDIT_CATEGORY')" direction="btt" size="90%">
    <div class="text-right mb-4">
      <el-button
        data-test="category_add_btn"
        color="#208eef"
        class="mainBtn"
        :disabled="categories.length >= 12"
        @click="addCategory()"
        >{{ t('LC_ADD_CATEGORY') }}</el-button
      >
    </div>
    <div class="item cardShadow" v-for="item in categories" :key="item.id">
      <div class="name">
        <div>{{ item.name }}</div>
        <span> {{ t('LC_ITEMS', { num: item.shortcuts?.length }) }}</span>
      </div>
      <div>
        <el-button link data-test="category_edit_icon" @click.stop="editDetail(item)">
          <inline-svg :src="edit" height="20" width="20" color="#208eef"></inline-svg>
        </el-button>
        <el-button
          link
          data-test="category_delete_icon"
          :disabled="isDeleteLoading"
          @click.stop="checkDelete(item)"
        >
          <inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg>
        </el-button>
        <!-- <el-button link>
          <inline-svg :src="sort" height="20" width="20"></inline-svg>
        </el-button> -->
      </div>
    </div>
    <el-empty
      v-if="categories.length === 0"
      :image="noData"
      :image-size="100"
      :description="t('LC_CATEGORY_EMPTY')"
    />
    <template #footer>
      <div class="footer">
        <el-button
          data-test="category_close_btn"
          plain
          class="mainBtn"
          @click="emit('update:isVisible', false)"
          >{{ t('LC_CANCEL') }}</el-button
        >
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
    max-width: 75%;
    flex: 1;
    div {
      max-width: 72%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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
