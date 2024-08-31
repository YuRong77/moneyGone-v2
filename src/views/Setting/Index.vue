<script setup lang="ts">
import { userAPI } from '@/apis'
import type { User } from '@/types'
import right from '@/assets/images/svg/right.svg'

const router = useRouter()
const userProfile = ref<Partial<User>>({ theme: 'light' })
let isShowNameDialog = ref(false)
let isShowMonthlyBudgetDialog = ref(false)
let isShowMonthlyLangDialog = ref(false)

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
        <div>暱稱</div>
        <div>
          <span>{{ userProfile?.userName }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item" @click="isShowMonthlyBudgetDialog = true">
        <div>預算</div>
        <div>
          <span>{{ userProfile?.monthlyBudget }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item" @click="isShowMonthlyLangDialog = true">
        <div>語系</div>
        <div>
          <span>{{ userProfile?.lang }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item">
        <div>主題</div>
        <div>
          <el-switch
            v-model="userProfile.theme"
            active-value="dark"
            inactive-value="light"
            @change="updateUserTheme"
          ></el-switch>
        </div>
      </div>
      <div class="item">
        <div>登出</div>
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
      padding: 8px 0;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(58, 58, 58, 0.1);
      }
    }
  }
}
</style>
