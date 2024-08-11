<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from "@/components/Footer.vue"
</script>

<template>
  <div class="main appWidth">
    <RouterView />
    <Footer />
  </div>
</template>



<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--background-color);

  .content {
    flex: 1;
    padding: 100px 15px 82px; //header + 20 footer + 10
  }
}
</style>