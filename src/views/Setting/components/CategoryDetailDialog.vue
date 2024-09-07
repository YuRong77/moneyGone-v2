<script setup lang="ts">
import { categoryAPI, imageAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import type { Category, Image } from '@/types'
import type { PropType } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { cloneDeep } from 'lodash'

const props = defineProps({
  isVisible: Boolean,
  category: {
    type: Object as PropType<Category>,
    required: true
  }
})
const emit = defineEmits(['update:isVisible', 'getImages'])

const categoriesStore = useCategoriesStore()

const images = inject('images') as Image[]
const categoryData = ref(cloneDeep(props.category))
const imageUploadAPI = `${import.meta.env.VITE_APP_API_ENDPOINT}/image/upload`
const Authorization = `Bearer ${localStorage.getItem('token')}`
let isImagesDelMode = ref(false)
const predefineColors = ['#ff4500', '#ff8c00', '#ffd700']

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  emit('getImages')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function checkDelImage(image: Image) {
  ElMessageBox.confirm('', '注意', {
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    type: 'warning',
    message: h('p', null, [
      h('span', null, '確認要刪除圖片? '),
      h('img', {
        src: image.url,
        alt: '要刪除的圖片',
        style: 'width: 40px; height: 40px;'
      })
    ])
  })
    .then(() => {
      deleteImage(image.id)
    })
    .catch(() => {})
}

function deleteImage(id: number) {
  imageAPI
    .imageDelete(id)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '成功刪除'
      })
      emit('getImages')
    })
    .catch((err) => {})
    .finally(() => {
      isImagesDelMode.value = false
    })
}

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
        >
          <el-button v-if="isImagesDelMode" @click="checkDelImage(image)" icon>-</el-button>
        </div>
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="imageUploadAPI"
          :headers="{ Authorization }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div>+</div>
        </el-upload>
        <el-button @click="isImagesDelMode = true" type="danger">del</el-button>
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
