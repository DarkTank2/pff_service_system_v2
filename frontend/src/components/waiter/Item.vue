<template>
    <div>
        <v-subheader >{{item.Name}}</v-subheader>
        <v-list-item>
            <v-list-item-action >
                <v-btn icon @click="addItem" outlined><v-icon>add</v-icon></v-btn>
            </v-list-item-action>
            <v-list-item-content>
                <v-text-field label="Menge" :value="item.amount" @change="handleInput" type="number"></v-text-field>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon @click="removeItem" outlined><v-icon>remove</v-icon></v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
</template>
<script>
import {EventBus} from '../../services/eventBus.js'
export default {
    name: 'Item',
    props: ['item', 'type'],
    components: {},
    data () {
        return {

        }
    },
    created: function () {
        
    },
    mounted: function () {

    },
    methods: {
        addItem: function () {
            var obj = {
                id: this.type === 'food' ? this.item.idEssen : this.item.idTrinken,
                amount: parseInt(this.item.amount) + 1,
                type: this.type
            }
            this.$emit('update_amount', obj)
        },
        removeItem: function () {
            var obj = {
                id: this.type === 'food' ? this.item.idEssen : this.item.idTrinken,
                amount: this.item.amount <= 0 ? 0 : parseInt(this.item.amount) - 1,
                type: this.type
            }
            this.$emit('update_amount', obj)
        },
        handleInput: function (input) {
            var obj = {
                id: this.type === 'food' ? this.item.idEssen : this.item.idTrinken,
                amount: parseInt(input) <= 0 ? 0 : parseInt(input),
                type: this.type
            }
            this.$emit('update_amount', obj)
        }
    },
    watch: {
        'item.amount' (newVal) {
            console.log(newVal, this.item.Name, this.type)
        } 
    }
}
</script>