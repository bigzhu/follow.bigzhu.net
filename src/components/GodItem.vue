<template>
  <q-card class="the-hover-bz" inline>
    <q-item>
      <router-link :to="{ name: 'God', params: { god_name: god.name }}">
        <q-item-side :avatar="proxy(avatar)||'/statics/assets/avatar.svg'"/>
      </router-link>
      <q-item-main>
        <router-link :to="{ name: 'God', params: { god_name: god.name }}">
          <q-item-tile label>{{god.name}}</q-item-tile>
        </router-link>
        <q-item-tile sublabel>
          {{god.followed_count||1}} {{ $t("人关注") }}
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-card-title>
      <div slot="subtitle">
        <social-badge @click.native="setNow(god.twitter)" v-show="showBadge(god.twitter)" type="twitter" :info="god.twitter"></social-badge>
        <social-badge @click.native="setNow(god.github)" v-show="showBadge(god.github)" type="github" :info="god.github"></social-badge>
        <social-badge @click.native="setNow(god.tumblr)" v-show="showBadge(god.tumblr)" type="tumblr" :info="god.tumblr"></social-badge>
        <social-badge @click.native="setNow(god.instagram)" v-show="showBadge(god.instagram)" type="instagram" :info="god.instagram"></social-badge>
        <social-badge @click.native="setNow(god.facebook)" v-show="showBadge(god.facebook)" type="facebook" :info="god.facebook"></social-badge>
      </div>
    </q-card-title>

    <q-card-main class="green-bz">
      <p v-html="description"></p>
      <GodRemark v-model="remark" :god_id="god.id" class="green-bz remark"></GodRemark>
    </q-card-main>
    <q-card-actions align="end">
      <Follow v-model="god.followed" :god_id="god.id" class="follow"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import Follow from './Follow'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  import GodItemBase from './GodItemBase'
  import godData from '../datas/god'
  import Proxy from './Proxy'
  export default {
    mixins: [GodItemBase, Proxy],
    props: {
      god: {
        type: Object,
        default: function() {
          return godData
        }
      },
      isMy: {}
    },
    components: {
      SocialBadge,
      Follow,
      GodRemark
    },
    mounted() {},
    directives: {},
    data: function() {
      return {
        loading: false
      }
    },
    computed: {
      show: function() {
        return this.god.id !== 0
      },
      god_id: function() {
        return this.god.god_id
      }
    },
    methods: {
      block: function(god) {
        this.loading = true
        let self = this
        this.$store.dispatch('postBlock', god.god_id).then(function(data) {
          self.$store.commit('REMOVE_THIS_GOD_cat_my_gods', god.god_id)
          self.loading = false
        })
        if (god.followed === 1) {
          self.$store.dispatch('unfollow', god.god_id)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-card
    max-width 20.9rem
    @media (max-width: 920px)
      min-width 100%
    overflow-wrap: break-word // 让 a 换行
  .q-item-side >>> .q-item-avatar // 改大小, 用 >>> 来深入改 component 里面的东西
    width 6rem
    height 6rem
    margin-right 1rem
    margin-top 1rem
</style>
