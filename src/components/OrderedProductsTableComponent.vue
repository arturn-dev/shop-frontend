<template>
  <h3>Products</h3>
  <div class="table-responsive">
    <table class="table-hover table-striped w-100">
      <thead>
        <th>Name</th>
        <th>Amount</th>
        <th>Price</th>
        <th><!-- "Remove" buttons column --></th>
      </thead>
      <tbody>
        <tr v-for="product in orderedProducts" :key="product.name">
          <td>{{product.name}}</td>
          <td>{{product.amount}}</td>
          <td>{{product.amount * product.price}}</td>
          <td>
            <input 
              type="button"
              class="btn btn-danger"
              value="Remove"
              @click="removeProductFromOrder(product.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4>Total cost: {{totalCost}}</h4>
</template>

<script>
import Consts from '../consts';
import order from '../order';
import axios from 'axios';
import _ from 'underscore';

export default {
  name: 'OrderedProductsTableComp',
  data: function() {
    return {
      orderedProducts: []
    }
  },
  methods: {
    removeProductFromOrder: function(productId) {
      this.orderedProducts = _.without(
        this.orderedProducts, _.findWhere(
          this.orderedProducts, {id: productId}));
      order.products = _.without(
        order.products, _.findWhere(
          order.products, {id: productId}));
    }
  },
  mounted: function() {
    var self = this;
    order.products.forEach(product => {
      axios
        .get(Consts.backendUrl + '/products/' + product.id)
        .then(res => {
          let orderedProduct = res.data.data.product;
          orderedProduct.amount = product.amount;
          self.orderedProducts.push(orderedProduct);
        })
        .catch(err => console.log(err));
    });
  },
  computed: {
    totalCost: function() {
      return _.reduce(this.orderedProducts, function(memo, product) {
        return memo + product.price * product.amount;
      }, 0);
    }
  }
}
</script>

<style>
  h4 {
    margin: 20px;
    text-align: right;
  }
</style>