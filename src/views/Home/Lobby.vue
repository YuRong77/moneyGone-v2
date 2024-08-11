<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Transaction } from '@/types'
import { categoryAPI, transactionAPI } from '@/apis'
import { useCategoriesStore } from '@/stores/categories'
import { format, startOfDay, endOfDay } from "date-fns";
import Header from "@/components/Header.vue"
import CategoryTab from "@/components/CategoryTab.vue"

const categoriesStore = useCategoriesStore()

const records = ref<Transaction[]>([])

function getCategories() {
  categoryAPI.categoryList().then(res => {
    categoriesStore.setCategories(res)
  })
}

function getTodayRecord() {
  const data = {
    startDate: format(startOfDay(new Date()), 'yyyy-MM-dd'),
    endDate: format(endOfDay(new Date()), 'yyyy-MM-dd')
  }
  transactionAPI.transactionList(data).then(res => {
    records.value = res
  })
}

onMounted(() => {
  getCategories()
  getTodayRecord()
})
</script>
<template>
  <Header title="Lobby" />
  <div class="content">

    <CategoryTab />
    <div v-for="item in records" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped>
.content {}
</style>