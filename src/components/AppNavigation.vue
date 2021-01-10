<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Computer Shop</a>
    <div class="collapse navbar-collapse">
      <div class="navbar-nav">
        <router-link class="nav-link" to="/">Shop</router-link>
        <router-link class="nav-link" to="/basket">Basket</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation'
}
</script>

<style>

</style>