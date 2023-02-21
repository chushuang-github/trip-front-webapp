<template>
  <div class="location">
    <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
    <div class="position" @click="positionOnClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia";
import useCityStore from '@/store/modules/city'

const router = useRouter()
const cityStore = useCityStore()

// 当前城市
const { currentCity } = storeToRefs(cityStore)

// 点击城市
const cityClick = () => {
  router.push('/city')
}

// 获取位置 (谷歌、火狐等浏览器是不能获取地理信息的)
const positionOnClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log(res)
  }, err => {
    console.log(err)
  })
}
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;
    color: #666;
    .text {
      position: relative;
      top: 1px;
      font-size: 12px;
    }
    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>