<template>
  <QPageSticky v-back-to-top.animate="{offset: 500, duration: 200}" corner="bottom-right" :offset="[-286, 80]" class="bz">
    <q-btn v-back-to-top round color="" icon="keyboard_arrow_up" />
  </QPageSticky>
</template>

<script>
</script>

<style lang="stylus" scoped>
  .fixed-bottom-right
    z-index 9999
</style>
