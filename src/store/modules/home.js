import { defineStore } from "pinia"
import { getHotSuggests, getCategories, getHouseList } from "@/service"

const useHomeStore = defineStore("home", {
  state: () => {
    return {
      hotSuggests: [],
      categories: [],
      houseList: [],
      currentPage: 1
    }
  },
  actions: {
    async fetchHotSuggestsData() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getCategories()
      this.categories = res.data
    },
    async fetchHouseListData() {
      const res = await getHouseList(this.currentPage)
      this.houseList = [...this.houseList, ...res.data]
      this.currentPage++
    }
  }
})

export default useHomeStore