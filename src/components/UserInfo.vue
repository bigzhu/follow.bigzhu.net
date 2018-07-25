<template>
  <!-- 右上角的用户登录的头像 -->
  <q-btn flat>
    <img :src="oauth_info.picture" class="avatar" />
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
  export default {
    props: [],
    components: {},
    computed: {
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
        window.location = '/api/Logout'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .avatar
    width 2.4rem
    height 2.4rem
</style>
