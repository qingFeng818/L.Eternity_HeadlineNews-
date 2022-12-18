import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 导入github-markdown.css文件
import 'github-markdown-css/github-markdown.css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入iconfont
import '@/assets/fonts/iconfont.css'

// rem适配
import 'amfe-flexible/index'

// // 测试axios
// import axios from '@/utils/request'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
