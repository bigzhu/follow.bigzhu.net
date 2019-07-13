<template>
  <svg viewBox="51 -272 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <desc>Created with Sketch.</desc>
    <defs>
      <rect id="path-1" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
      <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
        <use xlink:href="#path-1"></use>
      </mask>
      <linearGradient x1="72.5086929%" y1="34.3563028%" x2="26.5472291%" y2="92.8578943%" id="linearGradient-3">
        <stop stop-color="#228AD7" offset="0%"></stop>
        <stop stop-color="#C8E3F5" offset="100%"></stop>
      </linearGradient>
      <rect id="path-4" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
      <mask id="mask-5" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
        <use xlink:href="#path-4"></use>
      </mask>
    </defs>
    <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
      <use id="Rectangle" stroke="#979797" mask="url(#mask-2)" stroke-width="2" xlink:href="#path-1"></use>
      <path d="" id="Path-2" stroke="#979797"></path>
      <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" fill="url(#linearGradient-3)" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729"></polygon>
    </g>
    <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
      <use id="Rectangle" stroke="#767676" mask="url(#mask-5)" stroke-width="2" xlink:href="#path-4"></use>
      <path d="" id="Path-2" stroke="#979797"></path>
      <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" :fill="[light ? '#57ADE3' : ankiColor]" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729">
      </polygon>
    </g>
  </svg>
</template>

<script>
  export default {
    props: ['light', 'ankiColor'],
    components: {},
    computed: {},
    data: function () {
      return {}
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>

</style>
