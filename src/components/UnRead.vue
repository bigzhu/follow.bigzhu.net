<template>
  <div>
    <q-fixed-position corner="bottom-right" :offset="[-286, 0]" class="bz">
      <q-btn @click="$refs['confirm_refalsh_message'].open()" round color="" icon="">{{unread_message_count}}</q-btn>
    </q-fixed-position>

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
  import {
    QBtn,
    QFixedPosition,
    QModal
  } from 'quasar'
  export default {
    props: [],
    components: {
      QBtn,
      QFixedPosition,
      QModal
    },
    computed: {
      unread_message_count() {
        return this.$store.state.unread_message_count
      }
    },
    data: function() {
      return {}
    },
    mounted() {
      // $(this.$el).popup()
    },
    methods: {
      updateLast: function() {
        let now = (new Date()).setHours(0, 0, 0, 0)
        this.$store.dispatch('recordLastMessage', now).then(function(data) {
          window.location.reload()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card-actions>.primary {
    padding-right: 1rem;
  }

  .light {
    margin-left: 10%;
  }

  .card {
    margin-bottom: 0;
  }

  .fixed-bottom-right
    bottom 1rem
    z-index 9999
</style>
