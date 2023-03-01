import hyRequest from "../request"

// 获取房屋详情
export function getDetailInfos(houseId) {
  return hyRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
