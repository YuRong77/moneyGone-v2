<script setup lang="ts">
import { transactionAPI } from '@/apis'
import { ElMessageBox } from 'element-plus'
import { emitter } from '@/utils/emitter'
import type { Transaction } from '@/types'
import menuKebab from '@/assets/images/svg/menu-kebab.svg'
import cat from '@/assets/images/png/cat.png'

const props = defineProps({
  item: {
    type: Object as PropType<Transaction>,
    default: () => { }
  }
})

function deleteCheck(item: Transaction) {
  ElMessageBox.confirm(
    `確認刪除 ${item.name} ?`,
    '刪除確認',
    {
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteTransaction(item.id)
  }).catch(() => { })
}

function deleteTransaction(id: number) {
  transactionAPI.transactionDelete(id).then(() => {
    emitter.emit('refresh')
  }).catch((err) => { })
    .finally(() => { })
}

</script>

<template>
  <div class="recordItem">
    <div class="info">
      <div class="iconBox">
        <div class="icon" :style="{ backgroundImage: `url(${cat})` }"></div>
      </div>
      <div>
        <div>{{ props.item.name }}</div>
        <div>{{ props.item.amount }}</div>
      </div>
    </div>
    <el-popover :width="65" effect="light" trigger="click" :teleported="false" transition="el-zoom-in-top">
      <el-button class="mb-1" link @click="emitter.emit('editTransaction', props.item)">編輯</el-button>
      <el-button link @click="deleteCheck(props.item)">刪除</el-button>
      <template #reference>
        <el-button link>
          <inline-svg :src="menuKebab" height="18" width="18"></inline-svg>
        </el-button>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.recordItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--card-color);
  border-radius: 12px;

  .info {
    display: flex;
    align-items: center;

    .iconBox {
      margin-right: 10px;
      padding: 4px;
      border-radius: 8px;
      background: wheat;

      .icon {
        width: 32px;
        height: 32px;
        background-position: center;
        background-size: cover;

      }
    }
  }

}

:deep(.el-popover.el-popper) {
  min-width: 50px;
  padding: 6px;

  .el-popper__arrow {
    display: none;
  }

  .el-button {
    width: 100%;
    margin-left: 0;

    span {
      width: 100%;
      text-align: left;
    }
  }
}
</style>