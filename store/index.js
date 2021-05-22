import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const state = () => ({
    loadingTetherPrice: true,
    tetherPrice: null,
    token: null,
})

export const getters = {
    isAuthenticated: (state) => !!state.token,
    loadingTetherPrice: (state) => state.loadingTetherPrice,
    tetherPrice: (state) => state.tetherPrice
}

export const mutations = {
    // Just setting token on state from cookie
    setTokenWithoutSaveToCookie(state, token) {
        state.token = token
    },
    setToken(state, token) {
        state.token = token
        const cookieValObject = {'token': `${token}`}
        // Works client side only
        const getDomainName = function() {
            let hostName = window.location.hostname;
            if(hostName == 'localhost' || Number(hostName.split('.')[0]) != NaN) {
                return hostName
            }
            return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
        }
        alert(getDomainName())
        this.$cookies.set('CarboExchangeUserToken', cookieValObject, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            domain: getDomainName()
        })
    },
    clearToken(state) {
        this.$cookies.remove('CarboExchangeUserToken')
        state.token = null
    },
    setLoadingTetherPrice(state, newData) {
        state.loadingTetherPrice = newData
    },
    setTetherPrice(state, newData) {
        state.tetherPrice = newData
    }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, $config }) {
    let token = this.$cookies.get('CarboExchangeUserToken')
    if (!!token) commit('setTokenWithoutSaveToCookie', token.token)
      
    let tetherPrice = (await this.$axios.get('v1/core/trading-pair/usdt/irt/?format=json')).data
    // console.log(tetherPrice)
    commit('setTetherPrice', tetherPrice)
    commit('setLoadingTetherPrice', false)
  },
}