<script setup lang="ts">
import { userAPI } from '@/apis'
import { cloneDeep } from 'lodash'

const props = defineProps({
  isVisible: Boolean,
  monthlyBudget: Number
})
const emit = defineEmits(['update:isVisible', 'getProfile'])

let monthlyBudget = ref(cloneDeep(props.monthlyBudget))

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

function updateMonthlyBudget() {
  userAPI
    .updateUser({ monthlyBudget: monthlyBudget.value })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {})
    .finally(() => {
      emit('update:isVisible', false)
      emit('getProfile')
    })
}
</script>

<template>
  <el-dialog v-model="isVisibleModel" title="修改預算" width="90%">
    <div>
      <el-input v-model.number="monthlyBudget" type="number"></el-input>
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
        <el-button @click="updateMonthlyBudget()">submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
