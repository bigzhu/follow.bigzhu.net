<template>
  <!-- 右上角的用户登录的头像 -->
  <q-btn v-show="is_login" flat ref="target">
    <img :src="proxy(oauth_info.avatar)" class="avatar" />
    <q-popover>
      <q-list item-separator link>
        <q-item @click.native="$router.push('/UserSet')">
          {{ $t("设置") }}
        </q-item>
        <q-item @click.native="logout">
          {{ $t("退出") }}
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script>
  import Proxy from '../libs/components/Proxy'
  export default {
    mixins: [Proxy],
    props: [],
    components: {},
    computed: {
      is_login() {
        return this.$store.state.lib.oauth_info.name
      },
      oauth_info() {
        return this.$store.state.lib.oauth_info
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
      logout: function() {
        window.location = '/api_logout'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .avatar
    width 2.4rem
    height 2.4rem
</style>
