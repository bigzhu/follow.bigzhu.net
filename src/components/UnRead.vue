<template>
  <div>
    <QPageSticky corner="bottom-right" :offset="[-286, 0]" class="bz">
      <q-fab :content="unread_message_count" color="" icon="" activeIcon="" direction="left">
        <q-fab-action color="" @click="updateLast" icon="whatshot">
          <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">清空未读!</q-tooltip>
        </q-fab-action>
      </q-fab>
    </QPageSticky>
  </div>
</template>

<script>
  import {
    QTooltip,
    QFab,
    QFabAction,
    QCard,
    QBtn,
    QPageSticky,
    QModal
  } from 'quasar'
  export default {
    props: [],
    components: {
      QTooltip,
      QFab,
      QFabAction,
      QCard,
      QBtn,
      QPageSticky,
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
          // toast('已清空, 只保留今天的未读')
          setTimeout(function() {
            window.location.reload()
          }, 3000)
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
