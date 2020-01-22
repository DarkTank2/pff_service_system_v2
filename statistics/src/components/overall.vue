<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="2" v-for="item in list" :key="item.Name">
                {{ item.Name + ' x ' + item.amount + ': ' + item.amount * item.price + '€' }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    components: {
      
    },
    props: ['items', 'orders'],
    data () {
      return {
        
      }
    },
    mounted () {
      
    },
    methods: {
      
    },
    computed: {
        list: function () {
            var mutated = []
            this.items.forEach((item) => {
                var mutatedItem = { ...item, amount: 0}
                this.orders.forEach(order => {
                    var OI = order.items.find(oi => oi.Name === item.Name)
                    if (OI) {
                        mutatedItem.amount += OI.Stueck
                    }
                })
                if (mutatedItem.amount > 0) mutated.push(mutatedItem)
            })
            return mutated
        }
    }
  }
</script>

<style>
  
</style>