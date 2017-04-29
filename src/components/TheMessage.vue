<template>
  <div class="layout-padding">
    <div class="blank-padding"></div>
    <Message :message='the_message'>
    </Message>
  </div>
</template>

<script>
  import Message from './Message.vue'

  export default {
    components: {
      Message
    },
    data: function () {
      return {
      }
    },
    computed: {
      the_message () {
        return this.$store.state.the_message
      },
      id () {
        return this.$route.params.id
      }
    },
    mounted () {
      this.$store.dispatch('getTheMessage', this.id)
      this.$nextTick(function () {
      })
    },
    methods: {
    }
  }
</script>
<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
