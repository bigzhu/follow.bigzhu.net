<template>
  <div>
    <button 
      @click="$refs['confirm_refalsh_message'].open(), god_name=''"
      :data-content="$t('UnRead.unread')"
      class="circular fixed-bottom-right animate-pop"
      >
      <div data-content="Add users to your feed">
        <i>add</i>
      </div>
    </button>

    <q-modal ref="confirm_refalsh_message">
      <div class="card">
        <div class="card-content card-force-top-padding">
          <div class="floating-label" >
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
  export default {
    props: [],
    components: {
    },
    computed: {
    },
    data: function () {
      return {
        god_name: ''
      }
    },
    mounted () {
      // $(this.$el).popup()
    },
    methods: {
      add: function () {
        this.$refs.confirm_refalsh_message.close()
        this.$emit('add', this.god_name)
      }
    }
  }
</script>

<style scoped>
  .card-actions > button {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .card-actions > .primary {
    padding-right: 1rem;
  }
  .light {
    margin-left: 10%;
  }

  .card {
    margin-bottom: 0;
  }
  button.fixed-bottom-right:hover {
    background: #FFF;
    color: rgba(0,0,0,.8);
  }
  button.fixed-bottom-right {
    right: 1rem;
    border: 1px solid #DADADA;
    margin: 1rem;
  }
  @media (min-width: 1100px) and (max-width: 1300px) {
    .un-read-bz {
      right: .5em;
    }
  }
</style>
