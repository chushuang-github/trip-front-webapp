<template>
  <van-tabbar route active-color="#ff9645">
    <template v-for="item in tabbarData" :key="item.to">
      <van-tabbar-item :to="item.to" :icon="item.icon">{{ item.text }}</van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script setup>
const tabbarData = [
  { to: "/home", icon: "wap-home-o", text: "首页" },
  { to: "/favor", icon: "like-o", text: "收藏" },
  { to: "/order", icon: "orders-o", text: "订单" },
  { to: "/message", icon: "chat-o", text: "消息" },
]
</script>

<style lang="less" scoped></style>