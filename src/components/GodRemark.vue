<template>
  <div>
    <div v-html="value" v-show="!is_edit && value" class="remark-bz"></div>
    <p v-show="is_edit" v-html="value" @blur="save" contenteditable="true" class="remark-edit-content"></p>
    <button v-show="is_edit" @click="save" class="light">{{ $t("GodRemark.save") }}</button>
    <a v-show="!is_edit" @click="edit" href="javascript:void(0)" class="hover-show">
      <i class="edit icon"></i>
    </a>
  </div>
</template>

<script>
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
            self.$el.getElementsByClassName('.remark-edit-content').focus()
          }
        )
      },
      save: function () {
        // this.value = $(this.$el).find('.remark-edit-content').html()
        this.value = this.$el.getElementsByClassName('.remark-edit-content').innerHTML
        this.$emit('input', this.value)
        this.$store.dispatch('addRemark', {god_id: this.god_id, remark: this.value})
        this.is_edit = false
      }
    }
  }
</script>

<style>
  .remark-bz {
    color: rgba(0, 0, 0, 0.5)
  }
  @media (max-width : 767px) {
    .hover-show {
      opacity: 1;
    }
  }
</style>
