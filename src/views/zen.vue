<template>
  <div class='zen'>
    <h1>Hello, {{this.$route.params.personId}}!</h1>
    <button class='button' @click='fetch'>{{fetchText}}</button>
    <div class="my-1 row">
      <div class="col-6">
        <b-form-fieldset horizontal label="Rows per page" :label-cols="6">
          <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
          </b-form-select>
        </b-form-fieldset>
      </div>
      <div class="col-6">
        <b-form-fieldset horizontal label="Filter" :label-cols="3">
          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
        </b-form-fieldset>
      </div>
    </div>
     <!-- Main table element -->
     
    <b-table striped hover 
            :items="zen.list[0]"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
    >
      <template slot="id" scope="item">
        <b-btn size="sm" @click="details(item)">{{item.value}}</b-btn>
        
      </template>
      <template slot="title" scope="item">
        {{item.value}}
      </template>
      <template slot="comments" scope="item">
        {{item.value}}
      </template>
    </b-table>
    <div class="row">
        <div class="justify-content-center col-12 my-2">
            <b-pagination size="md" :total-rows="items.length" :per-page="perPage" v-model="currentPage" />
        </div>
    </div>
    <spinner :show='zen.loading'></spinner>
  </div>
  
</template>

<script>

import Spinner from 'components/Spinner.vue'
import {mapState} from 'vuex'

export default {
  title () {
    return this.zen.list[0]
  },
  data (){ 
    return {
      fields:{
        id: {
          label : 'id',
          sortable: true  
        },
        title: {
          label : 'title',
          sortable: true  
        },
        comments: {
          label: 'comments',
          sortable: true  
        },
        state: {
          label: 'state',
          sortable: true  
        },
        url: {
          label: 'url',
          sortable: false  
        },
      },
      currentPage: 1,
      perPage: 10,
      filter: null,
      currentItem: 0
    }
  },
  components: {Spinner},
  
  computed: {
    // 从 store 的 state 对象中的获取 item。
    ...mapState(['zen']),
    // 从 store 的 state 对象中的获取 fetch text
    fetchText () {
      return this.zen.loading ? 'Fetching...' : 'Fetch ' + this.$route.params.personId
    },
    items(){
      return this.zen.list[0]
    }
  },
  // 我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去
  asyncData ({store}) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('FETCH_ZEN', 'first')
  },
  beforeMount () {
    this.$store.dispatch('FETCH_ZEN', 'first').then(response => {
      this.$setTitle('brt - ' + response.length)
    })
  },
  methods: {
    fetch () {
      this.$store.dispatch('FETCH_ZEN', 'normal')
    },
    details(item) {
      alert(JSON.stringify(item));
    }
  }
}
</script>

<style lang='less' scoped>
.zen {
  text-align: center;
}
.button {
  color: #333;
  background: #ddd;
  border: none;
  width: 200px;
  height: 40px;
  cursor: pointer;
}
</style>
