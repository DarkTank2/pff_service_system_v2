<template>
    <v-card>
        <v-card-title>
            {{category.name}}
        </v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-card-text>
            <template v-for="(item, index) in category.items">
                <v-divider v-if="index !== 0" :key="'divider/' + category.name + '/' + index"></v-divider>
                <BItem :key="'item/' + category.name + '/' + index" :item="item" :type="type"></BItem>
            </template>
            
        </v-card-text>
    </v-card>
</template>
<script>
import BItem from './Item.vue'
export default {
    name: 'BCategory',
    props: ['category', 'type'],
    components: {
        BItem
    },
    data () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        
    },
    methods: {
        
    },
    watch: {
        
    }
}
</script>