<template>
    <v-card flat>
        <v-list subheader>
            <W-Item 
            v-for="(item, index) in items"
            :key="type + '/' + category + '/' + index"
            :type="type"
            :item="item"
            v-on:update_amount="updateAmount"
            />
        </v-list>
    </v-card>
</template>
<script>
import dbCalls from '../../utilities/backendCalls.js'
import {EventBus} from '../../services/eventBus.js'

import Item from './Item.vue'

import Vue from 'vue'

export default {
    name: 'Category',
    props: ['category', 'type'],
    components: {
        'W-Item': Item
    },
    data () {
        return {
            items: [],
            id: ''
        }
    },
    created: function () {
        EventBus.$on('get-order', order => {
            this.items
            .filter(item => item.amount > 0)
            .forEach(item => {
                item.Stueck = item.amount
                order[this.type].push(item)
            })
        })
        EventBus.$on('waiter-reset', () => {
            this.items.forEach(item => {item.amount = 0})
            this.fetchItems()
        })
        EventBus.$on('refresh-' + this.type, this.fetchItems)
    },
    mounted: function () {
        this.fetchItems()
        this.id = this.type === 'food' ? 'idEssen' : 'idTrinken'
    },
    beforeDestroy: function () {
        EventBus.$off('refresh-' + this.type, this.fetchItems)
    },
    methods: {
        fetchItems: function () {
            dbCalls.getItems(this.type, this.category).then(data => {
                data.forEach(item => {
                    item.amount = 0
                })
                Vue.set(this, 'items', data)
            }).catch(err => {
                console.log(err)
            })
        },
        updateAmount: function (item) {
            var itemToUpdate = this.items.find(it => it[this.id] == item.id)
            itemToUpdate.amount = item.amount
        }
    },
    watch: {
        
    }
}
</script>