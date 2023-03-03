<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div 
        class="tab-control-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index)"
      >
        <span>
          {{ item }}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue';

defineProps({
  titles: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["itemClick"])

const currentIndex = ref(0)
const itemClick = (index) => {
  currentIndex.value = index
  emit("itemClick", index)
}

// 给外面组件使用，修改currentIndex
const setCurrentIndex = (index) => {
  currentIndex.value = index
}

defineExpose({
  setCurrentIndex
})

</script>

<style lang="less" scoped>

.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #fff;

  .tab-control-item {
    flex: 1;
    text-align: center;
    &.active {
      color: var(--primary-color);
      span {
        padding: 5px;
        border-bottom: 2px solid var(--primary-color);
      }
    }
  }
}

</style>