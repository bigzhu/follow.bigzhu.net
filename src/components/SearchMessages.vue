<template>
  <div>
    <div class='ui center aligned basic segment'>
      <old :starName="starName" :searchKey="searchKey"></old>
    </div>
    <q-infinite-scroll :offset="1000" :handler="callBack">
      <message v-for="message in messages" :message='message' :key="message.id">
      </message>
      <SpinnerBz :show="loading"></SpinnerBz>
    </q-infinite-scroll>

    <div class='ui active centered inline loader' v-bind:class="{ 'invisibleBz': !newLoading}"></div>
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
      'searchKey': function (val, oldVal) {
        this.search()
      }
    },
    props: {
      searchKey: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {}
    },
    computed: {
      messages() {
        return this.$store.state.searchMessages
      }
    },
    mounted() {
      this.search()
    },
    methods: {
      callBack: function () {
        this.searchNew()
      },
      search: function () {
        let self = this
        this.$store.commit('FILTER_SEARCH_MESSAGES', this.searchKey)
        if (this.messages.length !== 0) {
          this.showOld = true
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
        this.$store.dispatch('oldMessage', { searchKey: self.searchKey, limit: 10 }).then(function (data) {
          self.mark()
        })
      },
      searchNew: function () {
        let self = this
        return this.$store.dispatch('newMessage', { searchKey: this.searchKey }).then(function (data) {
          if (self.messages.length !== 0) {
            self.mark()
          }
        })
      },
      mark: function () {
        this.showOld = true
        // 高亮查找的key
        this.$nextTick(function () {
          var instance = new window.Mark(this.$el)
          instance.mark(this.searchKey)
        })
      }
    }
  }
</script>

<style >
  /*隐藏占位*/
  .invisibleBz {
    visibility: hidden;
  }

  ;

  mark {
    background: #FDFD95;
    color: black;
  }
</style>
