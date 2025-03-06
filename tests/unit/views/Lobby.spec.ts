import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Lobby from '@/views/Lobby/Index.vue'
import { emitter } from '@/utils/emitter'
import { transactionAPI } from '@/apis'

vi.mock('@/apis', () => ({
  transactionAPI: {
    transactionOverview: vi.fn(() => Promise.resolve())
  }
}))

vi.mock('@/utils/emitter', () => ({
  emitter: {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  }
}))

let wrapper: VueWrapper<any>
describe('Lobby Component', () => {
  beforeEach(() => {
    wrapper = mount(Lobby)
  })

  it('mount 呼叫 getOverview, 註冊 refresh', async () => {
    expect(transactionAPI.transactionOverview).toHaveBeenCalled()
    expect(emitter.on).toHaveBeenCalledWith('refresh', wrapper.vm.getOverview)
  })

  it('unmount 移除 refresh', async () => {
    wrapper.unmount()
    expect(emitter.off).toHaveBeenCalledWith('refresh')
  })

  it('點擊快捷前往圖表', async () => {
    const toChart = wrapper.find('[data-test="lobby_toChart_btn"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Chart' })
  })

  it('點擊快捷前往設定', async () => {
    const toChart = wrapper.find('[data-test="lobby_toSetting_btn"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Setting' })
  })

  it('點擊快捷前往記錄', async () => {
    const toChart = wrapper.find('[data-test="lobby_toRecord_btn"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Record' })
  })

  it('沒有今日記錄顯示 empty', async () => {
    // vi.spyOn(transactionAPI, 'transactionOverview').mockResolvedValueOnce(data)
    transactionAPI.transactionOverview = vi.fn().mockResolvedValue({
      dailyTotal: 0,
      monthlyBudget: 10000,
      monthlyTotal: 0,
      todayRecords: []
    })
    await wrapper.vm.getOverview()
    await nextTick()
    expect(wrapper.find('.record .el-empty').exists()).toBe(true)
    expect(wrapper.find('.record .recordItem').exists()).toBe(false)
  })

  it('有今日記錄顯示 recordItem', async () => {
    transactionAPI.transactionOverview = vi.fn().mockResolvedValue({
      dailyTotal: 0,
      monthlyBudget: 10000,
      monthlyTotal: 0,
      todayRecords: [
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
        }
      ]
    })
    await wrapper.vm.getOverview()
    await nextTick()
    expect(wrapper.find('.record .el-empty').exists()).toBe(false)
    expect(wrapper.find('.record .recordItem').exists()).toBe(true)
  })
})
