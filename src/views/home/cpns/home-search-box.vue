<template>
  <div class="search-box">
    <!-- 我的位置 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionOnClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>

    <!-- 价格/人数 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div 
          class="item" 
          :style="{ color: item.tagText.color, backgroundColor: item.tagText.background.color }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 日期选择弹窗 -->
    <van-calendar 
      v-model:show="showCalendar" 
      type="range"
      color="#ff9854"
      :formatter="formatter"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia";
import useCityStore from "@/store/modules/city"
import useHomeStore from '@/store/modules/home'
import { formatMonthDay, getDiffDays } from "@/utils/format_date"

const router = useRouter()
const cityStore = useCityStore()
const homeStore = useHomeStore()

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

// 日期范围处理
const nowDate = new Date() // 当前日期
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1) // 当前日期的后一天
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const stayCount = ref(getDiffDays(nowDate, newDate))

// 日期弹窗
const showCalendar = ref(false)
const formatter = (day) => {
  if (day.type === 'start') {
    day.bottomInfo = '入住'
  } else if (day.type === 'end') {
    day.bottomInfo = '离店'
  }
  return day
}
const onConfirm = (value) => {
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  startDate.value = formatMonthDay(selectStartDate)
  endDate.value = formatMonthDay(selectEndDate)
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  showCalendar.value = false
}

// 热门建议
const { hotSuggests } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
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

  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }

  .price-counter {
    height: 44px;
    .start {
      border-right: 1px solid var(--line-color);
    }
  }
  
  .keyword {
    height: 44px;
  }

  .hot-suggests {
    margin: 10px 0px;
    .item {
      padding: 4px 8px;
      border-radius: 14px;
      margin: 4px;
      font-size: 12px;
    }
  }
}
</style>