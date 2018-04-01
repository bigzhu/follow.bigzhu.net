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
        return this.$store.state.the_message
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
        // 通过 `vm` 访问组件实例
        vm.$store.state.layout.hideRight()
      })
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.layout.showRight()
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
