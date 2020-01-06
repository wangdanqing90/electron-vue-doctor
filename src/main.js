import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'


import './assets/styles/variable.scss';
import './assets/styles/base.scss';
import './assets/styles/common.scss';
import './assets/styles/iconfont.css';
import './assets/js/common.js';

Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





//var addon = require('bindings')('hello');var addon = require('bindings')('hello');
//alert(addon.hello()); // 'world'