import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/QQLogin.vue'
import QQHome from '@/components/QQHome.vue'
import Welcome from '@/components/WelCome.vue'
import QQUsers from '@/components/QQUsers.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/home',
    component: QQHome,
    children: [
      { path: '/', redirect: 'welcome' },
      { path: 'welcome', component: Welcome },
      { path: 'users', component: QQUsers }
      // { path: 'users', component: QQUsers }
      // { path: 'users', component: QQUsers }
      // { path: 'users', component: QQUsers }
      // { path: 'users', component: QQUsers }
      // { path: 'users', component: QQUsers }
    ]
  },

  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, form, next) => {
  const token = sessionStorage.getItem('token')
  if (to.path === '/login') {
    sessionStorage.clear()
  }
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
