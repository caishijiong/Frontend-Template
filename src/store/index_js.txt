import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /** 登录token */
        token: '',
        /** 用户信息 */
        userInfo: {},
        /** 当前管理员权限列表 */
		powerList: [],
    },
    mutations: {
        /** 设置登录token */
        setToken(state, token) {
            state.token = token
        },
        /** 设置用户信息 */
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        /** 设置当前管理员权限列表 */
        setPowerList(state, powerList) {
            state.powerList = powerList
        },
    },
    actions: {},
    modules: {
    app,
    user,
  }
})

export default store