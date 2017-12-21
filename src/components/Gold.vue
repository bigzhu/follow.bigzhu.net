<template>
  <div class="layout-padding">
    <q-input v-model="gold_conf.last_reverse_max" type="number" float-label="Last reverse max" />
    <q-input v-model="gold_conf.atr" type="number" float-label="ATR" />
    <q-radio v-model="gold_conf.oper" val="buy" label="Buy" />
    <q-radio v-model="gold_conf.oper" val="sell" label="Sell" />
    <q-input v-model="gold_conf.max" type="number" float-label="Max" />

    <q-btn icon="done" @click="done">Submit</q-btn>
    <br>
    <br>
    <table class="q-table cell-separator bordered striped highlight">
      <thead>
        <tr>
          <th class="text-left">{{gold_conf.oper}}</th>
          <th class="text-right">stop</th>
          <th class="text-right">reverse</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in trade.intervals">
          <td class="text-left">{{i}}</td>
          <td class="text-right">{{trade.stop}}</td>
          <td class="text-right">{{trade.reverse}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    QBtn,
    QInput,
    QRadio
  } from 'quasar'
  export default {
    props: [],
    components: {
      QBtn,
      QInput,
      QRadio
    },
    computed: {},
    data: function() {
      return {
        gold_conf: {},
        trade: {}
      }
    },
    mounted: function() {
      this.getConf()
      this.getTrade()
      this.$nextTick(function() {
        // code that assumes this.$el is in-document

      })
    },
    methods: {
      getConf() {
        axios.get('/api_gold_conf')
          .then((response) => {
            this.gold_conf = response.data || {}
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      done() {
        axios.post('/api_gold_conf', this.gold_conf)
          .then((responsne) => {
            this.getTrade()
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getTrade() {
        axios.get('/api_gold')
          .then((response) => {
            this.trade = response.data
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
