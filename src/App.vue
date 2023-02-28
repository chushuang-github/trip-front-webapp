<template>
  <div class="app">
    <RouterView />
    <Tabbar />
    <Loading />
  </div>
</template>

<script setup>
import Tabbar from './components/tabbar/tabbar.vue';
import Loading from './components/loading/loading.vue';

</script>

<style lang="less" scoped></style>
