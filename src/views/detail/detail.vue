<template>
  <div class="top-page" ref="detailRef">
    <TabControl
      v-if="showTabControl"
      class="tabs"
      :titles="titles"
      @itemClick="itemClick"
    />
    <!-- 导航 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <DetailSwipe :swipeData="mainPart.topModule.housePicture.housePics" />
      <DetailInfos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule" />
      <DetailFacility name="设施" :ref="getSectionRef" :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility" />
      <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <DetailComment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <DetailNotice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <DetailMap name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
      <DetailIntro :intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import DetailSwipe from './cpns/detail-01-swipe.vue'
import DetailInfos from './cpns/detail-02-infos.vue';
import DetailFacility from './cpns/detail-03-facility.vue';
import DetailLandlord from './cpns/detail-04-landlord.vue';
import DetailComment from './cpns/detail-05-comment.vue'
import DetailNotice from './cpns/detail-06-notice.vue'
import DetailMap from './cpns/detail-07-map.vue'
import DetailIntro from './cpns/detail-08-intro.vue'
import TabControl from '@/components/tab-control/tab-control.vue'
import { getDetailInfos } from "@/service"
import useScroll from "@/hooks/useScroll"

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

// tabControl相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => scrollTop.value > 280)
const sectionEls = ref({})
const titles = computed((() => {
  return Object.keys(sectionEls.value)
}))
const getSectionRef = (value) => {
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
const itemClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if(index !== 0) {
    instance -= 44
  }
  detailRef.value.scrollTo({
    top: instance,
    behavior: 'smooth'
  })
}

</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>