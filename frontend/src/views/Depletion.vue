<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(cat, index) in food" :key="'category/food/' + index" cols="3">
                <BCategory :category="cat" type="food"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(cat, index) in drinks" :key="'category/drinks/' + index" cols="3">
                <BCategory :category="cat" type="drinks"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import dbCalls from '../utilities/backendCalls.js'
import { EventBus } from '../services/eventBus'
import BCategory from '../components/buffet/Category.vue'
export default {
    name: 'Depletion',
    props: [],
    components: {
        BCategory
    },
    data () {
        return {
            food: [],
            drinks: []
        }
    },
    created: function () {
        EventBus.$on('update', () => {
            this.getFood()
            this.getDrinks()
        })
    },
    mounted: function () {
        EventBus.$emit('set-additional-component', {
            component: 'DeplBtn',
            data: {}
        })
        this.getFood()
        this.getDrinks()
    },
    destroyed: function () {
        EventBus.$emit('reset-additional-component')
    },
    methods: {
        getFood: function () {
            dbCalls.getItemsDepletion('food').then(data => {
                this.food = this.clusterItemsByCategory(data)
            }).catch(err => {
                console.log(err)
            })
        },
        getDrinks: function () {
            dbCalls.getItemsDepletion('drinks').then(data => {
                this.drinks = this.clusterItemsByCategory(data)
            }).catch(err => {
                console.log(err)
            })
        },
        clusterItemsByCategory: function (items) {
            var data = []
            items.forEach(item => {
                var category = data.find(cat => cat.name === item.category)
                if (category === undefined) {
                    category = {
                        name: item.category,
                        items: []
                    }
                    data.push(category)
                }
                category.items.push(item)
            })
            return data
        }
    },
    watch: {
        
    }
}
</script>