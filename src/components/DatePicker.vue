<script setup lang="ts">
import zhTW from 'element-plus/es/locale/lang/zh-tw'
import ja from 'element-plus/es/locale/lang/ja'
import en from 'element-plus/es/locale/lang/en'
import ko from 'element-plus/es/locale/lang/ko'

import { addMonths, addYears, format } from 'date-fns'
import left from '@/assets/images/svg/left.svg'
import right from '@/assets/images/svg/right.svg'
import calendar from '@/assets/images/svg/calendar.svg'

const props = defineProps<{ date: Date; type: 'month' | 'year' }>()
const emit = defineEmits(['update:date'])

let datePicker = ref()
let isCalendarVisible = ref(false)

const dateModel = computed({
  get: () => props.date,
  set: (val) => emit('update:date', val)
})

const displayDate = computed(() => {
  if (props.type === 'year') return format(dateModel.value, 'yyyy')
  return format(dateModel.value, 'yyyy-MM')
})

watch(isCalendarVisible, (val) => {
  if (!datePicker.value) return
  if (val) return datePicker.value.handleOpen()
  return datePicker.value.handleClose()
})

function prev() {
  if (props.type === 'month') return emit('update:date', addMonths(props.date, -1))
  emit('update:date', addYears(props.date, -1))
}
function next() {
  if (props.type === 'month') return emit('update:date', addMonths(props.date, 1))
  emit('update:date', addYears(props.date, 1))
}
</script>

<template>
  <el-config-provider :locale="zhTW">
    <div class="datePicker">
      <el-button class="cardShadow" link @click="prev()">
        <inline-svg :src="left" height="24" width="24" color="#ababab"></inline-svg>
      </el-button>
      <div class="date">
        <el-button link class="btn" @click="isCalendarVisible = !isCalendarVisible">
          <inline-svg :src="calendar" height="16" width="16"></inline-svg>
          <span>{{ displayDate }}</span>
        </el-button>
        <el-date-picker
          ref="datePicker"
          v-model="dateModel"
          type="month"
          :clearable="false"
          placeholder="Pick a month"
          @visible-change="(val: boolean) => (isCalendarVisible = val)"
        />
      </div>
      <el-button class="cardShadow" link @click="next()">
        <inline-svg :src="right" height="24" width="24" color="#ababab"></inline-svg>
      </el-button>
    </div>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.datePicker {
  display: flex;
  align-items: center;
  .el-button.is-link:hover {
    color: var(--el-button-text-color);
  }
  .el-button:not(.btn) {
    background: var(--card-color);
  }
}

.date {
  height: 25px;

  cursor: pointer;
  position: relative;

  .btn {
    padding: 0 10px 4px 8px;
    height: 100%;
    position: relative;
    z-index: 10;

    svg {
      margin-right: 5px;
    }
  }

  :deep(.el-input) {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;

    .el-input__wrapper {
      display: none;
    }
  }
}
</style>
