<template>
  <div class="notice">
    <DetailSection title="预订须知">
      <div class="notice">
        <template v-for="(item, index) in orderRules">
          <div class="item">
            <span class="title">{{ item.title }}</span>
            <span class="intro">{{ item.introduction }}</span>
          </div>
        </template>
      </div>
    </DetailSection>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import DetailSection from "@/components/detail-section/detail-section.vue"

defineProps({
  orderRules: {
    type: Object,
    default: () => []
  }
})

</script>

<style lang="less" scoped>
.notice {
  .item {
    display: flex;
    margin: 10px 0 20px;
    font-size: 12px;

    .title {
      width: 64px;
      color: #666;
    }

    .intro {
      flex: 1;
      color: #333;
    }
  }
}
</style>