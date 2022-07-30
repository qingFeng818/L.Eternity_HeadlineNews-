import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  // 一级路由渲染在App中
  // 当转化路径的时候再去请求页面，懒加载页面
  // 优化首屏加载速度
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/profile',
    component: () => import('@/views/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
