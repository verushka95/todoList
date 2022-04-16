<template>
  <div class="main__todo todo">
    <h1 class="todo__title title">Todo list</h1>
    <div class="todo__form-group">
      <input class="todo__input form-control input" type="text" v-model="nameTask" @keyup.enter="addTask($event)" placeholder="Введите название задачи"/>
    </div>
    <div v-if="getTasksCount" class="todo__content">
      <h3 class="todo__subtitle">Что нужно сделать?</h3>
      <ul class="todo__list">
          <li class="todo__item" v-for="item in (hasFilter ? getFilteredTasks : tasks)" :key="item.id" @click = "setCompletedTask(item.id)">
            <app-task :task="item" :myclass="'todo__task-item task-item'" />
          </li> 
      </ul>
      <div class="todo__info info">
        <div class="info__count">
          Количество задач: {{ countTask }}  
        </div>
        <app-item-sort :myclass="'info__sort sort'" :data="filter" @clickFilter="doFilter($event)"/>
        <div class="info__clear" v-show="hasCompleted" @click="clearCompletedTasks()">
         Удалить завершенные
        </div>
      </div>
    </div>
    <div v-else class="todo__content" >
      <div class="todo__text text-danger">
        Задач пока нет  
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import AppItemSort from '@/components/ItemSort.vue';
import AppTask from '@/components/Task.vue';
export default {
  name: 'TodoView',
  components: {AppItemSort, AppTask},
  data(){
    return {
      nameTask: '',
      hasFilter: false,
      filter: [
        { id: 0, keyValue: '', value: 'Все', selected: true },
        { id: 1, keyValue: 'active', value: 'Активные', selected: false },
        { id: 2, keyValue: 'completed', value: 'Завершенные', selected: false },
      ]
    }
  },
  computed: {
    ...mapGetters({'tasks':'getTasks'}),
    ...mapGetters(['getTasksCount', 'getFilteredTasks']),
    countTask(){
      return this.hasFilter ? this.getFilteredTasks.length : this.getTasksCount
    },
    hasCompleted(){
      return this.tasks.some(item => item.completed == true)
    }
  },
  methods: {
    ...mapActions(['add', 'clearCompleted', 'filterTasks', 'setCompleted']),
    addTask(){
      this.add(this.nameTask);
      this.nameTask = '';
      this.resetFilter();
    },
    clearCompletedTasks(){
      this.clearCompleted();
      this.resetFilter();
    },
    setActiveFilter(item){
      this.filter.forEach(element => {
        element.selected = element.id == item.id ? true : false;
      });
    },
    doFilter(item){
      this.filterTasks(item.keyValue);
      this.hasFilter = true;
      this.setActiveFilter(item);
    },
    setCompletedTask(id){
      this.setCompleted(id);
      this.resetFilter();
    },
    resetFilter(){
      this.hasFilter = false;
      this.filter.find(item => item.selected == true).selected = false;
      this.filter.find(item => item.id == 0).selected = true;
    }
  }
}
</script>