import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import MainLayout from '@/layouts/MainLayout.vue'
import { categoryAPI } from '@/apis'
import { categoriesData } from '../../mockData/categoryAPI'
import { useCategoriesStore } from '@/stores/categories'
import { emitter } from '@/utils/emitter'

vi.mock('@/apis', () => ({
  categoryAPI: {
    categoryList: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/utils/emitter', () => ({
  emitter: {
    on: vi.fn(),
    off: vi.fn()
  }
}))

let wrapper: VueWrapper<any>
describe('ResetPassword Component', () => {
  let categoriesStore: ReturnType<typeof useCategoriesStore>
  beforeEach(() => {
    // vi.clearAllMocks()
    wrapper = mount(MainLayout)
    categoriesStore = useCategoriesStore()
  })

  it('mount 呼叫 categoryList, 註冊 transaction 事件', () => {
    expect(categoryAPI.categoryList).toHaveBeenCalled()
    expect(emitter.on).toHaveBeenCalledWith('newTransaction', wrapper.vm.newTransaction)
    expect(emitter.on).toHaveBeenCalledWith('editTransaction', wrapper.vm.editTransaction)
  })

  it('unmount 移除 refresh', () => {
    wrapper.unmount()
    expect(emitter.off).toHaveBeenCalledWith('newTransaction')
    expect(emitter.off).toHaveBeenCalledWith('editTransaction')
  })

  it('newTransaction 正確 popup', async () => {
    categoriesStore.categories = categoriesData
    wrapper.vm.newTransaction(1)
    await nextTick()
    expect(wrapper.findComponent({ name: 'Transaction' }).exists()).toBe(true)
    wrapper.unmount()
  })

  it('editTransaction 正確 popup', async () => {
    categoriesStore.categories = categoriesData
    const data = {
      id: 1,
      name: 'name',
      amount: null,
      note: '',
      categoryId: 1,
      createdAt: '2025-01-01'
    }
    wrapper.vm.editTransaction(data)
    await nextTick()
    expect(wrapper.findComponent({ name: 'Transaction' }).exists()).toBe(true)
  })
})
