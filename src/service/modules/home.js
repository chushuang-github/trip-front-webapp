import hyRequest from "../request"

// 热门建议
export function getHotSuggests() {
  return hyRequest.get({
    url: "/home/hotSuggests"
  })
}

// 分类
export function getCategories() {
  return hyRequest.get({
    url: "/home/categories"
  })
}

// 房屋列表
export function getHouseList(page) {
  return hyRequest.get({
    url: "/home/houselist",
    params: {
      page
    }
  })
}