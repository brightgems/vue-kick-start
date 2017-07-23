<template>
  <div class='container'>
    <h1>Your Todo List
    </h1>
    <div class="row">
        <b-form-input type="text" :v-text="editedTodo" @input="onInput"></b-form-input>
        <button class='btn btn-primary' @click='addTodo'>Add Task</button>
        <button class='btn btn-success' @click='saveTodo'>Save Todo</button>
    </div>
    <div class="row">
    <div class="col">
      <ul class="task-count" v-show="todo.list.length">
        <li>
        {{unCheckedLength}}Unfinished Tasks</li>
        <li class="action">
        <a :class="{active: visibility == 'all'}" href="#all" rel="external nofollow" >All Tasks</a>|
        <a :class="{active: visibility == 'unfinished'}"href="#unfinished" rel="external nofollow" >Unfinished Tasks</a>|
        <a :class="{active: visibility == 'finished'}"href="#finished" rel="external nofollow" >Finished Tasks</a>
        </li>
      </ul>
    </div>
    </div>
    <div class="row">
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
    <span class="no-task-tip" v-show="!filteredList.length">还没有添加任何任务</span> 
     <!-- Main table element -->
    <b-table striped hover 
            :items="filteredList"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            
    >
      <template slot="completed" scope="item">
        {{item.value}}
        </input>
        
      </template>
      <template slot="title" scope="item">
        <input 
          class="edit" 
          type="text" 
          v-model="item.value"
          @blur="edited"
          @input="editTodo(item)"
          @keyup.esc="cancel($event.target.value)"
          @keyup.del="removeTodo($event.target.value)"
          />{{item.value}}
      </template>
    </b-table>
    <div class="row">
        <div class="justify-content-center col-12 my-2">
            <b-pagination size="md" :total-rows="items.length" :per-page="perPage" v-model="currentPage" />
        </div>
    </div>
    <spinner :show='todo.loading'></spinner>
  </div>
  
</template>

<script>

import Spinner from '../components/Spinner.vue'
import {mapState, mapMutations} from 'vuex'


// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

export default {

  data (){ 
    return {
      fields:{
        checked:{
            label : 'checked',
          sortable: false
        },
        title: {
          label : 'title',
          sortable: true  
        },
        
      },
      currentPage: 1,
      perPage: 10,
      filter: null,
      editedTodo: "",
      visibility: 'all',
      beforeTitle: "",
      editItem: ""
    }
  },
  components: {Spinner},
  computed: {
    
    // 从 store 的 state 对象中的获取 item。
    ...mapState(['todo']),

    // 从 store 的 state 对象中的获取 fetch text
    fetchText () {
      return this.todo.list ? 'Fetching...' : 'Fetch todo' ;
    },
    items(){
      return this.todo.list;
    },
    unCheckedLength(){
        return this.todo.list.filter(function(item){
          return item.isChecked == false
        }).length
    },
    filteredList(){   
      return filters[this.visibility] ? filters[this.visibility](this.todo.list) : this.todo.list
    },
    filteredTodos: function () {
      return filters[this.visibility](this.todo.list)
    },
    remaining: function () {
      return filters.active(this.todo.list).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todo.forEach(function (todo) {
          todo.completed = value
        })
      }
    },
  },
  // 我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去
  asyncData ({store}) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetch_todo')
  },
  beforeMount () {
    this.$store.dispatch('fetch_todo')
  },
  methods: {
    addTodo(){
      this.$store.commit('addTodo',this.editedTodo)
    },
    onInput(val){
      this.$set(this,'editedTodo',val);
    },
    editTodo(item){ 
      
      this.beforeTitle = item.item.title;
      this.editItem = item.value;
      this.$store.commit('editTodo',item.item);
    },
    saveTodo(){
      this.$store.dispatch('save_todo',this.items);
    },
    edited(){
      this.editItem = ""
      
    },
    cancel(item){
      
      this.editItem = "";
      this.beforeTitle = ""
    },
    ...mapMutations(['removeTodo'])
  }
}
</script>

<style lang='less' scoped>

.button {
  color: #33f;
  background: #ddd;
  border: none;
  width: 200px;
  height: 40px;
  cursor: pointer;
}
</style>
