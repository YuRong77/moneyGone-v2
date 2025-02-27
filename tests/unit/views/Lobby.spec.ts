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
    const toChart = wrapper.find('[data-test="toChart"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Chart' })
  })

  it('點擊快捷前往設定', async () => {
    const toChart = wrapper.find('[data-test="toSetting"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Setting' })
  })

  it('點擊快捷前往記錄', async () => {
    const toChart = wrapper.find('[data-test="toRecord"]')
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    await toChart.trigger('click')
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: 'Record' })
  })

  it('test', () => {
    const test = vi.spyOn(wrapper.vm, 'getOverview')
    test.mockReturnValue({
      todayRecords: []
    })
    console.log(wrapper.vm.overview, 'over')
    expect(wrapper.find('.el-empty').exists()).toBe(true)
  })
})
