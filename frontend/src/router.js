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
      path: '/buffet',
      name: 'buffet',
      component: () => import(/* webpackChunkName: "waiter" */ './views/Buffet.vue')
    },
    {
      path: '/buffet/handleDepletion',
      name: 'Depletion',
      component: () => import(/* webpackChunkName: "waiter" */ './views/Depletion.vue')
    },
    {
      path: '/servant',
      name: 'ServantTable',
      component: () => import(/* webpackChunkName: "waiter" */ './views/ServantTableSelector.vue')
    },
    {
      path: '/servant/:tableId',
      name: 'Servant',
      component: () => import(/* webpackChunkName: "waiter" */ './views/Servant.vue'),
      children: [
        {
          path: '',
          name: 'ServantBase',
          component: () => import(/* webpackChunkName: "waiter" */ './views/ServantBase.vue')
        },
        {
          path: 'cash',
          name: 'ServantCash',
          component: () => import(/* webpackChunkName: "waiter" */ './views/ServantCash.vue')
        },
        {
          path: 'serve',
          name: 'ServantServe',
          component: () => import(/* webpackChunkName: "waiter" */ './views/ServantServe.vue')
        }
      ]
    },
    {
      path: '/calc',
      name: 'calc',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Calculation.vue')
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
