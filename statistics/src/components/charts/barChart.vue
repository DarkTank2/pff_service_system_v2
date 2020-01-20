<template>
  <div class="small">
    <barChart :chartData="chartData" :options="chartOptions"></barChart>
  </div>
</template>

<script>
  import barChart from './barChart.js'

  export default {
    components: {
      barChart
    },
    props: ['chartData'],
    data () {
      return {
        datacollection: null,
        chartOptions: {
          
        }
      }
    },
    mounted () {
      
    },
    methods: {
      
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
  }
</style>