<template>
  <q-card class="bz" inline>
    <q-item>
      <router-link :to="{ name: 'God', params: { god_name: god.name }}">
        <q-item-side :avatar="proxy(avatar)" />
      </router-link>
      <q-item-main>
        <router-link :to="{ name: 'God', params: { god_name: god.name }}">
          <q-item-tile label>{{god.name}}</q-item-tile>
        </router-link>
        <q-item-tile sublabel>
          {{god.followed_count}} {{ $t("GodItem.follownumber") }}
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

    <q-card-main class="card-content green-bz">
      <p v-html="description"></p>
      <GodRemark v-model="remark" :god_id="god.id" class="card-content green-bz remark"></GodRemark>
    </q-card-main>
    <q-card-actions align="end">
      <Follow v-model="god.followed" :god_id="god.id" class="follow"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import {
    QCardTitle,
    QCardActions,
    QCardMain,
    QItem,
    QCardMedia,
    QItemSide,
    QItemTile,
    QItemMain,
    QCard
  } from 'quasar'
  import Follow from './Follow'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  import GodItemBase from './GodItemBase'
  import god_data from '../datas/god'
  import Proxy from './Proxy'
  export default {
    mixins: [GodItemBase, Proxy],
    props: {
      god: {
        type: Object,
        default: function() {
          return god_data
        }
      },
      is_my: {}
    },
    components: {
      QCardTitle,
      QCardActions,
      QCardMain,
      QItem,
      QCardMedia,
      QItemSide,
      QItemTile,
      QItemMain,
      QCard,
      SocialBadge,
      Follow,
      GodRemark
    },
    watch: {},
    mounted() {},
    directives: {},
    data: function() {
      return {
        loading: false
      }
    },
    computed: {
      god_id: function() {
        return this.god.god_id
      },
      remark: function() {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      }
    },
    methods: {
      showBadge: function(social) {
        return social.name && social.count
      },
      block: function(god) {
        this.loading = true
        let self = this
        this.$store.dispatch('postBlock', god.god_id).then(function(data) {
          self.$store.commit('REMOVE_THIS_GOD_CAT_MY_GODS', god.god_id)
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
  .bz
    max-width 20.9rem
    @media (max-width: 920px)
      min-width 100%
  .q-item-side img // 改大小
    width 6rem
    height 6rem
    margin-right 1rem
    margin-top 1rem

//  .q-card:hover .hover-show {
//   opacity: 1;
// } 
//   @media (max-width: 920px) {
//     .remark {
//       /* 避免关注按钮遮住remark */
//       margin-bottom: 1.5rem;
//     }
//     .item.two-lines>.item-secondary.stamp {
//       /* 社交信息移到下部分 */
//       top: 3.5rem;
//       left: 1rem;
//       right: initial;
//     }
//   }
// 
//   @media (min-width: 921px) {
//     .item>.item-primary~.item-content {
//       /* 桌面上不要空头像的位置 */
//       margin-left: 16px;
//     }
//   }
// 
//   .follow {
//     position: absolute;
//     right: 0;
//     bottom: 0;
//   }
// 
//   .title {
//     font-size: 1.1rem;
//     font-weight: 500;
//   }
// 
//   .col-4 {
//     /* 居中头像 */
//     min-height: 17rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// 
//   .item>.item-secondary.stamp {
//     width: auto;
//   }
</style>
