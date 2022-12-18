import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  // 一级路由渲染在App中
  // 当转化路径的时候再去请求页面，懒加载页面
  // 优化首屏加载速度
  {
    path: '/login',
    component: () => import('@/views/login')
  },

  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/my',
    children: [
      // 如果子路由的path没有/，会把父亲的path和儿子的path进行拼接
      // 如果有/，不会拼接
      {
        path: '/ ',
        component: () => import('@/views/Home'),
        meta: {
          index: 1
        }
      },
      {
        path: ' /qa',
        component: () => import('@/views/QA'),
        meta: {
          index: 3
        }
      },
      {
        path: ' /video',
        component: () => import('@/views/Video'),
        meta: {
          index: 2
        }
      },
      {
        path: ' /my',
        component: () => import('@/views/my'),
        meta: {
          index: 4
        }
      }
    ]
  },

  {
    path: '/search',
    component: () => import('@/views/search')
  },

  {
    path: '/user',
    component: () => import('@/views/user')
  },

  {
    path: '/detail',
    component: () => import('@/views/Detail')
  }
]

const router = new VueRouter({
  routes
})

export default router
