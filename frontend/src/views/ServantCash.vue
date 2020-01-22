<template>
    <v-card>
        <v-card-title>
            Noch nicht kassiert
            <v-btn outlined block @click="all">
                Add all
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-divider></v-divider>
            <v-chip-group column>
                <template v-for="(item, index) in items.notCashed.food">
                    <v-chip :key="'foodChip/' + index" @click="handleDelete(item)" v-if="item.selected > 0" pill>
                        <v-avatar left>
                            {{item.selected}}
                        </v-avatar>
                        {{item.NAME}}
                    </v-chip>
                </template>
                <template v-for="(item, index) in items.notCashed.drinks">
                    <v-chip :key="'drinksChip/' + index" @click="handleDelete(item)" v-if="item.selected > 0" pill>
                        <v-avatar left>
                            {{item.selected}}
                        </v-avatar>
                        {{item.NAME}}
                    </v-chip>
                </template>
            </v-chip-group>
            <v-row v-if="display">
                <v-col>
                    <span>
                        Gesamtbetrag: 
                        {{Math.round(sum * 100) / 100}}
                        €
                    </span>
                </v-col>
            </v-row>
            <v-row v-if="display">
                <v-col cols="6">
                    <v-btn outlined block @click="send">
                        <v-icon>send</v-icon>
                        Abschicken
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn outlined block @click="clear">
                        <v-icon>clear</v-icon>
                        Clear
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider v-if="display"></v-divider>
            <v-list three-line>
                <v-list-item v-for="(item, index) in items.notCashed.food" :key="'food/' + index" @click="handleAdd(item)">
                    <v-list-item-icon>
                        <v-icon>local_dining</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.NAME"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.Kellner + '/' + item.idBestellung"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.price + '€'"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar>
                        {{item.Stueck - item.cashed - item.selected}}
                    </v-list-item-avatar>
                </v-list-item>
                <v-list-item v-for="(item, index) in items.notCashed.drinks" :key="'drinks/' + index" @click="handleAdd(item)">
                    <v-list-item-icon>
                        <v-icon>local_bar</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.NAME"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.Kellner + '/' + item.idBestellung"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="item.price + '€'"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar>
                        {{item.Stueck - item.cashed - item.selected}}
                    </v-list-item-avatar>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script>
import { EventBus } from '../services/eventBus'
import dbCalls from '../utilities/backendCalls'
import CashingOrder from '../components/servant/cashingOrder.vue'
export default {
    name: 'ServantCash',
    props: ['items'],
    components: {
        CashingOrder
    },
    data () {
        return {
            sel: -1
        }
    },
    created: function () {
        
    },
    mounted: function () {
        EventBus.$emit('set-crumb', {text:'Kassieren', disabled:true})
    },
    methods: {
        handleAdd: function (item) {
            item.selected = (item.Stueck - item.cashed) > item.selected ? item.selected + 1 : item.selected
        },
        handleDelete: function (item) {
            --item.selected
            if (item.selected < 0) item.selected = 0
        },
        clear: function () {
            this.items.notCashed.food.forEach(item => item.selected = 0)
            this.items.notCashed.drinks.forEach(item => item.selected = 0)
        },
        send: function () {
            var promises = []
            this.items.notCashed.food.forEach(item => {
                if (item.selected === 0) return
                promises.push(dbCalls.cashItemByOrder(item.idItem, item.cashed + item.selected, item.idBestellung, 'food'))
            })
            this.items.notCashed.drinks.forEach(item => {
                if (item.selected === 0) return
                promises.push(dbCalls.cashItemByOrder(item.idItem, item.cashed + item.selected, item.idBestellung, 'drinks'))
            })
            Promise.all(promises).then(data => {
                console.log(data)
                EventBus.$emit('refresh')
            }).catch(err => {
                console.log(err)
            })
        },
        all: function () {
            this.items.notCashed.food.forEach(item => {
                item.selected = (item.Stueck - item.cashed)
            })
            this.items.notCashed.drinks.forEach(item => {
                item.selected = (item.Stueck - item.cashed)
            })
        }
    },
    computed: {
        display: function () {
            return this.items.notCashed.food.filter(item => item.selected > 0).length > 0 || this.items.notCashed.drinks.filter(item => item.selected > 0).length > 0
        },
        sum: function () {
            var sum = 0
            this.items.notCashed.food.forEach(item => {
                sum += item.selected * item.price
            })
            this.items.notCashed.drinks.forEach(item => {
                sum += item.selected * item.price
            })
            return sum
        }
    },
    watch: {
        
    }
}
</script>