<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <!-- <span>Service</span>
        <span class="font-weight-light">Tool</span> -->
      </v-toolbar-title>
      <span class="font-weight-light">{{title}}</span>
      <v-spacer></v-spacer>
      <component v-if="additionalComponent.state === true" :is="additionalComponent.component" :data="additionalComponent.data"></component>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" label="Darkmode" @change="$vuetify.theme.dark = darkMode" hide-details></v-switch>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <CalcSidebar :drawer="drawer" v-if="$route.fullPath.includes('/calc')"/>
    <Sidebar :drawer="drawer" v-else v-on:update-drawer="updateDrawer"/>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import CalcSidebar from './components/CalcSidebar.vue'
import {EventBus} from './services/eventBus.js'
import dbCalls from './utilities/backendCalls.js'

import BuffetBtn from './components/additions/BuffetBtn.vue'
import DeplBtn from './components/additions/DeplBtn.vue'
import RefreshBtn from './components/additions/RefreshBtn'

export default {
  name: 'App',
  components: {
    'Sidebar': Sidebar,
    BuffetBtn,
    DeplBtn,
    RefreshBtn,
    CalcSidebar
  },
  data: () => ({
    darkMode: true,
    drawer: false,
    tables: [],
    title: '',
    additionalComponent: {
      state: false,
      component: '',
      data: {}
    }
  }),
  created: function () {
    EventBus.$on('w-get-tables', () => {
      if (this.tables.length > 0) {
        EventBus.$emit('w-receive-tables', this.tables)
      } else {
        this.getTables()
      }
    })
    EventBus.$on('change-title', title => {
      this.title = title
    })
    EventBus.$on('set-additional-component', comp => {
      this.additionalComponent.component = comp.component
      this.additionalComponent.data = comp.data
      this.additionalComponent.state = true
    })
    EventBus.$on('reset-additional-component', () => {
      this.additionalComponent.state = false
      this.additionalComponent.component = ''
      this.additionalComponent.data = {}
    })
    EventBus.$on('reset-tables', () => {
      this.tables = []
    })
    this.$vuetify.theme.dark = this.darkMode
  },
  methods: {
    routeHome: function () {
      this.$router.push('/')
    },
    getTables: function () {
      dbCalls.getTables().then(data => {
          data.forEach(table => {
              table.name = 'Tisch-Nr.: ' + table.Number
          })
          this.tables = data.filter(table => table.Number !== 999) // filter out buffet-dummy-table
          EventBus.$emit('w-receive-tables', this.tables)
      }).catch(err => {
          console.log(err)
      })
    },
    updateDrawer: function (newVal) {
      this.drawer = newVal
    }
  }
};
</script>
<style>
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
</style>