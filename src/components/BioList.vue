<template>
  <div class="ui container">
    <router-link :to="{name:'BioEditorNew'}" class="ui button">New</router-link>
    <div v-for="rich in richList" class="ui items">
      <div @click="go(rich.id)" class="item">
        <div class="image">
          <img :src="rich.titleImg">
        </div>
        <div class="content">
          <a class="header">{{rich.title}}</a>
          <div class="meta">
            <span>Description</span>
          </div>
          <div v-html="rich.summary" class="description">
          </div>
          <div class="extra">
            {{rich.key}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {},
    computed: {
      richList: function () {
        return this.$store.state.p.richList
      }
    },
    data: function () {
      return {}
    },
    mounted () {
      this.$store.dispatch('getRichList')
    },
    methods: {
      go: function (id) {
        this.$router.push({ name: 'BioEditor', params: { id: id } })
      }
    }
  }
</script>

<style>

</style>
