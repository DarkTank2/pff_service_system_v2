<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="4">
                <v-select
                :items="typeSelections"
                v-model="typeSelection"
                @change="update"
                >
                </v-select>
            </v-col>
            <v-col cols="12" sm="4">
                <v-combobox v-model="tableSelection" :items="tables" label="Tischauswahl" multiple chips clearable @change="update"></v-combobox>
            </v-col>
            <v-col cols="12" sm="4">
                <v-combobox v-model="itemTypeSelection" :items="itemTypes" label="Typauswahl" multiple chips clearable @change="update"></v-combobox>
            </v-col>
            <v-col cols="12" sm="8">
                <v-slider
                min="5"
                :max="maxDuration"
                v-model="aggregationTime"
                label="Aggregation Time"
                @end="update"
                >
                    <template v-slot:append>
                        <v-text-field
                            v-model="aggregationTime"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                        ></v-text-field>
                    </template>
                </v-slider>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" sm="12">
                <lineChart v-if="typeSelection === 'Anzahl Bestellung über Zeit' || typeSelection === 'Anzahl Items über Zeit'" :chartData="chartData"/>
                <barChart v-if="typeSelection === 'Anzahl über Items'" :chartData="chartData"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12">
                <overall :items="itemFilter" :orders="orderFilter"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import dbCalls from '../utilities/backendCalls'
