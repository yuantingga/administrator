import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './components/plugins/element.js'
import '@/assets/css/index.css'
import axios from 'axios'
import moment from 'moment'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */)

// 请求根路由
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
}, function (err) {
  console.log(err)
})
// 日期事件格式化
Vue.prototype.moment = moment

Vue.prototype.$http = axios
Vue.filter('DateFun', function (val) {
  const d = new Date(val)
  const geshi = moment(d).format('YYYY-MM-DD hh:mm:ss')
  return geshi
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
