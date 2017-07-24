import Vue from 'vue'
import VueResource from 'vue-resource'
import VueAuthenticate from 'vue-authenticate'
 
Vue.use(VueResource)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:6000', // Your API domain 
  
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL 
    }
  }
})

const vueAuth = new VueAuthenticate(Vue.http, {
  baseUrl: 'http://localhost:6000'
})

const moduleAuth = {
  
  // You can use it as state property 
  state: {
    isAuthenticated: false
  },
 
  // You can use it as a state getter function (probably the best solution) 
  getters: {
    isAuthenticated () {
      return vueAuth.isAuthenticated()
    }
  },
 
  // Mutation for when you use it as state property 
  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    }
  },
 
  actions: {
 
    // Perform VueAuthenticate login using Vuex actions 
    login (context, payload) {
 
      vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        })
      })
 
    }
  }
};

export default  moduleAuth;