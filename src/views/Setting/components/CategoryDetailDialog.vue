<script setup lang="ts">
import { categoryAPI, imageAPI } from '@/apis'
import type { Category, NewCategory, Shortcut, Image } from '@/types'
import type { PropType } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { showMessage } from '@/utils/message'
import type { UploadProps } from 'element-plus'
import imageCompression from 'browser-image-compression'
import { cloneDeep } from 'lodash'
import imageNull from '@/assets/images/png/imageNull.png'
import remove from '@/assets/images/svg/delete.svg'
import sort from '@/assets/images/svg/sort.svg'
import noData from '@/assets/images/svg/noData.svg'

const { t } = useI18n()
const props = defineProps({
  isVisible: Boolean,
  category: {
    type: Object as PropType<Category | NewCategory>,
    required: true
  }
})
const emit = defineEmits(['update:isVisible', 'getImages', 'getCategories'])

const images = inject('images') as Ref<{ defaultImages: Image[]; userImages: Image[] }>
const categoryData = ref(cloneDeep(props.category))
let formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
  name: [{ required: true, message: t('LC_TIPS_NAME'), trigger: 'blur' }]
})
let isLoading = ref(false)

const imageUploadAPI = `${import.meta.env.VITE_APP_API_ENDPOINT}/image/upload`
const Authorization = `Bearer ${localStorage.getItem('token')}`
let isImagesDelMode = ref(false)
const defaultColors = [
  '#ff450099',
  '#ff8c0099',
  '#ffd70099',
  '#1e90ff99',
  '#32cd3299',
  '#ff69b499',
  '#8a2be299',
  '#00ced199',
  '#ff634799',
  '#4682b499'
]
const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const isEditMode = computed(() => 'id' in categoryData.value)

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  showMessage(t('LC_ADD_SUCCESS'))
  emit('getImages')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = async (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error(t('LC_IMG_UPLOAD_TIPS'))
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(t('LC_IMG_LIMIT_TIPS'))
    return false
  }

  try {
    const options = {
      maxSizeMB: 1, // 壓縮後的最大體積（MB）
      maxWidthOrHeight: 800, // 圖片的最大寬度或高度
      useWebWorker: true // 啟用 Web Worker，提高效能
    }

    const compressedFile = await imageCompression(rawFile, options)
    // console.log('壓縮前大小:', (rawFile.size / 1024).toFixed(2), 'KB')
    // console.log('壓縮後大小:', (compressedFile.size / 1024).toFixed(2), 'KB')

    const finalFile = new File([compressedFile], rawFile.name, {
      type: rawFile.type,
      lastModified: Date.now()
    })
    return finalFile
  } catch (error) {
    ElMessage.error(t('LC_IMG_UPLOAD_ERROR'))
    return false
  }
}

function getImgUrl() {
  const { imageId } = categoryData.value
  const { defaultImages, userImages } = images.value
  const image = [...defaultImages, ...userImages].find((item) => item.id === imageId)
  return image ? image.url : null
}

