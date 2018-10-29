<template>
  <transition name="list">
    <div>
     <div class="user-header mg10">
       <div class="user-header-inner-warp flex">
        <div class="flex js uhiw-top">
          <span class="flex s" style="margin-bottom: 10px">總傭金收益</span>
          <span class="flex maxiiii">￥{{this.user.score.toFixed(2) || 0}}</span>
        </div>
        <div class="flex js uhiw-bottom s">
          <div class="flex uhiwb-item ell">
            <i class="icon-erweima iconfont xx"></i>
            生成推廣二維碼海報
          </div>
          <div class="flex uhiwb-item ell">
            <i class="icon-mingxi iconfont maxi"></i>
            我的傭金收益明細
          </div>
        </div>
      </div>
    </div>
    <div class="flex mg20"></div>
    <div class="flex commision-item">
      <img src="https://cdn.xingkwh.com/%E4%BB%8A%E6%97%A5%E6%94%B6%E7%9B%8Aicon@3x.png" class="iconlll">
      <span class="flex s bc-title">今日收益</span>
      <div class="flex ci-num-warp-list">
        <span class="flex cnwl-span ell" style="color: #F5A623">+20.00BTC幣</span>
        <span class="flex cnwl-span">+12人</span>
      </div>
      <div class="flex btn-commision ori">推广</div>
    </div>
    <div class="flex commision-item">
      <img src="https://cdn.xingkwh.com/%E6%88%91%E7%9A%84%E5%9B%A2%E9%98%9Ficon@3x.png" class="iconlll">
      <span class="flex s bc-title">我的團隊</span>
      <div class="flex ci-num-warp-list">
        <span class="flex cnwl-span ell" style="color: #8D99FF">+20.00BTC幣</span>
        <span class="flex cnwl-span">+12人</span>
      </div>
      <div class="flex btn-commision lan">查看</div>
    </div>
    <div class="footer-none"></div>
  </div>
</transition>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'user'
        ])
    },
    methods: {
    },
    components: {
    }
  }

</script>
<style type="text/css" scoped>
.user-header{
  background: url('https://cdn.xingkwh.com/%E4%BD%A3%E9%87%91bg@3x.png') no-repeat;
  background-size: 100% 100%;
  width: 92%;
  padding-top: 40%;
  border-radius: 8px;
  position: relative;
}
.user-header-inner-warp{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: flex-start;
  flex-wrap: wrap;
}
.uhiw-top{
  height: 56%;
  flex-wrap: wrap;
}
.uhiw-bottom{
  height: 44%;
}
.uhiwb-item{
  height: 30%;
  color: #FFC4C4;
}
.uhiwb-item:nth-child(1){
  border-right: 1px solid #FFC4C4;
}
.uhiwb-item .iconfont{
  margin: 0 5px;
  transform: translate(0, 5%);
}
.commision-item{
  height: 94px;
  background: #27283A;
  margin: 4px 0;
}
.btn-commision{
  width: 70px;
  height: 30px;
  border-radius: 5px;
  margin: 0 10px;
  flex-shrink: 0;
}
.ori{
  background:rgba(255,128,0,1);
}
.lan{
  background: linear-gradient(153deg,rgba(130,165,255,1) 0%,rgba(77,81,255,1) 100%);
}
.bc-title{
  width: 100px;
  color: #f7f7f7;
  white-space: nowrap;
}
.commision-item .iconlll{
  margin: 0 4%;
  flex-shrink: 0;
}
.ci-num-warp-list{
  height: 100%;
  margin: 0px 4%;
  flex-wrap: wrap;
}
.cnwl-span{
  justify-content: flex-start;
  height: 20px;
}
</style>
