<template>
  <div
    :class="{ 'popup': popup, 'transition': popup, 'centered': !popup }"
    class="ui card column card-radius"
  >
    <div v-show="star.starID === 0" class="ui active inverted dimmer">
      <div class="ui text loader">{{$t('Loading.loading')}}</div>
    </div>
    <div v-show="star.name==''" class="ui active inverted dimmer">
      <div class="ui text loader">{{$t('Loading.loading')}}</div>
    </div>

    <a
      @click="go(star.name)"
      :class="{'ui': popup, 'small': popup, 'centered': popup}"
      class="image"
    >
      <img :src="proxy(avatar)" class="ui centered image avatar-bz" />
    </a>
    <div class="content delete-border">
      <a @click="go(star.name)" class="user-name-a">
        <h3>{{star.name}}</h3>
      </a>
      <div class="description" v-html="desc"></div>
    </div>
    <div class="extra content star-icon-bz delete-border">
      <social-badge v-show="star.twitterUser" :callBack="setStarInfo" :info="star.twitterUser"></social-badge>
      <social-badge v-show="star.githubUser" :callBack="setStarInfo" :info="star.githubUser"></social-badge>
      <social-badge v-show="star.tumblrUser" :callBack="setStarInfo" :info="star.tumblrUser"></social-badge>
      <social-badge v-show="star.instagramUser" :callBack="setStarInfo" :info="star.instagramUser"></social-badge>
      <social-badge v-show="star.facebookUser" :callBack="setStarInfo" :info="star.facebookUser"></social-badge>
    </div>
    <follow class="attached" v-model="star.following" :starID="star.starID"></follow>
  </div>
</template>

<script>
import Follow from "./Follow";
import SocialBadge from "./SocialBadge";
import Proxy from "./Proxy";
export default {
  mixins: [Proxy],
  props: ["star", "popup"],
  watch: {
    star: {
      handler: function(val, oldVal) {
        this.setStarInfo();
      },
      deep: true
    }
  },
  mounted() {
    this.setStarInfo();
  },
  computed: {
    avatar: function() {
      if (!this.av) {
        return "";
      }
      return this.av;
    }
  },
  components: {
    SocialBadge,
    Follow
  },
  data: function() {
    return {
      av: "",
      desc: ""
    };
  },
  methods: {
    setStarInfo: function(type) {
      if (type) {
        this.av = this.star[type + "_user"].avatar;
        this.desc = this.star[type + "_user"].description;
      } else {
        if (this.star.twitterUser) {
          this.setStarInfo("twitter");
        } else if (this.star.githubUser) {
          this.setStarInfo("github");
        } else if (this.star.tumblrUser) {
          this.setStarInfo("tumblr");
        } else if (this.star.instagramUser) {
          this.setStarInfo("instagram");
        } else if (this.star.facebookUser) {
          this.setStarInfo("facebook");
        }
      }
    },
    go: function(StarName) {
      this.$router.push({ name: "Star", params: { StarName: StarName } });
    }
  }
};
</script>

<style>
/*
.ui.cards > .card > .image > .avatar-bz,
.ui.card > .image > .avatar-bz {
  width: auto;
  max-width: 100%;
}

.ui.card > .extra.star-icon-bz a:not(.ui):hover,
.ui.cards > .card > .extra.star-icon-bz a:not(.ui):hover {
  color: #999999;
  i.icon.icon-hover-twitter {
    color: #41abe1;
    transition: color 0.3s linear;
  }

  i.icon.icon-hover-github {
    color: rgba(0, 0, 0, 0.8);
    transition: color 0.3s linear;
  }

  i.icon.icon-hover-instagram {
    color: #7e4532;
    transition: color 0.3s linear;
  }

  i.icon.icon-hover-tumblr {
    color: #205081;
    transition: color 0.3s linear;
  }

  i.icon.icon-hover-facebook {
    color: #3b5998;
    transition: color 0.3s linear;
  }
}

.ui.card.card-radius {
  border-radius: 0.06em 0.06em 0.3em 0.3em;
}

.ui.card > .content.delete-border {
  border-top: none;
}

.ui.card > .extra.delete-border {
  border-top: none !important;
}
*/
</style>
