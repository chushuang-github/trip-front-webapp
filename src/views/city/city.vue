<template>
  <div class="city top-page">
    <div class="top">
      <van-search 
        v-model="searchValue" 
        shape="round"
        show-action
        placeholder="城市/区域/位置"
        @cancel="onCancel"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="key">
        <CityGroup v-show="tabActive === key" :groupData="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useCityStore from '@/store/modules/city'
import CityGroup from "./cpns/city-group.vue"

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const onCancel = () => {
  router.back()
}

// tab切换
const tabActive = ref()

// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 10;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: scroll;
  }
}
</style>