<template>
  <div class="city top-page">
    <van-search 
      v-model="searchValue" 
      shape="round"
      show-action
      placeholder="城市/区域/位置"
      @cancel="onCancel"
    />
    <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
      <van-tab title="国内·港澳台"></van-tab>
      <van-tab title="海外"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCityAll } from "@/service"

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const onCancel = () => {
  router.back()
}

// tab切换
const tabActive = ref(0)

// 网络请求
getCityAll().then(res => {
  console.log(res)
})

</script>

<style lang="less" scoped>

</style>