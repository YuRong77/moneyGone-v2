<script setup lang="ts">
import { authAPI } from '@/apis'

const router = useRouter()
let pollingInterval: number

const checkServerStatus = async () => {
  try {
    const response = await authAPI.pingServer()
    if (response === 'success') {
      clearInterval(pollingInterval)
      router.push({ name: 'Lobby' })
    }
  } catch (error) {
    console.log('Server not ready yet')
  }
}

onMounted(() => {
  pollingInterval = setInterval(checkServerStatus, 2000)
})

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }
})
</script>

<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="loading-animation">
        <div class="spinner-outer">
          <div class="spinner-inner"></div>
        </div>
        <div class="pulse"></div>
      </div>
      <h2 class="loading-text">伺服器啟動中</h2>
      <p class="loading-description">系統初始化...</p>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  z-index: 9999;
}

.loading-content {
  text-align: center;
  padding: 5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(32, 142, 239, 0.08);
  backdrop-filter: blur(10px);
}

.loading-animation {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.spinner-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 3px solid rgba(32, 142, 239, 0.1);
  border-top: 3px solid #208eef;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(32, 142, 239, 0.15);
  border-top: 3px solid #208eef;
  border-radius: 50%;
  animation: spin 0.8s linear infinite reverse;
}

.pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(32, 142, 239, 0.05);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.loading-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #121e2b;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.loading-description {
  font-size: 1rem;
  color: #8d8d8d;
  letter-spacing: 0.3px;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
}
</style>
