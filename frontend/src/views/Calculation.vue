<template>
    <v-container>
        <v-row>
            <v-col v-for="item in pricedFood" :key="'food/item/' + item.Name" sm="2" cols="12">
                <Item :item="item" type="food"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="item in pricedDrinks" :key="'drinks/item/' + item.Name" sm="2" cols="12">
                <Item :item="item" type="drinks"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { EventBus } from '../services/eventBus'
import dbCalls from '../utilities/backendCalls.js'
import Item from '../components/calc/Item'
export default {
    name: 'Calculation',
    components: {
        Item
    },
    data: () => ({
        food: [],
        drinks: []
    }),
    created () {
        EventBus.$on('fetchItems', this.fetchItems)
        EventBus.$on('refresh', this.fetchItems)
    },
    mounted () {
        this.fetchItems()
        EventBus.$emit('set-additional-component', {component: 'RefreshBtn', data: {}})
    },
    beforeDestroy: function () {
        EventBus.$off('fetchItems', this.fetchItems)
        EventBus.$off('refresh', this.fetchItems)
        EventBus.$emit('reset-additional-component')
    },
    methods: {
        fetchItems: function () {
            dbCalls.getCalcItems().then(data => {
                this.food = data.food || []
                this.drinks = data.drinks || []
                EventBus.$emit('update', [...this.food.filter(item => item.depleted === 1), ...this.drinks.filter(item => item.depleted === 1)])
            }).catch()
        }
    },
    computed: {
        pricedFood: function () {
            return this.food.filter(item => item.price !== 0)
        },
        pricedDrinks: function () {
            return this.drinks.filter(item => item.price !== 0)
        }
    }
}
</script>

<style>

</style>