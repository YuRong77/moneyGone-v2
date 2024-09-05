<script setup lang="ts">
import { categoryAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import type { Category, Image } from '@/types'
import type { PropType } from 'vue'
import { cloneDeep } from 'lodash'

const props = defineProps({
  isVisible: Boolean,
  category: {
    type: Object as PropType<Category>,
    required: true
  }
})
const emit = defineEmits(['update:isVisible'])

const categoriesStore = useCategoriesStore()

const images = inject('images') as Image[]
const categoryData = ref(cloneDeep(props.category))

const predefineColors = ['#ff4500', '#ff8c00', '#ffd700']

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function deleteShortcut(id: number) {
  categoryAPI.shortcutDelete({ categoryId: categoryData.value.id, shortcutId: id }).then(() => {
    getCategories()
    const { shortcuts } = categoryData.value
    if (shortcuts) {
      const shortcutIdx = shortcuts.findIndex((item) => item.id === id)
      if (shortcutIdx !== -1) shortcuts.splice(shortcutIdx, 1)
    }
  })
}

async function updateData() {
  const { id, name, color, imageId } = categoryData.value

  try {
    await Promise.all([
      categoryAPI.categoryUpdate(id, { name, color, imageId }),
      categoryAPI.shortcutUpdate(id, categoryData.value.shortcuts!)
    ])
  } catch (err) {
    console.log(err, 'err')
  } finally {
    getCategories()
    emit('update:isVisible', false)
  }
}

function getCategories() {
  categoryAPI.categoryList().then((res) => {
    categoriesStore.setCategories(res)
  })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" title="編輯分類" fullscreen>
    <div>
      <el-input v-model="categoryData.name"></el-input>
      <el-color-picker v-model="categoryData.color" show-alpha :predefine="predefineColors" />
      <div class="imageList">
        <div
          v-for="image in images"
          class="imageBox"
          :class="{ active: image.id === categoryData.imageId }"
          :key="image.id"
          :style="{ backgroundImage: `url(${image.url})` }"
          @click="categoryData.imageId = image.id"
        ></div>
      </div>
      <div class="shortcutList">
        <div
          class="shortcutItem"
          v-for="(shortcut, index) in categoryData.shortcuts"
          :key="shortcut.id"
        >
          <el-input v-model="shortcut.name"></el-input>
          <el-button type="danger" v-if="shortcut.id" @click="deleteShortcut(shortcut.id)"
            >delete</el-button
          >
          <el-button v-else @click="categoryData.shortcuts?.splice(index, 1)">delete</el-button>
        </div>
        <el-button @click="categoryData.shortcuts!.push({ name: '' })">add</el-button>
      </div>
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
        <el-button @click="updateData()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.imageList {
  display: flex;
  align-items: center;
}
.imageBox {
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  margin-right: 8px;
  // box-sizing: content-box;
  &.active {
    border: 2px solid rgb(43, 170, 255);
  }
}
.shortcutList {
  .shortcutItem {
    display: flex;
  }
}
</style>
