<template>
    <v-select :items='tables' label='Tische' hint='Wähle einen Tisch aus' item-text='name' return-object @change='handleInput' v-model="table"></v-select>
</template>
<script>
import {EventBus} from '../../services/eventBus.js'

export default {
    name: 'Tableselector',
    props: [],
    components: {},
    data () {
        return {
            tables: [],
            table: {}
        }
    },
    created: function () {
        EventBus.$on('w-receive-tables', this.receiveTables)
        this.selectTable(this.$route.params.tableId)
    },
    mounted: function () {
        this.tables.length === 0 ? EventBus.$emit('w-get-tables') : {}
    },
    beforeDestroy: function () {
        EventBus.$off('w-receive-tables', this.receiveTables)
    },
    methods: {
        handleInput: function (data) {
            this.$router.push({name: 'waiterTable', params: {tableId: data.idTisch}})
        },
        selectTable: function (tableId) {
            if (tableId !== undefined) {
                this.table = this.tables.find(table => table.idTisch === parseInt(tableId))
                EventBus.$emit('change-title', this.table !== undefined ? (this.table.name || '') : '' )
            } else {
                this.table = {}
            }
        },
        receiveTables: function (tables) {
            this.tables = tables
            this.selectTable(this.$route.params.tableId)
        }
    },
    watch: {
        '$route.params.tableId' (tableId) {
            this.selectTable(tableId)
        }
    }
}
</script>