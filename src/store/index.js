import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
    filtered: [] 
  },
  getters: {
    getTasks(state){
      return state.tasks
    },
    getTasksCount(state){
      return state.tasks ? state.tasks.length : 0;
    },
    getCompletedTasksCount(state){
      return state.tasks ? state.tasks.filter(item => item.completed == true).length : 0;
    },
    getActiveTasksCount(state, getters){
      return getters.getTasksCount - getters.getCompletedTasksCount;
    },
    getFilteredTasks(state){
      return state.filtered
    }
  },
  mutations: {
    ADD(state,name){
      let newTask = {id:Date.now(), name, completed: false};
      state.tasks = state.tasks || [];
      state.tasks.push(newTask);
    },
    SET_COMPLETED(state, id){
      let task = state.tasks.find(item => item.id == id)
      task.completed = true;
    },
    CLEAR_COMPLETED(state){
      state.tasks = state.tasks.filter(item => item.completed == false);
    },
    UPDATE_STORAGE_TASKS(state){
      state.tasks = JSON.parse(localStorage.getItem('tasks'));
    },
    FILTER(state, key){
      state.filtered = state.tasks.filter(item => {
        if(key == 'completed'){
          return item.completed == true;
        }
        else if(key == 'active'){
          return item.completed == false;
        }
        else{
          return true;
        }
        
      })
    }
  },
  actions: {
    add({commit}, name){
      commit('ADD', name);
      this.dispatch('setStorage');
    },
    setCompleted({commit}, id){
      commit('SET_COMPLETED', id);
      this.dispatch('setStorage');
    },
    clearCompleted({commit}){
      commit('CLEAR_COMPLETED');
      this.dispatch('setStorage');
    },
    updateStorageTasks({commit}){
      commit('UPDATE_STORAGE_TASKS');
    },
    filterTasks({commit}, key){
      commit('FILTER', key);
    },
    setStorage({state}){
      localStorage.tasks = JSON.stringify(state.tasks);
    }
  }
})
