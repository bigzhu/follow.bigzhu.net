<template>
  <div class="layout-padding">
    <Login @login='login'/>
  </div>
</template>

<script>
  import Login from 'bz-q-lib/components/Login'
  export default {
    props: [],
    components: {
      Login
    },
    data: function () {
      return {
        loading: false
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      login: function (user_name, password) {
        this.loading = true
        let self = this
        this.$store.dispatch('login', {user_name: user_name, password: password}).then(function (data) {
          self.loading = false
          self.$router.push('/')
          // toastr.info('登录成功')
        })
      }
    }
  }
</script>

<style>
</style>
