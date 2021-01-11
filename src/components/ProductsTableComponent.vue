<template>
  <h3>Products</h3>
  <div class="table-responsive">
    <table class="table-hover table-striped w-100">
      <thead>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th><!-- "Buy" buttons column --></th>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.name">
          <td>{{product.name}}</td>
          <td>{{product.description}}</td>
          <td>{{product.price}}</td>
          <td>
            <input 
              type="button"
              class="btn btn-primary"
              value="Buy"
              @click="addProductToOrder(product.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Consts from '../consts';
import order from '../order';
import axios from 'axios';
import _ from 'underscore';

export default {
  name: 'ProductsTableComp',
  props: {
    filters: {}
  },
  data: function() {
    return {
      products: [],
      filteredProducts: []
    }
  },
  watch: {
    filters: {
      handler: function (newVal, oldVal) {
        console.log("filters changes: ", newVal, oldVal);
        this.filterProducts(newVal);
      },
      deep: true
    }
  },
  methods: {
    filterProducts: function(filters) {
      this.filteredProducts = _.filter(
        this.products,
        function(val) {
          return (
            val.name.toLowerCase().trim().includes(filters.name.toLowerCase().trim()) &&
            (filters.categoryId == 0 || (val.categoryId == filters.categoryId))
          );
        }
      );
    },
    addProductToOrder: function(productId) {
      order.order.products.push({
        id: productId
      });
      console.log('order: ', order.order);
    }
  },
  mounted: function() {
    var self = this;
    axios
      .get(Consts.backendUrl + '/products')
      .then(res => {
        self.products = res.data.data.allProducts;
        self.filteredProducts = self.products;
      });
  }
}
</script>

<style>

</style>