function checkDelImage(image: Image) {
  ElMessageBox.confirm('', t('LC_WARN'), {
    confirmButtonText: t('LC_DELETE'),
    cancelButtonText: t('LC_CANCEL'),
    type: 'warning',
    message: h('p', null, [
      h('span', null, t('LC_IMG_DELETE')),
      h('img', {
        src: image.url,
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
      showMessage(t('LC_DELETE_SUCCESS'))
      emit('getImages')
      if (id === categoryData.value.imageId) categoryData.value.imageId = null
    })
    .catch((err) => {})
    .finally(() => {
      isImagesDelMode.value = false
    })
}

function checkDeleteShortcut(item: Shortcut) {
  ElMessageBox.confirm(`${t('LC_SHORTCUT_DELETE', { name: item.name })}`, t('LC_WARN'), {
    confirmButtonText: t('LC_DELETE'),
    cancelButtonText: t('LC_CANCEL'),
    type: 'warning'
  })
    .then(() => {
      deleteShortcut(item.id!)
    })
    .catch(() => {})
}

function deleteShortcut(id: number) {
  const { shortcuts } = categoryData.value
  if (shortcuts) {
    const shortcutIdx = shortcuts.findIndex((item) => item.id === id)
    if (shortcutIdx !== -1) shortcuts.splice(shortcutIdx, 1)
  }
  if (isEditMode.value) {
    categoryAPI
      .shortcutDelete({ categoryId: (categoryData.value as Category).id, shortcutId: id })
      .then(() => {
        emit('getCategories')
      })
  }
}

function updateData() {
  formRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      isLoading.value = true
      categoryData.value.shortcuts = categoryData.value.shortcuts?.filter((item) => item.name)
      isEditMode.value ? await updateCategory() : await addCategory()
    } catch (err) {
      console.log(err, 'err')
    } finally {
      isLoading.value = false
      emit('getCategories')
      emit('update:isVisible', false)
      isEditMode.value ? showMessage(t('LC_EDIT_SUCCESS')) : showMessage(t('LC_ADD_SUCCESS'))
    }
  })
}

async function addCategory() {
  const { name, color, imageId } = categoryData.value as NewCategory
  const category = await categoryAPI.categoryCreate({ name, color, imageId })
  await categoryAPI.shortcutUpdate(category.id, categoryData.value.shortcuts!)
}

async function updateCategory() {
  const { id, name, color, imageId } = categoryData.value as Category
  await Promise.all([
    categoryAPI.categoryUpdate(id, { name, color, imageId }),
    categoryAPI.shortcutUpdate(id, categoryData.value.shortcuts!)
  ])
}
</script>

<template>
  <el-dialog
    v-model="isVisibleModel"
    :title="isEditMode ? t('LC_EDIT_CATEGORY') : t('LC_ADD_CATEGORY')"
    fullscreen
    :modal="false"
  >
    <div>
      <div class="flexBox">
        <el-form ref="formRef" :model="categoryData" :rules="formRules">
          <div class="label">{{ t('LC_NAME') }}</div>
          <el-form-item prop="name">
            <el-input
              class="popupInput"
              v-model.trim="categoryData.name"
              :placeholder="t('LC_TIPS_NAME')"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <div class="label">{{ t('LC_PREVIEW') }}</div>
          <div class="flex-c-c">
            <categoryIcon
              :categoryName="categoryData.name"
              :color="categoryData.color"
              :url="getImgUrl()"
              :size="65"
            />
          </div>
        </div>
      </div>
      <div class="label">{{ t('LC_COLOR') }}</div>
      <div class="colorPickers">
        <el-color-picker v-model="categoryData.color" color-format="hex" show-alpha />
        <div
          class="defaultColor"
          v-for="color in defaultColors"
          :key="color"
          :style="{ background: color }"
          @click="categoryData.color = color"
        ></div>
      </div>
      <div class="label">{{ t('LC_SELECT_IMG') }}</div>
      <div class="imageList">
        <div
          class="imageBox noneImg"
          :class="{ active: categoryData.imageId === null }"
          @click="categoryData.imageId = null"
        >
          <span>None</span>
        </div>
        <div
          v-for="image in images.defaultImages"
          class="imageBox"
          :class="{ active: image.id === categoryData.imageId }"
          :key="image.id"
          @click="categoryData.imageId = image.id"
        >
          <img :src="image.url" @error="(e) => ((e.target as HTMLImageElement).src = imageNull)" />
        </div>
        <el-divider v-if="images.userImages.length > 0" />
        <div
          v-for="image in images.userImages"
          class="imageBox"
          :class="{ active: image.id === categoryData.imageId }"
          :key="image.id"
          @click="categoryData.imageId = image.id"
        >
          <img :src="image.url" @error="(e) => ((e.target as HTMLImageElement).src = imageNull)" />
          <div
            data-test="category_deleteImg_btn"
            class="imageDel"
            v-if="isImagesDelMode && !image.isDefault"
            @click="checkDelImage(image)"
          >
            <span>×</span>
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
          <div>{{ t('LC_IMG_UPLOAD') }}</div>
        </el-upload>
        <el-divider direction="vertical" />
        <el-button link v-if="isImagesDelMode" @click="isImagesDelMode = false" type="danger">{{
          t('LC_CANCEL')
        }}</el-button>
        <el-button
          link
          v-else
          @click="isImagesDelMode = true"
          type="danger"
          data-test="category_imgDeleteMode_btn"
          >{{ t('LC_DELETE_IMG') }}</el-button
        >
      </div>

      <div class="label">{{ t('LC_EDIT_SHORTCUTS') }}</div>
      <div class="shortcutList">
        <div
          class="shortcutItem"
          v-for="(shortcut, index) in categoryData.shortcuts"
          :key="shortcut.id"
        >
          <div><el-input class="shortcutInput" v-model.trim="shortcut.name"></el-input></div>
          <div class="shortcutActions">
            <div class="">
              <el-button
                v-if="shortcut.id"
                link
                type="danger"
                data-test="category_deleteShortcut_btn"
                @click="checkDeleteShortcut(shortcut)"
              >
                <inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg
              ></el-button>
              <el-button v-else link @click="categoryData.shortcuts?.splice(index, 1)"
                ><inline-svg :src="remove" height="20" width="20" color="#ff5b5b"></inline-svg
              ></el-button>
            </div>
            <!-- <el-button link>
              <inline-svg :src="sort" height="20" width="20"></inline-svg>
            </el-button> -->
          </div>
        </div>
        <el-empty
          v-if="categoryData.shortcuts?.length === 0"
          :image="noData"
          :image-size="100"
          :description="t('LC_SHORTCUTS_EMPTY')"
        />
        <el-button
          data-test="category_addShortcut_btn"
          link
          type="primary"
          @click="categoryData.shortcuts!.push({ name: '' })"
          >{{ t('LC_ADD_SHORTCUTS') }}</el-button
        >
      </div>
    </div>
    <template #footer>
      <div class="mb-1">
        <el-button
          data-test="category_cancel_btn"
          color="#f1f1f1"
          class="mainBtn"
          @click="emit('update:isVisible', false)"
          >{{ t('LC_CANCEL') }}</el-button
        >
        <el-button
          data-test="category_submit_btn"
          color="#208eef"
          class="mainBtn"
          :loading="isLoading"
          @click="updateData()"
          >{{ t('LC_SUBMIT') }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.label {
  margin-bottom: 4px;
}
.flexBox {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  form {
    flex: 1.5;
    margin-right: 1rem;
  }
  & > div {
    flex: 1;
  }
}
:deep(.colorPickers) {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .defaultColor {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    cursor: pointer;
  }
  & > div {
    margin-right: 6px !important;
  }
}
.imageList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
  background: var(--background-color);
  gap: 1px;
}
.imageActions {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-bottom: 20px;
  .upload {
    color: #208eef;
  }
  .el-button {
    font-size: 12px;
    padding: 0;
  }
}
.imageBox {
  max-width: 3rem;
  max-height: 3rem;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  border: 2px solid var(--background-color);
  position: relative;
  cursor: pointer;
  &.active {
    border: 2px solid #208eef;
  }
  img {
    padding: 4px;
    border-radius: 8px;
    min-width: 32px;
    min-height: 32px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center center;
    pointer-events: none;
  }
  .imageDel {
    width: 100%;
    height: 100%;
    background: #0003;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    border-radius: 8px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: white;
      font-weight: 600;
    }
  }
}
.noneImg {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  span {
    font-size: 12px;
    color: var(--desc-color);
    user-select: none;
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
    border-radius: 0 12px 12px 0;
  }
}
.el-divider--horizontal {
  margin: 6px 0;
}
</style>
