<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase">
        <span>Service</span>
        <span class="font-weight-light">Tool</span>
      </v-toolbar-title>
      <v-card elevation='0'>
        <v-card-actions>
          <v-btn to='/'>
            <v-icon>home</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" label="Darkmode" @change="$vuetify.theme.dark = darkMode" hide-details></v-switch>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    darkMode: false
  }),
  methods: {
    routeHome: function () {
      this.$router.push('/')
    }
  }
};
</script>
