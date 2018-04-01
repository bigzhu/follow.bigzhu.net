<template>
  <div>
    <div class='ui center aligned basic segment'>
      <old :godName="godName" :search_key="search_key"></old>
    </div>
    <q-infinite-scroll :offset="1000" :handler="call_back">
      <message v-for="message in messages" :message='message' :key="message.id">
      </message>
      <SpinnerBz :show="loading"></SpinnerBz>
    </q-infinite-scroll>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisible_bz': !new_loading}"></div>
  </div>
</template>

<script>
  import SpinnerBz from './SpinnerBz'
  import Old from './Old.vue'
  import Message from './Message.vue'

  export default {
    components: {
      SpinnerBz,
      Old,
      Message
    },
    watch: {
      'search_key': function (val, oldVal) {
        this.search()
      }
    },
    props: {
      search_key: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
      }
    },
    computed: {
      messages () {
        return this.$store.state.search_messages
      }
    },
    mounted () {
      this.search()
    },
    methods: {
      call_back: function () {
        this.searchNew()
      },
      search: function () {
        let self = this
        this.$store.commit('FILTER_SEARCH_MESSAGES', this.search_key)
        if (this.messages.length !== 0) {
          this.show_old = true
          this.mark()
        }
        this.searchNew().then(function (data) {
          if (self.messages.length === 0) {
            self.searcOld()
          }
        })
      },
      searcOld: function () {
        let self = this
        this.$store.dispatch('oldMessage', {search_key: self.search_key, limit: 10}).then(function (data) {
          self.mark()
        })
      },
      searchNew: function () {
        let self = this
        return this.$store.dispatch('newMessage', {search_key: this.search_key}).then(function (data) {
          if (self.messages.length !== 0) {
            self.mark()
          }
        })
      },
      mark: function () {
        this.show_old = true
        // 高亮查找的key
        this.$nextTick(function () {
          var instance = new window.Mark(this.$el)
          instance.mark(this.search_key)
        })
      }
    }
  }
</script>

<style >
  /*隐藏占位*/
.invisible_bz {
  visibility:hidden;
};
mark{
  background: #FDFD95;
  color: black;
}
</style>
