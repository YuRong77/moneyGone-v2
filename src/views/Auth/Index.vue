<script setup lang="ts"></script>

<template>
  <div class="auth">
    <div class="card cardShadow">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  min-height: 100dvh;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 400px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin: 0 auto;
    @media (max-width: 520px) {
      width: 100%;
      min-height: 100dvh;
      border-radius: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
