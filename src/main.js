import Vue from 'vue'
import App from './App'
import router from './router'

import { Toast } from 'mint-ui'

Vue.prototype.$msg = Toast

import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5931108991470c0ac1ffaeae/hb/'
axios.defaults.baseURL = 'http://wx.wan-we.com/'
// axios.defaults.baseURL = 'http://192.168.2.222:8000/bbsoft-HB-wechat'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)
  //  在请求发送之前做一些事
  config.data = qs.stringify(config.data)
  return config
}, function (error) {
  // 当出现请求错误是做一些事
  return Promise.reject(error)
})

// 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  //  对返回的数据进行一些处理npm
  let data = response.data

  if (data.errorCode === '-10102') {
    let r = router.match(window.location)
    console.log(r)
    router.push({name: 'sign-in', params: {redirect: r.hash.split('/')[1]}})
    // router.push({name: 'sign-in'})
    return Promise.reject(data.errorMsg)
  }
  // 暂时不模拟
  if (data.success) {
    return data.results
  } else {
    response.config.noMsg || Toast(data.errorMsg)
    return Promise.reject(data.errorMsg)
  }
}, function (error) {
  // 对返回的错误进行一些处理
  Toast('服务器异常')
  return Promise.reject(error)
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

// Vue.wechat.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wx152d73d1a76776cc', // 必填，公众号的唯一标识
//   timestamp: '1497782397', // 必填，生成签名的时间戳
//   nonceStr: '35c53066-6676-475a-ad27-64614ca16fef', // 必填，生成签名的随机串
//   signature: '7eb5965aac235735438fceedee8879d14a29c825', // 必填，签名，见附录1
//   jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
