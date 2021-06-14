import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const state = () => ({
    userProfile: null,
    loadingTetherPrice: true,
    tetherPrice: null,
    token: null,
})

export const getters = {
    userProfile: (state) => state.userProfile,
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
    loadingTetherPrice: (state) => state.loadingTetherPrice,
    tetherPrice: (state) => state.tetherPrice
}

export const mutations = {
    setUserProfile(state, newData){
        state.userProfile = newData
    },
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
    let tetherPrice = (await this.$axios.get('v1/core/trading-pair/usdt/irt/?format=json')).data
    commit('setTetherPrice', tetherPrice)
    
    let tokenObject = this.$cookies.get('CarboExchangeUserToken')
    if (!!tokenObject) {
        let token = tokenObject.token;
        commit('setTokenWithoutSaveToCookie', token)
        try {
            let userProfile = (await this.$axios.get('v1/user_profile/user-profile/?format=json', {
                headers: {
                    Authorization: 'Token ' + token
                }
            })).data
            commit('setUserProfile', userProfile)
        } catch (e) {
            commit('clearToken')
            console.log('hi')
            console.log(e)
        }
    }
    // console.log(tetherPrice)
    commit('setLoadingTetherPrice', false)
  },
}