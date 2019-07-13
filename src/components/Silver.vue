<template>
  <div class="layout-padding row justify-center">
    <div style="width: 500px; max-width: 90vw;">

      <q-input v-model="goldConf.lastReverseMax" type="number" float-label="Last reverse max" />
      <q-input v-model="goldConf.atr" type="number" float-label="ATR" />
      <q-radio v-model="goldConf.oper" val="buy" label="Buy" />
      <q-radio v-model="goldConf.oper" val="sell" label="Sell" />
      <q-input v-model="goldConf.max" type="number" float-label="Max" />

      <q-btn icon="done" @click="done">Submit</q-btn>
      <br>
      <br>
      <table class="q-table cell-separator bordered striped highlight">
        <thead>
          <tr>
            <th class="text-left">may lose</th>
            <th class="text-right">{{goldConf.oper}} at</th>
            <th class="text-right">stop at</th>
            <th class="text-right">reverse</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in trade.intervals">
            <td v-if="i.mayLose" class="text-left bg-red-11">-{{i.mayLose}}</td>
            <td v-if="!i.mayLose" class="text-left">{{i.mayLose}}</td>
            <td class="text-left">{{i.inAt}}</td>
            <td class="text-right">{{trade.stop}}</td>
            <td class="text-right">{{trade.reverse}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Gold from './Gold'
  export default {
    mixins: [Gold],
    props: [],
    components: {},
    computed: {},
    data: function () {
      return {
        type: 'silver'
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
</style>
