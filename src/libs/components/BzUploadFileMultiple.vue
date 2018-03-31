<template>
  <div>
    <q-item v-for="(v, index) in value" :key="v.url">
      <q-item-main>
        <a :href="v.url" :key="v.url">{{v.name}}</a>
      </q-item-main>
      <q-item-side right icon="delete" class="cursor-pointer" @click="del(index)" />
    </q-item>

    <BzUploadFile :upload_url="upload_url" @upload_done="addNew">
      <slot></slot>
    </BzUploadFile>
  </div>
</template>

<script>
  import {
    QList,
    QItem,
    QItemSide,
    QItemMain
  } from 'quasar'
  import BzUploadFile from './BzUploadFile'
  export default {
    watch: {
      value: { // img 删除只是把 url 置为 '', 这里监听并更新列表, 剔除 url 为 '' 的
        handler: function(val, oldVal) {
          let files = val.filter(item => item.url !== '')
          if (val.length !== files.length) {
            this.$emit('input', files)
          }
        },
        deep: true
      }
    },
    props: {
      upload_url: {
        type: String,
        default: '/api_file_upload'
      },
      value: {
        default: function() {
          return []
        }
      }
    },
    components: {
      QList,
      QItem,
      QItemSide,
      QItemMain,
      BzUploadFile
    },
    data: function() {
      return {
      }
    },
    methods: {
      del: function(index) {
        this.value.splice(index, 1)
        this.$emit('input', this.value)
      },
      addNew: function(url, name) {
        this.value.push({
          url,
          name
        })
      }
    }
  }
</script>
