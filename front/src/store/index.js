import Vue from 'vue'
import Vuex from 'vuex'
const Cookies = require('js-cookie')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorized: false,
    registered: false,
  },
  mutations: {
    SET_AUTHORIZED(state, val) {
      state.authorized = val;
    },
    SET_REGISTERED(state, val) {
      state.registered = val;
    },
    AUTH_LOGOUT (state) {
      const clearAllTimers = function(){
        let lastID = 0;
        return function(){
          let currentID = setTimeout(function(){}, 1);
          for(let id = currentID; id > lastID; id--){
            clearTimeout(id);
          }
          lastID = currentID;
        };
      }();
      clearAllTimers();
      Cookies.remove('fondtest-token');
      delete Vue.axios.defaults.headers.common['Authorization'];
      state.authorized = false;
    },
  },
  actions: {
    login ({ commit }, data) {
      return new Promise ((resolve, reject) => {
        Vue.axios.post('/api/login', {email: data.email, password: data.password})
          .then(res => {
            let token = res.data.success.token;
            let now = new Date();
            now.setMinutes(1 + now.getMinutes());
            Cookies.set('fondtest-token', token, {expires: now, path: '/'});
            setInterval(() => {
              let now = new Date()
              now.setMinutes(1 + now.getMinutes())
              Cookies.set('fondtest-token', token, {expires: now, path: '/'})
            }, 30000);
            Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            commit('SET_AUTHORIZED', true);
            resolve (res)
          })
          .catch(e => {
            commit('AUTH_LOGOUT')
            reject (e)
          })
      })
    },
    register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        console.log('CREATING REGISTER');
        Vue.axios.post('/api/register', {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation
        })
          .then(res => {
            commit('SET_REGISTERED', true);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          })
      })
    }
  },
})
