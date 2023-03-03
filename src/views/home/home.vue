<template>
  <div class="home" ref="homeRef">
    <HomeNavBar />
    <HomeBanner />
    <HomeSearchBox />
    <HomeCategory />
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar />
    </div>
    <HomeContent />
  </div>
</template>

<!-- vue3里面顶层特性的写法，如何给组件添加name属性 -->
<!-- 写两个script标签，再其中一个script标签里面，还是像vue2那样定义组件name属性 -->
<script>
  export default {
    name: "Home"
  }
</script>

<script setup>
import { watch, computed, ref } from 'vue';
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeBanner from './cpns/home-banner.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategory from './cpns/home-category.vue';
import SearchBar from '@/components/search-bar/search-bar.vue'
import HomeContent from './cpns/home-content.vue'
import useHomeStore from '@/store/modules/home'
import useScroll from '@/hooks/useScroll'

// 热门建议/分类
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

const homeRef = ref()
const { isReachBottom, scrollTop } =  useScroll(homeRef)

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
const isShowSearchBar = computed(() => scrollTop.value >= 360)

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  .search-bar {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background: #fff;
  }
}
</style>