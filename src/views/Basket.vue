<template>
  <div>
    <div class="alert alert-success" role="alert" v-if="successMsg != ''">
      {{successMsg}}
    </div>
    <OrderedProductsTableComp :orderSuccessful="orderSuccessful"/>
    <OrderFormComp @order-successful-event="handleSuccessfulEvent"/>
  </div>
</template>

<script>
import OrderedProductsTableComp from '../components/OrderedProductsTableComponent.vue';
import OrderFormComp from '../components/OrderFormComponent.vue';

export default {
  name: 'Basket',
  data: function() {
    return {
      orderSuccessful: false,
      successMsg: ''
    }
  },
  components: {
    OrderedProductsTableComp,
    OrderFormComp
  },
  methods: {
    handleSuccessfulEvent: function() {
      this.orderSuccessful = true;
      this.successMsg = 'Order was sent successfully!';
    }
  }
}
</script>

<style>

</style>