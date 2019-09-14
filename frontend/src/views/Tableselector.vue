<template>
    <v-container >
        <v-row justify='center' align-content='space-around' align='start'>
            <v-col cols='12'>
                <v-row justify='center' class='pa-5'>
                    <WTableSelector/>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import tableSelector from '../components/selectors/tableSelector.vue'

export default {
    name: 'Tableselector',
    props: [],
    components: {
        'WTableSelector': tableSelector
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
        
    }
}
</script>