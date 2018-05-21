<template>
  <div class="layout-padding">
    <div class="blank-padding"></div>
    <Message v-if="done" :message='the_message' />
  </div>
</template>

<script>
  import Message from '../components/Message'

  export default {
    components: {
      Message
    },
    data: function() {
      return {
        done: false
      }
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
      this.$store.dispatch('getTheMessage', this.id).then(() => {
        this.done = true
      })
      this.$nextTick(function() {})
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('show_right', false)
      })
    },
    beforeRouteLeave(to, from, next) {
      if (!this.$q.platform.is.mobile) {
        this.$store.commit('show_right', true)
      }
      next()
    }
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
