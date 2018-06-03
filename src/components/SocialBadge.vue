<template>
  <a href='javascript:;'>
    <q-icon :name="the_class" />
    <BzCountUp v-show="count!=-4" :end="count" :duration="2.5" :options="{useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '',
      suffix : ''}"/>
  </a>
</template>

<script>
  import 'quasar-extras/fontawesome'
  import {
    QIcon
  } from 'quasar'
  import BzCountUp from 'bz-q-lib/src/components/BzCountUp'
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
      BzCountUp
    },
    computed: {
      count: function() {
        return this.info.followed_count || 0
      },
      href: function() {
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
      the_class: function() {
        return `fab fa-${this.type}`
      }
    },
    data: function() {
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
.q-card-subtitle .q-icon { // icon 不能太大, 默认是 20px
  font-size: 1rem;
}

a { // icon 间要有间隔
  margin-right: 1rem;
}
</style>
