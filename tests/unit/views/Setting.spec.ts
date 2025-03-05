import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { useCategoriesStore } from '@/stores/categories'
import Setting from '@/views/Setting/Index.vue'
import NameDialog from '@/views/Setting/components/NameDialog.vue'
import MonthlyBudgetDialog from '@/views/Setting/components/MonthlyBudgetDialog.vue'
import LangDialog from '@/views/Setting/components/LangDialog.vue'
import CategoryDrawer from '@/views/Setting/components/CategoryDrawer.vue'
import CategoryDetailDialog from '@/views/Setting/components/CategoryDetailDialog.vue'
import { userAPI, categoryAPI, imageAPI } from '@/apis'
import { showMessage } from '@/utils/message'
import { categoriesData } from '../../mockData/categoryAPI'
import { imageData } from '../../mockData/imageAPI'

vi.mock('@/apis', () => ({
  userAPI: {
    getProfile: vi.fn(() => Promise.resolve()),
    updateUser: vi.fn(() => Promise.resolve())
  },
  categoryAPI: {
    categoryList: vi.fn(),
    categoryCreate: vi.fn(),
    categoryUpdate: vi.fn(),
    categoryDelete: vi.fn(),
    shortcutUpdate: vi.fn(),
    shortcutDelete: vi.fn()
  },
  imageAPI: {
    getImages: vi.fn(() => Promise.resolve()),
    imageDelete: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/utils/message', () => ({
  showMessage: vi.fn()
}))

let wrapper: VueWrapper<any>
describe('Setting Component', () => {
  let categoriesStore: ReturnType<typeof useCategoriesStore>
  beforeEach(() => {
    wrapper = mount(Setting)
    categoriesStore = useCategoriesStore()
  })

  it('mount 呼叫 getProfile', async () => {
    expect(userAPI.getProfile).toHaveBeenCalled()
  })

  it('getCategories 取得分類儲存 pinia', async () => {
    categoryAPI.categoryList = vi.fn().mockResolvedValue(categoriesData)
    const setCategories = vi.spyOn(categoriesStore, 'setCategories')
    wrapper.vm.getCategories()
    await flushPromises()
    expect(categoryAPI.categoryList).toHaveBeenCalled()
    expect(setCategories).toHaveBeenCalledOnce()
    expect(setCategories).toHaveBeenCalledWith(categoriesData)
    expect(categoriesStore.categories).toEqual(categoriesData)
  })

  it('編輯名稱 popup', async () => {
    const editName = wrapper.find('[data-test="editName"]')
    await editName.trigger('click')
    expect(wrapper.vm.isShowNameDialog).toBe(true)
    expect(wrapper.findComponent({ name: 'NameDialog' }).exists()).toBe(true)
  })

  it('編輯預算 popup', async () => {
    const editBudget = wrapper.find('[data-test="editBudget"]')
    await editBudget.trigger('click')
    expect(wrapper.vm.isShowMonthlyBudgetDialog).toBe(true)
    expect(wrapper.findComponent({ name: 'MonthlyBudgetDialog' }).exists()).toBe(true)
  })

  it('編輯語系 popup', async () => {
    const editLang = wrapper.find('[data-test="editLang"]')
    await editLang.trigger('click')
    expect(wrapper.vm.isShowLangDialog).toBe(true)
    expect(wrapper.findComponent({ name: 'LangDialog' }).exists()).toBe(true)
  })

  it('編輯分類 popup', async () => {
    categoriesStore.categories = []
    const editCategory = wrapper.find('[data-test="editCategory"]')
    await editCategory.trigger('click')
    expect(wrapper.vm.isShowCategoryDrawer).toBe(true)
    expect(wrapper.findComponent({ name: 'CategoryDrawer' }).exists()).toBe(true)
  })

  it('logout 至登入頁', () => {
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    wrapper.vm.logout()
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Login' })
  })
})

let nameWrapper: VueWrapper<any>
describe('NameDialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    nameWrapper = mount(NameDialog, {
      props: {
        isVisible: true,
        userName: 'test'
      }
    })
  })

  it('點擊儲存呼叫 updateUserName', async () => {
    const saveBtn = nameWrapper.find('[data-test="saveName"]')
    const updateUserName = vi.spyOn(nameWrapper.vm, 'updateUserName')
    await saveBtn.trigger('click')
    await flushPromises()
    expect(updateUserName).toHaveBeenCalled()
  })

  it('updateUserName 呼叫 api 後顯示訊息並更新 ', async () => {
    await nameWrapper.vm.updateUserName()
    await flushPromises()
    expect(userAPI.updateUser).toHaveBeenCalled()
    expect(showMessage).toHaveBeenCalled()
    expect(nameWrapper.emitted('update:isVisible')![0]).toEqual([false])
    expect(nameWrapper.emitted('getProfile')![0]).toBeTruthy()
    expect(nameWrapper.vm.isLoading).toBe(false)
  })

  it('點擊關閉發送 isVisible false', async () => {
    const cancelBtn = nameWrapper.find('[data-test="cancelEditName"]')
    await cancelBtn.trigger('click')
    expect(nameWrapper.emitted('update:isVisible')![0]).toEqual([false])
  })
})

