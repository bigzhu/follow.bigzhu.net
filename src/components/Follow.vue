<template>
  <button v-on:click="toggleFollow" class="primary">
    <i v-show="value==0" class="add icon"></i>{{desc}}
  </button>
</template>

<script>
  export default {
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
    computed: {
    },
    data: function () {
      return {
        loading: true,
        desc: ''
      }
    },
    watch: {
      'value': function () {
        this.checkStatus()
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.checkStatus()
      })
    },
    methods: {
      checkStatus: function () {
        if (this.value === 0 || this.value === null) {
          this.showUnfollow()
        } else {
          this.showFollow()
        }
      },
      showFollow: function () {
        this.$emit('input', 1)
        this.loading = false
        this.desc = this.$t('Follow.following')
      },
      showUnfollow: function () {
        this.$emit('input', 0)
        this.loading = false
        this.desc = this.$t('Follow.tofollow')
      },
      toggleFollow: function () {
        let self = this
        this.loading = true
        if (this.value === 1) {
          this.$store.dispatch('unfollow', this.god_id).then(function (data) {
            self.showUnfollow()
          })
        } else {
          this.$store.dispatch('follow', this.god_id).then(function (data) {
            self.showFollow()
          })
        }
      }
    }
  }
</script>

<style scoped>
  button {
    margin: 1rem;
  }
</style>
