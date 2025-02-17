<script setup lang="ts">
import { transactionAPI } from '@/apis'
import { ElMessageBox } from 'element-plus'
import { emitter } from '@/utils/emitter'
import { priceFormat } from '@/utils/priceFormat'
import { format } from 'date-fns'
import type { Transaction } from '@/types'
import menuKebab from '@/assets/images/svg/menu-kebab.svg'
import info from '@/assets/images/svg/info.svg'

const { t } = useI18n()
const props = defineProps({
  item: {
    type: Object as PropType<Transaction>,
    default: () => {}
  },
  showDate: {
    type: Boolean,
    default: false
  }
})

function deleteCheck(item: Transaction) {
  ElMessageBox.confirm(`${t('LC_DELETE_TIPS', { name: item.name })}`, t('LC_WARN'), {
    confirmButtonText: t('LC_DELETE'),
    cancelButtonText: t('LC_CANCEL'),
    type: 'warning'
  })
    .then(() => {
      deleteTransaction(item.id)
    })
    .catch(() => {})
}

function deleteTransaction(id: number) {
  transactionAPI
    .transactionDelete(id)
    .then(() => {
      emitter.emit('refresh')
    })
    .catch((err) => {})
    .finally(() => {})
}
</script>

<template>
  <div class="recordItem cardShadow">
    <div class="info">
      <CategoryIcon
        class="mr-2"
        :color="props.item.categoryColor"
        :url="props.item.imageUrl"
        :categoryName="props.item.categoryName"
      />
      <div>
        <div class="name">{{ props.item.name }}</div>
        <div class="flexBox">
          <div class="amount">$ {{ priceFormat(props.item.amount) }}</div>
          <el-popover trigger="click" :content="props.item.note" v-if="props.item.note">
            <template #reference>
              <el-button class="infoIcon" link>
                <inline-svg :src="info" height="18" width="18" color="#208eef"></inline-svg>
              </el-button>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="date" v-if="props.showDate">{{ format(props.item.createdAt, 'yyyy-MM-dd') }}</div>
      <el-popover
        :width="65"
        effect="light"
        trigger="click"
        :teleported="false"
        transition="el-zoom-in-top"
      >
        <el-button class="mb-1" link @click="emitter.emit('editTransaction', props.item)">{{
          t('LC_EDIT')
        }}</el-button>
        <el-button link type="danger" @click="deleteCheck(props.item)">{{
          t('LC_DELETE')
        }}</el-button>
        <template #reference>
          <el-button link>
            <inline-svg :src="menuKebab" height="18" width="18"></inline-svg>
          </el-button>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recordItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: var(--card-color);
  border-radius: 12px;

  .info {
    display: flex;
    align-items: center;
    .name {
      color: #8d8d8d;
      font-size: 14px;
    }
    .flexBox {
      display: flex;
      align-items: center;
      .amount {
        font-weight: 500;
        margin-right: 6px;
      }
    }
    .infoIcon {
      padding: 0;
      :deep(span) {
        color: white;
      }
    }
  }
  .action {
    display: flex;
    align-items: center;
    .date {
      font-size: 14px;
      color: #8d8d8d;
      margin-right: 10px;
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
