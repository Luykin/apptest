<template>
  <div id="app" ref='app'>
   <!--    <m-header></m-header> -->
   <keep-alive>
    <router-view ref='body'></router-view>
  </keep-alive>
  <foot></foot>
  <music></music>
  <centerTips ref='centerTips'>
    <div class="tips-class flex ellipsis">{{centerTips}}</div>
  </centerTips>
</div>
</template>
<script>
// import MHeader from 'components/header/header'
import foot from 'components/footer/footer'
import centerTips from 'base/centerTips/centerTips'
import music from 'base/music/music'
export default {
  data() {
    return {
      centerTips: ''
    }
  },
  created() {
    this.$root.eventHub.$on('titps', (titps) => {
     this.centerTips = titps
     this.$refs.centerTips._open()
   })
  },
  mounted() {
  },
  methods: {
  },
  components: {
    foot,
    music,
    centerTips
  }
}

</script>
<style>
@import url(assets/icon/iconfont.css);
@import url(common/css/reset.css);
@import url(common/css/fontsize.css);
</style>
<style scoped>
.tips-class{
  width: auto;
  height: 40px;
  padding: 0 20px;
  background: rgba(0,0,0,.65);
  color: #fff;
  font-size: 15px;
  opacity: .9;
  border-radius: 10px;
}
</style>
