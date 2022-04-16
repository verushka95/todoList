<template>
  <div class="main__home home">
    <h1 class="home__title title">Главная</h1>
    <div v-if="getTasksCount" class="home__block">
      <div class="home__info">Всего задач:  {{getTasksCount}} </div>
      <div class="home__info">Количество активных задач: {{getActiveTasksCount}}</div> 
      <router-link class="home__route" :to="{name : 'tasks'}"> Перейти к todo list</router-link>
    </div>
    <div v-else class="home__block">
      <div class="home__info text-danger">Задач пока нет</div>
      <router-link class="home__route" :to="{name : 'tasks'}">Перейти к добавлению задачи</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['getTasksCount', 'getActiveTasksCount'])
  }
}
</script>
