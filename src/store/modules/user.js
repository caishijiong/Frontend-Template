/** 用户模块
 * 控制用户信息、登录token、动态路由等
 * @param {*} state 
 * @param {*} token 登录token
 * @param {*} userInfo 用户信息
 * @param {*} permissions 用户权限
 * @param {*} roles 用户角色
 */
const state = {
    token: '', // 登录token
    userInfo: {}, // 用户信息

     // 当前用户权限
    permissions: [],

    // 当前用户角色
    roles: []
}

const mutations = {
    /** 设置登录token */
    setToken(state, token) {
        state.token = token
    },

    /** 设置用户信息 */
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },

    /** 设置用户权限 */
    setPermissions(state, permissions) {
        state.permissions = permissions
    },

    /** 设置用户角色 */
    setRoles(state, roles) {
        state.roles = roles
    },

}

const actions = {
    /** 设置登录token */
    setToken({ commit }, token) {
        commit('setToken', token)
    },

    /** 设置用户信息 */
    setUserInfo({ commit }, userInfo) {
        commit('setUserInfo', userInfo)
    },

    /** 设置用户权限 */
    setPermissions({ commit }, permissions) {
        commit('setPermissions', permissions)
    },

    /** 设置用户角色 */
    setRoles({ commit }, roles) {
        commit('setRoles', roles)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}