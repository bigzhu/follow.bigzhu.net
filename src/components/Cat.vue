<template>
  <div class="list">
    <div class="item" v-for="cat in cats">
      <i class="item-primary">mail</i>
      <div class="item-content">
        <router-link :to="{'name': route_name, params: {'cat': cat.cat}}" :class="{'active': $route.params.cat === cat.cat}">
          {{cat.cat}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: ['just_my', 'route_name'],
    computed: {
      cats: function () {
        if (this.just_my) {
          return this.$store.state.my_cats
        } else {
          return this.$store.state.cats
        }
      },
      link: function () {
        if (this.just_my) {
          return 'MyGods'
        } else {
          return 'Recommand'
        }
      }
    },
    components: {
    },
    data: function () {
      return {
        input_cat: '',
        add_cat_input_stat: false
      }
    },
    mounted () {
      this.$store.dispatch('getCat', this.just_my)
    },
    methods: {
      showAddCatInput: function () {
        this.add_cat_input_stat = true
        this.input_cat = '' // 清空上次的输入
        this.$nextTick(
          function () {
            $('#id_add_cat').focus()
          }
        )
      },
      addCat: function () {
        // window.alert(this.input_cat)
        this.cats.splice(0, 0, {cat: this.input_cat})
        this.add_cat_input_stat = false
        this.$router.push({name: this.route_name, params: {cat: this.input_cat}})
      },
      selectCat: function () {
        this.$router.push({name: this.route_name, params: {cat: this.$route.params.cat}})
      }
    }

  }
</script>

<style scoped>
  /* 对齐右边 */
  .row.gutter > .list {
    margin-top: 1rem;
  }
</style>
