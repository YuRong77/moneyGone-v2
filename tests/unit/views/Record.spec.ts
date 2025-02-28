import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Record from '@/views/Record/Index.vue'
import RecordItem from '@/views/Record/components/RecordItem.vue'
import { emitter } from '@/utils/emitter'
import { transactionAPI } from '@/apis'

vi.mock('@/apis', () => ({
  transactionAPI: {
    transactionTotalList: vi.fn().mockResolvedValue([]),
    transactionDelete: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/utils/emitter', () => ({
  emitter: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  }
}))

const records = [
  {
    date: '2025-02-27',
    totalAmount: 250,
    details: [
      {
        amount: 100,
        categoryColor: '#ff8f8f',
        categoryId: 1,
        categoryName: '生活',
        createdAt: '2025-02-27T00:00:00.000Z',
        id: 1,
        imageUrl: null,
        name: '午餐',
        note: ''
      },
      {
        amount: 150,
        categoryColor: '#ff8f8f',
        categoryId: 1,
        categoryName: '生活',
        createdAt: '2025-02-27T12:00:00.000Z',
        id: 1,
        imageUrl: null,
        name: '晚餐',
        note: ''
      }
    ]
  },
  {
    date: '2025-02-27',
    totalAmount: 300,
    details: [
      {
        amount: 300,
        categoryColor: '#ff8f8f',
        categoryId: 1,
        categoryName: '娛樂',
        createdAt: '2025-02-27T00:00:00.000Z',
        id: 1,
        imageUrl: null,
        name: '電影',
        note: ''
      }
    ]
  }
]

let wrapper: VueWrapper<any>
describe('Record Component', () => {
  beforeEach(() => {
    wrapper = mount(Record)
  })

  it('mount 呼叫 getMonthRecord, 註冊 refresh', () => {
    expect(transactionAPI.transactionTotalList).toHaveBeenCalled()
    expect(emitter.on).toHaveBeenCalledWith('refresh', wrapper.vm.getMonthRecord)
  })

  it('unmount 移除 refresh', () => {
    wrapper.unmount()
    expect(emitter.off).toHaveBeenCalledWith('refresh')
  })

  it('沒有今日記錄顯示 empty', async () => {
    expect(wrapper.find('[data-test="emptyRecord"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="totalItem"]').exists()).toBe(false)
  })

  it('有今日記錄顯示 totalItem', async () => {
    transactionAPI.transactionTotalList = vi.fn().mockResolvedValue(records)
    await wrapper.vm.getMonthRecord()
    await nextTick()
    expect(wrapper.find('[data-test="emptyRecord"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="totalItem"]').exists()).toBe(true)
  })

  it('使用 search 應出現對應項目', async () => {
    transactionAPI.transactionTotalList = vi.fn().mockResolvedValue(records)
    await wrapper.vm.getMonthRecord()
    await nextTick()
    wrapper.find('[data-test="recordSearch"]').setValue('午餐')
    await nextTick()
    expect(wrapper.findAll('[data-test="totalItem"]').length).toBe(1)
    wrapper.find('[data-test="recordSearch"]').setValue('沒這個')
    await nextTick()
    expect(wrapper.findAll('[data-test="totalItem"]').length).toBe(0)
    wrapper.find('[data-test="recordSearch"]').setValue('娛樂')
    await nextTick()
    expect(wrapper.findAll('[data-test="totalItem"]').length).toBe(1)
  })

  it('getTopExpenseItem 取得該項最高消費', async () => {
    transactionAPI.transactionTotalList = vi.fn().mockResolvedValue(records)
    await wrapper.vm.getMonthRecord()
    await nextTick()
    const topExpenseItem = wrapper.vm.getTopExpenseItem(records[0])
    expect(topExpenseItem).toEqual({
      amount: 150,
      categoryColor: '#ff8f8f',
      categoryId: 1,
      categoryName: '生活',
      createdAt: '2025-02-27T12:00:00.000Z',
      id: 1,
      imageUrl: null,
      name: '晚餐',
      note: ''
    })
  })

  it('點擊 totalItem 顯示 detail', async () => {
    transactionAPI.transactionTotalList = vi.fn().mockResolvedValue(records)
    wrapper.vm.getMonthRecord()
    await flushPromises()
    // wrapper.vm.showDetails(records[0].details)
    // await nextTick()
    const showDetails = vi.spyOn(wrapper.vm, 'showDetails')
    wrapper.find('[data-test="totalItem"]').trigger('click')
    await nextTick()
    expect(showDetails).toHaveBeenCalledOnce()
    expect(wrapper.find('.recordItem').exists()).toBe(true)
    expect(wrapper.vm.isVisible).toBe(true)
    expect(wrapper.vm.rowDetails).toEqual(records[0].details)
  })
})

let itemWrapper: VueWrapper<any>
describe('RecordItem Component', () => {
  beforeEach(() => {
    itemWrapper = mount(RecordItem, { props: { item: records[0].details[0] } })
  })

  it('點擊編輯 emit editTransaction', async () => {
    expect(itemWrapper.find('.action .el-tooltip__trigger').exists()).toBe(true)
    const actionBtn = itemWrapper.find('.action .el-tooltip__trigger')
    await actionBtn.trigger('click')
    await nextTick()
    const editBtn = itemWrapper.find('[data-test="recordEdit"]')
    await editBtn.trigger('click')
    await nextTick()
    expect(emitter.emit).toHaveBeenCalledWith('editTransaction', records[0].details[0])
  })

  it('點擊刪除跳出確認視窗，確認後 transactionDelete', async () => {
    const deleteCheck = vi.spyOn(itemWrapper.vm, 'deleteCheck')

    expect(itemWrapper.find('.action .el-tooltip__trigger').exists()).toBe(true)
    const actionBtn = itemWrapper.find('.action .el-tooltip__trigger')
    await actionBtn.trigger('click')
    await nextTick()
    const deleteBtn = itemWrapper.find('[data-test="recordDelete"]')
    await deleteBtn.trigger('click')
    await nextTick()

    const confirmBtn = document.querySelector('.el-message-box__btns .el-button--primary')
    confirmBtn?.dispatchEvent(new MouseEvent('click'))
    await flushPromises()

    expect(deleteCheck).toHaveBeenCalled()
    expect(transactionAPI.transactionDelete).toHaveBeenCalled()
  })
})
