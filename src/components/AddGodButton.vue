<template>
  <div>
    <q-fixed-position corner="bottom-right" :offset="[-286, 0]" class="bz">
      <q-btn @click="$refs['confirm_refalsh_message'].open(), god_name=''" round color="" icon="add"></q-btn>
    </q-fixed-position>

    <q-modal ref="confirm_refalsh_message">
      <div class="card">
        <div class="card-content card-force-top-padding">
          <div class="floating-label">
            <input @keyup.13="add" v-model="god_name" required class="full-width">
            <label>{{$t('AddGod.example')}}</label>
          </div>
        </div>
        <div class="card-actions card-no-top-padding space-between-bz">
          <button class="primary" @click="add">好的</button>
          <button class="light" @click="$refs.confirm_refalsh_message.close()">取消</button>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
  import {
    QBtn,
    QFixedPosition,
    QModal
  } from 'quasar'
  export default {
    props: [],
    components: {
      QBtn,
      QFixedPosition,
      QModal
    },
    computed: {},
    data: function() {
      return {
        god_name: ''
      }
    },
    mounted() {
      // $(this.$el).popup()
    },
    methods: {
      add: function() {
        this.$refs.confirm_refalsh_message.close()
        this.$emit('add', this.god_name.trim())
      }
    }
  }
</script>

<style scoped>
  .card-actions>button {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .card-actions>.primary {
    padding-right: 1rem;
  }

  .light {
    margin-left: 10%;
  }

  .card {
    margin-bottom: 0;
  }

  .fixed-bottom-right {
    bottom: 1rem;
  }
</style>