let budgetWrapper: VueWrapper<any>
describe('MonthlyBudgetDialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    budgetWrapper = mount(MonthlyBudgetDialog, {
      props: {
        isVisible: true,
        monthlyBudget: 10000
      }
    })
  })

  it('點擊儲存呼叫 updateMonthlyBudget', async () => {
    const saveBtn = budgetWrapper.find('[data-test="saveBudget"]')
    const updateMonthlyBudget = vi.spyOn(budgetWrapper.vm, 'updateMonthlyBudget')
    await saveBtn.trigger('click')
    await flushPromises()
    expect(updateMonthlyBudget).toHaveBeenCalled()
  })

  it('updateMonthlyBudget 呼叫 api 後顯示訊息並更新 ', async () => {
    await budgetWrapper.vm.updateMonthlyBudget()
    await flushPromises()
    expect(userAPI.updateUser).toHaveBeenCalled()
    expect(showMessage).toHaveBeenCalled()
    expect(budgetWrapper.emitted('update:isVisible')![0]).toEqual([false])
    expect(budgetWrapper.emitted('getProfile')![0]).toBeTruthy()
    expect(budgetWrapper.vm.isLoading).toBe(false)
  })

  it('點擊關閉發送 isVisible false', async () => {
    const cancelBtn = budgetWrapper.find('[data-test="cancelEditBudget"]')
    await cancelBtn.trigger('click')
    expect(budgetWrapper.emitted('update:isVisible')![0]).toEqual([false])
  })
})

let langWrapper: VueWrapper<any>
describe('LangDialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    langWrapper = mount(LangDialog, {
      props: {
        isVisible: true,
        lang: 'zh-TW'
      }
    })
  })

  it('點擊儲存呼叫 updateLang', async () => {
    const saveBtn = langWrapper.find('[data-test="saveLang"]')
    const updateLang = vi.spyOn(langWrapper.vm, 'updateLang')
    await saveBtn.trigger('click')
    await flushPromises()
    expect(updateLang).toHaveBeenCalled()
  })

  it('updateLang 呼叫 api 後顯示訊息並更新 ', async () => {
    await langWrapper.vm.updateLang()
    await flushPromises()
    expect(userAPI.updateUser).toHaveBeenCalled()
    expect(showMessage).toHaveBeenCalled()
    expect(langWrapper.emitted('update:isVisible')![0]).toEqual([false])
    expect(langWrapper.emitted('getProfile')![0]).toBeTruthy()
    expect(langWrapper.vm.isLoading).toBe(false)
  })

  it('點擊關閉發送 isVisible false', async () => {
    const cancelBtn = langWrapper.find('[data-test="cancelEditLang"]')
    await cancelBtn.trigger('click')
    expect(langWrapper.emitted('update:isVisible')![0]).toEqual([false])
  })
})

let categoryWrapper: VueWrapper<any>
describe('CategoryDrawer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    categoryWrapper = mount(CategoryDrawer, {
      props: {
        isVisible: true
      }
    })
    const categoriesStore = useCategoriesStore()
    categoriesStore.categories = categoriesData
  })

  it('mount 呼叫 getImages', () => {
    expect(imageAPI.getImages).toHaveBeenCalled()
  })

  it('點擊編輯 icon 出現詳情 popup', async () => {
    categoryWrapper.vm.images = imageData
    const editBtn = categoryWrapper.find('[data-test="category_edit_icon"]')
    await editBtn.trigger('click')
    expect(categoryWrapper.findComponent({ name: 'CategoryDetailDialog' }).exists()).toBe(true)
  })

  it('點擊新增出現新增 popup', async () => {
    categoryWrapper.vm.images = imageData
    const addBtn = categoryWrapper.find('[data-test="category_add_btn"]')
    await addBtn.trigger('click')
    expect(categoryWrapper.findComponent({ name: 'CategoryDetailDialog' }).exists()).toBe(true)
  })

  it('點擊刪除 icon 跳出確認視窗，確認後 categoryDelete', async () => {
    const checkDelete = vi.spyOn(categoryWrapper.vm, 'checkDelete')

    const deleteBtn = categoryWrapper.find('[data-test="category_delete_icon"]')
    await deleteBtn.trigger('click')
    await nextTick()

    const confirmBtn = document.querySelector('.el-message-box__btns .el-button--primary')
    confirmBtn?.dispatchEvent(new MouseEvent('click'))
    await flushPromises()

    expect(checkDelete).toHaveBeenCalled()
    expect(categoryAPI.categoryDelete).toHaveBeenCalled()
  })

  it('點擊關閉發送 isVisible false', async () => {
    const cancelBtn = categoryWrapper.find('[data-test="category_close_btn"]')
    await cancelBtn.trigger('click')
    expect(categoryWrapper.emitted('update:isVisible')![0]).toEqual([false])
  })
})

