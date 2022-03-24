import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/QQLogin.vue'
import QQHome from '@/components/home/QQHome.vue'
import Welcome from '@/components/home/WelCome.vue'
import QQUsers from '@/components/home/HomeUsers.vue'
import SupersuList from '@/components/SupersuPro/SupersuList.vue'
import RoleList from '@/components/SupersuPro/RoleList.vue'
import GoodsCategory from '@/components/gook_cate/GoodsCategory.vue'
import SortingParameter from '@/components/gook_cate/SortingParameter.vue'
import ProductList from '@/components/gook_cate/ProductList.vue'
import AddProduct from '@/components/gook_cate/addgoods/AddProduct.vue'
import OrderList from '@/components/orderlist/OrderList.vue'
import DataStatistics from '@/components/DataStatistics/DataStatistics.vue'

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
      { path: 'AddProduct', component: AddProduct },
      { path: 'orders', component: OrderList },
      { path: 'reports', component: DataStatistics }
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
