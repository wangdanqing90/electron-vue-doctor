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


var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





//var addon = require('bindings')('hello');var addon = require('bindings')('hello');
//alert(addon.hello()); // 'world'