let categoryDetailWrapper: VueWrapper<any>
describe('CategoryDetailDialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    categoryDetailWrapper = mount(CategoryDetailDialog, {
      props: {
        isVisible: true,
        category: categoriesData[0]
      },
      global: {
        provide: {
          images: ref(imageData)
        }
      }
    })
  })

  it('使用 id 判斷是否為編輯狀態', async () => {
    expect(categoryDetailWrapper.vm.isEditMode).toBe(true)
    categoryDetailWrapper.vm.categoryData = {
      name: '',
      color: '#208eef',
      imageId: null,
      shortcuts: []
    }
    expect(categoryDetailWrapper.vm.isEditMode).toBe(false)
  })

  it('成功上傳圖片顯示訊息及更新', async () => {
    categoryDetailWrapper.vm.handleAvatarSuccess()
    expect(showMessage).toHaveBeenCalled()
    expect(categoryDetailWrapper.emitted('getImages')![0]).toBeTruthy()
  })

  it('getImgUrl 成功判斷', async () => {
    const getImgUrl = vi.spyOn(categoryDetailWrapper.vm, 'getImgUrl')
    categoryDetailWrapper.vm.getImgUrl()
    expect(getImgUrl).toHaveReturnedWith('fakeUrl')
    categoryDetailWrapper.vm.categoryData = categoriesData[2]
    await flushPromises()
    expect(getImgUrl).toHaveReturnedWith(null)
    expect(getImgUrl).toHaveReturnedTimes(2)
  })

  it('點擊刪除 mode 切換，刪除呼叫 checkDelImage', async () => {
    const deleteMode = categoryDetailWrapper.find('[data-test="category_imgDeleteMode_btn"]')
    await deleteMode.trigger('click')
    await nextTick()

    const checkDelImage = vi.spyOn(categoryDetailWrapper.vm, 'checkDelImage')
    const deleteBtn = categoryDetailWrapper.findAll('[data-test="category_deleteImg_btn"]')
    await deleteBtn[0].trigger('click')
    await nextTick()
    // const confirmBtn = document.querySelector('.el-message-box__btns .el-button--primary')
    // confirmBtn?.dispatchEvent(new MouseEvent('click'))
    // await flushPromises()
    expect(checkDelImage).toHaveBeenCalled()
  })

  it('deleteImage 正確更新資料', async () => {
    await categoryDetailWrapper.vm.deleteImage()
    expect(imageAPI.imageDelete).toHaveBeenCalled()
    expect(showMessage).toHaveBeenCalled()
    expect(categoryDetailWrapper.emitted('getImages')![0]).toBeTruthy()
    expect(categoryDetailWrapper.vm.isImagesDelMode).toBe(false)
  })

  it('送出呼叫 updateData', async () => {
    const updateData = vi.spyOn(categoryDetailWrapper.vm, 'updateData')
    const submitBtn = categoryDetailWrapper.find('[data-test="category_submit_btn"]')
    await submitBtn.trigger('click')
    await flushPromises()
    expect(updateData).toHaveBeenCalled()
    expect(categoryDetailWrapper.emitted('getCategories')![0]).toBeTruthy()
    expect(categoryDetailWrapper.emitted('update:isVisible')![0]).toEqual([false])
  })

  it('編輯時 updateData 呼叫 update api', async () => {
    await categoryDetailWrapper.vm.updateData()
    await flushPromises()
    expect(categoryAPI.categoryUpdate).toHaveBeenCalled()
    expect(categoryAPI.categoryCreate).not.toHaveBeenCalled()
  })

  it('新增時 updateData 呼叫 create api', async () => {
    categoryDetailWrapper.vm.categoryData = {
      name: '',
      color: '#208eef',
      imageId: null,
      shortcuts: []
    }
    await categoryDetailWrapper.vm.updateData()
    await flushPromises()
    expect(categoryAPI.categoryCreate).toHaveBeenCalled()
    expect(categoryAPI.categoryUpdate).not.toHaveBeenCalled()
  })

  // it('點擊 shortcut 刪除', async () => {
  // categoryDetailWrapper.vm.checkDeleteShortcut({ id: 1, name: 'test' })
  // const checkDelImage = vi.spyOn(categoryDetailWrapper.vm, 'checkDelImage')
  // const deleteBtn = categoryDetailWrapper.findAll('[data-test="category_deleteShortcut_btn"]')
  // await deleteBtn[0].trigger('click')
  // await nextTick()
  // expect(checkDelImage).toHaveBeenCalled()
  // const confirmBtn = document.querySelector('.el-message-box__btns .el-button--primary')
  // confirmBtn?.dispatchEvent(new MouseEvent('click'))
  // await flushPromises()
  // expect(categoryAPI.shortcutDelete).toHaveBeenCalled()
  // expect(categoryDetailWrapper.emitted('getCategories')![0]).toBeTruthy()
  // })
})
