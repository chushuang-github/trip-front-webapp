import HYRequest from "../request"

// 热门建议
export function getHotSuggests() {
  return HYRequest.get({
    url: "/home/hotSuggests"
  })
}

// 分类
export function getCategories() {
  return HYRequest.get({
    url: "/home/categories"
  })
}