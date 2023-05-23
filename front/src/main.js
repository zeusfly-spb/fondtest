import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
window.Cookies = require('js-cookie')

import Notifications from 'vue-notification'
Vue.use(Notifications)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.axios.defaults.headers.common['Accept'] = 'application/json'
Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

Vue.axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response && error.response.status === 401) {
      router.replace('/login');
    }
    return Promise.reject(error.response);
  }
)
Vue.config.productionTip = false;
const token = window.Cookies.get('fondtest-token');
if (token) {
  Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  setInterval(() => {
    let now = new Date()
    now.setMinutes(1 + now.getMinutes())
    window.Cookies.set('fondtest-token', token, {expires: now, path: '/'})
  }, 30000);
  router.push('/');
} else {
  router.push('/login');
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
