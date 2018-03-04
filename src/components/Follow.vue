<template>
  <q-btn :class="{'followed': value}" @click="toggleFollow" :color="color">
    <q-icon name="add" v-show="value==0" />{{desc}}
  </q-btn>
</template>

<script>
  import {
    QBtn,
    QIcon
  } from 'quasar'
  export default {
    components: {
      QIcon,
      QBtn
    },
    props: {
      value: {
        required: true,
        // type: Number,
        default: 0
      },
      god_id: {
        required: true,
        type: Number
      }
    },
    computed: {},
    data: function() {
      return {
        color: '',
        loading: true,
        desc: ''
      }
    },
    watch: {
      'value': function() {
        this.checkStatus()
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.checkStatus()
      })
    },
    methods: {
      checkStatus: function() {
        if (this.value === 0 || this.value === null) {
          this.showUnfollow()
        } else {
          this.showFollow()
        }
      },
      showFollow: function() {
        this.$emit('input', 1)
        this.loading = false
        this.desc = this.$t('Follow.following')
        this.color = 'secondary'
      },
      showUnfollow: function() {
        this.$emit('input', 0)
        this.loading = false
        this.desc = this.$t('Follow.tofollow')
        this.color = 'faded'
      },
      toggleFollow: function() {
        let self = this
        this.loading = true
        if (this.value === 1) {
          this.$store.dispatch('unfollow', this.god_id).then(function(data) {
            self.showUnfollow()
          })
        } else {
          this.$store.dispatch('follow', this.god_id).then(function(data) {
            self.showFollow()
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-btn
    margin .5rem
</style>
