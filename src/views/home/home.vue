<template>
  <div class="home">
    <HomeNavBar />
    <HomeBanner />
    <HomeSearchBox />
    <HomeCategory />
    <HomeContent />
  </div>
</template>

<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue';
import HomeBanner from './cpns/home-banner.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategory from './cpns/home-category.vue';
import HomeContent from './cpns/home-content.vue'
import useHomeStore from '@/store/modules/home'

// 热门建议/分类
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
}
</style>