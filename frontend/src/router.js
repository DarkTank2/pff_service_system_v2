import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/waiter',
      name: 'waiter',
      component: () => import(/* webpackChunkName: "waiter" */ './views/Tableselector.vue')
    },
    {
      path: '/waiter/:tableId',
      name: 'waiterTable',
      props: true,
      component: () => import(/* webpackChunkName: "waiter" */ './views/Waiter.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
