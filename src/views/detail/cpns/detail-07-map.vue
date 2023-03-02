<template>
  <div class="map">
    <DetailSection title="位置周边" moreText="查看更多周边信息">
      <div class="baidu" ref="baiduRef"></div>
    </DetailSection>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import DetailSection from "@/components/detail-section/detail-section.vue"

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

// 百度地图初始化
const baiduRef = ref()
const map = ref()
const initMap = () => {
  const { longitude, latitude } = props.position
  // 创建地图实例
  map.value = new BMapGL.Map(baiduRef.value)
  // 创建点坐标 
  let point = new BMapGL.Point(longitude, latitude)
  // 初始化地图，设置中心点坐标和地图级别
  map.value.centerAndZoom(point, 15)
  // 创建标注
  let marker = new BMapGL.Marker(point)
  // 将标注添加到地图中
  map.value.addOverlay(marker)            
}
onMounted(() => {
  initMap()
})
</script>

<style lang="less" scoped>
.baidu {
  width: 100%;
  height: 200px
}
</style>