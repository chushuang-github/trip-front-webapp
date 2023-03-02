import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue"
import throttle from "@/utils/throttle"

// 监听window的滚动 (滚动到底部，进行上拉加载更多)
export default function useScroll(elRef, callback) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 原理：滚动区域的高度 <= 滚动卷去的高度 + 视口高度，表示已经滚动到底部了
  const scrollListenerHandler = throttle(() => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    }else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if(scrollHeight.value <= scrollTop.value + clientHeight.value) {
      isReachBottom.value = true
      callback && callback()
    }else {
      isReachBottom.value = false
    }
  })

  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandler)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  onActivated(() => {
    el.addEventListener('scroll', scrollListenerHandler)
  })
  onDeactivated(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}