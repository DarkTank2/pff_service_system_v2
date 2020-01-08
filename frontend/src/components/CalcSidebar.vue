<template>
    <v-navigation-drawer permanent persistent fixed touchless app>
        <v-list two-line subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Bestellung</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="item in data" :key="item.Name + '/' + item.amount" ripple @click="remove(item)">
                <v-list-item-content>
                    <v-list-item-title>{{item.Name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.itemString}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-list-item-action-text>{{item.itemSum}}</v-list-item-action-text>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <v-list-item ripple>
                <v-list-item-content>
                    <v-list-item-title>{{ 'SUMME: ' + (sum) + ' €' }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-btn block @click="finalize">Abschließen</v-btn>
            <v-btn block @click="dialog = true">Zur Kasse</v-btn>
        </template>
        <v-dialog v-model="dialog" @click:outside="cancel">
            <!--<v-btn slot="activator" color="primary">Zur Kasse</v-btn>-->
            <v-card>
                <v-card-title class="headline">
                    Zahlung
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <v-col sm="4" cols="12">
                                <div class="display-2 font-weight-regular">Summe: {{ sum }} €</div>
                            </v-col>
                            <v-col sm="4" cols="12">
                                <div class="display-2 font-weight-regular">Retourgeld: {{ retour }} €</div>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col sm="1"><v-btn @click="addCash(0.01)" fab dark class="black--text" color="red">1c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(0.02)" fab dark class="black--text" color="red">2c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(0.05)" fab dark class="black--text" color="red">5c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(0.1)" fab dark class="black--text" color="yellow">10c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(0.2)" fab dark class="black--text" color="yellow">20c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(0.5)" fab dark class="black--text" color="yellow">50c</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(1)" fab dark class="black--text" color="grey">1€</v-btn></v-col>
                            <v-col sm="1"><v-btn @click="addCash(2)" fab dark class="black--text" color="grey">2€</v-btn></v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col sm="1"><v-btn block @click="addCash(5)" color="blue-grey lighten-1">5€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(10)" color="red lighten-1">10€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(20)" color="blue lighten-2">20€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(50)" color="amber darken-2">50€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(100)" color="light-green darken-2">100€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(200)" color="yellow darken-1">200€</v-btn></v-col>
                            <v-col sm="1"><v-btn block @click="addCash(500)" color="deep-purple lighten-1">500€</v-btn></v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="reset">Reset</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="finalize">Abschließen</v-btn>
                    <v-btn @click="cancel">Abbruch</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-navigation-drawer>
</template>

<script>
import { EventBus } from '../services/eventBus'
import dbCalls from '../utilities/backendCalls'
export default {
    name: 'Sidebar',
    props: [],
    data () {
        return {
            visible: true,
            dialog: false,
            data: [],
            sum: 0,
            retour: 0
        }
    },
    created () {
        EventBus.$on('addToOrder', this.addToOrder)
        EventBus.$on('update', this.cleanOrder)
    },
    beforeDestroy: function () {
        EventBus.$off('update', this.cleanOrder)
    },
    methods: {
        addCash: function (amount) {
            this.retour += amount
            this.retour = Math.round(this.retour * 100) / 100
        },
        reset: function () {
            this.retour = (-1) * this.sum
            this.retour = Math.round(this.retour * 100) / 100
        },
        addToOrder: function (item) {
            var orderItem = this.data.filter(el => this.equals(el, item))
            if (orderItem.length > 0) {
                orderItem[0].amount += 1
                this.itemString(orderItem[0])
                this.itemSum(orderItem[0])
            } else {
                item.amount = 1
                this.itemString(item)
                this.itemSum(item)
                this.data.push(item)
            }
            this.sum += item.price
            this.sum = Math.round(this.sum * 100) / 100
            this.reset()
        },
        remove: function (item) {
            var orderItem = this.data.filter(el => this.equals(el, item))[0]
            if (orderItem.amount > 0) {
                this.sum -= orderItem.price
                this.sum = Math.round(this.sum * 100) / 100
                orderItem.amount--
                this.itemString(orderItem)
                this.itemSum(orderItem)
            }
            if (orderItem.amount === 0) {
                var index = this.data.indexOf(orderItem)
                this.data = this.data.filter((item, ind) => ind !== index)
            }
            this.reset()
        },
        equals: function (obj1, obj2) {
            // var keys1 = Object.keys(obj1)
            // var keys2 = Object.keys(obj2)
            // // both objects have same amount of keys
            // if (keys1.length !== keys2.length) return false
            // // both objects have all same keys
            // if (!keys1.every(key => keys2.includes(key))) return false
            // if (!keys2.every(key => keys1.includes(key))) return false
            // // values of the keys match
            // if (!keys1.every(key => obj1[key] == obj2[key])) return false
            // if (!keys2.every(key => obj1[key] == obj2[key])) return false

            return obj1.Name === obj2.Name
        },
        itemString: function (item) {
            item.itemString = '' + item.amount + ' x ' + item.price + '€'
        },
        itemSum: function (item) {
            item.itemSum =  Math.round(item.amount * item.price * 100) / 100 + '€'
        },
        cancel: function () {
            this.dialog = false
            this.reset()
        },
        cleanOrder: function (depletedItems) {
            // todo: filter out depleted items, somehow get them from base.vue
            depletedItems.forEach(item => {
                var orderItem = this.data.filter(el => this.equals(el, item))[0]
                if (orderItem === undefined) return // depleted item not added to order
                var index = this.data.indexOf(orderItem)
                this.data = this.data.filter((item, ind) => ind !== index)
                this.sum -= orderItem.amount * orderItem.price
            })
            this.sum = Math.round(this.sum * 100) / 100
            this.reset()
        },
        finalize: function () {
            var order = {
                food: [],
                drinks: []
            }
            order.food = this.data.filter(item => item.idEssen)
            order.food.forEach(item => item.Stueck = item.amount)
            order.drinks = this.data.filter(item => item.idTrinken)
            order.drinks.forEach(item => item.Stueck = item.amount)
            dbCalls.postCalcOrder(order).then(data => {
                this.data = []
                this.sum = 0
                this.reset()
                this.dialog = false
                EventBus.$emit('fetchItems')
            }).catch(err => console.log(err))
        }
    }
}
</script>
