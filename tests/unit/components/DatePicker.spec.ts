import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'
import { addMonths, format } from 'date-fns'

describe('DatePicker Component', () => {
  let wrapper: any
  const date = new Date('2025-01-01')

  beforeEach(() => {
    wrapper = mount(DatePicker, {
      props: {
        date,
        type: 'month'
      }
    })
  })

  it('基本渲染', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('datePicker')
  })

  it('正確顯示 props date', async () => {
    const displayDate = format(date, 'yyyy-MM')
    expect(wrapper.find('[data-test="displayDate"]').text()).toBe(displayDate)
  })

  it('正確切換 props type ', async () => {
    await wrapper.setProps({ type: 'year' })
    const displayDate = format(date, 'yyyy')
    expect(wrapper.find('[data-test="displayDate"]').text()).toBe(displayDate)
  })

  it('前後按鈕切換日期', async () => {
    //使用 props 所以點擊後直接抓 displayDate.text 不會變，除非再setProps date
    await wrapper.find('[data-test="prev"]').trigger('click')
    expect(wrapper.emitted('update:date')[0]).toEqual([addMonths(date, -1)])

    await wrapper.find('[data-test="next"]').trigger('click')
    expect(wrapper.emitted('update:date')[1]).toEqual([addMonths(date, 1)])
  })

  it('日曆顯示和選擇功能', async () => {
    const dateButton = wrapper.find('[data-test="displayDate"]')
    await dateButton.trigger('click')
    expect(wrapper.vm.isCalendarVisible).toBe(true)

    await dateButton.trigger('click')
    expect(wrapper.vm.isCalendarVisible).toBe(false)
  })
})
