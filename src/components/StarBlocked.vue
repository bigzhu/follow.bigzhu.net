<template>
  <div class="ui main container">
    <div class="ui stackable grid">
      <div class="row">
        <div class="sixteen wide column ui card message-bz nobody-bz">
          <div class="nobody-image-bz">
            <img src="../statics/assets/nobody.svg">
            <p>{{ $t("StarBlocked.tips") }}</p>
          </div>
        </div>
        <!-- <div class="four wide column top-margin">
        </div>
        <div class="twelve wide column no-padding-bz">
          <star-item v-for="star in stars" :star="star">
          </star-item>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import StarItem from './StarItem'
  export default {
    events: {
      'unfollow': function (starID) { // 监听unfollow事件，移除已经unfollow的star
        this.$store.commit('DELETE_MY_GOD', starID)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          if (this.myStars.length === 0) {
            this.loading = true
          }
          this.getStars()
        },
        deep: true
      }
    },
    props: [],
    components: {
      StarItem
    },
    computed: {},
    data: function () {
      return {
        stars: []
      }
    },
    mounted() {
      this.getStars()
    },
    methods: {
      getStars: function () {
        let self = this
        this.$store.dispatch('getStars', { cat: this.$route.params.cat, blocked: true }).then(function (data) {
          self.stars = data.stars
        })
      }
    }
  }
</script>

<style>
  .nobody-bz {
    width: 100%;
    height: 35rem;
  }

  .nobody-image-bz {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -177.5px;
    margin-left: -144px;
  }

  .nobody-bz p {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.14rem;
    color: #9096A2;
  }
</style>
