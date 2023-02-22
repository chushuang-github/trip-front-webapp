<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <HouseItemV3 v-if="item.discoveryContentType === 3" :itemData="item.data" />
        <HouseItemV9 v-else-if="item.discoveryContentType === 9" :itemData="item.data" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useHomeStore from '@/store/modules/home'
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 0px 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
}
</style>