<template>
  <div>
    <button 
      @click="$refs['confirm_refalsh_message'].open()"
      :data-content="$t('UnRead.unread')"
      class="circular absolute-bottom-right animate-pop"
      >
      <div data-content="Add users to your feed">
        {{unread_message_count}}
      </div>
    </button>

    <q-modal ref="confirm_refalsh_message">
      <div class="card">
        <div class="card-content card-force-top-padding">
          今天以前的资讯不看了?
        </div>
        <div class="card-actions card-no-top-padding">
          <button class="primary" @click="updateLast">确定</button>
          <button class="light" @click="$refs.confirm_refalsh_message.close()">取消</button>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {
    },
    computed: {
      unread_message_count () {
        return this.$store.state.unread_message_count
      }
    },
    data: function () {
      return {
      }
    },
    mounted () {
      // $(this.$el).popup()
    },
    methods: {
      updateLast: function () {
        let now = (new Date()).setHours(0, 0, 0, 0)
        this.$store.dispatch('recordLastMessage', now).then(function (data) {
          window.location.reload()
        })
      }
    }
  }
</script>

<style scoped>
  .card-actions > .primary {
    padding-right: 1rem;
  }
  .light {
    margin-left: 10%;
  }

  .card {
    margin-bottom: 0;
  }
  button.absolute-bottom-right:hover {
    background: #FFF;
    color: #26A69A;
    border: 1px solid #26A69A;
  }
  button.absolute-bottom-right {
    color: #DADADA;
    right: 1rem;
    border: 1px solid #DADADA;
    margin: 1rem;
  }
  @media (min-width: 1100px) and (max-width: 1300px) {
    .un-read-bz {
      right: .5em;
    }
  }
</style>
