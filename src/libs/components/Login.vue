<template>
  <div class="ui segment">
    <q-field icon="account_circle" :error="!!user_name_error" :error-label="user_name_error">
      <q-input v-model="user_name" @focus="cleanError" type="text" float-label="请输入邮箱/用户名" />
    </q-field>
    <q-field icon="vpn_key" :error="!!password_error" :error-label="password_error">
      <q-input v-model="password" @keyup.enter="check" @focus="cleanError" type="password" float-label="请输入密码" />
    </q-field>
    <q-btn @click="check" :color="button_color" class="full-width">登录</q-btn>
  </div>
</template>

<script>
  import {
    QBtn,
    QInput,
    QField
  } from 'quasar'
  export default {
    props: {
      button_color: {
        type: String,
        default: 'primary'
      }
    },
    components: {
      QBtn,
      QField,
      QInput
    },
    data: function() {
      return {
        user_name: '',
        user_name_error: '',
        password: '',
        password_error: ''
      }
    },
    ready() {},
    methods: {
      check: function() {
        if (!this.user_name) {
          this.user_name_error = '必须输入用户名!'
          return
        }
        if (!this.password) {
          this.password_error = '必须输入密码!'
          return
        }
        this.$emit('login', this.user_name, this.password)
      },
      cleanError: function() {
        this.user_name_error = ''
        this.password_error = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
