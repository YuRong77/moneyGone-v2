<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'
import type { PropType } from 'vue'
import type { Transaction, NewTransaction } from '@/types'
import { cloneDeep } from 'lodash'
import { format, isToday, isSameDay } from 'date-fns'

const props = defineProps({
  isVisible: Boolean,
  transactionData: {
    type: Object as PropType<Transaction | NewTransaction>,
    required: true
  }
})
const emit = defineEmits(['update:isVisible'])

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const formData = ref(cloneDeep(props.transactionData))
let amount = ref()

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const isEdit = computed(() => {
  if ((props.transactionData as Transaction).id) return true
  return false
})

const currentShortcuts = computed(() => {
  const category = categories.value.find((item) => item.id === props.transactionData.categoryId)
  return category?.shortcuts || []
})

function getCategoryName(categoryId: number) {
  const Item = categories.value.find((item) => item.id === categoryId)
  if (Item) return Item.name
  return ''
}

function setName(name: string) {
  formData.value.name = name
  amount.value.focus()
}

function submitHandler() {
  if (isEdit.value) return editTransaction()
  return addTransaction()
}

function editTransaction() {
  const { id, name, amount, note, createdAt } = formData.value as Transaction
  const date = createdAt
  const data = isSameDay(createdAt, props.transactionData.createdAt)
    ? { name, amount, note }
    : { name, amount, note, date }
  transactionAPI
    .transactionUpdate(id, data)
    .then(() => {
      emitter.emit('refresh')
    })
    .catch((err) => {})
    .finally(() => {
      emit('update:isVisible', false)
    })
}

function addTransaction() {
  const { createdAt } = formData.value as NewTransaction
  const data = {
    ...formData.value,
    amount: formData.value.amount as number,
    date: isToday(createdAt)
      ? format(createdAt, 'yyyy-MM-dd HH:mm:ss')
      : format(createdAt, 'yyyy-MM-dd 00:00:00')
  }
  transactionAPI
    .transactionCreate(data)
    .then((res) => {
      console.log(res)
      emitter.emit('refresh')
    })
    .catch((err) => {})
    .finally(() => {
      emit('update:isVisible', false)
    })
}
</script>

<template>
  <el-dialog
    v-model="isVisibleModel"
    :title="`新增${getCategoryName(props.transactionData.categoryId)}`"
    width="90%"
  >
    <div>
      <div class="label">日期</div>
      <el-date-picker
        v-model="formData.createdAt"
        :editable="false"
        :clearable="false"
        type="date"
        placeholder="Pick a day"
      />
      <div class="label">名稱</div>
      <el-input v-model="formData.name" class="popupInput" placeholder="Please input" />
      <div class="shortcutList">
        <el-check-tag
          v-for="shortcut in currentShortcuts"
          :key="shortcut.id"
          @click="setName(shortcut.name)"
          type="info"
          >{{ shortcut.name }}</el-check-tag
        >
      </div>
      <div class="label">金額</div>
      <el-input
        v-model.number="formData.amount"
        ref="amount"
        class="popupInput"
        type="tel"
        placeholder="Please input"
      />
      <div class="label">備註</div>
      <el-input v-model="formData.note" class="popupInput" placeholder="Please input" />
    </div>
    <template #footer>
      <div>
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)"
          >cancel</el-button
        >
        <el-button color="#208eef" class="mainBtn" @click="submitHandler()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.label {
  margin-bottom: 4px;
}
.el-input {
  margin-bottom: 10px;
}
.shortcutList {
  .el-check-tag {
    margin: 0 4px 4px 0;
  }
}
</style>
