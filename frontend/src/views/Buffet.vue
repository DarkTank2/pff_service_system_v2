<template>
    <v-row no-gutters>
        <v-col :cols="filterDrinks.length > 0 ? '6' : '12'" v-if="filterFood.length > 0">
            <v-container fluid>
                <v-row>
                    <BOrder
                    v-for="(order, index) in filterFood"
                    :key="'order/food/' + index"
                    :order="order"
                    type="food"
                    :lonely="filterDrinks.length === 0"
                    v-on:finalize="finalizeFood(index)"
                    v-on:chosen="orderChosen({type: 'food', id:order.idBestellung})"
                    />
                </v-row>
            </v-container>
        </v-col>
        <v-col :cols="filterFood.length > 0 ? '6' : '12'" v-if="filterDrinks.length > 0">
            <v-container fluid>
                <v-row>
                    <BOrder
                    v-for="(order, index) in filterDrinks"
                    :key="'order/drinks/' + index"
                    :order="order"
                    type="drinks"
                    :lonely="filterFood.length === 0"
                    v-on:finalize="finalizeDrinks(index)"
                    v-on:chosen="orderChosen({type: 'drinks', id:order.idBestellung})"
                    />
                </v-row>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
import { EventBus } from '../services/eventBus'
import dbCalls from '../utilities/backendCalls.js'
import moment from 'moment'

import Order from '../components/buffet/Order.vue'
export default {
    name: 'Buffet',
    props: [],
    components: {
        'BOrder': Order
    },
    data () {
        return {
            food: [],
            drinks: [],
            timerTime: undefined,
            timerFood: undefined,
            timerDrinks: undefined,
            chosenOrders: []
        }
    },
    created: function () {
        EventBus.$on('update-orders', () => {
            this.updateFood()
            this.updateDrinks()
        })
    },
    mounted: function () {
        this.updateTime()
        this.updateFood()
        this.updateDrinks()
        EventBus.$emit('set-additional-component', {
            component: 'BuffetBtn',
            data: {}
        })
    },
    destroyed: function () {
        EventBus.$emit('reset-additional-component')
        if (this.timerTime !== undefined) clearTimeout(this.timerTime)
        if (this.timerFood !== undefined) clearTimeout(this.timerFood)
        if (this.timerDrinks !== undefined) clearTimeout(this.timerDrinks)
        EventBus.$emit('change-title', '')
    },
    methods: {
        updateTime: function () {
            EventBus.$emit('change-title', moment().format('MMMM Do YYYY, HH:mm:ss'))
            this.timerTime = setTimeout(() => {this.updateTime()}, 1000)
        },
        updateFood: function () {
            dbCalls.getNotFinished('food').then(data => {
                this.food = this.clusterOrder(data, 'food')
                var chosenFoodIds = this.chosenOrders.filter(order => order.type === 'food').map(order => order.id)
                this.food.forEach(order => {
                    order.visible = true
                    if (chosenFoodIds.includes(order.idBestellung)) order.chosen = true
                })
                this.timerFood = setTimeout(() => {this.updateFood()}, 5000)
            }).catch(err => {
                console.log(err)
            })
        },
        updateDrinks: function () {
            dbCalls.getNotFinished('drinks').then(data => {
                this.drinks = this.clusterOrder(data, 'drinks')
                var chosenFoodIds = this.chosenOrders.filter(order => order.type === 'drinks').map(order => order.id)
                this.drinks.forEach(order => {
                    order.visible = true
                    if (chosenFoodIds.includes(order.idBestellung)) order.chosen = true
                })
                this.timerDrinks = setTimeout(() => {this.updateDrinks()}, 5000)
            }).catch(err => {
                console.log(err)
            })
        },
        clusterOrder: function (data, type) {
            var clusters = []
            var comment = type === 'food' ? 'commentEssen' : 'commentTrinken'
            data.forEach(item => {
                var order = clusters.find(order => order.idBestellung === item.idBestellung)
                if (order !== undefined) {
                    order.items.push({
                        Name: item.Name,
                        Stueck: item.Stueck
                    })
                } else {
                    var cluster = {}
                    cluster.Kellner = item.Kellner
                    cluster.Number = item.Number
                    cluster[comment] = item[comment]
                    cluster.idBestellung = item.idBestellung
                    cluster.items = [
                        {
                            Name: item.Name,
                            Stueck: item.Stueck
                        }
                    ]
                    clusters.push(cluster)
                }
            })
            return clusters
        },
        finalizeFood: function (index) {
            this.food[index].visible = false
            var id = this.food[index].idBestellung
            this.chosenOrders = this.chosenOrders.filter(order => !(order.id === id && order.type === 'food'))
        },
        finalizeDrinks: function (index) {
            this.drinks[index].visible = false
            var id = this.drinks[index].idBestellung
            this.chosenOrders = this.chosenOrders.filter(order => !(order.id === id && order.type === 'drinks'))
        },
        orderChosen: function (obj) {
            var order = this[obj.type].find(order => order.idBestellung === obj.id)
            order.chosen = true
            this.chosenOrders.push(obj)
            this.updateFood()
            this.updateDrinks()
        }
    },
    computed: {
        filterFood: function () {
            return this.food.filter(order => order.visible === true)
        },
        filterDrinks: function () {
            return this.drinks.filter(order => order.visible === true)
        }
    },
    watch: {
        
    }
}
</script>