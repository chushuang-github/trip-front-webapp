<template>
  <div class="top-page">
    <!-- 导航 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart">
      <!-- 轮播图 -->
      <DetailSwipe :swipeData="mainPart.topModule.housePicture.housePics" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import DetailSwipe from './cpns/detail-swipe.vue'
import { getDetailInfos } from "@/service"

const router = useRouter()
const route = useRoute()

// 发送网络请求，获取房屋的详情
const detailInfo = ref({})
const mainPart = computed(() => detailInfo.value.mainPart)
getDetailInfos(route.params.id).then(res => {
  detailInfo.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

</script>

<style lang="less" scoped>

</style>