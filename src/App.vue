<template>
  <div class="container">
    <h1>Computer Shop</h1>
    <ProductsFilterComp @filter-event="handleFilterEvent"/>
    <ProductsTableComp :filters="filters"/>
  </div>
</template>

<script>
import ProductsTableComp from './components/ProductsTableComponent.vue';
import ProductsFilterComp from './components/ProductsFilterComponent.vue';

export default {
  name: 'App',
  components: {
    ProductsTableComp,
    ProductsFilterComp
  },
  data() {
    return {
      filters: {}
    }
  },
  methods: {
    handleFilterEvent: function (data) {
      this.filters = data;
      console.log("Received event: ");
      console.log(data);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
