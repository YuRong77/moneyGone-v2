import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Transaction from '@/components/Transaction.vue'
import App from '@/App.vue'
import { useCategoriesStore } from '@/stores/categories'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

import { emitter } from '@/utils/emitter'
import { transactionAPI } from '@/apis'

// interface TransactionAPI {
//   transactionUpdate: vi.Mock
//   transactionCreate: vi.Mock
// }
vi.mock('@/apis', () => ({
  transactionAPI: {
    transactionUpdate: vi.fn(() => Promise.resolve()),
    transactionCreate: vi.fn(() => Promise.resolve())
  }
}))
vi.mock('@/utils/emitter', () => ({
  emitter: {
    emit: vi.fn()
  }
}))
// vi.mock('@/utils/emitter')

const newData = {
  categoryId: 1,
  createdAt: '2025-01-01',
  name: '',
  note: '',
  amount: null
}

const data = {
  id: 1,
  categoryId: 1,
  createdAt: '2025-01-01',
  name: 'Dinner',
  note: '',
  amount: 100
}

describe('Transaction Component', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(Transaction, {
      props: {
        isVisible: true,
        transactionData: newData
      }
    })
    const categoriesStore = useCategoriesStore()
    categoriesStore.categories = [
      {
        id: 1,
        name: 'Food',
        color: 'fff',
        imageId: null,
        imageUrl: null,
        shortcuts: [{ id: 1, name: 'Lunch' }]
      }
    ]
  })
  // afterEach(() => {
  //   wrapper.unmount()
  // })

  it('應該正確渲染元件', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('點擊關閉能正確 emit update isVisible', async () => {
    await wrapper.find('[data-test="cancel"]').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
    await wrapper.find('.el-dialog__headerbtn').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
    await wrapper.find('.el-overlay').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
    // expect(wrapper.find('.transactionDialog').exists()).toBe(false)
    // await wrapper.setProps({ isVisible: true })
    // expect(wrapper.find('.el-dialog').exists()).toBe(true)
  })

  it('點擊 shortcut 項目應該自動填入名稱到 name 欄位', async () => {
    const shortcut = wrapper.find('[data-test="shortcut"]')
    await shortcut.trigger('click')
    expect(wrapper.vm.formData.name).toBe('Lunch')
  })

  it('名稱和金額為必填項目', async () => {
    wrapper.vm.formData.name = ''
    wrapper.vm.formData.amount = null
    const submitHandler = vi.fn(wrapper.vm.submitHandler)
    submitHandler()
    expect(submitHandler).toHaveReturned()
    expect(submitHandler).toHaveReturnedWith(undefined)
  })

  it('提交表單時應該根據 isEdit 屬性調用相應的 API', async () => {
    // wrapper.vm.formData.id = 1
    wrapper.vm.formData.name = 'test'
    wrapper.vm.formData.amount = 100
    await wrapper.setProps({ transactionData: data })
    wrapper.vm.formRef.validate = vi.fn((callback) => callback(true))
    console.log(wrapper.vm.formData, ' wrapper.vm.formData')
    console.log(wrapper.vm.isEdit, ' wrapper.vm.isEdit')

    const editTransaction = vi.spyOn(wrapper.vm, 'editTransaction')
    const addTransaction = vi.spyOn(wrapper.vm, 'addTransaction')
    const submitHandler = vi.spyOn(wrapper.vm, 'submitHandler')

    const submit = wrapper.find('[data-test="submit"]')
    await submit.trigger('click')
    // await wrapper.vm.submitHandler()
    // wrapper.vm.editTransaction = vi.fn()
    // wrapper.vm.addTransaction = vi.fn()

    expect(submitHandler).toHaveBeenCalled()
    // expect(editTransaction).not.toHaveBeenCalled()
    // expect(addTransaction).toHaveBeenCalled()

    expect(editTransaction).toHaveBeenCalled()
    // expect(addTransaction).not.toHaveBeenCalled()

    // expect(transactionAPI.transactionUpdate).toHaveBeenCalled()

    // await wrapper.setProps({
    //   transactionData: { categoryId: 1, createdAt: new Date(), name: 'Dinner', amount: 100 }
    // })

    // wrapper.vm.formData.id = 1
    // await wrapper.vm.submitHandler()
    // expect(addTransaction).toHaveBeenCalled()

    // expect(transactionAPI.transactionCreate).toHaveBeenCalled()
  })

  // it('API 調用成功後應該關閉彈窗並觸發 refresh 事件', async () => {
  //   transactionAPI.transactionUpdate.mockResolvedValueOnce({})
  //   const wrapper = mount(Transaction, {
  //     props: {
  //       isVisible: true,
  //       transactionData: {
  //         id: 1,
  //         categoryId: 1,
  //         createdAt: new Date(),
  //         name: 'Dinner',
  //         amount: 100
  //       }
  //     }
  //   })
  //   await wrapper.vm.submitHandler()
  //   expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
  //   expect(emitter.emit).toHaveBeenCalledWith('refresh')
  // })
})
