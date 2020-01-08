<template>
    <v-card @click="addToOrder">
        <v-img :src="imagePath" class="black--text">
            <v-card-title>{{item.Name}}</v-card-title>
        </v-img>
    </v-card>
</template>

<script>
import dbCalls from '../../utilities/backendCalls.js'
import {EventBus} from '../../services/eventBus.js'
export default {
    name: 'CalcItem',
    props: ['item', 'type'],
    components: {},
    data: () => ({
        
    }),
    created () {

    },
    mounted () {
        
    },
    methods: {
        addToOrder: function () {
            if (this.item.depleted === 0) {
                EventBus.$emit('addToOrder', this.item)
            }
        }
    },
    computed: {
        imagePath: function () {
            return '/img/' + (this.item.depleted === 0 ? this.item.pictureName : 'sold_out.png')
        }
    }
}
</script>

<style>

</style>