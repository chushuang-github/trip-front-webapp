import dayjs from "dayjs";

// 格式化日期
export function formatMonthDay(date) {
  return dayjs(date).format("MM月DD日")
}

// 计算两个日期之间差多少天 (使用dayjs库里面的方法)
export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}