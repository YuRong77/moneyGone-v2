<script setup lang="ts">
import { categoryAPI, imageAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import type { Category, Shortcut, Image } from '@/types'
import type { PropType } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { cloneDeep } from 'lodash'
import remove from '@/assets/images/svg/delete.svg'
import sort from '@/assets/images/svg/sort.svg'
import noData from '@/assets/images/svg/noData.svg'

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

function checkDeleteShortcut(item: Shortcut) {
  ElMessageBox.confirm(`確認要刪除快捷 ${item.name} ?`, '注意', {
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteShortcut(item.id!)
    })
    .catch(() => {})
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
      <div class="label">名稱</div>
      <el-input class="popupInput mb-3" v-model="categoryData.name"></el-input>
      <div class="label">顏色</div>
      <el-color-picker
        class="mb-3"
        v-model="categoryData.color"
        show-alpha
        :predefine="predefineColors"
      />
      <div class="label">選擇圖示</div>
      <div class="imageList">
        <div
          v-for="image in images"
          class="imageBox"
          :class="{ active: image.id === categoryData.imageId }"
          :key="image.id"
          :style="{ backgroundImage: `url(${image.url})` }"
          @click="categoryData.imageId = image.id"
        >
          <div
            class="imageDel"
            v-if="isImagesDelMode && !image.isDefault"
            @click="checkDelImage(image)"
          >
            <div>×</div>
          </div>
        </div>
      </div>
      <div class="imageActions">
        <el-upload
          class="upload"
          name="image"
          :action="imageUploadAPI"
          :headers="{ Authorization }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div>上傳圖片</div>
        </el-upload>
        <span>|</span>
        <el-button link v-if="isImagesDelMode" @click="isImagesDelMode = false" type="danger"
          >取消</el-button
        >
        <el-button link v-else @click="isImagesDelMode = true" type="danger">刪除圖片</el-button>
      </div>

      <div class="label">編輯子項目</div>
      <div class="shortcutList">
        <div
          class="shortcutItem"
          v-for="(shortcut, index) in categoryData.shortcuts"
          :key="shortcut.id"
        >
          <div><el-input class="shortcutInput" v-model="shortcut.name"></el-input></div>
          <div class="shortcutActions">
            <div class="mr-2">
              <el-button
                v-if="shortcut.id"
                link
                type="danger"
                @click="checkDeleteShortcut(shortcut)"
              >
                <inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg
              ></el-button>
              <el-button v-else link @click="categoryData.shortcuts?.splice(index, 1)"
                ><inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg
              ></el-button>
            </div>
            <el-button link>
              <inline-svg :src="sort" height="20" width="20"></inline-svg>
            </el-button>
          </div>
        </div>
        <el-empty
          v-if="categoryData.shortcuts?.length === 0"
          :image="noData"
          :image-size="100"
          description="目前沒有任何子項目"
        />
        <el-button link type="primary" @click="categoryData.shortcuts!.push({ name: '' })"
          >新增子項目</el-button
        >
      </div>
    </div>
    <template #footer>
      <div>
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
        <el-button color="#208eef" class="mainBtn" @click="updateData()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.label {
  margin-bottom: 4px;
}
.imageList {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.imageActions {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
  span {
    margin: 0 8px 2px;
  }
  .upload {
    color: #208eef;
  }
  .el-button {
    font-size: 12px;
    padding: 0;
  }
}
.imageBox {
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  margin-right: 8px;
  border-radius: 8px;
  border: 2px solid rgb(255, 255, 255);
  position: relative;
  &.active {
    border: 2px solid #208eef;
  }
  .imageDel {
    width: 100%;
    height: 100%;
    background: #0003;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: white;
      font-weight: 600;
    }
  }
}
.shortcutList {
  margin-top: 12px;
  .shortcutItem {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    div:first-child {
      flex: 1;
    }
  }
  .shortcutActions {
    display: flex;
    align-items: center;
    background: #fbfbfb;
    box-shadow: 0px 0px 3px rgb(26 45 65 / 28%) !important;
    height: 42px;
    padding: 0 12px;
  }
}
</style>
