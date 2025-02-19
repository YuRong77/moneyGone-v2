import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header Component', () => {
  it('基本渲染', () => {
    const wrapper = mount(Header, {
      props: {
        title: 'Test Title'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('header')
  })

  it('標題渲染', () => {
    const title = 'My Header'
    const wrapper = mount(Header, {
      props: {
        title
      }
    })
    expect(wrapper.find('h1').text()).toBe(title)
  })

  it('測試 slots 顯示傳入內容', () => {
    const wrapper = mount(Header, {
      slots: {
        left: '<div class="custom-left">Left Content</div>',
        right: '<div class="custom-right">Right Content</div>'
      }
    })
    expect(wrapper.find('.custom-left').exists()).toBe(true)
    expect(wrapper.find('.custom-left').text()).toBe('Left Content')
    expect(wrapper.find('.custom-right').exists()).toBe(true)
    expect(wrapper.find('.custom-right').text()).toBe('Right Content')
  })
})
