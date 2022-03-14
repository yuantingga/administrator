import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/QQLogin.vue'
import QQHome from '@/components/QQHome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: QQHome },

  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  console.log(to)
  console.log(form)
  const token = sessionStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
