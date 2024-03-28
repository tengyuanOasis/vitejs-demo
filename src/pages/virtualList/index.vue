<template>
  <!-- <v1 :listData="list" /> -->
  <v2 :listData="list" />
</template>

<script setup lang="js">
import v1 from './components/v1.vue';
import v2 from './components/v2.vue';
import { ref } from "vue";
const list = ref([]);
const generateList = () => {
  for (let i = 0; i < 100000; i++) {
    list.value.push({
      value: i
    })
  }
}
generateList()
</script>

<style scoped></style>
