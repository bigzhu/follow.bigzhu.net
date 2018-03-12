<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">

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
            <th class="text-left">amount</th>
            <th class="text-right">{{gold_conf.oper}}</th>
            <th class="text-left">lose</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in trade.intervals">
            <td class="text-left">{{i.amount}}</td>
            <td class="text-left">{{i.in}}</td>
            <td v-if="i.lose" class="text-left bg-red-11">-{{i.lose}}</td>
            <td v-if="!i.lose" class="text-left">{{i.lose}}</td>
          </tr>
        </tbody>
      </table>

      <br>
      <table class="q-table cell-separator bordered striped highlight">
        <thead>
          <tr v-if="trade.stop==trade.reverse">
            <th class="text-right">stop is reverse</th>
            <th class="text-left bg-red-11">{{trade.stop}}</th>
          </tr>
          <tr v-if="trade.stop!=trade.reverse">
            <th class="text-right">stop</th>
            <th class="text-left bg-red-11">{{trade.stop}}</th>
            <th class="text-right">reverse</th>
            <th class="text-left bg-red-11">{{trade.reverse}}</th>
          </tr>
        </thead>
      </table>


    </div>
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
        type: 'gold',
        gold_conf: {
          type: 'gold'
        },
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
        axios.get('/api_trade_conf', {
            params: {
              type: this.type
            }
          })
          .then((response) => {
            this.gold_conf = response.data || {}
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      done() {
        axios.post('/api_trade_conf', this.gold_conf)
          .then((responsne) => {
            this.getTrade()
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getTrade() {
        axios.get('/api_trade', {
            params: {
              type: this.type
            }
          })
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
