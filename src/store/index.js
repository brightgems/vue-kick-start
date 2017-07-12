import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moduleTodo from './modules/todo.module.js'

Vue.use(Vuex)

export function createStore () {
  
  return new Vuex.Store({
    modules :{todo: moduleTodo},
    state: {
      zen: {
        list: [],
        loading: false,
      },
    },

    actions: {
      FETCH_ZEN: ({commit, state: {zen}}, type) => {
        if (zen.loading) return
        if (type === 'first' && zen.list[0]) {
          return Promise.resolve(zen.list[0])
        } else {
          commit('LOADING_ZEN', true)
          return axios.get('https://api.github.com/repos/vmg/redcarpet/issues?state=closed').then(({data}) => {
            commit('LOADING_ZEN', false)
            commit('SET_ZEN', data)
            return data
          })
        }
      }
    },

    mutations: {
      SET_ZEN: (state, item) => {
        state.zen.list.push(item)
      },
      LOADING_ZEN: (state, loadingState) => {
        state.zen.loading = loadingState
      }
    }
  })
}
