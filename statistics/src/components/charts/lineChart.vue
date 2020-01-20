<template>
  <div class="small">
    <line-chart :chartData="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
  import LineChart from './lineChart.js'

  export default {
    components: {
      LineChart
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
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
  }
</style>