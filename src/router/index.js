import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    // #region 框架模块
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/components/page/Login/index.vue'),
    },
    {
      path: '/home',
      component: () => import('@/components/page/Home/index.vue'),
      meta: { title: '首页' },
    },
    {
      path: '/admin',
      component: () => import('@/components/page/admin/index.vue'),
      meta: { title: '管理员', roles: ['admin'] },
    },
    {
      path: '/404',
      component: () => import('@/components/page/404/index.vue'),
      meta: { title: '404' },
    },
    {
      path: '/403',
      component: () => import('@/components/page/403/index.vue'),
      meta: { title: '403' },
    },
    // 兜底路由：任何未匹配的路径跳转到 404
    {
      path: '*',
      redirect: '/404',
    },
    // #endregion
  ],
})


