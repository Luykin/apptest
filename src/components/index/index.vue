<template>
  <transition name="list">
    <div>
      <div class="header flex afterh hp2">
        <img :src="user.avatar" class="iconlll avater">
        <div class="flex namewarp fw ss">
          <span class="flex js nw-item" style="font-weight: 900;">{{this.user.nickname || ''}}</span>
          <p class="flex js nw-item">余额：<span class="score">{{this.user.score || 0}}</span></p>
        </div>
        <img src="https://cdn.xingkwh.com/bgmuisck.png" class="iconss icon" v-show="play" @click="play = null; $root.eventHub.$emit('audio', null)">
        <img src="https://cdn.xingkwh.com/bgmuiscg.png" class="iconss icon" v-show="!play" @click="play = true; $root.eventHub.$emit('audio', true)">
        <router-link tag='div' to='./withdraw' class="btni flex btni1">提現</router-link>
        <router-link tag='div' to='./recharge' class="btni flex btni2">充值</router-link>
      </div>
      <div class="header flex afterh hp1">
        我是轮播
      </div>
      <div class="flex now-peple">
        <div class="flex np-left">
          <span class="flex ssss" style="color: #999; margin-bottom: 5px; transform: scale(.9, .9);">現時線上</span>
          <span class="flex ll">{{peple}}人</span>
        </div>
        <div class="flex np-right">
          <div class="flex npr-left red">
            <span class="flex ssss" style="margin-bottom: 5px; transform: scale(.8, .8);">
              買涨
            </span>
            <span class="flex s">
              {{scale}}%
            </span>
          </div>
          <div class="flex npr-mid">
            <div class="zhang-line" :style="'width:'+ scale +'%'"></div>
          </div>
          <div class="flex npr-left gren">
            <span class="flex ssss" style="margin-bottom: 5px; transform: scale(.8, .8);">
              買跌
            </span>
            <span class="flex s">
              {{100 - scale}}%
            </span>
          </div>
        </div>
      </div>
      <chart></chart>
      <div class="header flex afterh hp15 ss">
        <span class="hfah-title">交易金額</span>
        <div class="btni flex nonei" :class="{'activei': nowtrade == item}" v-for="item in tradelist" @click="_clicktrade(item)">{{item}}</div>
      </div>
      <div class="header flex afterh hp1 ss">
        <p class="hfah-title">交易週期: <span :class="{'activetime': timer < 30}">{{timer}}s</span></p>
        <p class="hfah-title double">预计收益: <span style="text-indent: 10px; color: #FFB800;">40.00BTC幣</span></p>
      </div>
      <div class="btn-buy-warp flex">
        <div class="btn-buy flex red-border" @click="_transaction(1)">買涨<img src="https://cdn.xingkwh.com/%E4%B9%B0%E6%B6%A8icon@3x.png" class="iconauto"></div>
        <div class="btn-buy flex grn-border" @click="_transaction(2)">買跌<img src="https://cdn.xingkwh.com/%E4%B9%B0%E8%B7%8Cicon@3x.png" class="iconauto"></div>
      </div>
      <div class="footer-none"></div>
    </div>
  </transition>
