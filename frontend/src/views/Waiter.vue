<template>
    <v-card>
        <v-tabs center-active>
            <v-tab>
                <v-icon left>more_vert</v-icon>
                Allg.
            </v-tab>
            <v-tab v-for="(cat, index) in food" :key="'food' + index">
                <v-icon left>local_dining</v-icon>
                {{cat.category}}
            </v-tab>
            <v-tab v-for="(cat, index) in drinks" :key="'drinks' + index">
                <v-icon left>local_bar</v-icon>
                {{cat.category}}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-container>
                        <v-row>
                            <v-col cols='12'>
                                <v-textarea
                                label="Kommentar Essen"
                                rows="4"
                                counter="250"
                                :rules="rules"
                                clearable
                                auto-grow
                                prepend-icon="local_dining"
                                v-model="commentEssen"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols='12'>
                                <v-textarea
                                label="Kommentar Trinken"
                                rows="4"
                                counter="250"
                                :rules="rules"
                                clearable
                                auto-grow
                                prepend-icon="local_bar"
                                v-model="commentTrinken"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn outlined @click="invokeCheckout">
                            <v-icon>
                                send
                            </v-icon>
                            Checkout
                        </v-btn>
                        <v-btn outlined @click="reset">
                            <v-icon>clear</v-icon>
                            Reset
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
            <v-tab-item v-for="(cat, index) in food" :key="'foodItems' + index">
                <WCategory type="food" :category="cat.category"/>
            </v-tab-item>
            <v-tab-item v-for="(cat, ind) in drinks" :key="'drinksItems' + ind">
                <WCategory type="drinks" :category="cat.category"/>
            </v-tab-item>
        </v-tabs>
        <v-dialog v-model="checkout" scrollable max-width="310px">
            <v-card>
                <v-card-title>
                    <span>{{'Tisch-Nr.: ' + table.Number + ' als ' + orderObj.Kellner}}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-list subheader>
                        <WItem
                        v-for="(item, index) in orderObj.food"
                        :key="'food/chekout/' + index"
                        :item="item"
                        :type="'food'"
                        v-on:update_amount="updateAmount">

                        </WItem>
                        <WItem
                        v-for="(item, index) in orderObj.drinks"
                        :key="'drinks/chekout/' + index"
                        :item="item"
                        :type="'drinks'"
                        v-on:update_amount="updateAmount">

                        </WItem>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn block @click="postOrder">
                        <v-icon>send</v-icon>
                        Abschicken
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import Vue from 'vue'
import {EventBus} from '../services/eventBus.js'
import dbCalls from '../utilities/backendCalls.js'

import Category from '../components/waiter/Category.vue'
import Item from '../components/waiter/Item.vue'

export default {
    name: 'Waiter',
    props: ['tableId'],
    components: {
        'WCategory': Category,
        'WItem': Item
    },
    data () {
        return {
            tables: [],
            table: {
                name: '',
                Number: 0,
                idTisch: 0
            },
            food: [],
            drinks: [],
            commentEssen: '',
            commentTrinken: '',
            orderObj: {
                idTisch: 0,
                commentEssen: '',
                commentTrinken: '',
                Kellner: '',
                food: [],
                drinks: []
            },
            tempSaveOrder: {},
            templateOrder: {
                idTisch: 0,
                commentEssen: '',
                commentTrinken: '',
                Kellner: '',
                food: [],
                drinks: []
            },
            checkout: false,
            rules: [
                function (val) {
                    if (val === undefined || val === null) return true // clearing a textarea sets the value to 'NULL'
                    return val.length <= 250 || 'Maximal 250 Zeichen!'
                }
            ]
        }
    },
    created: function () {
        EventBus.$on('w-receive-tables', tables => {
            this.tables = tables
            this.selectTable(this.$route.params.tableId)
        })
        EventBus.$on('waiter-reset', () => {
            this.commentEssen = ''
            this.commentTrinken = ''
        })
        this.selectTable(this.$route.params.tableId)
    },
    mounted: function () {
        EventBus.$emit('w-get-tables')
        this.fetchCategories()
    },
    methods: {
        selectTable: function (tableId) {
            if (tableId !== undefined && this.tables.length > 0) {
                this.table = this.tables.find(table => table.idTisch === parseInt(tableId))
            } else {
                this.table = {
                    name: '',
                    Number: 0,
                    idTisch: 0
                }
            }
        },
        invokeCheckout: function () {
            if (window.localStorage.getItem('waiterName') === null) {
                alert('Du hast ja gar keinen Namen!\nWie traurig :(\nGib bitte zuerst deinen Namen an, bevor du fortfährst!')
                return
            }
            if (this.tempSaveOrder.idTisch === undefined) {
                // this ensures that the fallback-save-object is empty -> the previous order has be checked out succesfully
                this.orderObj.idTisch = this.table.idTisch
                this.orderObj.commentEssen = this.commentEssen
                this.orderObj.commentTrinken = this.commentTrinken
                this.orderObj.Kellner = window.localStorage.getItem('waiterName')
                this.orderObj.food = []
                this.orderObj.drinks = []
                EventBus.$emit('get-order', this.orderObj)
                this.checkout = true
            }
        },
        updateAmount: function (obj) {
            var id = obj.type === 'food' ? 'idEssen' : 'idTrinken'
            var itemToUpdate = this.orderObj[obj.type].find(item => {
                return item[id] === obj.id
            })
            itemToUpdate.Stueck = obj.amount
            itemToUpdate.amount = obj.amount
        },
        postOrder: function () {
            this.checkout = false
            this.tempSaveOrder = JSON.parse(JSON.stringify(this.orderObj)) // make copy of order
            dbCalls.putOrder(this.orderObj).then(res => {
                this.tempSaveOrder = {}
                this.orderObj = JSON.parse(JSON.stringify(this.templateOrder))
                this.reset()
                this.fetchCategories()
            }).catch(err => {
                if (err.id) alert('Fehler bei Bestellung #' + err.id + '! Bitte melden.')
                window.localStorage.setItem('errorOrder', JSON.stringify(this.tempSaveOrder))
                this.tempSaveOrder = {}
                this.fetchCategories()
            })
        },
        fetchCategories: function () {
            dbCalls.getCategories('food').then(data => {
                this.food = data
            }).catch(err => {
                console.log(err)
            })
            dbCalls.getCategories('drinks').then(data => {
                this.drinks = data
            }).catch(err => {
                console.log(err)
            })
        },
        reset: function () {
            EventBus.$emit('waiter-reset')
        }
    },
    watch: {
        '$route.params.tableId' (tableId) {
            this.selectTable(tableId)
        }
    }
}
</script>
<style>
.v-tab {
    margin-left : 0 !important;
}
</style>