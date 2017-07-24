import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = 'https:/localhost:6000';
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),

    rolesVar: 'role',
    facebookOauth2Data: {
        clientId: '196729390739201'
    },
    googleOauth2Data: {
        clientId: '337636458732-tatve7q4qo4gnpfcenbv3i47id4offbg.apps.googleusercontent.com'
    }
});

axios.interceptors.response.use( response => response, error => {
    if( error.response.status === 401 )
        window.location.href = '/login'

    return Promise.reject(error)
})


// Vue.http.interceptors.push((request, next) => {
//   store.commit('TOOGLE_LOADING', true)
//   next((response) => {
//     store.commit('TOOGLE_LOADING', false)
//   })
// })

// let baseUrl = 'http://127.0.0.1:3010/api'

// let apiResource = Vue.resource(baseUrl + '{/id}')
// let detailResource = Vue.resource(baseUrl + '/detail{/id}')
// export default {
//   getInTheaters: (opts) => {
//     return apiResource.get({id: 'in_theaters', ...opts})
//   },
//   getComming: (opts) => {
//     return apiResource.get({id: 'comming', ...opts})
//   },
//   getWeekly: () => {
//     return apiResource.get({id: 'weekly'})
//   },
//   getTop: (opts) => {
//     return apiResource.get({id: 'top250', ...opts})
//   },
//   getDetail: (opts) => {
//     return detailResource.get(opts)
//   }
// }
