<template>
  <div>
    <header class="header">
      <div class="container">
        <nav class="header__nav">
          <router-link :to="{name: 'home'}" class="header__link">Главная</router-link>
          <router-link :to="{name: 'tasks'}" class="header__link">Todo List</router-link>
        </nav>
      </div>
    </header>
    <main class="main">
      <div class="container">
          <router-view/>
      </div>
    </main>
  </div>
</template>
<script>
export default {
   mounted(){
    this.$store.dispatch('updateStorageTasks');
  }
}
</script>
