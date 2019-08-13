<template>
  <q-btn outline @click="toggleFollow" :color="color">
    <q-icon name="add" v-show="value==0" />{{desc}}
  </q-btn>
</template>

<script>
  export default {
    props: {
      value: {
        required: true,
        // type: Number,
        default: 0
      },
      godID: {
        required: true,
        type: Number
      }
    },
    data: function () {
      return {
        color: '',
        loading: true,
        desc: ''
      }
    },
    watch: {
      value: function () {
        this.checkStatus()
      }
    },
    mounted() {
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
        this.desc = this.$t('已跟踪')
        this.color = 'light'
      },
      showUnfollow: function () {
        this.$emit('input', 0)
        this.loading = false
        this.desc = this.$t('跟踪')
        this.color = 'secondary'
      },
      toggleFollow: function () {
        let self = this
        this.loading = true
        if (this.value === 1) {
          this.$store.dispatch('unfollow', this.godID).then((data) => {
            self.showUnfollow()
          }).catch((error) => {
            this.$q.notify(error.response.data)
          })
        } else {
          this.$store.dispatch('follow', this.godID).then(function (data) {
            self.showFollow()
          }).catch((error) => {
            if (error.response.data === "'userId'") {
              this.$router.push({
                name: 'Oauth'
              })
              return
            }
            this.$q.notify(error.response.data)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-btn
    margin 0.5rem
</style>
