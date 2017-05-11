<template>
  <div class="list">
    <router-link 
      v-for="cat in cats"
      :key="cat.id"
      tag="div"
      class="item item-link"
      :class="{'active': $route.params.cat === cat.cat}"
      :to="{'name': route_name, params: {'cat': cat.cat}}"
      >
      <i class="item-primary">{{getIcon(cat.cat)}}</i>
      <div class="item-content has-secondary">
        <div>{{cat.cat}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
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
        icon_map: [
          {name: '科技', icon: 'laptop_mac'},
          {name: '美女', icon: 'favorite_border'},
          {name: '前端开发', icon: 'web'},
          {name: '自然界', icon: 'crop_original'},
          {name: '艺术', icon: 'art_track'},
          {name: '新闻', icon: 'fiber_new'},
          {name: '美剧', icon: 'movie'},
          {name: '个人', icon: 'account_circle'},
          {name: '摄影', icon: 'photo_camera'},
          {name: '程序员', icon: 'code'},
          {name: '明星', icon: 'star'},
          {name: '阅读', icon: 'book'},
          {name: '互联网', icon: 'language'}
        ],
        input_cat: '',
        add_cat_input_stat: false
      }
    },
    mounted () {
      this.$store.dispatch('getCat', this.just_my)
    },
    methods: {
      getIcon: function (cat) {
        let icon_obj = this.icon_map.filter(function (d) {
          return d.name === cat
        })
        if (icon_obj.length) {
          return icon_obj[0].icon
        }
        return 'label_outline'
      },
      showAddCatInput: function () {
        this.add_cat_input_stat = true
        this.input_cat = '' // 清空上次的输入
        this.$nextTick(
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
