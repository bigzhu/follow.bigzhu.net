<template>
  <!-- 第二栏标题 -->
  <q-tabs color="black" inverted>
    <q-route-tab slot="title" :to="{'name': 'Main'}" replace :label="$t('首页')" />
    <q-route-tab slot="title" :to="{'name': 'Recommand'}" replace :label="$t('寻他')" />
    <q-route-tab slot="title" :to="{ name:'Following'}" replace :label="$t('跟踪')" v-show="is_login" />
    <q-route-tab slot="title" :to="{ name:'Collect'}" replace :label="$t('收藏')" v-show="is_login" />
    <q-tab slot="title" @click="open('http://bigzhu.lorstone.com/tag/%E4%BC%A0%E8%AE%B0/')" :label="$t('传记')" />
  </q-tabs>
</template>

<script>
  export default {
    props: [],
    components: {},
    computed: {
      is_login() {
        return this.$store.state.lib.oauth_info.user_name
      }
    },
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      open(url) {
        var win = window.open(url, '_blank')
        win.focus()
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
