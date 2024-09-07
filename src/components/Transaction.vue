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

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const isEdit = computed(() => {
  if ((props.transactionData as Transaction).id) return true
  return false
})

function getCategoryName(categoryId: number) {
  const Item = categories.value.find((item) => item.id === categoryId)
  if (Item) return Item.name
  return ''
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
  <el-dialog v-model="isVisibleModel" title="Tips" width="90%">
    <div>
      <div>{{ getCategoryName(props.transactionData.categoryId) }}</div>
      <div>名稱</div>
      <el-input v-model="formData.name" placeholder="Please input" />
      <div>日期</div>
      <el-date-picker v-model="formData.createdAt" type="date" placeholder="Pick a day" />
      <div>金額</div>
      <el-input v-model.number="formData.amount" type="number" placeholder="Please input" />
      <div>備註</div>
      <el-input v-model="formData.note" placeholder="Please input" />
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
        <el-button @click="submitHandler()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
