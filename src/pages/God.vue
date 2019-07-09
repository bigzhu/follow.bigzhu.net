<template>
  <q-page padding>
    <messages type="god"></messages>
    <Top></Top>
  </q-page>
</template>

<script>
  import Messages from '../components/Messages'
  import Top from '../components/Top'
  export default {
    components: {
      Top,
      Messages
    }
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }

  .row.gutter>.no-top-padding-bz {
    padding-top: 0;
  }
</style>
