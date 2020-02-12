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
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
      meta: {
        title: '登录',
        keepAlive: false,
        requireAuth:false
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('./views/Result/Result.vue'),
      meta: {
        title: '重置结果',
        keepAlive: false,
        requireAuth:false
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('./views/ForgetPassword/ForgetPassword.vue'),
      meta: {
        title: '忘记密码',
        keepAlive: false,
        requireAuth:false
      }
    }, {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register/Register.vue'),
      meta: {
        title: '注册',
        keepAlive: false,
        requireAuth:false
      }
    }, {
      path: '/detailInform',
      name: 'detailInform',
      component: () => import('./views/DetailInform/DetailInform.vue'),
      meta: {
        title: '基本信息',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/trainingList',
      name: 'trainingList',
      component: () => import('./views/TrainingList/TrainingList.vue'),
      meta: {
        title: '训练列表',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/trainingPlan',
      name: 'trainingPlan',
      component: () => import('./views/TrainingPlan/TrainingPlan.vue'),
      meta: {
        title: '本次训练计划',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/trainingSlider',
      name: 'trainingSlider',
      component: () => import('./views/TrainingSlider/TrainingSlider.vue'),
      meta: {
        title: '训练模式选择',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/trainingAdjust',
      name: 'trainingAdjust',
      component: () => import('./views/TrainingAdjust/TrainingAdjust.vue'),
      meta: {
        title: '训练控件数字调节',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/appointment',
      name: 'appointment',
      component: () => import('./views/Appointment/Appointment.vue'),
      meta: {
        title: '时间预约',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/applicationDetails',
      name: 'applicationDetails',
      component: () => import('./views/ApplicationDetails/ApplicationDetails.vue'),
      meta: {
        title: '时间预约',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/patientApplication',
      name: 'patientApplication',
      component: () => import('./views/PatientApplication/PatientApplication.vue'),
      meta: {
        title: '病人申请详情',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/summaryReport',
      name: 'summaryReport',
      component: () => import('./views/SummaryReport/SummaryReport.vue'),
      meta: {
        title: '病人汇总报告',
        keepAlive: false,
        requireAuth:true
      }
    }, 
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./views/chat/chat.vue'),
      meta: {
        title: '聊天',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/friend',
      name: 'friend',
      component: () => import('./views/friend/friend.vue'),
      meta: {
        title: '聊天',
        keepAlive: false,
        requireAuth:true
      }
    }, {
      path: '/componentsA',
      name: 'componentsA',
      component: () => import('./components/componentsA.vue')
  }
  
  
  ],
  linkActiveClass: 'active'
})