import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/index.css'
import axios from 'axios'
import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor'

import NProgress from 'nprogress' // for bubble theme
import ELEMENT from 'element-ui'

Vue.use(ELEMENT)// 注意大写

Vue.use(VueQuillEditor /* { default global options } */)
Vue.prototype.moment = moment

Vue.prototype.$http = axios

// 请求根路由
axios.defaults.baseURL = ' https://www.liulongbin.top:8888/api/private/v1/'
// 请求拦截器

// axios.create({
//   baseURL: `${location.href.split(/#/)[0]}`, // 强哥
//   // baseURL:import.meta.env.MODE === "production" ? apis.production:apis.development ,
//   timeout: 60000, // 请求毫秒
//   withCredentials: true, // 异步请求携带cookie
//   headers: {
//     // 设置后端需要的传参类型
//     'Content-Type': 'application/json;charset=UTF-8;',
//     token: 'your token',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// })
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem('token')
  NProgress.start()

  return config
}, function (err) {
  console.log(err)
})
NProgress.configure({ showSpinner: false })

axios.interceptors.response.use(function (config) {
  NProgress.done()

  return config
}, function (err) {
  console.log(err)
})

// 日期事件格式化

Vue.filter('DateFun', function (val) {
  const d = new Date(val)
  const geshi = moment(d).format('YYYY-MM-DD hh:mm:ss')
  return geshi
})

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
Vue.config.productionTip = false
