<template>
  <q-card v-if="star">
    <q-img :src="star.Avatar||'/statics/assets/avatar.svg'">
      <div class="absolute-bottom text-center">
        <div class="text-h6">{{star.Name}}</div>
        <div class="text-subtitle2">{{star.Cat}}</div>
      </div>
    </q-img>
    <q-card-section v-html="star.Bio">
    </q-card-section>
    <q-card-section>
      <GodRemark v-model="remark" :godID="star.ID" class="green-bz remark"></GodRemark>
      <q-input v-for="s in socialTypes" :key="s.socialType" v-model="starSocial[s.socialType].SocialName" @input="s.isEdit=true" :disable="disableEdit">
        <template v-slot:prepend>
          <q-icon :name="'fab fa-'+s.socialType" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="around">
          <q-btn outline v-show="disableEdit" @click="save" color="secondary">{{ $t("编辑") }}</q-btn>
          <q-btn outline color="secondary" v-show="!disableEdit" @click="save">{{ $t("保存") }}</q-btn>
          <Follow v-model="star.Following" :godID="star.ID" />
      </q-card-actions>
        <!--
        <q-card-section>
          <q-btn outline v-show="disableEdit" @click="save" color="secondary">
            {{ $t("编辑") }}
          </q-btn>
          <q-btn float color="secondary" v-show="!disableEdit" @click="save" class="float-right">
            {{ $t("保存") }}
          </q-btn>
          <Follow v-model="star.Following" :godID="star.ID"></Follow>
        </q-card-section>
        -->
      </q-card>
    </template>

    <script>
import GodRemark from './GodRemark'
import Follow from './Follow'
import socialTypes from '../datas/socialTypes'
export default {
  components: {
    GodRemark,
    Follow
  },
  computed: {
    StarID() {
      return this.$store.state.god.StarNameIDS[this.StarName]
    },
    star() {
      return this.$store.state.god.mapStars[this.StarID]
    },
    starSocial() {
      return this.$store.state.god.mapStarSocials[this.StarID]
    },
    StarName() {
      // return this.$route.params.StarName
      return this.$store.state.god.nowStar.name
    },
    remark: function () {
      return this.star.Remark || this.star.AdminRemark
    }
  },
  data: function () {
    return {
      socialTypes: socialTypes,
      av: '',
      desc: '',
      loading: false,
      disableEdit: true,
      buttonText: '修改资料'
    }
  },
  methods: {
    autoInsert: function (key, scheme) {
      if (key === 'blog') {
        scheme = 'http://'
      }
      if (!this.god[key]) {
        this.god[key] = scheme
      }
    },
    save: function () {
      if (this.disableEdit) {
        this.disableEdit = false
      } else {
        this.disableEdit = true
        let modifyStarSocial = {
          StarID: this.StarID
        }
        // 筛出做了修改的社交
        this.socialTypes.map((o) => {
          if (o.isEdit) {
            modifyStarSocial[o.socialType] = this.starSocial[o.socialType].SocialName
            o.isEdit = false
          }
        })
        this.$store.dispatch('putStarSocial', modifyStarSocial)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
/*
// 图标大小
  .q-field >>> i
    font-size 1.5rem
    // 拉开间距
    .q-field
    margin-top 1rem
    margin-bottom 0.5rem
    // 编辑按钮会被拉长,这里要设定, 不知为什么
    .q-btn
    margin .5rem

 */
   /*
   .card {
   display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: center;
     }
     .card > img {
     width: 20rem;
     }
     .card .list {
     width: 100%;
     border-top: initial;
     border-bottom: initial;
     }
     .list {
     box-shadow: initial;
     }
     .item.two-lines {
     height: 4rem;
     }
     input:not(.no-style):focus {
     border-bottom: .5px solid #494949;
     }
     input:not(.no-style):hover {
     border-bottom: .5px solid #494949;
     }
     input:not(.no-style) {
     border-bottom: .5px solid #eee;
     }
     .list.highlight .item:hover {
     background-color: initial;
     }
     .button {
     margin: 1rem;
     }
    */
</style>
