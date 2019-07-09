<template>
  <div>
    <div v-html="remark" v-show="!is_edit && remark" class="remark-bz"></div>
    <p v-show="is_edit" v-html="remark" @blur="save" contenteditable="true" class="remark-edit-content"></p>
    <q-btn v-show="is_edit" @click="save" color="secondary" small>{{ $t("保存") }}</q-btn>
    <a v-show="!is_edit" @click="edit" href="javascript:void(0)" class="hover-show-bz">
      <q-icon name="edit" />
    </a>
  </div>
</template>

<script>
  import {
    QIcon,
    QBtn
  } from 'quasar'
  import myautolinker from '../functions/myautolinker'
  export default {
    props: {
      value: {
        // required: true
      },
      godID: {
        required: true,
        type: Number
      }
    },
    watch: {
      'value': function (val) {
        this.remark = myautolinker(this.value, 'twitter')
      }
    },
    components: {
      QBtn,
      QIcon
    },
    computed: {},
    data: function () {
      return {
        is_edit: false,
        remark: myautolinker(this.value, 'twitter')
      }
    },
    mounted() {},
    methods: {
      edit: function () {
        this.is_edit = true
        let self = this
        this.$nextTick(
          function () {
            self.$el.getElementsByClassName('remark-edit-content')[0].focus()
          }
        )
      },
      save: function () {
        this.remark = this.$el.getElementsByClassName('remark-edit-content')[0].innerHTML
        this.$store.dispatch('UpdateRemark', {
          starID: this.godID,
          remark: this.remark
        })
        this.is_edit = false
        this.$emit('input', this.remark)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.remark-bz
    color rgba(0, 0, 0, 0.5)

  [contenteditable="true"]:active, [contenteditable="true"]:focus{
    border:none;
    outline:none;
    background-color: #E8F9F2;
  }
</style>