import lineChart from './charts/lineChart.vue'
import barChart from './charts/barChart.vue'
import overall from './overall'
import moment from 'moment'
export default {
    name: 'Statistics',
    props: [],
    components: {
        lineChart,
        barChart,
        overall
    },
    data () {
        return {
            orders: [],
            tables: [],
            tableSelection: [],
            items: [],
            typeSelections: [
                'Anzahl Bestellung über Zeit',
                'Anzahl über Items',
                'Anzahl Items über Zeit'
            ],
            itemTypes: ['food', 'drinks'],
            itemTypeSelection: [],
            typeSelection: 'Anzahl Bestellung über Zeit',
            aggregationTime: 960,
            startTimestamp: '',
            endTimestamp: '',
            timestamps: [],
            maxDuration: 960,
            chartData: {}
        }
    },
    created: function () {
        
    },
    mounted: function () {
        dbCalls.getTables().then(data => {
            this.tables = data
            this.tables.forEach(table => {
                table.text = table.Number === 999 ? 'Buffet' : ('#' + table.Number)
            })
            this.tableSelection = [...this.tables]
            this.update()
        }).catch(() => {
            // console.log(err)
        })
        dbCalls.getAllItems().then(data => {
            this.items = data
            this.itemTypeSelection = [...this.itemTypes]
            this.update()
        }).catch(() => {
            // console.log(err)
        })
        dbCalls.getTimeseries().then(data => {
            this.orders = this.sortOrders(data[0], data[1])
            this.update()
        }).catch(() => {
            // console.log(err)
        })
    },
    methods: {
        sortOrders: function (foodOrders, drinksOrders) {
            var orders = []
            foodOrders.forEach(FO => {
                if (orders[FO.idBestellung] === undefined) {
                    orders[FO.idBestellung] = {
                        Kellner: FO.Kellner,
                        tableNumber: FO.Number,
                        timePlaced: FO.timePlaced,
                        items: []
                    }
                }
                var order = orders[FO.idBestellung]
                order.items.push({
                    Name: FO.Name,
                    Stueck: FO.Stueck,
                    price: FO.price,
                    timeFinished: FO.timeFinished,
                    timeServed: FO.timeServed,
                    timeCashed: FO.timeCashed
                })
            })
            drinksOrders.forEach(DO => {
                if (orders[DO.idBestellung] === undefined) {
                    orders[DO.idBestellung] = {
                        Kellner: DO.Kellner,
                        tableNumber: DO.Number,
                        timePlaced: DO.timePlaced,
                        items: []
                    }
                }
                var order = orders[DO.idBestellung]
                order.items.push({
                    Name: DO.Name,
                    Stueck: DO.Stueck,
                    price: DO.price,
                    timeFinished: DO.timeFinished,
                    timeServed: DO.timeServed,
                    timeCashed: DO.timeCashed
                })
            })
            return orders
        },
        aggregateOrders: function () {
            // aggregating orders for 10 min each
            var set = {
                label: 'Aggregated Set',
                backroundColor: '#ffff00',
                borderColor: '#ff0000',
                data: []
            }
            this.timestamps.forEach((ts, index) => {
                if (index === 0) return
                if (set.data[index - 1] === undefined) set.data[index - 1] = 0
                this.orders.filter(order => this.tableSelection.some(table => table.Number === order.tableNumber)).forEach(order => {
                    if (order === undefined) return
                    // if (this.tableSelection.filter(table => table.Number === order.tableNumber).length === 0) return
                    if (moment(order.timePlaced).isBetween(this.timestamps[index - 1], ts)) set.data[index - 1]++
                })
            })
            // timestamps[0], timestamps[timestamps.length - 1]
            return {
                labels: [...this.timestamps],
                datasets: [set]
            }
        },
        sumUpItems: function () {
            var set = {
                label: 'Items',
                backroundColor: '#ff0000',
                data: []
            }

            this.items.filter(item => this.itemTypeSelection.includes(item.type)).forEach((item, index) => {
                set.data[index] = 0
                this.orders.filter(order => this.tableSelection.some(table => table.Number === order.tableNumber)).forEach(order => {
                    // if (this.tableSelection.filter(table => table.Number === order.tableNumber).length === 0) return
                    if (order) {
                        order.items.forEach(OI => {
                            if (OI.Name === item.Name) set.data[index] += OI.Stueck
                        })
                    }
                })
            })

            return {
                labels: [...this.items.filter(item => this.itemTypeSelection.includes(item.type)).map(item => item.Name)],
                datasets: [set]
            }
        },
        aggregateItems: function () {
            var sets = []
            this.timestamps.forEach((ts, index) => {
                if (index === 0) return
                this.items.filter(item => this.itemTypeSelection.includes(item.type)).forEach((item, i) => {
                    // create set for each item so that every item can be displayed parallel
                    if (sets[i] === undefined) sets[i] = {
                        label: item.Name,
                        backroundColor: '#ffff00',
                        borderColor: '#ff0000',
                        data: []
                    }
                    // shortcut to the set
                    var set = sets[i]
                    // if the set is new, initialize its data with 0
                    if (set.data[index - 1] === undefined) set.data[index - 1] = 0
                    this.orders.filter(order => this.tableSelection.some(table => table.Number === order.tableNumber)).forEach(order => {
                        if (order === undefined) return
                        // if (this.tableSelection.filter(table => table.Number === order.tableNumber).length === 0) return
                        // check if the order is in the current timeframe, defined by the timestamp-array
                        if (moment(order.timePlaced).isBetween(this.timestamps[index - 1], ts)) {
                            order.items.forEach(OI => {
                                // if the order-item name and the current item name equals than add the amount to the data-array indexed by the timeframe located in the set by the name of the item
                                if (OI.Name === item.Name) set.data[index - 1] += OI.Stueck
                            })
                        }
                    })
                })
            })

            return {
                labels: [...this.timestamps],
                datasets: sets
            }
        },
        calculateTimestamps: function () {
            var start = ''
            var end = ''
            this.orders.forEach(order => {
                if (this.tableSelection.filter(table => table.Number === order.tableNumber).length === 0) return
                if (order && start === '') start = order.timePlaced
                if (order) end = order.timePlaced
            })
            start = moment(start).seconds(0)
            end = moment(end).seconds(0).add(1, 'minutes')
            
            this.startTimestamp = start
            this.endTimestamp = end
            this.maxDuration = moment.duration(end.diff(start)).asMinutes()

            var cur = moment(this.startTimestamp)
            var timestamps = []
            timestamps.push(cur.format())
            while (moment(cur).isBefore(this.endTimestamp)) {
                cur.add(this.aggregationTime, 'minutes')
                timestamps.push(cur.format())
            }
            this.timestamps = timestamps
        },
        update: function () {
            this.calculateTimestamps()
            switch (this.typeSelection) {
                case 'Anzahl Bestellung über Zeit':
                    this.chartData = this.aggregateOrders()
                    break
                case 'Anzahl über Items':
                    this.chartData = this.sumUpItems()
                    break
                case 'Anzahl Items über Zeit':
                    this.chartData = this.aggregateItems()
                    break
                default:
                    this.chartData = {
                        labels: [],
                        datasets: []
                    }
            }
        }
    },
    computed: {
        orderFilter: function () {
            return this.orders.filter(order => this.tableSelection.some(table => table.Number === order.tableNumber))
        },
        itemFilter: function () {
            return this.items.filter(item => this.itemTypeSelection.includes(item.type))
        }
    }
}
</script>