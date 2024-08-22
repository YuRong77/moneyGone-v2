<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<template>
  <header class="header appWidth">
    <div class="headerLeft">
      <slot name="left">
        <h1>{{ props.title }}</h1>
      </slot>
    </div>
    <div class="headerRight">
      <slot name="right">
      </slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: var(--backgroundRGB-color);
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 10;

  h1 {
    color: var(--title-color);
  }
}
</style>