import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/QQLogin.vue'
import QQHome from '@/components/QQHome.vue'
import Welcome from '@/components/WelCome.vue'
import QQUsers from '@/components/HomeUsers.vue'
import SupersuList from '@/components/SupersuList.vue'
import RoleList from '@/components/RoleList.vue'
import GoodsCategory from '@/components/GoodsCategory.vue'
import SortingParameter from '@/components/SortingParameter.vue'
import ProductList from '@/components/ProductList.vue'
import AddProduct from '@/components/AddProduct.vue'
Vue.use(VueRouter)

const routes = [
  // 登陆页码的路由规则
  { path: '/login', component: Login },
  // 登陆后页码路由规则home组件
  {
    path: '/home',
    component: QQHome,
    children: [
      // home组件的搜也
      { path: '/', redirect: 'welcome' },
      { path: 'welcome', component: Welcome },
      // 用户管理
      {
        path: 'users',
        component: QQUsers

      },
      { path: 'rights', component: SupersuList },
      { path: 'roles', component: RoleList },
      { path: 'categories', component: GoodsCategory },
      { path: 'params', component: SortingParameter },
      { path: 'goods', component: ProductList },
      { path: 'AddProduct', component: AddProduct }
    ]
  },

  { path: '/', redirect: '/login' }
]

const router = new VueRouter({
  routes
})
// 导航守卫
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
