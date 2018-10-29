<template>
  <footer class="flex">
    <router-link tag='div' :to='item.path' class="footer-item flex sss fw" v-for="item in footerconfig" :key='path'>
      <i class="iconfont x" :class="item.icon" ></i>
      <span class="flex mg5 ssss">{{item.name}}</span>
    </router-link>
  </footer>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      footerconfig:[{
        name: '首頁',
        icon: 'icon-xingqing',
        path: '/index'
      },{
        name: '傭金',
        icon: 'icon-yongjin',
        path: '/commision'
      },{
        name: '我的',
        icon: 'icon-gerenzhongxin',
        path: '/user'
      }]
    }
  },
  computed: {

  },
  created() {
  }
}

</script>
<style type="text/css" scoped>
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 55px;
  border-top: 1px solid rgba(255,255,255,.2);
  z-index: 999;
  background: #27283A;
}
.footer-item{
  height: 100%;
  flex-grow: 1;
}
.router-link-active{
  color: #ffcd32;
  background: #10111E;
}
</style>
