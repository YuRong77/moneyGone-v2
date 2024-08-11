<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'
import type { PropType } from 'vue'
import type { Transaction, NewTransaction } from '@/types'

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

const formData = ref(props.transactionData)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

const isEdit = computed(() => {
  if ((props.transactionData as Transaction).id) return true
  return false
})

function getCategoryName(categoryId: number) {
  const Item = categories.value.find(item => item.id === categoryId)
  if (Item) return Item.name
  return ''
}

function submitHandler() {
  if (isEdit.value) return editTransaction()
  return addTransaction()
}

function editTransaction() {

}
function addTransaction() {
  const data = {
    ...formData.value,
    amount: formData.value.amount as number
  }
  transactionAPI.transactionCreate(data).then(res => {
    console.log(res)
    emitter.emit('refresh')
  })
    .catch((err) => { })
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