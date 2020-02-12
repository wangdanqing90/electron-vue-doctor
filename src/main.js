import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


import './assets/styles/variable.scss';
import './assets/styles/base.scss';
import './assets/styles/common.scss';
import './assets/styles/iconfont.css';
import common from './assets/js/common.js';


Vue.config.productionTip = false;
Vue.prototype.common = common;
Vue.prototype.axios=axios
Vue.use(ElementUI);

//全局守卫，记录登录状态
router.beforeEach((to,from,next)=>{
  if ( to.meta.requireAuth) { // 判断该路由是否需要登录权限
    var token = store.state.token
    if (token) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
        next();
    } else {
        next({
            path: '/login',
            // query: {
            //     redirect: to.fullPath
            // } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
} else {
    next();
}}
)



var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





//var addon = require('bindings')('hello');var addon = require('bindings')('hello');
//alert(addon.hello()); // 'world'