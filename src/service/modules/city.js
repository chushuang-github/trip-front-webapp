import hyRequest from "../request"

// 城市
export function getCityAll() {
  return hyRequest.get({
    url: "/city/all"
  })
}