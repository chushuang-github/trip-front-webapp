import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue"
import throttle from "@/utils/throttle"

// 监听window的滚动 (滚动到底部，进行上拉加载更多)
export default function useScroll(callback) {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 原理：滚动区域的高度 <= 滚动卷去的高度 + 视口高度，表示已经滚动到底部了
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if(scrollHeight.value <= scrollTop.value + clientHeight.value) {
      isReachBottom.value = true
      callback && callback()
    }else {
      isReachBottom.value = false
    }
  })

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  onActivated(() => {
    window.addEventListener('scroll', scrollListenerHandler)
  })
  onDeactivated(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}