<script setup lang="ts">
import imageNull from '@/assets/images/png/imageNull.png'

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  url: {
    type: [String, null] as PropType<string | null>
  },
  categoryName: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 40
  }
})
</script>

<template>
  <div class="iconBox" :style="{ background: `${props.color}` }">
    <img
      v-if="props.url"
      :src="props.url"
      :style="{
        width: `${props.size - 8}px`,
        height: `${props.size - 8}px`
      }"
      @error="(e) => ((e.target as HTMLImageElement).src = imageNull)"
    />
    <div
      v-else
      class="icon"
      :style="{
        width: `${props.size - 8}px`,
        height: `${props.size - 8}px`
      }"
    >
      <span v-if="!props.url">{{ props.categoryName.charAt(0).toUpperCase() }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iconBox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 8px;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    span {
      color: white;
    }
  }
}
</style>
