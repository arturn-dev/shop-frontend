import { createWebHistory, createRouter } from 'vue-router';
import Home from './views/Home.vue';
import Basket from './views/Basket.vue';

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/basket',
      component: Basket
    }
  ]
});

export default router;