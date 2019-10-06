<template>
    <v-card>
        <v-card-title>
            Noch nicht serviert:
        </v-card-title>
        <v-card-text>
            <v-expansion-panels>
                <ServiceOrder v-for="(order, index) in items.notServed" :key="'orderNotServed/' + index" :order="order"></ServiceOrder>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>
<script>
import ServiceOrder from '../components/servant/serviceOrder.vue'
import { EventBus } from '../services/eventBus'
export default {
    name: 'ServantServe',
    props: ['items'],
    components: {
        ServiceOrder
    },
    data () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        EventBus.$emit('set-crumb', {text: 'Service', disabled: true})
    },
    methods: {
        
    },
    watch: {
        
    }
}
</script>