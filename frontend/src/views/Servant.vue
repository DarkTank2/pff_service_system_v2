<template>
    <div>
        <v-breadcrumbs :items="crumbs" divider=">">
            <template v-slot:item="props">
                <v-breadcrumbs-item
                :to="props.item.to"
                :disabled="props.item.disabled"
                :exact="props.item.exact">
                    {{props.item.text}}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
        <router-view :items="items"></router-view>
        <!-- <v-card v-if="items.notServed.length > 0">
            <v-card-title>
                Noch nicht serviert:
            </v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <ServiceOrder v-for="(order, index) in items.notServed" :key="'orderNotServed/' + index" :order="order"></ServiceOrder>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
        <v-card v-if="items.notCashed.length > 0">
            <v-card-title>
                Noch nicht kassiert
            </v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <CashingOrder v-for="(order, index) in items.notCashed" :key="'orderNotCashed/' + index" :order="order" v-on:cashAdd="handleAdd"></CashingOrder>
                </v-expansion-panels>
            </v-card-text>
        </v-card> -->
    </div>
</template>
<script>
import { EventBus } from '../services/eventBus'
import dbCalls from '../utilities/backendCalls.js'
// import ServiceOrder from '../components/servant/serviceOrder.vue'
// import CashingOrder from '../components/servant/cashingOrder.vue'
export default {
    name: 'Servant',
    props: [],
    components: {
        // ServiceOrder,
        // CashingOrder
    },
    data () {
        return {
            items: {
                notServed: [],
                notCashed: {
                    food: [],
                    drinks: []
                }
            },
            timer: undefined,
            table: {},
            base: {
                text: 'Tisch',
                disabled: false,
                to: {
                    name: 'ServantBase',
                    params: {
                        tableId: this.$route.params.tableId
                    }
                },
                exact: true
            },
            crumbs: []
        }
    },
    created: function () {
        EventBus.$on('refresh', this.getItems)
        EventBus.$on('send-table', table => {
            if (table === undefined) return
            this.table = table
            this.crumbs[0].to.params.tableId = this.$route.params.tableId
            this.crumbs[0].text = 'Tisch-Nr.: #' + this.table.Number
        })
        EventBus.$on('set-crumb', element => {
            this.crumbs = []
            this.crumbs.push(this.base)
            if (element) {
                this.crumbs.push(element)
            }
        })
    },
    mounted: function () {
        this.getItems()
        EventBus.$emit('get-table')
        // this.timer = setTimeout(this.timerCallback, 10000)
    },
    beforeDestroy: function () {
        EventBus.$off('refresh', this.getItems)
    },
    destroyed: function () {
        if (this.timer !== undefined) clearTimeout(this.timer)
    },
    methods: {
        getItems: function () {
            dbCalls.getItemsByTable('all', this.$route.params.tableId).then(data => {
                this.items = data
            }).catch(err => {
                console.log(err)
            })
        },
        timerCallback: function () {
            this.getItems()
            // this.timer = setTimeout(this.timerCallback, 10000)
        },
        handleAdd: function (item) {
            var foundItem = this.items.notCashed.find(order => {

            })
            var toBeCashed = item.Stueck - item.cashed
            item.selected = (item.selected + 1 > toBeCashed) ? toBeCashed : item.selected + 1
        }
    },
    watch: {
        '$route.params.tableId' (tableId) {
            this.getItems()
            this.crumbs[0].to.params.tableId = this.$route.params.tableId
            this.crumbs[0].text = 'Tisch-Nr.: #' + this.table.Number
            EventBus.$emit('get-table')
        }
    }
}
</script>