<template>
  <div class="layout-padding relative-position upload-img">
    <div v-show="loading" class="ui large active loader">
      <div class="ui text loader">上传图片中</div>
    </div>
    <upload-file :zip="zip" :upload_url="upload_url" @change_file="previewImg" accept="image/png, image/jpeg, image/gif" @upload_done="done" class="hidden">上传附件</upload-file>
    <a @click="changeImg" href="javascript:void(0)" data-content="">
      <img :src="value||blank_img||default_picture" class="responsive" :alt="alt" />
      <q-inner-loading :visible="loading" />
    </a>

    <a @click="deleteImg" :class="{'show-delete': value}" class="delete" href="javascript:;"><img src="../assets/delete.svg"></a>
    <!--
    <BzImgPopup v-model="pop_img"></BzImgPopup>
    -->
  </div>
</template>

<script>
  import {
    QInnerLoading
  } from 'quasar'
  import UploadFile from './BzUploadFile'
  import BzImgPopup from './BzImgPopup'
  import upload_picture from '../assets/upload-picture.svg'
  export default {
    props: {
      zip: { // 是否压缩图片
        type: Boolean,
        default: true
      },
      upload_url: {
        type: String,
        default: '/api_file_upload'
      },
      value: {
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: ''
      },
      blank_img: {
        type: String,
        default: ''
      }
    },
    components: {
      QInnerLoading,
      BzImgPopup,
      UploadFile
    },
    data: function() {
      return {
        pop_img: '',
        default_picture: upload_picture,
        loading: false,
        img_input: null,
        pre_img: null
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        this.img_input = this.$el.getElementsByTagName('input')[0]
        this.pre_img = this.$el.getElementsByClassName('.responsive')[0]
      })
    },
    methods: {
      deleteImg: function() {
        this.$emit('input', '')
      },
      changeImg: function() {
        if (this.value) {
          this.pop_img = this.value
        } else {
          this.img_input.click()
        }
      },
      previewImg: function(e) {
        let file = e.target.files[0]
        if (file) {
          this.loading = true
        }
      },
      done: function(url, name) {
        this.loading = false
        this.$emit('input', url)
        this.$emit('upload_done', url, name)
      }
    },
    computed: {}
  }
</script>

<style lang="stylus" scoped>
  .upload-img:hover .show-delete {
    visibility: visible;
    opacity: 1;
  }
  .delete {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    transition: color 0.3s ease;
    transition: visibility 0s, opacity 0.3s linear;
    opacity: 0;
  }
</style>
