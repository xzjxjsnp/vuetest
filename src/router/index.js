import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import PersonalInfoPage from '@/components/PersonalInfoPage'
import ChangePwdPage from '@/components/ChangePwdPage'
import VueCookies from 'vue-cookies'

Vue.use(Router)
Vue.use(VueCookies)

// export default new Router({
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/personalInfo',
      name: 'PersonalInfoPage',
      component: PersonalInfoPage
    },
    {
      path: '/changePwd',
      name: 'ChangePwdPage',
      component: ChangePwdPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const nextRoute = ['HomePage', 'PersonalInfoPage', 'ChangePwdPage']
  if (to.name === 'Login') {
    if (router.app.$cookies.get('islogin') === 'true') {
      router.app.$message({
        message: '已登录，自动跳转到主页',
        type: 'success',
        center: true
      })
      next('/')
    } else {
      next()
    }
  } else if (nextRoute.indexOf(to.name) >= 0) {
    if (router.app.$cookies.get('islogin') !== 'true') {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
