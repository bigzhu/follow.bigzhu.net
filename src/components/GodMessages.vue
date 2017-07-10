<template>
  <div>
    <old :show="show_old" :god_name="god_name"></old>
    <q-infinite-scroll :offset="1000" :handler="call_back">
    <message v-for="message in messages" :message='message' :key="message.id"></message>
    <SpinnerBz :show="new_loading"></SpinnerBz>
    </q-infinite-scroll>
  </div>
</template>

<script>
  import {QInfiniteScroll} from 'quasar'
  import SpinnerBz from './SpinnerBz'
  import Old from './Old'
  import Message from './Message'

  export default {
    components: {
      QInfiniteScroll,
      SpinnerBz,
      Old,
      Message
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
