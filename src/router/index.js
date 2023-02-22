import { createRouter, createWebHashHistory } from "vue-router"

// 配置映射关系
const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: () => import("@/views/home/home.vue") },
  { path: "/favor", component: () => import("@/views/favor/favor.vue") },
  { path: "/message", component: () => import("@/views/message/message.vue") },
  { path: "/order", component: () => import("@/views/order/order.vue") },
  { path: "/city", component: () => import("@/views/city/city.vue") },
  { path: "/search", component: () => import("@/views/search/search.vue") },
]

// 通过createRouter函数创建路由对象
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导出
export default router