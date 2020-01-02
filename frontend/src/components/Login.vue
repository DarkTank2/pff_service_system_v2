<template>
    <v-container fill-height>
        <v-row justify='center' align-content='space-around'>
            <v-col cols='12'>
                <v-row justify='center' class='pa-5'>
                    <v-btn x-large block @click="checkOverlay">Kellner/in</v-btn>
                </v-row>
            </v-col>
            <v-col cols='12'>
                <v-row justify='center' class='pa-5'>
                    <v-btn x-large block to="/servant">Servierer/in</v-btn>
                </v-row>
            </v-col>
        </v-row>
        <v-overlay :value="showOverlay" opacity='0.9'>
            <v-text-field
            label='Dein Name:'
            v-model="name"
            clearable
            append-outer-icon='send' @click:append-outer="handleName">

            </v-text-field>
            <v-btn icon outlined @click="showOverlay = false">
                <v-icon>
                    clear
                </v-icon>
            </v-btn>
        </v-overlay>
    </v-container>
</template>
<script>
import { EventBus } from '../services/eventBus'
export default {
    name: 'Login',
    props: [],
    components: {},
    data () {
        return {
            showOverlay: false,
            name: ''
        }
    },
    methods: {
        checkOverlay: function () {
            if (window.localStorage.getItem('waiterName') === null) {
                this.showOverlay = true
            } else {
                this.$router.push('waiter')
            }
        },
        handleName: function() {
            window.localStorage.setItem('waiterName', this.name)
            EventBus.$emit('name-changed')
            this.$router.push('waiter')
        }
    }
}
</script>