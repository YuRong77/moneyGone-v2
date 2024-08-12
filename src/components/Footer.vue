<script setup lang="ts">
const router = useRouter()

let isVisible = ref(false)

function routeTo(routeName: string) {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="footer appWidth">
    <div @click="routeTo('Lobby')">lobby</div>
    <div @click="routeTo('Record')">record</div>
    <div @click="isVisible = true">+</div>
    <div @click="routeTo('Chart')">chart</div>
    <div @click="routeTo('Setting')">setting</div>
  </div>
  <CategoryCard v-model:isVisible="isVisible" />
</template>



<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: var(--card-color);
  display: flex;

  div {
    flex: 1;
    text-align: center;
  }
}
</style>