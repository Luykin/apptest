<template>
  <transition name="list">
    <div>
     <div class="user-header mg10">
       <div class="user-header-inner-warp flex">
        <div class="flex js uhiw-top">
          <userheader :fontcolor="'#353535'"></userheader>
        </div>
        <div class="flex js uhiw-bottom s">
          <router-link tag='div' to='./withdraw' class="uhiw-btn flex">提現</router-link>
          <router-link tag='div' to='./recharge' class="uhiw-btn flex">充值</router-link>
        </div>
      </div> 
    </div>
    <div class="order-btn-list-warp flex mg10">
      <router-link tag='div' to='./recharge-record' class="oblw-item flex">
        <i class="iconfont icon-chongzhijilu maxmaxmax"></i>
        <span class="flex oblw-title s mg10">充值记录</span>
      </router-link>
      <router-link tag='div' to='./recharge-record' class="oblw-item flex">
        <i class="iconfont icon-tixianjilu maxmax"></i>
        <span class="flex oblw-title s" style="margin-top: 15px;">提现记录</span>
      </router-link>
      <router-link tag='div' to='./transaction-record' class="oblw-item flex">
        <i class="iconfont icon-jiaoyijilu maxmaxmaxs" style="transform: translate(0, -5px);"></i>
        <span class="flex oblw-title s" style="margin-top: 5px;">交易记录</span>
      </router-link>
    </div>
    <div class="flex mg10"></div>
    <div class="user-list-item flex">
      <i class="iconfont icon-jieshao uli-icon xx"></i>
      <span class="uli-title flex">平台介绍</span>
      <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
    </div>
    <div class="user-list-item flex">
      <i class="iconfont icon-jieshao uli-icon xx"></i>
      <span class="uli-title flex">平台介绍</span>
      <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
    </div>
    <div class="user-list-item flex">
      <i class="iconfont icon-jieshao uli-icon xx"></i>
      <span class="uli-title flex">平台介绍</span>
      <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
    </div>
    <div class="user-list-item flex">
      <i class="iconfont icon-jieshao uli-icon xx"></i>
      <span class="uli-title flex">平台介绍</span>
      <img src="https://cdn.xingkwh.com/righticon.png" class="icon-img">
    </div>
    <div class="footer-none"></div>
  </div>
</transition>
</template>
<script type="text/javascript">
  // import { mapGetters } from 'vuex'
  import userheader from 'components/userheader/userheader'
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
    },
    methods: {
    },
    components: {
      userheader
    }
  }

</script>
<style type="text/css" scoped>
.user-header{
  background: url('https://cdn.xingkwh.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83bg@3x.png') no-repeat;
  background-size: 100% 100%;
  width: 92%;
  padding-top: 45%;
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
.order-btn-list-warp{
  width: 95%;
  height: 120px;
  overflow: hidden;
  padding-left: 3%;
}
.oblw-item{
  height: 100%;
  margin-right: 3.3%;
  flex-grow: 1;
  background: #27283A;
  border-radius: 5px;
  flex-wrap: wrap;
}
.nw-item{
  height: 25px;
  color: #353535;
}
.uhiw-top{
  height: 55%;
}
.uhiw-bottom{
  height: 45%;
}
.uhiw-btn{
  width: 42%;
  margin-left: 5%;
  flex-grow: 0;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #99691A;
  color: #99691A;
  font-weight: 600;
}
.oblw-title{
  color: #8284A0;
}
.user-list-item{
  height: 54px;
}
.uli-icon{
  margin: 0 20px;
  flex-shrink: 0;
  color: #F3A523;
}
.uli-title{
  height: 100%;
  flex-grow: 1;
  justify-content: flex-start;
}
.icon-img{
  width: 20px;
  height: auto;
  margin: 0 14px;
}
</style>
