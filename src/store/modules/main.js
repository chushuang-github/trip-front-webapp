import { defineStore } from "pinia"

const startDate = new Date() // 当前日期
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1) // 当前日期的后一天

const useMainStore = defineStore("main", {
  state: () => {
    return {
      startDate,
      endDate
    }
  },
})

export default useMainStore