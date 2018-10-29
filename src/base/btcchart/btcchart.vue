<template>
  <div>
    <div ref='chartwarp' class="chartwarp flex">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import {PREFIX_URL, WEBSOCKT_URL} from 'api/config'
  const timevalue = 70000
  const INTERVAL = 55000
  export default {
    data() {
      return {
        myChart: null,
        numlist: [],
        first: true,
        nowmax: Date.parse(new Date()) + timevalue,
        nowpoint: [],
        endpoint: []
      }
    },
    created() {
      this.$root.eventHub.$on('wxuser', () => {
        this._setwsuser()
      })
    },
    mounted() {
      const ws = new WebSocket(`wss://${WEBSOCKT_URL}/btc/line`);
      ws.onopen = () => {
        console.log('链接websockt')
        this.$root.eventHub.$on('point', (point) => {
          if (point.nowpoint) {
            this.nowpoint.push(point.nowpoint)
            this.nowpoint = [...new Set(this.nowpoint)]
          } else {
            this.nowpoint.shift()
          }
          if (point.endpoint) {
            this.endpoint.push(point.endpoint)
            this.nowpoint = [...new Set(this.endpoint)]
          } else {
            this.endpoint.shift()
          }
        })
      };
      ws.onmessage = (evt) => {
        // console.log(evt.data)
        let retevt = null
        try {
          retevt = JSON.parse(evt.data)
        } catch(err) {
          console.log(err);
        }
        if (!retevt) {
          return false
        }
        if (this.first) {
          let numlist = []
          retevt.forEach((res) => {
            res.name = res.name.toFixed(2)
            numlist.unshift(res)
          })
          this.numlist = numlist
          this.nowmax = this.numlist[0].value[0] + timevalue
          this.first = null
          this._initChart()
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
        } else {
          let datalist = this.numlist
          retevt.data.name = retevt.data.name.toFixed(2)
          datalist.unshift(retevt.data);
          if (datalist.length > 299) {
            datalist = datalist.slice(0, -60);
            this.nowmax = datalist[0].value[0] + timevalue
          }
          this.numlist = datalist
          let dataOption = {
            data: this.numlist
          }
          if (this.nowpoint.length) {
            let linelist = []
            this.nowpoint.forEach((item) => {
              linelist.push({
                name: item,
                yAxis: item
              })
            })
            Object.assign(dataOption, {
              markLine: {
                silent: true,
                data : linelist,
                lineStyle: {
                  color: 'red',
                  type: 'dashed',
                },
                label: {
                  show: false
                },
              }
            })
          } else {
            Object.assign(dataOption, {
              markLine: {
                silent: true,
                data : [{name: '平均线',type: 'average'}],
                lineStyle: {
                  color: 'rgba(0,0,0,0)',
                  type: 'dashed',
                },
                label: {
                  show: false
                },
              }
            })
          }
          this.myChart.setOption({series: [dataOption]});
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
          this.myChart.dispatchAction({
            type: 'highlight',
            name: this.numlist[0].name,
            seriesIndex: 0,
            dataIndex: 0
          })
          if (this.nowpoint.length) {
            this.nowpoint.forEach((item) => {
              this.myChart.dispatchAction({
                type: 'highlight',
                name: item,
                seriesIndex: 0,
                dataIndex: 0
              })
            })
          }
          if (this.endpoint.length) {
            this.endpoint.forEach((item) => {
              this.myChart.dispatchAction({
                type: 'highlight',
                name: item,
                seriesIndex: 0,
                dataIndex: 0
              })
            })
          }
        }
      };
      ws.onclose = function(){ 
      };
    },
    computed: {
      ...mapGetters([
        'user'
        ])
    },
    methods: {
      _setwsuser() {
        const wsuser = new WebSocket(`wss://${WEBSOCKT_URL}/user?username=${this.user.username}`);
        wsuser.onmessage = (evt) => {
          // console.log(evt.data)
          let retevt = null
          try {
            retevt = JSON.parse(evt.data)
          } catch(err) {
            console.log(err);
          }
          this.$root.eventHub.$emit('result', retevt.data)
        }
      },
      _initChart() {
        this.$refs.chartwarp.style.width = parseInt(document.body.clientWidth) + 'px'
        this.myChart = echarts.init(this.$refs.chart);
        const that = this
        let option = {
          xAxis: {
            type: 'time',
            interval: INTERVAL,
            max: function(value) {
              return that.nowmax;
            },
            min: function(value) {
              return value.min;
            },
            splitLine: {
              show: true,
              lineStyle:{
                type: 'dashed',
                color: 'rgba(255,255,255,.2)'
              }
            },
            align: 'left',
            axisTick: {
              show: false
            },
            silent: true,
            axisLabel: {
              color: 'rgba(255,255,255,.75)',
              fontSize: 11
            },
            axisLine:{
              lineStyle:{
                color: 'rgba(255,255,255,.2)',
                type: 'dashed' 
              }
            },
          },
          yAxis: {
            type: 'value',
            max: function(value) {
              return parseInt(value.max + 5);
            },
            min: function(value) {
              return parseInt(value.min - 5);
            },
            silent: true,
            splitLine: {
              show: true,
              lineStyle:{
                type: 'dashed',
                color: 'rgba(255,255,255,.2)'
              }
            },
            axisPointer: {
              handle: {
                show: true,
                margin: 0,
                size: 8,
                icon: 'image://https://cdn.xingkwh.com/cil.png',
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,.75)',
              fontSize: 10
            },
            axisLine:{
              lineStyle:{
                color: 'rgba(255,255,255,.2)',
                type: 'dashed' 
              }
            },
          },
          tooltip: {
            trigger: 'axis',
            // formatter: function(params){
            //   console.log(params)
            //   params = params[0];
            //   const date = new Date(params.name);
            //   const h = date.getHours()
            //   const m = date.getMinutes()
            //   const s = date.getSeconds()
            //   return h + m + s
            // },
            triggerOn: 'none',
            renderMode: 'html',
            showContent: true,
            enterable: false,
            axisPointer: {
              animation: true,
              snap: true,
              type: 'line',
              axis: 'y',
              label: {
                show: false
              },
              lineStyle: {
                color: 'rgba(255,255,255,.9)',
                type: 'dashed'
              }
            },
            textStyle: {
              fontSize: 11,
            },
            position: (point, params, dom, rect, size) => {
              // let child = document.createElement('div');
              // child.setAttribute('class', 'tooltip-child');
              // child.setAttribute('data-num', params[0].data.name);
              // dom.setAttribute('class', 'tooltip');
              // dom.appendChild(child);
              return [point[0] - 20, point[1] - 24];
            },
            formatter: '{b0}',
            padding: 0,
            backgroundColor: 'rgba(0,0,0,0)'
          },
          series: [{
            data: that.numlist,
            type: 'line',
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 10,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",  // 会设置点和线的颜色，所以需要下面定制 line
                borderColor: "red"  // 点边线的颜色
              }
            },
            lineStyle: {
              color: 'rgba(255,255,255,.8)',
              width: 1
            },
            smooth: false
          }]
        };
        this.myChart.setOption(option);
      }
    },
    components: {}
  }

</script>
<style type="text/css" scoped>
.chartwarp{
  width: 100%;
  margin: -40px 0 -20px 10px;
  position: relative;
  overflow: hidden;
}
.chartwarp:after{
  display: block;
  content: '';
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.chart{
 width: 100%;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 z-index: 999;
}
</style>
