import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Transaction from '@/components/Transaction.vue'
import { useCategoriesStore } from '@/stores/categories'
import { emitter } from '@/utils/emitter'
import { transactionAPI } from '@/apis'

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
//單獨使用
// const transactionAPI = vi.spyOn(transactionAPI, 'transactionUpdate')
// const emitSpy = vi.spyOn(emitter, 'emit')
// expect(transactionAPI).toHaveBeenCalled()
// expect(emitSpy).toHaveBeenCalledWith('refresh')

const newData = {
  categoryId: 1,
  createdAt: '2025-01-01',
  name: '',
  note: '',
  amount: null
}

const editData = {
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
    vi.clearAllMocks()
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

  it('點擊關閉能正確 emit update isVisible', async () => {
    await wrapper.find('[data-test="transaction_cancel_btn"]').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
    await wrapper.find('.el-dialog__headerbtn').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
    await wrapper.find('.el-overlay').trigger('click')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
  })

  it('點擊 shortcut 項目應該自動填入名稱到 name 欄位', async () => {
    const shortcut = wrapper.find('[data-test="transaction_shortcut_btn"]')
    await shortcut.trigger('click')
    expect(wrapper.vm.formData.name).toBe('Lunch')
  })

  it('名稱和金額為必填項目', async () => {
    const submitHandler = vi.spyOn(wrapper.vm, 'submitHandler')
    wrapper.vm.submitHandler()
    expect(submitHandler).toHaveReturned()
    expect(submitHandler).toHaveReturnedWith(undefined)
  })

  it('新增時呼叫 create api', async () => {
    const nameInput = wrapper.get('[data-test="transaction_name_input"]')
    const amountInput = wrapper.get('[data-test="transaction_amount_input"]')
    await nameInput.setValue('test')
    await amountInput.setValue('100')

    const submitHandler = vi.spyOn(wrapper.vm, 'submitHandler')
    // const form = wrapper.findComponent({ ref: 'formRef' })
    // await form.vm.validate()
    // expect(form.vm.validate).not.toThrow()

    const submit = wrapper.find('[data-test="transaction_submit_btn"]')
    await submit.trigger('click')
    await flushPromises()

    expect(submitHandler).toHaveBeenCalled()
    expect(transactionAPI.transactionCreate).toHaveBeenCalled()
    expect(transactionAPI.transactionUpdate).not.toHaveBeenCalled()
  })

  it('編輯時呼叫 update api', async () => {
    await wrapper.setProps({ transactionData: editData })

    const nameInput = wrapper.get('[data-test="transaction_name_input"]')
    const amountInput = wrapper.get('[data-test="transaction_amount_input"]')
    await nameInput.setValue('test')
    await amountInput.setValue('100')

    const submitHandler = vi.spyOn(wrapper.vm, 'submitHandler')
    const submit = wrapper.find('[data-test="transaction_submit_btn"]')
    await submit.trigger('click')
    await flushPromises()

    expect(submitHandler).toHaveBeenCalled()
    expect(transactionAPI.transactionUpdate).toHaveBeenCalled()
    expect(transactionAPI.transactionCreate).not.toHaveBeenCalled()
  })

  it('api 執行後關閉 loading 並觸發 refresh, isVisible 事件', async () => {
    await wrapper.vm.editTransaction()
    //如果不使用async await，用then catch需要使用 flushPromises
    await flushPromises()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(emitter.emit).toHaveBeenCalledWith('refresh')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])

    await wrapper.vm.addTransaction()
    await flushPromises()
    expect(wrapper.vm.isLoading).toBe(false)
    expect(emitter.emit).toHaveBeenCalledWith('refresh')
    expect(wrapper.emitted('update:isVisible')[0]).toEqual([false])
  })
})
