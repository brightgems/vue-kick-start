var STORAGE_KEY = 'todos-vuejs-2.0'

const moduleTodo = {
  state: { list: [],loading:false },
  mutations: {
    addTodo (state,newTodo) {
      // state 模块的局部状态
      var value = newTodo && newTodo.trim()
      if (!value) {
        console.log("empty todo");
        return
      }
      state.list.push({
        id: state.list.length,
        title: value,
        completed: false,
      })
      
    },
    removeTodo(state,todo){
        state.list.splice(state.todo.list.indexOf(todo),1);
    },
    editTodo: function (state,todo) {
      console.log(state.list);
      
      var oldTodo = state.list.find(ele=> ele.id== todo.id);
      oldTodo.title = todo.title;
    },

    set_todos: (state, items) =>{
      state.list = items;
    },
    loading_todo: (state, loadingState) => {
        state.loading = loadingState;
        
    }
  },
  actions:{
      fetch_todo: ({commit, state: {list, loading}}) => {
        if (loading) return;
        if (list.length>0){
          console.log('ii');
          return list;
        }
        else{
          
          var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || [ ])
          todos.forEach(function (todo, index) {
            todo.id = index
          })
          
          commit('set_todos',todos);
          return todos;
        }
    },

    save_todo: function ({commit, state: {list}}, todos) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      console.info('save success');
    }
  }
  ,
  getters: {
    count (state) {
      return state.list.count
    },
    
  }
}

export default moduleTodo;