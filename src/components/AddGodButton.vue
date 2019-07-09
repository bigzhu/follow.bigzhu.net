<template>
  <QPageSticky position="bottom" :offset="[18, 18]" class="bz">
    <q-btn @click="dialog" round color="" icon="add"></q-btn>
  </QPageSticky>
</template>

<script>
  export default {
    methods: {
      dialog: function () {
        this.$q.dialog({
          title: this.$t('添加'),
          message: this.$t('帐号名, 比如: bigzhu'),
          ok: this.$t('分析'),
          color: 'secondary',
          prompt: {
            model: '',
            type: 'text' // optional
          }
        }).then(data => {
          this.$emit('add', data.trim())
        }).catch(() => {
          this.$q.notify('Ok, no mood for talking, right?')
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .fixed-bottom-right
    z-index 9999  //浮动在最上面
</style>
