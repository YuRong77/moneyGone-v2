<script setup lang="ts">
import { categoryAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import overview from '@/assets/images/svg/overview.svg'
import list from '@/assets/images/svg/list.svg'
import chart from '@/assets/images/svg/chart.svg'
import setting from '@/assets/images/svg/setting.svg'
import plus from '@/assets/images/svg/plus.svg'

const router = useRouter()
const route = useRoute()

const categoriesStore = useCategoriesStore()

const menuItems = [
  { name: '首頁', route: 'Lobby', icon: overview },
  { name: '紀錄', route: 'Record', icon: list },
  { name: '圖表', route: 'Chart', icon: chart },
  { name: '設置', route: 'Setting', icon: setting }
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

function getCategories() {
  categoryAPI.categoryList().then((res) => {
    categoriesStore.setCategories(res)
  })
}

onMounted(() => {
  getCategories()
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
    <button class="transactionButton" @click="categoryDialog = true">
      <inline-svg :src="plus" height="30" width="30" color="white"></inline-svg>
    </button>
  </div>
  <!-- categoryDialog -->
  <el-dialog v-model="categoryDialog" title="Tips" width="90%">
    <div>
      <CategoryItems @isSelected="categoryDialog = false" />
    </div>
    <template #footer>
      <div>
        <el-button @click="categoryDialog = false">cancel</el-button>
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
  padding-bottom: 6px;
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
      color: #6e8efb;
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
  background: linear-gradient(135deg, #6e8efb, #a777e3);
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
