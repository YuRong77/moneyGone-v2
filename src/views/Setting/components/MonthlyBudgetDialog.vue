<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const props = defineProps({
  isVisible: Boolean,
  monthlyBudget: Number
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

let formData = ref({ monthlyBudget: cloneDeep(props.monthlyBudget) })
let formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
  monthlyBudget: [{ required: true, message: t('LC_BUDGET_TIPS'), trigger: 'change' }]
})
let isLoading = ref(false)

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateMonthlyBudget() {
  formRef.value!.validate((valid) => {
    if (!valid) return
    isLoading.value = true
    userAPI
      .updateUser({ monthlyBudget: formData.value.monthlyBudget })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        isLoading.value = false
        emit('update:isVisible', false)
        emit('getProfile')
      })
  })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" :title="t('LC_EDIT_BUDGET')" width="90%">
    <div class="content">
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item prop="monthlyBudget">
          <el-input
            class="popupInput"
            v-model.number="formData.monthlyBudget"
            type="numeric"
            :placeholder="t('LC_BUDGET_TIPS')"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div>
        <el-button color="#f1f1f1" class="mainBtn" @click="emit('update:isVisible', false)">{{
          t('LC_CANCEL')
        }}</el-button>
        <el-button
          color="#208eef"
          class="mainBtn"
          :loading="isLoading"
          @click="updateMonthlyBudget()"
          >{{ t('LC_SUBMIT') }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  padding: 20px 0;
}
</style>
