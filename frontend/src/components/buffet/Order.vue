<template>
    <v-col :cols="lonely ? '3' : '6'">
        <v-card @click="$emit('chosen')">
            <v-card-title :class="order.chosen === true ? 'red--text' : 'green--text'">
                <span>{{'Bestellung #' + order.idBestellung + ' | Tisch-Nr. #' + order.Number + ' | ' + order.Kellner}}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-list subheader>
                    <v-subheader v-if="order[comment] !== ''">
                        Kommentar:
                    </v-subheader>
                    <v-list-item v-if="order[comment] !== ''">
                        <v-list-item-content>
                            <blockquote class="blockquote">
                                {{order[comment]}}
                            </blockquote>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider v-if="order[comment] !== ''"></v-divider>
                    <v-list-item v-for="(item, index) in order.items" :key="'order/' + type + '/' + order.idBestellung + '/' + index">
                        <v-list-item-title>{{item.Name + ' x ' + item.Stueck}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn block @click="finalize">
                    Abschließen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>
<script>
import dbCalls from '../../utilities/backendCalls.js'
import { EventBus } from '../../services/eventBus'
export default {
    name: 'Order',
    props: ['order', 'type', 'lonely'],
    components: {},
    data () {
        return {
            comment: ''
        }
    },
    created: function () {
        
    },
    mounted: function () {
        this.comment = this.type === 'food' ? 'commentEssen' : 'commentTrinken'
    },
    methods: {
        finalize: function () {
            dbCalls.updateFinished(this.type, this.order.idBestellung, true).then(() => {
                EventBus.$emit('update-orders')
            }).catch(err => {
                console.log(err)
            })
            this.$emit('finalize')
        }
    },
    watch: {
        
    }
}
</script>