var STORAGE_KEY = 'todos-vuejs-2.0'

const moduleTodo = {
  state: { todo:{list: [],loading:false }},
  mutations: {
    addTodo (state,newTodo) {
      // state 模块的局部状态
      var value = newTodo && newTodo.trim()
      if (!value) {
        return
      }
      state.todo.list.push({
        id: state.todo.list.count,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo(state,todo){
        state.todo.list.splice(state.todo.list.indexOf(todo),1);
    },
    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    set_todos: (state, items) =>{
      state.todo.list = items;
    },
    loading_todo: (state, loadingState) => {
        state.todo.loading = loadingState;
        
    }
  },
  actions:{
      fetch_todo: ({commit, state: {todo}}) => {
        if (todo.loading) return;
        if (todo.list)
          return todo.list;
        else{
          var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || [ ])
          todos.forEach(function (todo, index) {
            todo.id = index
          })
          
          commit('set_todos',data);
          return todos;
        }
    },

    save_todo: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }
  ,
  getters: {
    count (state) {
      return state.todo.list.count
    },
    
  }
}