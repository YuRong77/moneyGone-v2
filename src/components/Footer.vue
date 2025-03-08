<script setup lang="ts">
import { emitter } from '@/utils/emitter'
import overview from '@/assets/images/svg/overview.svg'
import list from '@/assets/images/svg/list.svg'
import chart from '@/assets/images/svg/chart.svg'
import setting from '@/assets/images/svg/setting.svg'
import plus from '@/assets/images/svg/plus.svg'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const menuItems = [
  { name: t('LC_HOME'), route: 'Lobby', icon: overview },
  { name: t('LC_RECORD'), route: 'Record', icon: list },
  { name: t('LC_CHART'), route: 'Chart', icon: chart },
  { name: t('LC_SETTING'), route: 'Setting', icon: setting }
]

let activeRoute = ref('')
let categoryDialog = ref(false)

watch(
  () => route.name,
  (val) => {
    activeRoute.value = val as string
  },
  { immediate: true }
)

function routeTo(routeName: string) {
  router.push({ name: routeName })
}

onMounted(() => {
  emitter.on('closeDialog', () => (categoryDialog.value = false))
})
onBeforeUnmount(() => {
  emitter.off('closeDialog')
})
</script>

<template>
  <div class="footer appWidth">
    <div
      v-for="item in menuItems"
      :key="item.route"
      class="footerItem"
      :class="{ active: item.route === activeRoute }"
      @click="routeTo(item.route)"
    >
      <inline-svg :src="item.icon" height="24" width="24"></inline-svg>
      <span class="itemName">{{ item.name }}</span>
    </div>
    <button class="transactionButton" aria-label="新增記錄" @click="categoryDialog = true">
      <inline-svg :src="plus" height="30" width="30" color="white"></inline-svg>
    </button>
  </div>
  <!-- categoryDialog -->
  <el-dialog
    v-model="categoryDialog"
    :title="t('LC_SELECT_CATEGORY')"
    width="90%"
    body-class="categoryDialog"
  >
    <div>
      <CategoryItems @isSelected="categoryDialog = false" />
    </div>
    <template #footer>
      <div>
        <el-button class="mainBtn" @click="categoryDialog = false">{{ t('LC_CANCEL') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: var(--card-color);
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footerItem {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 10px;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: #777;
  }

  .itemName {
    font-size: 12px;
    color: #777;
    position: relative;
    bottom: -5px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:nth-child(2) {
    margin-right: 80px;
  }

  &.active {
    svg {
      color: #208eef;
    }

    .itemName {
      opacity: 1;
      bottom: 0;
    }
  }
}

.transactionButton {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #208eef, #1185eb);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  transform: translateY(-32px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-38px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
}
</style>

<style lang="scss">
.categoryDialog {
  padding: 12px;
  background: #f3f4f8;
  border-radius: 8px;
}
</style>
