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
        title: '首页',
        keepAlive: false
      }
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
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
    }, {
      path: '/detailInform',
      name: 'detailInform',
      component: () => import('./views/DetailInform/DetailInform.vue'),
      meta: {
        title: '基本信息',
        keepAlive: false
      }
    }, {
      path: '/trainingList',
      name: 'trainingList',
      component: () => import('./views/TrainingList/TrainingList.vue'),
      meta: {
        title: '训练列表',
        keepAlive: false
      }
    }, {
      path: '/trainingPlan',
      name: 'trainingPlan',
      component: () => import('./views/TrainingPlan/TrainingPlan.vue'),
      meta: {
        title: '本次训练计划',
        keepAlive: false
      }
    }, {
      path: '/trainingSlider',
      name: 'trainingSlider',
      component: () => import('./views/TrainingSlider/TrainingSlider.vue'),
      meta: {
        title: '训练模式选择',
        keepAlive: false
      }
    }, {
      path: '/trainingAdjust',
      name: 'trainingAdjust',
      component: () => import('./views/TrainingAdjust/TrainingAdjust.vue'),
      meta: {
        title: '训练控件数字调节',
        keepAlive: false
      }
    }, {
      path: '/appointment',
      name: 'appointment',
      component: () => import('./views/Appointment/Appointment.vue'),
      meta: {
        title: '时间预约',
        keepAlive: false
      }
    }, {
      path: '/applicationDetails',
      name: 'applicationDetails',
      component: () => import('./views/ApplicationDetails/ApplicationDetails.vue'),
      meta: {
        title: '时间预约',
        keepAlive: false
      }
    }, {
      path: '/patientApplication',
      name: 'patientApplication',
      component: () => import('./views/PatientApplication/PatientApplication.vue'),
      meta: {
        title: '病人申请详情',
        keepAlive: false
      }
    }
  ]
})