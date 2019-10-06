<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            {{order.Kellner + ', Bestellung #' + order.idBestellung}}
            <v-spacer/>
            <v-icon v-if="order.food">local_dining</v-icon>
            <v-icon v-if="order.drinks">local_bar</v-icon>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-list>
                <v-list-item v-for="(item, ind) of order.food" :key="'itemFood/' + ind">
                    <v-list-item-content>
                        <span :class="item.selected > 0 ? 'red--text' : ''">
                            {{item.selected + '/' + (item.Stueck - item.cashed)}}
                        </span>
                        <span>
                            {{item.NAME + ' zu je ' + item.price + '€'}}
                        </span>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon outlined @click="handleAdd(item)">
                            <v-icon>
                                add
                            </v-icon>
                        </v-btn>
                        <v-btn icon outlined>
                            <v-icon>
                                remove
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider v-if="order.drinks && order.food"></v-divider>
                <v-list-item v-for="(item, ind) of order.drinks" :key="'itemDrinks/' + ind">
                    <v-list-item-content>
                        <span :class="item.selected > 0 ? 'red--text' : ''">
                            {{item.selected + '/' + (item.Stueck - item.cashed)}}
                        </span>
                        <span>
                            {{item.NAME + ' zu je ' + item.price + '€'}}
                        </span>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon outlined @click="handleAdd(item)">
                            <v-icon>
                                add
                            </v-icon>
                        </v-btn>
                        <v-btn icon outlined>
                            <v-icon>
                                remove
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>
<script>
export default {
    name: 'CashingOrder',
    props: ['order'],
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
        handleAdd: function (item) {
            this.$emit('cashAdd', item)
        }
    },
    watch: {
        
    }
}
</script>