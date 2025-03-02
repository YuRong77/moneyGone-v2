import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import Chart from '@/views/Chart/Index.vue'
import DonutView from '@/views/Chart/components/DonutView.vue'
import CategoryItemsDrawer from '@/views/Chart/components/CategoryItemsDrawer.vue'
import { emitter } from '@/utils/emitter'
import { chartAPI, transactionAPI } from '@/apis'
import { chartData } from '../../mockData/chartAPI'

vi.mock('@/apis', async () => {
  const { chartData } = await import('../../mockData/chartAPI')
  return {
    chartAPI: {
      getChart: vi.fn().mockResolvedValue(chartData)
    },
    transactionAPI: {
      transactionList: vi.fn(() => Promise.resolve())
    }
  }
})

vi.mock('@/utils/emitter', () => ({
  emitter: {
    on: vi.fn(),
    off: vi.fn()
  }
}))

vi.mock('vue3-apexcharts', () => ({
  default: {
    render: () => null
  }
}))

let wrapper: VueWrapper<any>
describe('Chart Component', () => {
  beforeEach(() => {
    wrapper = mount(Chart)
  })

  it('mount 呼叫 getChart, 註冊 refresh', async () => {
    expect(chartAPI.getChart).toHaveBeenCalled()
    expect(emitter.on).toHaveBeenCalledWith('refresh', wrapper.vm.getChart)
  })

  it('unmount 移除 refresh', async () => {
    wrapper.unmount()
    expect(emitter.off).toHaveBeenCalledWith('refresh')
  })

  it('viewType 顯示對應元件', async () => {
    // vi.doMock('@/views/Chart/components/DonutView.vue', () => ({
    //   default: {
    //     name: 'DonutView',
    //     template: '<div>Mocked Child</div>'
    //   }
    // }))
    // const tabs = wrapper.findAll('.el-segmented__item-input')
    wrapper.vm.viewType = 'bar'
    expect(wrapper.findComponent({ name: 'BarView' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DonutView' }).exists()).toBe(false)
    wrapper.vm.viewType = 'donut'
    // await tabs[1].setValue(true)
    await nextTick()
    expect(wrapper.findComponent({ name: 'DonutView' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'BarView' }).exists()).toBe(false)
    // vi.unmock('@/views/Chart/components/DonutView.vue')
  })
})

let donutWrapper: VueWrapper<any>
describe('DonutView Component', () => {
  beforeEach(() => {
    donutWrapper = mount(DonutView, {
      global: {
        provide: {
          chartData,
          setting: {
            type: 'month',
            range: 'firstHalf'
          }
        }
      }
    })
  })
  it('點擊分類詳情出現 details', async () => {
    const cardBtns = donutWrapper.findAll('.cardList .card button')
    await cardBtns[0].trigger('click')
    expect(donutWrapper.vm.isShowCategoryDrawer).toBe(true)
  })
})

let categoryDrawerWrapper: VueWrapper<any>
describe('CategoryItemsDrawer Component', () => {
  beforeEach(() => {
    categoryDrawerWrapper = mount(CategoryItemsDrawer, {
      props: {
        isVisible: true,
        categoryId: 1
      },
      global: {
        provide: {
          setting: ref({
            type: 'month',
            range: 'firstHalf'
          }),
          date: ref(new Date('2025-02-10'))
        }
      }
    })
  })
  it('正常渲染且呼叫 transactionList', async () => {
    expect(categoryDrawerWrapper.find('.categoryItemsDrawer').exists()).toBe(true)
    categoryDrawerWrapper.vm.isVisibleModel = false
    expect(categoryDrawerWrapper.emitted('update:isVisible')![0]).toEqual([false])
    categoryDrawerWrapper.vm.getList()
    await flushPromises()
    expect(transactionAPI.transactionList).toHaveBeenCalled()
  })
})
