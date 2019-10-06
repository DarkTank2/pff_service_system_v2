<template>
    <v-select v-if="compressed===true" :items='tables' label='Tische' hint='Wähle einen Tisch aus' item-text='name' return-object @change='handleInput' v-model="table"></v-select>
    <v-list v-else>
        <v-list-item v-for="(table, index) in tables" :key="'table/' + index" :to="{name: 'ServantBase', params: {tableId: table.idTisch}}">
            <v-list-item-content>
                <v-list-item-title v-text="table.name"></v-list-item-title>
            </v-list-item-content>
            <v-icon v-if="table.notServed">local_shipping</v-icon>
            <v-icon v-if="table.notCashed">euro_symbol</v-icon>
            <v-icon v-if="table.food">local_dining</v-icon>
            <v-icon v-if="table.drinks">local_bar</v-icon>
        </v-list-item>
    </v-list>
</template>
<script>
import dbCalls from '../../utilities/backendCalls.js'
import { EventBus } from '../../services/eventBus'
export default {
    name: 'ServantTableSelector',
    props: ['compressed'],
    components: {},
    data () {
        return {
            tables: [],
            table: {},
            timer: undefined
        }
    },
    created: function () {
        this.selectTable(this.$route.params.tableId)
        EventBus.$on('refresh', () => {this.getTables()})
        EventBus.$on('get-table', () => {
            EventBus.$emit('send-table', this.table)
        })
    },
    mounted: function () {
        this.getTables()
        this.timer = setTimeout(this.timerCallback, 10000)
    },
    destroyed: function () {
        if (this.timer !== undefined) {
            clearTimeout(this.timer)
        }
    },
    methods: {
        selectTable: function (tableId) {
            if (tableId === undefined) {
                this.table = {}
            } else {
                this.table = this.tables.find(table => table.idTisch === parseInt(tableId))
            }
            EventBus.$emit('send-table', this.table)
        },
        getTables: function () {
            dbCalls.getServantTables('all').then(tables => {
                tables.forEach(table => {
                    table.name = 'Tisch-Nr.: ' + table.Number
                })
                this.tables = tables
                this.selectTable(this.$route.params.tableId)
            }).catch(err => {
                console.log(err)
            })
        },
        handleInput: function (newTable) {
            if (this.$route.params.tableId) {
                this.$router.push({name: this.$route.name, params: {tableId: newTable.idTisch}})
            } else {
                this.$router.push({name: 'ServantBase', params: {tableId: newTable.idTisch}})
            }
        },
        timerCallback: function () {
            this.getTables()
            this.timer = setTimeout(this.timerCallback, 10000)
        }
    },
    watch: {
        '$route.params.tableId' (tableId) {
            this.selectTable(tableId)
        }
    }
}
</script>