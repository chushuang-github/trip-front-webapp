import HYRequest from "../request"

// 城市
export function getCityAll() {
  return HYRequest.get({
    url: "/city/all"
  })
}