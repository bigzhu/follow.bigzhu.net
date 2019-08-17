<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="eleven wide column no-padding-bz">
          <messages :searchKey="$route.params.key"></messages>
        </div>
        <div class="five wide column computer only ">
        </div>
      </div>
    </div>
    <top></top>
  </div>
</template>

<script>
  import Messages from './SearchMessages'
  import Top from './Top'
  export default {
    components: {
      Top,
      Messages
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {
      this.$nextTick(function () {})
    },
    methods: {}
  }
</script>

<style>
  /* 查找的高亮*/
  .highlight {
    background-color: #FDFD95
  }
</style>
