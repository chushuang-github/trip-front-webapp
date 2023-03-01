<template>
  <van-swipe class="swipe-list" :autoplay="3000">
    <template v-for="item in swipeData">
      <van-swipe-item class="swipe-item">
        <img :src="item.url" alt="">
      </van-swipe-item>
    </template>
    <template #indicator="{ active, total }">
      <div class="indicator">
        <template v-for="(value, key) in swipeGroup" :key="key">
          <span class="item" :class="{active: swipeData[active]?.enumPictureCategory == key}">
            <span class="text">{{ getName(value[0].title) }}</span>
            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
              {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
            </span>
          </span>
        </template>
      </div>
    </template>
  </van-swipe>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => ([])
  }
})

// 对数据进行转换
const swipeGroup = {}
for(const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if(!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// 定义转换数据的方法
const nameReg = /【(.*)】/i
const getName = (name) => {
  // 将字符串  "【卧室】："  -->  "卧室"
  return nameReg.exec(name)[1]
}
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<style lang="less" scoped>
.swipe-list {
  .swipe-item {
    img {
      width: 100%;
    }
  }
  .indicator {
    position: absolute;
    right: 8px;
    bottom: 5px;
    display: flex;
    padding: 4px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    .item {
      margin: 0px 5px;
      &.active {
        background: #fff;
        color: #333;
        padding: 1px 5px;
        border-radius: 5px;
      }
    }
  }
}
</style>