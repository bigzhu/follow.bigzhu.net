<template>
  <div>
    <div v-html="value" v-show="!is_edit && value" class="remark-bz"></div>
    <p v-show="is_edit" v-html="value" @blur="save" contenteditable="true" class="remark-edit-content"></p>
    <q-btn v-show="is_edit" @click="save" color="secondary">{{ $t("GodRemark.save") }}</q-btn>
    <a v-show="!is_edit" @click="edit" href="javascript:void(0)" class="hover-show-bz">
      <q-icon name="edit"/>
    </a>
  </div>
</template>

<script>
  import {QIcon, QBtn} from 'quasar'
  import Vue from 'vue'
  export default {
    props: {
      value: {
        // required: true
      },
      god_id: {
        required: true,
        type: Number
      }
    },
    components: {
      QBtn,
      QIcon
    },
    data: function () {
      return {
        is_edit: false
      }
    },
    mounted () {
    },
    methods: {
      edit: function () {
        this.is_edit = true
        let self = this
        Vue.nextTick(
          function () {
            // $(_this.$el).find('.remark-edit-content').focus()
            self.$el.getElementsByClassName('remark-edit-content')[0].focus()
          }
        )
      },
      save: function () {
        // this.value = $(this.$el).find('.remark-edit-content').html()
        this.value = this.$el.getElementsByClassName('remark-edit-content')[0].innerHTML
        this.$emit('input', this.value)
        this.$store.dispatch('addRemark', {god_id: this.god_id, remark: this.value})
        this.is_edit = false
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
