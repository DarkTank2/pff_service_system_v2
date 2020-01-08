<template>
  <v-btn @click="refresh">
    Neu Laden
    <v-icon>refresh</v-icon>
  </v-btn>
</template>

<script>
import { EventBus } from '../../services/eventBus'
export default {
    name: 'RefreshBtn',
    props: [],
    components: {},
    data () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        
    },
    methods: {
        refresh: function () {
            EventBus.$emit('refresh')
        }
    },
    watch: {
        
    }
}
</script>

<style>

</style>