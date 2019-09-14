<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <!-- <span>Service</span>
        <span class="font-weight-light">Tool</span> -->
      </v-toolbar-title>
      <span class="font-weight-light">{{title}}</span>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" label="Darkmode" @change="$vuetify.theme.dark = darkMode" hide-details></v-switch>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer v-model="drawer" app>
      <Sidebar/>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import {EventBus} from './services/eventBus.js'
import dbCalls from './utilities/backendCalls.js'

export default {
  name: 'App',
  components: {
    'Sidebar': Sidebar
  },
  data: () => ({
    darkMode: true,
    drawer: false,
    tables: [],
    title: ''
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
          this.tables = data
          EventBus.$emit('w-receive-tables', this.tables)
      }).catch(err => {
          console.log(err)
      })
    }
  }
};
</script>
