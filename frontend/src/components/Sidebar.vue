<template>
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-title>
                    <span>Service</span>
                    <span class="font-weight-light">Tool</span>
                </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$route.fullPath.includes('/waiter')">
                <v-list-item-content>
                    <v-text-field label="Dein Name" v-model="name" clearable @change="handleName" :rules="rules"></v-text-field>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$route.fullPath.includes('/waiter')">
                <v-list-item-content>
                    <WTableSelector/>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn to='/' block>
                            <span>Home</span>
                            <v-icon>home</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="$route.fullPath.includes('/waiter')">
                <v-list-item-content>
                    <div class="pa-2">
                        <v-btn to='/' block @click="handleLogOut">
                            <span>Abmelden</span>
                            <v-icon>home</v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
import tableSelector from './selectors/tableSelector.vue'
import { EventBus } from '../services/eventBus'

export default {
    name: 'Sidebar',
    props: [],
    components: {
        'WTableSelector': tableSelector
    },
    data () {
        return {
            name: '',
            randomNames: ['Starshine', 'Pumpkinface', 'Boo Hoo', 'Tarzan', 'Toto'],
            rules: [
                v => v.length <= 20 || 'Maximal 20 Zeichen!'
            ]
        }
    },
    created: function () {
        EventBus.$on('name-changed',() => {
            this.name = window.localStorage.getItem('waiterName')
        })
    },
    mounted: function () {
        var storedName = window.localStorage.getItem('waiterName')
        if (storedName === null) {
            var index = Math.floor(Math.random() * 10000) % this.randomNames.length
            storedName = this.randomNames[index]
        }
        this.name = storedName
    },
    methods: {
        handleName: function (newName) {
            if (newName.length > 20) newName = newName.slice(0, 20)
            window.localStorage.setItem('waiterName', newName)
            this.name = newName
        },
        handleLogOut: function () {
            window.localStorage.removeItem('waiterName')
        }
    }
}
</script>