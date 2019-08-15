<template>
  <q-card class="the-hover-bz" inline>
    <q-item>
      <q-item-section avatar>
        <router-link :to="{ name: 'Star', params: { StarName: god.Name }}">
          <q-avatar size="140px">
            <img :src="god.Avatar||'/statics/assets/avatar.svg'">
          </q-avatar>
        </router-link>
      </q-item-section>

      <q-item-section>
        <q-item-label class="black-link-bz">
          <router-link :to="{ name: 'Star', params: { StarName: god.Name }}">
            {{god.Name}}
          </router-link>
        </q-item-label>
        <q-item-label caption>{{god.Cat}} &nbsp;&nbsp;&nbsp;&nbsp;{{god.FollowingCount||1}} {{ $t("人关注") }}</q-item-label>
        <q-item-label caption v-for="social in Object.keys(starSocial)" :key="social" v-show="starSocial[social].SocialName!=''">
          <SocialBadge @click.native="setNow(starSocial[social])" :type="starSocial[social].Social" :info="starSocial[social]" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section class="green-bz">
      <p v-html="bio"></p>
      <StarRemark v-model="god.Remark" :godID="god.ID" class="green-bz remark"></StarRemark>
    </q-card-section>

    <q-card-actions align="around">
      <Follow v-model="god.Following" :godID="god.ID" class="follow"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import Follow from './Follow'
  import StarRemark from './StarRemark'
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
      StarRemark
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
        return this.god.StarID
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
        this.$store.dispatch('postBlock', god.StarID).then(function (data) {
          self.$store.commit('REMOVE_THIS_GOD_catMyStars', god.StarID)
          self.loading = false
        })
        if (god.Following === 1) {
          self.$store.dispatch('unfollow', god.StarID)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .black-link-bz
    a
      color black
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
