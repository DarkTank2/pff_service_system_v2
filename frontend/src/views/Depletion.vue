<template>
    <v-container fluid>

    </v-container>
</template>
<script>
import dbCalls from '../utilities/backendCalls.js'
import { EventBus } from '../services/eventBus'
export default {
    name: '',
    props: [],
    components: {},
    data () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        EventBus.$emit('set-additional-component', {
            component: 'DeplBtn',
            data: {}
        })
    },
    destroyed: function () {
        EventBus.$emit('reset-additional-component')
    },
    methods: {
        
    },
    watch: {
        
    }
}
</script>