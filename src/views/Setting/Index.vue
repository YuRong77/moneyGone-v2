<script setup lang="ts">
import { userAPI } from '@/apis'
import right from '@/assets/images/svg/right.svg'

const router = useRouter()
const userProfile = ref()

function getProfile() {
  userAPI.getProfile().then((res) => {
    userProfile.value = res
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
      <div class="item">
        <div>修改暱稱</div>
        <div>
          <span>{{ userProfile?.userName }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item">
        <div>調整預算</div>
        <div>
          <span>{{ userProfile?.monthlyBudget }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item">
        <div>語系</div>
        <div>
          <span>{{ userProfile?.lang }}</span>
          <inline-svg :src="right" height="18" width="18"></inline-svg>
        </div>
      </div>
      <div class="item">
        <div>主題</div>
        <div>
          <span>{{ userProfile?.theme }}</span>
          <el-switch></el-switch>
        </div>
      </div>
      <div class="item">
        <div>登出</div>
        <el-button @click="logout()">登出</el-button>
      </div>
    </div>
  </div>
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
