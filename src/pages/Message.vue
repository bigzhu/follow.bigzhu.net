<template>
  <div class="layout-padding">
    <div class="blank-padding"></div>
    <Message v-if="done" :message='theMessage' />
  </div>
</template>

<script>
    import Message from '../components/Message'

    export default {
        components: {
            Message
        },
        data: function () {
            return {
                done: false
            }
        },
        computed: {
            theMessage() {
                return this.$store.state.message.theMessage
            },
            id() {
                return this.$route.params.id
            }
        },
        mounted() {
            this.$store.dispatch('getTheMessage', this.id).then(() => {
                this.done = true
            })
            this.$nextTick(function () {})
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.commit('showRight', false)
            })
        },
        beforeRouteLeave(to, from, next) {
            if (!this.$q.platform.is.mobile) {
                this.$store.commit('showRight', true)
            }
            next()
        }
    }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
