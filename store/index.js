import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const state = () => ({
    loadingTetherPrice: true,
    tetherPrice: null
})

export const getters = {
    loadingTetherPrice: (state) => state.loadingTetherPrice,
    tetherPrice: (state) => state.tetherPrice
}

export const mutations = {
    setLoadingTetherPrice(state, newData) {
        state.loadingTetherPrice = newData
    },
    setTetherPrice(state, newData) {
        state.tetherPrice = newData
    }
}

export const actions = {
  async nuxtServerInit({ commit }, { $config }) {
    let tetherPrice = (await this.$axios.get('https://carbo.exchange/api/v1/core/trading-pair/usdt/irt/?format=json')).data
    // console.log(tetherPrice)
    commit('setTetherPrice', tetherPrice)
    commit('setLoadingTetherPrice', false)
  },
}