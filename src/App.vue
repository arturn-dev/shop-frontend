<template>
  <div class="container">
    <AppNavigation/>
    <router-view />
  </div>
</template>

<script>

import AppNavigation from './components/AppNavigation.vue';

export default {
  name: 'App',
  components: {
    AppNavigation
  }
}
</script>

<style>
  h3 {
    margin: 20px;
  }
</style>