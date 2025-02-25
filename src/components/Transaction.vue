<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import { transactionAPI } from '@/apis'
import { emitter } from '@/utils/emitter'
import type { PropType } from 'vue'
import type { Transaction, NewTransaction } from '@/types'
import type { FormInstance, FormRules } from 'element-plus'
import { cloneDeep } from 'lodash'
import { format, isToday, isSameDay } from 'date-fns'
import { showMessage } from '@/utils/message'

const { t } = useI18n()
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
let amountRef = ref()
let formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
  name: [{ required: true, message: t('LC_TIPS_NAME'), trigger: 'blur' }],
  amount: [{ required: true, message: t('LC_TIPS_AMOUNT'), trigger: 'blur' }]
})
let isLoading = ref(false)

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
  formRef.value!.validateField('name')
  amountRef.value.focus()
}

function submitHandler() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    if (isEdit.value) return editTransaction()
    return addTransaction()
  })
}

function editTransaction() {
  const { id, name, amount, note, createdAt } = formData.value as Transaction
  const date = createdAt
  const data = isSameDay(createdAt, props.transactionData.createdAt)
    ? { name, amount, note }
    : { name, amount, note, date }
  isLoading.value = true
  transactionAPI
    .transactionUpdate(id, data)
    .then(() => {
      showMessage(t('LC_EDIT_SUCCESS'))
      emitter.emit('refresh')
    })
    .catch((err) => {})
    .finally(() => {
      isLoading.value = false
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
  isLoading.value = true
  transactionAPI
    .transactionCreate(data)
    .then((res) => {
      showMessage(t('LC_ADD_SUCCESS'))
      emitter.emit('refresh')
    })
    .catch((err) => {})
    .finally(() => {
      isLoading.value = false
      emit('update:isVisible', false)
    })
}
</script>

<template>
  <el-dialog
    v-model="isVisibleModel"
    :title="`${isEdit ? t('LC_EDIT') : t('LC_ADD')}${getCategoryName(props.transactionData.categoryId)}`"
    width="90%"
  >
    <div>
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <div class="label">{{ t('LC_DATE') }}</div>
        <el-date-picker
          v-model="formData.createdAt"
          :editable="false"
          :clearable="false"
          type="date"
        />
        <div class="label">{{ t('LC_NAME') }}</div>
        <el-form-item prop="name">
          <el-input
            v-model="formData.name"
            class="popupInput"
            :placeholder="t('LC_TIPS_NAME')"
            data-test="inputName"
          />
        </el-form-item>
        <div class="shortcutList">
          <el-check-tag
            v-for="shortcut in currentShortcuts"
            :key="shortcut.id"
            @click="setName(shortcut.name)"
            type="info"
            data-test="shortcut"
            >{{ shortcut.name }}</el-check-tag
          >
        </div>
        <div class="label">{{ t('LC_AMOUNT') }}</div>
        <el-form-item prop="amount">
          <el-input
            v-model.number="formData.amount"
            ref="amountRef"
            class="popupInput"
            type="text"
            inputmode="numeric"
            :placeholder="t('LC_TIPS_AMOUNT')"
            data-test="inputAmount"
          />
        </el-form-item>
        <div class="label">{{ t('LC_NOTE') }}</div>
        <el-input v-model="formData.note" class="popupInput" :placeholder="t('LC_TIPS_NOTE')" />
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button
          color="#f1f1f1"
          class="mainBtn"
          data-test="cancel"
          @click="emit('update:isVisible', false)"
          >{{ t('LC_CANCEL') }}</el-button
        >
        <el-button
          color="#208eef"
          class="mainBtn"
          data-test="submit"
          :loading="isLoading"
          @click="submitHandler()"
          >{{ t('LC_SUBMIT') }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.label {
  margin-bottom: 4px;
}

// .el-input {
//   margin-bottom: 10px;
// }

.shortcutList {
  .el-check-tag {
    margin: 0 4px 4px 0;
  }
}
</style>
