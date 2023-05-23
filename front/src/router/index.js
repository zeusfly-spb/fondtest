import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      guest: true
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      guest: true
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.authorized) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
        next();
      }
    } else if(to.matched.some(record => record.meta.guest)) {
    if(!store.state.authorized) {
      next();
    }
    else{
      next({ name: 'home'});
    }
  }else {
    next();
  }
});

document.title = 'ЖилфондТест';
export default router;
