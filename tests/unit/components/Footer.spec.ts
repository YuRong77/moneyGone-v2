import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'
// import { emitter } from '@/utils/emitter'

let wrapper: VueWrapper<any>
describe('Footer Component', () => {
  beforeEach(async () => {
    wrapper = mount(Footer)
  })

  it('顯示 menuItems 正確項目數量', () => {
    const footerItems = wrapper.findAll('.footerItem')
    expect(footerItems).toHaveLength(wrapper.vm.menuItems.length)
  })

  it('點擊後 router push', async () => {
    const spyPush = vi.spyOn(wrapper.vm.router, 'push')
    // const recordItem = wrapper.findAll('.footerItem')[1]
    // await recordItem.trigger('click')
    const routeName = 'Record'
    await wrapper.vm.routeTo(routeName)
    // expect(spyPush).toHaveBeenCalledTimes(1)
    expect(spyPush).toHaveBeenCalledOnce()
    expect(spyPush).toHaveBeenCalledWith({ name: routeName })
  })

  it('當前 route 需有 active class', async () => {
    const menuItems = wrapper.vm.menuItems
    await wrapper.vm.router.push({ name: menuItems[1].route })
    const Item1 = wrapper.findAll('.footerItem')[1]
    expect(Item1.classes()).toContain('active')
    await wrapper.vm.router.push({ name: menuItems[2].route })
    const Item2 = wrapper.findAll('.footerItem')[2]
    expect(Item2.classes()).toContain('active')
  })

  it('點擊新增交易出現分類 dialog', async () => {
    const transactionButton = wrapper.find('.transactionButton')
    await transactionButton.trigger('click')
    expect(wrapper.vm.categoryDialog).toBe(true)
  })

  // it('關閉 dialog', async () => {
  //   wrapper.vm.categoryDialog = true
  //   emitter.emit('closeDialog')
  //   expect(wrapper.vm.categoryDialog).toBe(false)
  // })
})
