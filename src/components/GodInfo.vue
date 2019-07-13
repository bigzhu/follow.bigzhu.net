<template>
  <q-card class="the-hover-bz" v-if="star">
    <q-card-media overlay-position="top">
      <img :src="star.avatar||'/statics/assets/avatar.svg'">
      <q-card-title slot="overlay">
        {{star.name}}
        <span slot="subtitle">{{star.cat}}</span>
      </q-card-title>
    </q-card-media>

    <q-card-main>
      <p v-html="star.bio"></p>
      <GodRemark v-model="remark" :godID="star.id" class="green-bz remark"></GodRemark>
      <q-field v-for="s in socialTypes" :key="s.socialType" :icon="'fab fa-'+s.socialType">
        <q-input v-model="starSocial[s.socialType].socialName" @input="s.isEdit=true" :disable="disableEdit" :float-label="s.socialType" />
      </q-field>
    </q-card-main>
    <q-card-actions align="around">
      <q-btn v-show="disableEdit" @click="save" class="light">
        {{ $t("编辑") }}
      </q-btn>
      <q-btn color="secondary" v-show="!disableEdit" @click="save">
        {{ $t("保存") }}
      </q-btn>
      <Follow v-model="star.following" :godID="star.id"></Follow>
    </q-card-actions>
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
      starID() {
        return this.$store.state.god.starNameIDS[this.starName]
      },
      star() {
        return this.$store.state.god.mapStars[this.starID]
      },
      starSocial() {
        return this.$store.state.god.mapStarSocials[this.starID]
      },
      starName() {
        return this.$route.params.starName
      },
      remark: function () {
        return this.star.remark || this.star.adminRemark
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
            starID: this.starID
          }
          // 筛出做了修改的社交
          this.socialTypes.map((o) => {
            if (o.isEdit) {
              modifyStarSocial[o.socialType] = this.starSocial[o.socialType].socialName
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
