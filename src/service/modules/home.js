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

// 房屋列表
export function getHouseList(page) {
  return HYRequest.get({
    url: "/home/houselist",
    params: {
      page
    }
  })
}