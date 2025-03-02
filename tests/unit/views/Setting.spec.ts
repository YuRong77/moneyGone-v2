import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { useCategoriesStore } from '@/stores/categories'
import Setting from '@/views/Setting/Index.vue'
import { userAPI, categoryAPI } from '@/apis'

vi.mock('@/apis', () => ({
  userAPI: {
    getProfile: vi.fn(() => Promise.resolve())
  },
  categoryAPI: {
    categoryList: vi.fn()
  },
  imageAPI: {
    getImages: vi.fn(() => Promise.resolve())
  }
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
    const mockData = {
      id: 1,
      name: '生活',
      color: '#ff8f8f',
      shortcuts: [],
      imageUrl: null,
      imageId: 2
    }
    categoryAPI.categoryList = vi.fn().mockResolvedValue(mockData)
    const setCategories = vi.spyOn(categoriesStore, 'setCategories')
    wrapper.vm.getCategories()
    await flushPromises()
    expect(categoryAPI.categoryList).toHaveBeenCalled()
    expect(setCategories).toHaveBeenCalledOnce()
    expect(setCategories).toHaveBeenCalledWith(mockData)
    expect(categoriesStore.categories).toEqual(mockData)
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
