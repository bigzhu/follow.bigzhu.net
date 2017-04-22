<template>
  <div class="list">
    <router-link 
      v-for="cat in cats"
      tag="div"
      class="item item-link"
      :class="{'active': $route.params.cat === cat.cat}"
      :to="{'name': route_name, params: {'cat': cat.cat}}"
      >
      <i class="item-primary">face</i>
      <div class="item-content has-secondary">
        <div>{{cat.cat}}</div>
      </div>
    </router-link>
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
  .item.active {
    background:rgba(0,0,0,.03); 
  }
  .list {
    background: #fff;
  }
  /* 对齐右边 */
  .row > .list {
    margin-right: 1rem;
  }
</style>
