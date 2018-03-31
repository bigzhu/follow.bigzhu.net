<template>
  <div>
    <a @click="hidePopup" href="javascript:;" class="image-popup-delete-btn" :style="{display:display_close_icon}">
      <img src="../assets/delete-btn.svg">
    </a>
    <div class="ui basic modal image-popup">
      <div class="image content" style="justify-content:center;">
        <img @load="showImagePopup" :src="src" class="image">
      </div>
    </div>
  </div>
</template>

<script>
  // 图片弹出预览, 用于手机上查看图片
  export default {
    props: ['src'],
    components: {},
    computed: {
      display_close_icon: function() {
        return this.hide_close_icon ? 'none' : 'block'
      }
    },
    data: function() {
      return {
        hide_close_icon: true,
        popup: null
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
        this.popup = this.$el.getElementsByClassName('image-popup')[0]
        let self = this
        this.popup.modal({
          onShow: function() {
            // 显示关闭按钮
            self.showCloseIcon()
          },
          onHide: function() {
            // 隐藏关闭按钮
            self.hideCloseIcon()
            // 发送事件, 要求父组件修改状态
            self.$emit('input', '')
          }
        })
      })
    },
    methods: {
      hidePopup: function() {
        this.popup.modal('hide')
      },
      showImagePopup: function() {
        if (this.src !== '') {
          this.popup.modal('show')
        }
      },
      showCloseIcon: function() {
        this.hide_close_icon = false
      },
      hideCloseIcon: function() {
        this.hide_close_icon = true
      }
    }
  }
</script>

<style>
  .image-popup-delete-btn {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    margin-left: -2.5rem;
    z-index: 9999;
  }
</style>
