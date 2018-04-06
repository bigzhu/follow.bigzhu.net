<template>
  <div>
    <LinkBtn loader v-for="o in oauths" :key="o.type" :href="getHref(o)" :icon="'fab fa-'+o.type" :color="o.type" :no-caps="true">
      <q-spinner-facebook slot="loading" /> {{getName(o)}}
    </LinkBtn>
  </div>
</template>

<script>
  import LinkBtn from './LinkBtn'
  export default {
    props: {
      url: {},
      run: {},
      oauths: {
        type: Array,
        default: function() {
          return [{
              type: 'github'
            }, {
              type: 'twitter',
              url: '/fuck/api_twitter'
            }, {
              type: 'facebook'
            },
            {
              type: 'qq'
            }
          ]
        }
      }
    },
    components: {
      LinkBtn
    },
    computed: {},
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      upperFirst: function(string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()
      },
      getName: function(oauth) {
        if (oauth.type === 'qq') {
          return 'QQ'
        } else {
          return this.upperFirst(oauth.type)
        }
      },
      getHref: function(oauth) {
        if (this.run) {
          return 'javascript:void(0);'
        }
        if (this.url) {
          let url = this.url + '/api_' + oauth.type
          if (oauth.type === 'qq') url += '_login'
          return url
        } else {
          let url = '/api_' + oauth.type
          if (oauth.type === 'qq') url += '_login'
          return url
        }
      }
    }
  }
</script>

<style lang="stylus">
  .bg-qq
    background-color #44badc
  .bg-facebook
    background-color #3b5998
  .bg-twitter
    background-color #00b2ff
  .bg-github
    background-color #2b3137
</style>

<style lang="stylus" scoped>
</style>
