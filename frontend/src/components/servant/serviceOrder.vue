<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            {{order.Kellner + ', Bestellung #' + order.idBestellung}}
            <v-spacer/>
            <v-icon v-if="order.food">local_dining</v-icon>
            <v-icon v-if="order.drinks">local_bar</v-icon>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list>
                <v-list-item v-for="(item, ind) of order.food" :key="'itemFood/' + ind">
                    {{item.cashed + '/' + item.Stueck + ' ' + item.NAME + ' zu je ' + item.price + '€'}}
                </v-list-item>
                <v-divider v-if="order.drinks && order.food"></v-divider>
                <v-list-item v-for="(item, ind) of order.drinks" :key="'itemDrinks/' + ind">
                    {{item.cashed + '/' + item.Stueck + ' ' + item.NAME + ' zu je ' + item.price + '€'}}
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    {{'Summe: ' + (Math.round(this.sum * 100) / 100) + '€'}}
                </v-list-item>
            </v-list>
            <v-row>
                <v-col>
                    <v-btn @click="serveOrder">
                        <v-icon>local_shipping</v-icon>
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn @click="serveAndCashOrder">
                        <v-icon>local_shipping</v-icon>
                        <v-icon>add</v-icon>
                        <v-icon>euro_symbol</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>
<script>
import dbCalls from '../../utilities/backendCalls.js'
import { EventBus } from '../../services/eventBus.js'
export default {
    name: 'ServiceOrder',
    props: ['order'],
    components: {},
    data () {
        return {
            sum: 0
        }
    },
    created: function () {
        
    },
    mounted: function () {
        
    },
    watch: {
        order: {
            handler: 'sumUpOrder',
            immediate: true
        }
    },
    methods: {
        serveOrder: function () {
            var promises = []
            if (this.order.food) {
                promises.push(dbCalls.serveOrder('food', this.order.idBestellung, true))
            }
            if (this.order.drinks) {
                promises.push(dbCalls.serveOrder('drinks', this.order.idBestellung, true))
            }
            Promise.all(promises).then(data => {
                EventBus.$emit('refresh')
            }).catch(err => {
                console.log(err)
            })
        },
        serveAndCashOrder: function () {
            var promises = []
            if (this.order.food) {
                promises.push(dbCalls.serveOrder('food', this.order.idBestellung, true))
                // promises.push(dbCalls.cashOrder('food', this.order.idBestellung))
            }
            if (this.order.drinks) {
                promises.push(dbCalls.serveOrder('drinks', this.order.idBestellung, true))
                // promises.push(dbCalls.cashOrder('drinks', this.order.idBestellung))
            }
            Promise.all(promises).then(data => {
                EventBus.$emit('refresh')
                this.$router.push({name: 'ServantCash', params: {tableId: this.$route.params.tableId}})
            }).catch(err => {
                console.log(err)
            })
        },
        sumUpOrder: function (order) {
            this.sum = 0
            if (order.food) {
                order.food.forEach(item => {
                    this.sum += item.price * item.Stueck
                    this.sum = Math.round(this.sum * 100) / 100
                })
            }
            if (order.drinks) {
                order.drinks.forEach(item => {
                    this.sum += item.price * item.Stueck
                    this.sum = Math.round(this.sum * 100) / 100
                })
            }
        }
    }
}
</script>