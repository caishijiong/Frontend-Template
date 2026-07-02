/** 应用模块
 * 控制菜单折叠、是否全屏、按钮颜色主题等
 * @param {*} state 
 * @param {*} sidebar 菜单折叠状态
 * @param {*} opened 是否全屏
 */
const state = {
    /** 菜单折叠状态 */
    sidebar: false,
    /** 是否全屏 */
    opened: true,
}

const mutations = {
    /** 切换侧边栏折叠状态 */
    TOGGLE_SIDEBAR(state) {
        state.sidebar = !state.sidebar
    },
    /** 切换是否全屏 */
    TOGGLE_OPENED(state) {
        state.opened = !state.opened
    }

}

const actions = {
    /** 切换侧边栏折叠状态 */
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    /** 切换是否全屏 */
    toggleOpened({ commit }) {
        commit('TOGGLE_OPENED')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}