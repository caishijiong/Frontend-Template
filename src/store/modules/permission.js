/** 权限模块
 * 动态路由等
 * @param {*} state 
 * @param {*} routes 动态路由列表
 * @param {*} addRoutes 动态添加路由列表
 */
const state = {
    routes: [], // 动态路由列表
    addRoutes: [] // 动态添加路由列表
}

const mutations = {
    /** 生成动态路由 */
    generateRoutes(state, routes) {
        state.addRoutes = routes
        state.routes = routes
    }

}

const actions = {
    /** 生成动态路由 */
    generateRoutes({ commit }, routes) {
        commit('generateRoutes', routes)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}