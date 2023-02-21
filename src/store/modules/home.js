import { defineStore } from "pinia"
import { getHotSuggests, getCategories } from "@/service"

const useHomeStore = defineStore("home", {
  state: () => {
    return {
      hotSuggests: [],
      categories: []
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
    }
  }
})

export default useHomeStore