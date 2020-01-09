import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'



const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '登录',
        keepAlive: false
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('./views/Result/Result.vue'),
      meta: {
        title: '重置结果',
        keepAlive: false
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('./views/ForgetPassword/ForgetPassword.vue'),
      meta: {
        title: '忘记密码',
        keepAlive: false
      }
    }, {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register/Register.vue'),
      meta: {
        title: '注册',
        keepAlive: false
      }
    }
  ]
})