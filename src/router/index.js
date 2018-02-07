import Vue from 'vue'
import Router from 'vue-router'

import apply from '../views/apply.vue'
import notFound from '../views/notFound.vue'
import bind from '../views/bind.vue'
import signIn from '../views/sign-in.vue'
import signUp from '../views/sign-up.vue'
import update from '../views/update.vue'
import result from '../views/result.vue'
import addPack from '../views/add-pack.vue'
import notice from '../views/notice.vue'
import issue from '../views/issue.vue'
import recharge from '../views/recharge.vue'
import list from '../views/list.vue'
import detail from '../views/detail.vue'
import afterSale from '../views/after-sale.vue'
import bankCard from '../views/bank-card.vue'
import mine from '../views/mine.vue'
import withdraw from '../views/withdraw.vue'
import index from '../views/index.vue'
import finance from '../views/finance.vue'
import userList from '../views/user-list.vue'
import userDetail from '../views/user-detail.vue'
import exportB from '../views/export.vue'
import report from '../views/report.vue'
import toll from '../views/toll.vue'
import history from '../views/history.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/apply'
  },
  {
    path: '/apply',
    name: 'apply',
    component: apply,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/bind',
    name: 'bind',
    component: bind
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: signUp
  },
  {
    path: '/update',
    name: 'update',
    component: update
  },
  {
    path: '/result',
    name: 'result',
    component: result
  },
  {
    path: '/add-pack',
    name: 'addPack',
    component: addPack
  },
  {
    path: '/notice',
    name: 'notice',
    component: notice
  },
  {
    path: '/issue',
    name: 'issue',
    component: issue
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: recharge
  },
  {
    path: '/list',
    name: 'list',
    component: list
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/after-sale',
    name: 'afterSale',
    component: afterSale
  },
  {
    path: '/bank-card',
    name: 'bankCard',
    component: bankCard
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: { requiresAuth: true }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: withdraw
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/finance',
    name: 'finance',
    component: finance
  },
  {
    path: '/user-list',
    name: 'userList',
    component: userList
  },
  {
    path: '/user-detail',
    name: 'userDetail',
    component: userDetail
  },
  {
    path: '/export',
    name: 'export',
    component: exportB
  },
  {
    path: '/report',
    name: 'report',
    component: report
  },
  {
    path: '/toll',
    name: 'toll',
    component: toll
  },
  {
    path: '/history',
    name: 'history',
    component: history
  },
  {
    path: '*',
    name: '404',
    component: notFound
  }
]

const router = new Router({
  // mode: 'history',
  routes,
  // base: '/yf-wechat/dist/',
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router
