<template>
  <div class="app">
    <!-- vue3里面使用 keep-alive 缓存路由组件的写法 -->
    <RouterView v-slot="props">
      <KeepAlive include="Home">
        <component :is="props.Component"></component>
      </KeepAlive>
    </RouterView>
    <Tabbar />
    <Loading />
  </div>
</template>

<script setup>
// vue3顶层特性写法，再这个script标签里面写
import Tabbar from './components/tabbar/tabbar.vue';
import Loading from './components/loading/loading.vue';
</script>

<style lang="less" scoped></style>
