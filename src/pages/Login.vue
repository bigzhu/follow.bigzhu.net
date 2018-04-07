<template>
  <q-page padding >
    <Login @login='login' class="absolute-center"/>
  </q-page>
</template>

<script>
  import Login from '../libs/components/Login'
  export default {
    components: {
      Login
    },
    methods: {
      login: function(user_name, password) {
        this.$store.commit('lib/loading', true)
        this.$store.dispatch('lib/login', {
          user_name: user_name,
          password: password
        }).then((data) => {
          this.$store.commit('lib/loading', false)
          this.$router.push('/')
        }).catch((error) => {
          this.$q.notify(error.response.data)
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('show_right', false)
        vm.$store.commit('show_header', false)
      })
    },
    beforeRouteLeave(to, from, next) {
      if (!this.$q.platform.is.mobile) {
        this.$store.commit('show_right', true)
      }
      this.$store.commit('show_header', true)
      next()
    }
  }
</script>
