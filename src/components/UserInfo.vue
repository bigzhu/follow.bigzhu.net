<template>
<OauthInfo>
  <q-popover>
    <q-list item-separator link>
      <q-item @click.native="$router.push('/UserSet')">
        {{ $t("设置") }}
      </q-item>
      <q-item @click.native="logout">
        {{ $t("退出") }}
      </q-item>
    </q-list>
  </q-popover>
</OauthInfo>
</template>

<script>
import OauthInfo from 'bz-q-lib/src/components/OauthInfo'
export default {
  components: { OauthInfo },
  methods: {
    logout: function () {
      window.location = '/api/Logout'
    }
  }
}
</script>
