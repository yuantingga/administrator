import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/components/login/QQLogin.vue')
const QQHome = () => import('@/components/home/QQHome.vue')
const WElcome = () => import('@/components/home/WelCome.vue')
const QQUsers = () => import('@/components/home/HomeUsers.vue')
const SupersuList = () => import('@/components/SupersuPro/SupersuList.vue')
const RoleList = () => import('@/components/SupersuPro/RoleList.vue')
const GoodsCategory = () => import('@/components/gook_cate/GoodsCategory.vue')
const SortingParameter = () => import('@/components/gook_cate/SortingParameter.vue')
const ProductList = () => import('@/components/gook_cate/ProductList.vue')
const AddProduct = () => import('@/components/gook_cate/addgoods/AddProduct.vue')
const OrderList = () => import('@/components/orderlist/OrderList.vue')
const DataStatistics = () => import('@/components/DataStatistics/DataStatistics.vue')

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
      { path: 'welcome', component: WElcome },
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
