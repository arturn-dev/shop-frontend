<template>
  <div>
    <OrderedProductsTableComp/>
    <OrderFormComp/>
  </div>
</template>

<script>
import OrderedProductsTableComp from '../components/OrderedProductsTableComponent.vue';
import OrderFormComp from '../components/OrderFormComponent.vue';

export default {
  name: 'Basket',
  components: {
    OrderedProductsTableComp,
    OrderFormComp
  }
}
</script>

<style>

</style>