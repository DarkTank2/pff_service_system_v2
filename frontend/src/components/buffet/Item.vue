<template>
    <v-row no-gutters>
        <v-col cols="8">
            <span class="text-right headline">{{item.Name}}</span>
        </v-col>
        <v-col cols="4">
            <v-switch v-model="item.depleted" @change="updateDepletion"></v-switch>
        </v-col>
    </v-row>
</template>
<script>
import dbCalls from '../../utilities/backendCalls.js'
import { EventBus } from '../../services/eventBus'
export default {
    name: 'Item',
    props: ['item', 'type'],
    components: {},
    data () {
        return {
            id: ''
        }
    },
    created: function () {
        this.id = 'id' + (this.type === 'food' ? 'Essen' : 'Trinken')
    },
    mounted: function () {
        
    },
    methods: {
        updateDepletion: function (value) {
            dbCalls.updateDepletion(this.item[this.id], this.type, value).then(() => {
                EventBus.$emit('update')
            }).catch(err => {
                console.log(err)
            })
        }
    },
    watch: {
        
    }
}
</script>