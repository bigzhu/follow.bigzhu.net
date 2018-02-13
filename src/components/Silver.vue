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
            <th class="text-left">may lose</th>
            <th class="text-right">{{gold_conf.oper}} at</th>
            <th class="text-right">stop at</th>
            <th class="text-right">reverse</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in trade.intervals">
            <td v-if="i.may_lose" class="text-left bg-red-11">-{{i.may_lose}}</td>
            <td v-if="!i.may_lose" class="text-left">{{i.may_lose}}</td>
            <td class="text-left">{{i.in_at}}</td>
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
    components: {
    },
    computed: {
    },
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
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
</style>
