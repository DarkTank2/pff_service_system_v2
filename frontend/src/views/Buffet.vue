<template>
    <v-row no-gutters>
        <v-col :cols="drinks.length > 0 ? '6' : '12'" v-if="food.length > 0">
            <v-container fluid>
                <v-row>
                    <BOrder
                    v-for="(order, index) in food"
                    :key="'order/food/' + index"
                    :order="order"
                    type="food"
                    :lonely="drinks.length === 0"
                    />
                </v-row>
            </v-container>
        </v-col>
        <v-col :cols="food.length > 0 ? '6' : '12'" v-if="drinks.length > 0">
            <v-container fluid>
                <v-row>
                    <BOrder
                    v-for="(order, index) in drinks"
                    :key="'order/drinks/' + index"
                    :order="order"
                    type="drinks"
                    :lonely="food.length === 0"
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
            drinks: []
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
    },
    methods: {
        updateTime: function () {
            EventBus.$emit('change-title', moment().format('MMMM Do YYYY, HH:mm:ss'))
            setTimeout(() => {this.updateTime()}, 1000)
        },
        updateFood: function () {
            dbCalls.getNotFinished('food').then(data => {
                this.food = this.clusterOrder(data, 'food')
                setTimeout(() => {this.updateFood()}, 5000)
            }).catch(err => {
                console.log(err)
            })
        },
        updateDrinks: function () {
            dbCalls.getNotFinished('drinks').then(data => {
                this.drinks = this.clusterOrder(data, 'drinks')
                setTimeout(() => {this.updateDrinks()}, 5000)
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
        }
    },
    watch: {
        
    }
}
</script>