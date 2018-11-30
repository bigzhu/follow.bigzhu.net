<template>
  <q-card class="the-hover-bz" inline>
    <q-item>
      <router-link :to="{ name: 'God', params: { god_name: god.name }}">
        <q-item-side :avatar="god.avatar||'/statics/assets/avatar.svg'" />
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
        <social-badge v-for="social in Object.keys(star_social)" :key="social" v-show="star_social[social].social_name!=''" @click.native="setNow(star_social[social])" :type="star_social[social].social" :info="star_social[social]" />
      </div>
    </q-card-title>

    <q-card-main class="green-bz">
      <p v-html="bio"></p>
      <GodRemark v-model="god.remark" :god_id="god.id" class="green-bz remark"></GodRemark>
    </q-card-main>
    <q-card-actions align="end">
      <Follow v-model="god.following" :god_id="god.id" class="follow"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import Follow from './Follow'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  import godData from '../datas/god'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: {
      god: {
        type: Object,
        default: function() {
          return godData
        }
      },
      is_my: {}
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
      star_social() {
        return this.$store.state.god.map_star_socials[this.god.id.toString()]
      },
      bio() {
        return myautolinker(this.god.bio, this.god.social)
      },
      god_id() {
        return this.god.god_id
      }
    },
    methods: {
      // 是否有这个社交类型
      haveSocial: function(social) {
        return true
      },
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
