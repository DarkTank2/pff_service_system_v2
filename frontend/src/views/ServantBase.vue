<template>
    <v-container>
        <v-row v-if="items.notCashed.food.length > 0 || items.notCashed.drinks.length > 0">
            <v-col>
                <v-btn outlined block large @click="handleCash">
                    <v-icon>euro_symbol</v-icon>
                    <span>Kassieren</span>
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="items.notServed.length > 0">
            <v-col>
                <v-btn outlined block large @click="handleServe">
                    <v-icon>local_shipping</v-icon>
                    <span>Servieren</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { EventBus } from '../services/eventBus'
export default {
    name: 'ServantBase',
    props: ['items'],
    components: {},
    data () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        EventBus.$emit('set-crumb')
    },
    methods: {
        handleCash: function () {
            this.$router.push({name: 'ServantCash', params: {tableId: this.$route.params.tableId}})
        },
        handleServe: function () {
            this.$router.push({name: 'ServantServe', params: {tableId: this.$route.params.tableId}})
        }
    },
    watch: {
        
    }
}
</script>