<template>
  <div>
    <QPageSticky corner="bottom-right" :offset="[-286, 0]" class="bz">
      <q-btn @click="$refs['confirm_refalsh_message'].open(), godName=''" round color="" icon="add"></q-btn>
    </QPageSticky>

    <q-modal ref="confirm_refalsh_message">
      <q-card class="card">
        <q-card-main>
          <q-input @keyup.13="add" v-model="godName" required :float-label="$t('AddGod.example')" />
        </q-card-main>
        <q-card-actions align="around">
          <q-btn color="secondary" @click="add">好的</q-btn>
          <q-btn class="light" @click="$refs.confirm_refalsh_message.close()">取消</q-btn>
        </q-card-actions>
      </q-card>
    </q-modal>
  </div>
</template>

<script>
  import {
    QInput,
    QCardActions,
    QCardMain,
    QCard,
    QBtn,
    QPageSticky,
    QModal
  } from 'quasar'
  export default {
    props: [],
    components: {
      QInput,
      QCardActions,
      QCardMain,
      QCard,
      QBtn,
      QPageSticky,
      QModal
    },
    computed: {},
    data: function() {
      return {
        godName: ''
      }
    },
    mounted() {
      // $(this.$el).popup()
    },
    methods: {
      add: function() {
        this.$refs.confirm_refalsh_message.close()
        this.$emit('add', this.godName.trim())
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-card {
    margin: 0;
  }

  .fixed-bottom-right {
    bottom: 1rem
    z-index 9999
  }
</style>
