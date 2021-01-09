<template>
  <h3>Search</h3>
  <form>
    <div class="form-group">
      <label for=inputName>Name</label>
      <input type="text" 
              id="inputName" 
              class="form-control" 
              placeholder="Enter a name of the products you want"
              v-model="filters.name"/>
    </div>
    <div class="form-group">
      <label for="selectCategory">Category</label>
      <select v-model="filters.categoryId">
        <option :value="0">All</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{category.name}}
        </option>
      </select>
    </div>
    <div class="form-group row">
      <input type="button" 
        class="btn btn-info col-sm-12" 
        value="Filter" 
        @click="filterProducts"/>
    </div>
  </form>
</template>

<script>
import Consts from '../consts.js';
import axios from 'axios';

export default {
  name: 'ProductsFilterComp',
  data() {
    return {
      categories: {},
      filters: {
        name: "",
        categoryId: 0
      }
    }
  },
  methods: {
    filterProducts: function () {
      this.$emit('filter-event', JSON.parse(JSON.stringify(this.$data.filters)));
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.filterProducts();
    });

    var self = this;
    axios
      .get(Consts.backendUrl + '/categories')
      .then(res => {
        self.categories = res.data;
      });
  }
}
</script>

<style>

</style>