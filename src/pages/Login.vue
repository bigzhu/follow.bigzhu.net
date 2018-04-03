<template>
  <q-page padding>
    <Login @login='login' />
  </q-page>
</template>

<script>
  import Login from '../libs/components/Login'
  export default {
    components: {
      Login
    },
    methods: {
      login: function(userName, password) {
        this.$store.commit('lib/SET_LOADING', true)
        this.$store.dispatch('lib/login', {
          userName: userName,
          password: password
        }).then((data) => {
          this.$store.commit('lib/SET_LOADING', false)
          this.$router.push('/')
        }).catch((error) => {
          console.log(error.response)
          this.$q.notify(error.response.data)
        })
      }
    }
  }
</script>
