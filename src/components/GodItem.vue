<template>
  <q-card class="the-hover-bz" inline>
    <q-item>
      <router-link :to="{ name: 'God', params: { starName: god.name }}">
        <q-item-section :avatar="god.Avatar||'/statics/assets/avatar.svg'" />
      </router-link>
      <q-item-label>
        <router-link :to="{ name: 'God', params: { starName: god.name }}">
          <q-item-section label>{{god.Name}}</q-item-section>
        </router-link>
        <q-item-section sublabel>
          {{god.FollowingCount||1}} {{ $t("人关注") }}
        </q-item-section>
      </q-item-label>
    </q-item>

    <q-card-title>
      <div slot="subtitle">
        <social-badge v-for="social in Object.keys(starSocial)" :key="social" v-show="starSocial[social].socialName!=''" @click.native="setNow(starSocial[social])" :type="starSocial[social].social" :info="starSocial[social]" />
      </div>
    </q-card-title>

    <q-card class="green-bz">
      <p v-html="bio"></p>
      <GodRemark v-model="god.Remark" :godID="god.ID" class="green-bz remark"></GodRemark>
    </q-card>
    <q-card-actions align="end">
      <Follow v-model="god.Following" :godID="god.ID" class="follow"></Follow>
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
        default: function () {
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
    data: function () {
      return {
        loading: false
      }
    },
    computed: {
      starSocial() {
        return this.$store.state.god.mapStarSocials[this.god.ID.toString()]
      },
      bio() {
        return myautolinker(this.god.Bio, this.god.Social)
      },
      godID() {
        return this.god.GodID
      }
    },
    methods: {
      // 是否有这个社交类型
      haveSocial: function (social) {
        return true
      },
      block: function (god) {
        this.loading = true
        let self = this
        this.$store.dispatch('postBlock', god.GodID).then(function (data) {
          self.$store.commit('REMOVE_THIS_GOD_catMyGods', god.GodID)
          self.loading = false
        })
        if (god.Following === 1) {
          self.$store.dispatch('unfollow', god.GodID)
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
  .q-item-section >>> .q-item-avatar // 改大小, 用 >>> 来深入改 component 里面的东西
    width 6rem
    height 6rem
    margin-right 1rem
    margin-top 1rem
</style>
