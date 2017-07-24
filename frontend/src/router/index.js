import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    hashbang: false,
    linkActiveClass: 'active',
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/',
        name: 'default',
        component: require('../views/Home.vue')
    }, {
        path: '/login',
        name: 'login',
        component: require('../views/Login.vue'),
        meta: {auth: false}
    }, {
        path: '/register',
        name: 'register',
        component: require('../views/Register.vue'),
        meta: {auth: false}
    }]
  })
}