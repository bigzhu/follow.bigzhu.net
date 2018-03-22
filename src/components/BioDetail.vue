<template>
  <div class="layout-padding">
    <div class="row gutter sm-column">
      <div class="width-5of5 no-top-padding-bz">
        <div class="ui segment bio-background">
          <img class="responsive" :src='bio.title_img'>
          <div class="bio-article">
            <h3>{{bio.title}}</h3>
            <div v-html="bio.text">
            </div>
          </div>
          <god-item :god='godInfo' isMy="true" class="bio-god-card"></god-item>
        </div>
      </div>

      <div class="width-2of5 no-top-padding-bz bg">
        <div class="blank-padding"></div>
        <right-info></right-info>
      </div>
    </div>
    <Top></Top>
  </div>
</template>

<script>
  import Top from './Top'
  import GodItem from './GodItem'
  import _ from 'lodash'
  import RightInfo from './RightInfo'
  export default {
    components: {
      Top,
      GodItem,
      RightInfo
    },
    data () {
      return {
        god_name: this.$route.params.god_name
      }
    },
    props: {
    },
    mounted () {
      this.$store.dispatch('getGod', this.god_name)
      this.getBio()
    },
    computed: {
      godInfo () {
        let godInfo = this.$store.state.godInfos[this.god_name]
        if (godInfo) {
          return godInfo
        }
        return {id: 0, name: ''}
      },
      bio () {
        let self = this
        let bio = _.find(this.$store.state.p.rich_list, function (d) { return d.key === self.god_name })
        if (bio) return bio
        else return {title_img: ''}
      }
    },
    methods: {
      getDetail: function () {
        let self = this
        this.$store.dispatch('getRichText', {key: this.god_name}).then(function (data) {
          self.bio.text = data.rich_text[0].text
        })
      },
      getBio: function () {
        let self = this
        if (this.bio.title_img !== '') {
          if (!this.bio.text) { // 没有详情，取之
            this.getDetail()
          }
        } else {
          this.$store.dispatch('getRichList').then(function (data) {
            self.getBio()
          })
        }
      }
    }

  }
</script>

<style scoped>
  .ui.segment.bio-background {
    border-radius: 0.06em;
    box-shadow: .5px 1px 1px 1px rgba(0,0,0,0.1);
    position: relative;
    border: none;
    background-color: #fff;
  }
  .bio-article {
    padding: 1.5rem;
  }
  .bio-god-card.ui.segment.recommand-god-bz {
    box-shadow: none;
    border-top: 1px solid #E6E6E6;
    padding-top: 1rem;
  }
</style>
