<template>
    <v-container >
        <v-row justify='center' align-content='space-around' align='start'>
            <v-col cols='12'>
                <v-row justify='center' class='pa-5'>
                    <v-select :items='tables' label='Tische' hint='Wähle einen Tisch aus' item-text='name' return-object @change='handleInput'></v-select>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import dbCalls from '../utilities/backendCalls'

export default {
    name: 'Tableselector',
    props: [],
    components: {},
    data () {
        return {
            tables: []
        }
    },
    created: function () {
        dbCalls.getTables().then(data => {
            data.forEach(table => {
                table.name = 'Tisch-Nr.: ' + table.Number
            })
            this.tables = data
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        handleInput: function (data) {
            console.log('Table chosen:', data.name)
            console.log('With Id:', data.idTisch)
            this.$router.push({name: 'waiterTable', params: {tableId: data.idTisch}})
        }
    }
}
</script>