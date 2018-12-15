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
      <GodRemark v-model="remark" :god_id="star.id" class="green-bz remark"></GodRemark>
      <q-field v-for="s in social_types" :key="s.social_type" :icon="'fab fa-'+s.social_type">
        <q-input v-model="star_social[s.social_type].social_name" @input="s.is_edit=true" :disable="disable_edit" :float-label="s.social_type" />
      </q-field>
    </q-card-main>
    <q-card-actions align="around">
      <q-btn v-show="disable_edit" @click="save" class="light">
        {{ $t("编辑") }}
      </q-btn>
      <q-btn color="secondary" v-show="!disable_edit" @click="save">
        {{ $t("保存") }}
      </q-btn>
      <Follow v-model="star.following" :god_id="star.id"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import GodRemark from './GodRemark'
  import Follow from './Follow'
  import social_types from '../datas/social_types'
  export default {
    components: {
      GodRemark,
      Follow
    },
    computed: {
      star_id() {
        return this.$store.state.god.star_name_ids[this.star_name]
      },
      star() {
        return this.$store.state.god.map_stars[this.star_id]
      },
      star_social() {
        return this.$store.state.god.map_star_socials[this.star_id]
      },
      star_name() {
        return this.$route.params.god_name
      },
      remark: function() {
        return this.star.remark || this.star.admin_remark
      }
    },
    data: function() {
      return {
        social_types: social_types,
        av: '',
        desc: '',
        loading: false,
        disable_edit: true,
        button_text: '修改资料'
      }
    },
    methods: {
      autoInsert: function(key, scheme) {
        if (key === 'blog') {
          scheme = 'http://'
        }
        if (!this.god[key]) {
          this.god[key] = scheme
        }
      },
      save: function() {
        if (this.disable_edit) {
          this.disable_edit = false
        } else {
          this.disable_edit = true
          let modify_star_social = {
            star_id: this.star_id
          }
          // 筛出做了修改的社交
          this.social_types.map((o) => {
            if (o.is_edit) {
              modify_star_social[o.social_type] = this.star_social[o.social_type].social_name
              o.is_edit = false
            }
          })
          this.$store.dispatch('putStarSocial', modify_star_social)
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
