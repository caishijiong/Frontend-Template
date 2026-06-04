<template>
  <div id="app">
    <Login></Login>
    <!-- <Home v-else></Home> -->
  </div>
</template>

<script>
import Home from './components/common/Home.vue'
import Login from './components/page/Login/index.vue'
export default {
  name: 'App',
  components: {
    Home,
    Login,
  },
  computed: {
    isAuthenticated() {
      // 这里可以根据实际情况判断用户是否已登录，例如检查 token 是否存在
      return !!localStorage.getItem('token')
    },
  },
  methods: {
    // 这里可以添加登录和登出的方法，例如设置和清除 token
    login(token) {
      localStorage.setItem('token', token)
    },
    logout() {
      localStorage.removeItem('token')
    },
  }
}
</script>

<style>
@import './assets/css/main.css';
</style>
