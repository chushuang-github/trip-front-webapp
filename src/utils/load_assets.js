// utils -> load_assets.js
// vite里面动态的加载图片资源
// 因为img标签里面的src如果写成变量，vite是无法正确加载资源的
// <img :src="item.imgUrl" alt="">，src写成变量，无法加载资源
// webpack里面可以这样做：<img :src="require(item.imgUrl)" alt="">
// 注意：require是webpack里面提供的函数，vite里面没有，不能使用上面的方式加载图片
// vite里面的做法：使用下面的自定义的getAssetURL函数
// <img :src="getAssetURL(item.imgUrl)" alt="">

const getAssetURL = (imgUrl) => {
  // 将资源变成动态的url地址
  // 解释：根据 import.meta.url 的路径，去寻找 imgUrl 的路径
  // return new URL(imgUrl, import.meta.url).href
  // 图片都是放在asstes/img这个文件夹下面的，第一个参数必须是相对路径
  // ../：文件资源相对于 load_assets.js 文件的路径
  return new URL(`../assets/img/${imgUrl}`, import.meta.url).href
}

export default getAssetURL