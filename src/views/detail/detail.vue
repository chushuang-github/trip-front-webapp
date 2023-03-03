<template>
  <div class="top-page detail" ref="detailRef">
    <TabControl
      v-if="showTabControl"
      class="tabs"
      :titles="titles"
      ref="tabControlRef"
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
    <DetailActionBar :current-house="detailInfo.currentHouse"/>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
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
import DetailActionBar from './cpns/detail-action-bar.vue'
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
const showTabControl = computed(() => scrollTop.value > 255)
const sectionEls = ref({})
const titles = computed((() => {
  return Object.keys(sectionEls.value)
}))
const getSectionRef = (value) => {
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
// 点击tabControl，页面滚动到对应的位置
let isClick = ref(false) // 是否是点击滚动
let currentDistance = -1 // 当前滚动的位置
const itemClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop - 40

  isClick.value = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}

// 页面滚动，tabControl显示到对应的索引位置
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if(newValue === currentDistance) {
    isClick.value = false
  }
  if(isClick.value) return false

  // 1、取所有区域的offsetTop
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  // 2、根据页面滚动的scrollTop值，去匹配value
  // 一直再变化的一直值(scrollTop)，去一个数组里面寻找位置的一个算法
  let index = values.length - 1
  for(let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 40) {
      index = i - 1
      break
    }
  }

  // 3、设置tabControl索引
  tabControlRef.value?.setCurrentIndex(index)
})

</script>

<style lang="less" scoped>
.detail {
  padding-bottom: 60px;
  .tabs {
    position: fixed;
    z-index: 999;
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
}
</style>