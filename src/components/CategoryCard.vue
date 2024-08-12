<script setup lang="ts">
const props = defineProps({
  isVisible: Boolean,
})
const emit = defineEmits(['update:isVisible'])

const isVisibleModel = computed({
  get: () => props.isVisible,
  set: (val) => emit('update:isVisible', val)
})

</script>

<template>
  <el-dialog v-model="isVisibleModel" title="Tips" width="90%">
    <div>
      <CategoryTab @isSelected="emit('update:isVisible', false)" />
    </div>
    <template #footer>
      <div>
        <el-button @click="emit('update:isVisible', false)">cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>



<style scoped></style>