import { defineStore } from "pinia"

const useCityStore = defineStore("city", {
  state: () => {
    return {
      cities: []
    }
  },
  actions: {}
})

export default useCityStore