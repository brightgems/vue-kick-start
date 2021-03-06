//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-default/index.css' 
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
//导入请求框架
import api from './api'
//导入主视图文件
import App from './App'
//导入状态管理器
import { createStore } from './store'
//导入路由
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

// mixin for handling title
Vue.mixin(titleMixin)
// use bootstrap UI
Vue.use(ElementUI)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$setTitle = function (title) {
  document.title = title
}

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
