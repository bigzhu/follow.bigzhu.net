<template>
  <a href='javascript:;'> 
    <q-icon :name="the_class" />
    <count-up v-show="count!=-4" :end="count" :duration="2.5" :options="{useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''}">
    </count-up>
  </a>
</template>

<script>
  import 'quasar-extras/fontawesome'
  import {QIcon} from 'quasar'
  import CountUp from 'bz-count-up'
  export default {
    props: {
      type: {
        type: String
      },
      info: {
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    components: {
      QIcon,
      CountUp
    },
    computed: {
      count: function () {
        if (this.info.count) {
          return this.info.count
        }
        return 0
      },
      href: function () {
        if (this.type === 'twitter') {
          return 'https://twitter.com/' + this.info.name
        } else if (this.type === 'tumblr') {
          return 'http://' + this.info.name + '.tumblr.com/'
        } else if (this.type === 'instagram') {
          return 'https://instagram.com/' + this.info.name
        } else if (this.type === 'facebook') {
          return 'https://facebook.com/' + this.info.name
        }
      },
      the_class: function () {
        return `fa-${this.type}`
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  .q-card-subtitle .q-icon
    font-size 1rem
  a
    margin-right: 1rem;
  //i {
  //  margin-right: 0;
  //  vertical-align:top;
  //}
</style>
