<template>
  <q-page padding >
    <Login @login='login' class="absolute-center"/>
  </q-page>
</template>

<script>
  import Login from 'bz-q-lib/src/components/Login'
  export default {
    components: {
      Login
    },
    methods: {
      login: function(userName, password) {
        this.$store.commit('lib/loading', true)
        this.$store.dispatch('lib/login', {
          userName: userName,
          password: password
        }).then((data) => {
          this.$store.commit('lib/loading', false)
          this.$router.push('/')
        }).catch((error) => {
          this.$q.notify(error.response.data.error)
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('showRight', false)
        vm.$store.commit('showHeader', false)
      })
    },
    beforeRouteLeave(to, from, next) {
      if (!this.$q.platform.is.mobile) {
        this.$store.commit('showRight', true)
      }
      this.$store.commit('showHeader', true)
      next()
    }
  }
</script>