</template>
<script type="text/javascript">
  import chart from 'base/btcchart/btcchart'
  import { login, transaction, transactionlist } from 'api/index'
  import { mapMutations, mapGetters } from 'vuex'
  import Fingerprint2 from 'fingerprintjs2'
  export default {
    data() {
      return {
        tradelist: [20, 40, 60, 80],
        nowtrade: 20,
        timer: 30,
        timerid: null,
        play: true,
        peple: 6000 + Math.round(Math.random() * 3000),
        scale: 38 + Math.round(Math.random() * 29)
      }
    },
    created() {
      this._initevetbut()
      this._login()
      this._initstarttimer()
    },
    mounted() {
    },
    computed: {
      ...mapGetters([
        'user'
        ])
    },
    methods: {
      _initstarttimer() {
        const time = 2000 + Math.round(Math.random() * 6000)
        let timer = setTimeout(() => {
          const push = Math.random() > 0.5 ? 1 : -1
          this.peple = parseInt(this.peple + push*Math.random()*20)
          this.scale = parseInt(this.scale + push*Math.random()*6)
          this._initstarttimer()
          clearTimeout(timer)
        }, time)
      },
      _initevetbut() {
        this.$root.eventHub.$on('result', (data) => {
          if (data.user) {
            this.setUser(data.user)
          }
          this.$root.eventHub.$emit('titps', data.transactions.result == 1 ? `您赚了${data.transactions.score}` : `您亏了${data.transactions.score}`)
          let time = setTimeout(() => {
            this.$root.eventHub.$emit('point', {
              nowpoint: null,
              endpoint: null
            })
            clearTimeout(time)
          }, 1000)
        })
      },
      _login() {
        try {
          let options = {}
          Fingerprint2.getV18(options, async (result, components) =>{
            const ret = await login(result.slice(0, 5), 'http://p7o5mvmp4.bkt.clouddn.com/.favicon.png', result)
            if (ret.status == 200 && ret.data.code == 200) {
              this.setUser(ret.data.data)
              this._transactionlist()
              this.$root.eventHub.$emit('wxuser')
            }
          })
        } catch(err){
          console.log(err)
        }
      },
      async _transactionlist() {
        try{
          const ret = await transactionlist(this.user.username)
          if (ret.status == 200 && ret.data.code == 200) {
            if(ret.status == 200 && ret.data.code == 200) {
              const list = ret.data.data
              for(let i = 0; i < list.length; i++){
                if(list[i].yes){
                  this.$root.eventHub.$emit('point', {
                    nowpoint: list[i].start_index,
                    endpoint: list[i].final_index
                  })
                  this._timerdo(30 - parseInt((new Date().valueOf() - list[i].create)/1000))
                } else{
                  break;
                }
              }
            }
          }
        } catch(err){
          console.log(err)
        }
      },
      _clicktrade(item) {
        this.nowtrade = item
      },
      _timerdo(nowtime) {
        if(this.timerid || nowtime){
          clearInterval(this.timerid)
          this.timer = nowtime || 30
          this.timerid = null
        }
        this.timerid = setInterval(() => {
          if (this.timer <= 1) {
            this.timer = 30
            clearInterval(this.timerid)
            this.timerid = null
            return false
          }
          this.timer -= 1
        }, 1000)
      },
      async _transaction(direction){
        if (!this.user || !this.nowtrade) {
          this.$root.eventHub.$emit('titps', '登录中...')
          return false
        }
        if (this.user.score < this.nowtrade) {
          this.$root.eventHub.$emit('titps', '您的余额不足')
          return false
        }
        const ret = await transaction(direction, this.user.username, this.nowtrade)
        if (ret.status == 200 && ret.data.code == 200) {
          this.setUser(ret.data.data.user);
          this.$root.eventHub.$emit('point', {
            nowpoint: ret.data.data.start_index,
            endpoint: null 
          });
          this._timerdo()
          this.$root.eventHub.$emit('titps', '购买成功')
        } else {
          this.$root.eventHub.$emit('titps', ret.data.code)
        }
      },
      ...mapMutations({
        setUser: 'SET_USER'
      })
    },
    components: {
      chart
    }
  }

</script>
<style type="text/css" scoped>
.hp2:after{
  padding-top: 17%;
}
.hp1:after{
  padding-top: 10%;
}
.hp15:after{
  padding-top: 15%;
}
.header{
  background: #27283A;
  border-bottom: #10111E;
  overflow: hidden;
}
.avater{
  flex-shrink: 0;
  margin: 0px 2.5%;
  border-radius: 100%;
}
.namewarp{
  width: 30%;
  flex-shrink: 0;
  overflow: hidden;
}
.nw-item{
  height: 25px;
}
.icon{
  flex-shrink: 0;
  margin: 0 10px;
}
.btni{
  max-width: 25%;
  box-sizing: border-box;
  flex-grow: 1;
  height: 36px;
  margin-right: 10px;
  border-radius: 8px;
  overflow: hidden;
}
.btni1{
  border: 1px solid #FFB800;
  color: #FFB800;
}
.btni2{
  background: #FFB800;
  color: #27283A;
}
.hfah-title{
  flex-shrink: 0;
  flex-wrap: wrap;
  flex-grow: 1;
  margin: 0 20px;
}
.double{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 60%;
  margin: 0;
  border-left: 1px solid #bdbdbd;
}
.nonei{
  background: #424360;
  color: #fff;
}
.activei{
  background: #FFB800;
  color: #27283A;
}
.btn-buy-warp{
  height: 70px;
  justify-content: flex-start;
}
.btn-buy{
  width: 42%;
  flex-grow: 0;
  margin-left: 5%;
  border-radius: 8px; 
  height: 40px;
}
.red-border{
  border: 1px solid #FF3535;
  color: #FF3535;
}
.grn-border{
  border: 1px solid #07FF00;
  color: #07FF00;
}
.iconauto{
  width: 20px;
  height: auto;
  margin: 0 5px;
}
.activetime{
  color: red;
  font-size: 15px;
}
.score{
  color: #FFB723;
}
.now-peple{
  height: 50px;
}
.np-left{
  width: 26%;
  height: 70%;
  border-right: 1px solid #26282C;
  flex-wrap: wrap;
}
.np-right{
  width: 74%;
  height: 100%;
}
.npr-left{
  height: 100%;
  width: 25%;
  flex-wrap: wrap;
}
.npr-mid{
  flex-grow: 1;
  height: 14px;
  background: #3FDD67;
  border-radius: 4px;
  justify-content: flex-start;
  overflow: hidden;
}
.red{
  color: #FF3535;
}
.gren{
  color: #3FDD67;
}
.zhang-line{
  width: 0;
  height: 100%;
  background: #FF3535;
}
</style>
