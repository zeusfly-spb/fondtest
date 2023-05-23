import Vue from 'vue'
import Vuex from 'vuex'
const Cookies = require('js-cookie')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authorized: false,
    registered: false,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_AUTHORIZED(state, val) {
      state.authorized = val;
    },
    SET_REGISTERED(state, val) {
      state.registered = val;
    },
    AUTH_LOGOUT (state) {
      clearAllTimers();
      Cookies.remove('fondtest-token');
      delete Vue.axios.defaults.headers.common['Authorization'];
      state.authorized = false;
    },
    SET_USER(state, user) {
      state.user = user;
    }
  },
  actions: {
    async details({ commit }) {
      try {
        const { data: { data } } = await Vue.axios.post('/api/details');
        commit('SET_USER', data);
      } catch (e) {
        console.error(e);
      }
    },
    async login({ commit }, credentials) {
      try {
        const { data: { data: { token } } } = await Vue.axios
          .post('/api/login', { ...credentials });
        cookieCycle(token);
        Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        commit('SET_AUTHORIZED', true);
      } catch (e) {
        console.error(e);
      }
    },
    async register({ commit }, data) {
      try {
        await Vue.axios.post('/api/register', { ...data });
        commit('SET_REGISTERED', true);
      } catch (e) {
        console.error(e);
      }
    }
  },
})

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

const cookieCycle = token => {
  let now = new Date();
  now.setMinutes(1 + now.getMinutes());
  Cookies.set('fondtest-token', token, {expires: now, path: '/'});
  setInterval(() => {
    let now = new Date();
    now.setMinutes(1 + now.getMinutes());
    Cookies.set('fondtest-token', token, {expires: now, path: '/'});
  }, 30000);
}
