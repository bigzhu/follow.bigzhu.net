<template>
  <!-- 第二栏标题 -->
  <q-toolbar>
    <q-tabs class="text-black" shrink stretch>
      <q-route-tab :to="{'name': 'Main'}" replace :label="$t('首页')" />
      <q-route-tab :to="{'name': 'Recommand'}" replace :label="$t('寻他')" />
      <!--
      <q-route-tab :to="{ name:'Following'}" replace :label="$t('跟踪')" v-show="isLogin" />
      -->
      <q-route-tab :to="{ name:'Collect'}" replace :label="$t('收藏')" v-show="isLogin" />
      <!--
      <q-tab @click="open('http://bigzhu.lorstone.com/tag/%E4%BC%A0%E8%AE%B0/')" :label="$t('传记')" />
      -->
    </q-tabs>
  </q-toolbar>
</template>

<script>
    export default {
        props: [],
        components: {},
        computed: {
            isLogin() {
                return this.$store.state.lib.oauthInfo.name
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
                let win = window.open(url, '_blank')
                win.focus()
            }
        }
    }
</script>

<style lang="stylus" scoped></style>
