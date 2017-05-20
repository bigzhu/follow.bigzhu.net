<template>
  <a href='javascript:;'> <i :class="the_class"></i>
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
        return `icon ${this.type} icon-hover-${this.type}`
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

<style scoped>
  a {
    margin-left: .5rem;
  }
  i {
    margin-right: 0;
    vertical-align:top;
  }
</style>
