<template>
  <div class="home">
    <HomeNavBar />
    <HomeBanner />
    <HomeSearchBox />
    <HomeCategory />

    <div v-if="isShowSearchBar">我是搜索内容</div>

    <HomeContent />
  </div>
</template>

<script setup>
import { watch, computed } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeBanner from './cpns/home-banner.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategory from './cpns/home-category.vue';
import HomeContent from './cpns/home-content.vue'
import useHomeStore from '@/store/modules/home'
import useScroll from '@/hooks/useScroll'

// 热门建议/分类
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

const { isReachBottom, scrollTop } =  useScroll()

// 上拉加载
watch(isReachBottom, (newValue) => {
  if(newValue) {
    // 发生网络请求，加载更多数据
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框显示控制
const isShowSearchBar = computed(() => scrollTop.value >= 100)

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
}
</style>