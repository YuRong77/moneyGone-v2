import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryIcon from '@/components/Category/CategoryIcon.vue'
import imageNull from '@/assets/images/png/imageNull.png'

describe('CategoryIcon Component', () => {
  it('應該正確渲染元件', () => {
    const wrapper = mount(CategoryIcon, {
      props: {
        color: '#ff0000',
        url: null,
        categoryName: 'Food',
        size: 40
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('當 url 存在時應該顯示圖片', () => {
    const wrapper = mount(CategoryIcon, {
      props: {
        color: '#ff0000',
        url: 'https://picsum.photos/200',
        categoryName: 'Food',
        size: 40
      }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://picsum.photos/200')
  })

  it('當 url 不存在時應該顯示 categoryName 的首字母', () => {
    const wrapper = mount(CategoryIcon, {
      props: {
        color: '#ff0000',
        url: null,
        categoryName: 'Food',
        size: 40
      }
    })
    const span = wrapper.find('.icon span')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('F')
  })

  it('圖片加載錯誤時應該顯示預設圖片', async () => {
    const wrapper = mount(CategoryIcon, {
      props: {
        color: '#ff0000',
        url: 'https://picsum.photos/200',
        categoryName: 'Food',
        size: 40
      }
    })
    const img = wrapper.find('img')
    await img.trigger('error')
    expect(img.attributes('src')).toBe(imageNull)
  })

  it('應該正確應用 color 和 size 屬性到樣式', () => {
    const wrapper = mount(CategoryIcon, {
      props: {
        color: '#ff0000', //會被轉換成 rgb(255, 0, 0)，用 #ff0000 會錯誤
        url: null,
        categoryName: 'Food',
        size: 40
      }
    })
    const iconBox = wrapper.find('.iconBox')
    expect(iconBox.attributes('style')).toContain('background: rgb(255, 0, 0);')
    const icon = wrapper.find('.icon')
    expect(icon.attributes('style')).toContain('width: 32px; height: 32px;')
  })
})
