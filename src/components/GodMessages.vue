<template>
  <div>
    <old :class="{ 'invisible_bz': !show_old}" :god_name="god_name"></old>
    <message v-for="message in messages" :message='message' :key="message.id"></message>
    <div v-show="new_loading" class="row justify-center" style="margin-bottom: 50px;">
      <spinner name="dots" slot="message" :size="30"></spinner>
    </div>
    <bottom-loader :el="$el" element_class=".ui.fluid.card" v-on:bottom="call_back"></bottom-loader>
  </div>
</template>

<script>
  import Old from './Old'
  import Message from './Message'
  import BottomLoader from 'bz-bottom-loader'

  export default {
    components: {
      Old,
      Message,
      BottomLoader
    },
    props: {
      god_name: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        show_old: false
      }
    },
    computed: {
      new_loading () {
        return this.$store.state.new_loading
      },
      messages () {
        return this.$store.state.gods_messages[this.god_name]
        // if (this.$store.state.gods_messages[this.god_name].length > 0) {
        //   return [this.$store.state.gods_messages[this.god_name][10]]
        // } else {
        //   return []
        // }
      }
    },
    mounted () {
      let self = this
      this.$store.commit('FILTER_GOD_MESSAGES', this.god_name)
      if (this.messages.length !== 0) {
        this.show_old = true
        return
      }
      this.$store.dispatch('newMessage', {god_name: this.god_name}).then(function (data) {
        self.show_old = true
        if (self.messages.length === 0) {
          self.$store.dispatch('oldMessage', {god_name: self.god_name, limit: 10})
        }
      })
    },
    methods: {
      call_back: function () {
        console.log('bottom')
        this.$store.dispatch('newMessage', {god_name: this.god_name})
      }
    }
  }
</script>

<style >
.invisible_bz {
  visibility:hidden;
};
</style>
