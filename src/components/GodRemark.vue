<template>
  <div>
    <div class="row">
      <div v-html="remark" v-show="!isEdit && remark" class="remark-bz"></div>
      <p v-show="isEdit" v-html="remark" @blur="save" contenteditable="true" class="remark-edit-content"></p>
      <a v-show="!isEdit" @click="edit" href="javascript:void(0)" class="hover-show-bz">
        <q-icon name="edit" />
      </a>
    </div>
    <q-btn outline v-show="isEdit" @click="save" color="secondary">{{ $t("保存") }}</q-btn>
  </div>
</template>

<script>
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
    components: {},
    computed: {},
    data: function () {
      return {
        isEdit: false,
        remark: myautolinker(this.value, 'twitter')
      }
    },
    mounted() {},
    methods: {
      edit: function () {
        this.isEdit = true
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
          StarID: this.godID,
          Remark: this.remark
        })
        this.isEdit = false
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
