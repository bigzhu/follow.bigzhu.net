<template>
  <span>{{timeLen(new Date(date_time), lang)}}</span>
</template>

<script>
  import timeLen from '../functions/timeLen'
  export default {
    props: {
      date_time: {
        // type: Number,
        required: true,
        default: new Date().getTime()
      },
      lang: {
        type: String,
        default: 'cn'
      }
    },
    methods: {
      timeLen: timeLen
    }
  }
</script>

<style lang="stylus" scoped>
</style>
