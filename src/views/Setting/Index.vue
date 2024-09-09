<script setup lang="ts">
import { userAPI } from '@/apis'
import type { User } from '@/types'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'
import right from '@/assets/images/svg/right.svg'
import account from '@/assets/images/svg/account.svg'
import wallet from '@/assets/images/svg/wallet.svg'
import tags from '@/assets/images/svg/tags.svg'
import lang from '@/assets/images/svg/lang.svg'
import color from '@/assets/images/svg/color.svg'
import signOut from '@/assets/images/svg/logout.svg'

const router = useRouter()
const userProfile = ref<Partial<User>>({ theme: 'light' })
let isShowNameDialog = ref(false)
let isShowMonthlyBudgetDialog = ref(false)
let isShowMonthlyLangDialog = ref(false)
let isShowCategoryDrawer = ref(false)

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

function getProfile() {
  userAPI.getProfile().then((res) => {
    userProfile.value = res
  })
}

function updateUserTheme(val: string) {
  userAPI
    .updateUser({ theme: val })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {})
    .finally(() => {
      getProfile()
    })
}

function logout() {
  router.push({ name: 'Login' })
}

onMounted(() => {
  getProfile()
})
</script>
<template>
  <Header title="Setting" />
  <div class="setting content">
    <div class="card">
      <div class="item" @click="isShowNameDialog = true">
        <div class="label">
          <inline-svg :src="account" height="20" width="20"></inline-svg>
          <div>暱稱</div>
        </div>
        <div class="value">
          <div>{{ userProfile?.userName }}</div>
          <inline-svg :src="right" height="20" width="20"></inline-svg>
        </div>
      </div>
      <div class="item" @click="isShowMonthlyBudgetDialog = true">
        <div class="label">
          <inline-svg :src="wallet" height="20" width="20"></inline-svg>
          <div>預算</div>
        </div>
        <div class="value">
          <div>{{ userProfile?.monthlyBudget }}</div>
          <inline-svg :src="right" height="20" width="20"></inline-svg>
        </div>
      </div>
      <div class="item" @click="isShowMonthlyLangDialog = true">
        <div class="label">
          <inline-svg :src="lang" height="20" width="20"></inline-svg>
          <div>語系</div>
        </div>
        <div class="value">
          <div>{{ userProfile?.lang }}</div>
          <inline-svg :src="right" height="20" width="20"></inline-svg>
        </div>
      </div>
      <div class="item" @click="isShowCategoryDrawer = true">
        <div class="label">
          <inline-svg :src="tags" height="20" width="20"></inline-svg>
          <div>分類</div>
        </div>
        <div class="value">
          <div>{{ categories.length }} 個項目</div>
          <inline-svg :src="right" height="20" width="20"></inline-svg>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <inline-svg :src="color" height="20" width="20"></inline-svg>
          <div>主題</div>
        </div>
        <div>
          <el-switch
            v-model="userProfile.theme"
            active-value="dark"
            inactive-value="light"
            @change="updateUserTheme($event as string)"
          ></el-switch>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <inline-svg :src="signOut" height="20" width="20"></inline-svg>
          <div>登出</div>
        </div>
        <el-button @click="logout()">登出</el-button>
      </div>
    </div>
  </div>
  <NameDialog
    v-if="isShowNameDialog"
    v-model:isVisible="isShowNameDialog"
    :userName="userProfile?.userName"
    @getProfile="getProfile()"
  />
  <MonthlyBudgetDialog
    v-if="isShowMonthlyBudgetDialog"
    v-model:isVisible="isShowMonthlyBudgetDialog"
    :monthlyBudget="userProfile?.monthlyBudget"
    @getProfile="getProfile()"
  />
  <LangDialog
    v-if="isShowMonthlyLangDialog"
    v-model:isVisible="isShowMonthlyLangDialog"
    :lang="userProfile?.lang"
    @getProfile="getProfile()"
  />
  <CategoryDrawer
    v-if="isShowCategoryDrawer"
    v-model:isVisible="isShowCategoryDrawer"
    @getProfile="getProfile()"
  />
</template>

<style lang="scss" scoped>
.setting {
  .card {
    background: var(--card-color);
    border-radius: 12px;
    padding: 0 10px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px;
      > div {
        display: flex;
        align-items: center;
        div {
          margin-left: 10px;
        }
      }
      .label svg {
        color: #208eef;
      }
      .value {
        color: #ababab;
        div {
          font-size: 14px;
        }
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(58, 58, 58, 0.1);
      }
    }
  }
}
</style>
