<template>
  <div class="layout-padding">
    <div class="blank-padding"></div>
    <Message :message='the_message'>
    </Message>
  </div>
</template>

<script>
  import Message from '../components/Message'

  export default {
    components: {
      Message
    },
    data: function() {
      return {}
    },
    computed: {
      the_message() {
        return this.$store.state.message.the_message
      },
      id() {
        return this.$route.params.id
      }
    },
    mounted() {
      this.$store.dispatch('getTheMessage', this.id)
      this.$nextTick(function() {})
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // vm.$store.state.layout.hideRight()
        vm.$store.commit('show_right', false)
      })
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('show_right', true)
      next()
    },
    methods: {}
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
