<template>
	<transition name="list">
		<div class="body">
			<div class="transcat-header flex">
				<span class="th-item flex">开仓时间</span>
				<span class="th-item flex">方向</span>
				<span class="th-item flex">开仓指数</span>
				<span class="th-item flex">最终指数</span>
				<span class="th-item flex">元</span>
				<span class="th-item flex">结果</span>
			</div>
			<div style="margin-top: 50px"></div>
			<betterscroll class="wrapper" :data="list" @pulldown="_pulldown" @scrollToEnd="_scrollToEnd" ref='wrapper'>
				<div class="scroll">
					<div class="transcat-item flex" v-for="item in list" :class="{'active-tran': item.result == 1}">
						<div class="tran-line flex">{{item.createA}}</div>
						<div class="tran-line flex"><span class="flex">BTC</span><span class="color">{{item.direction == 1 ? '看涨' : '看跌'}}</span></div>
						<div class="tran-line flex">{{item.start_index}}</div>
						<div class="tran-line flex color">{{item.final_index}}</div>
						<div class="tran-line flex">{{item.score}}</div>
						<div class="tran-line flex color">{{item.result == 1 ? '赚' : '亏'}}</div>
					</div>
				</div>
			</betterscroll>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import { transactionlist } from 'api/index'
	import { mapGetters } from 'vuex'
	import { timeformat } from 'common/js/util'
	import betterscroll from 'base/better-scroll/better-scroll'
	export default {
		data() {
			return {
				page: 0,
				num: 10,
				list: [],
				totle: 0
			}
		},
		created() {
			// this._transactionlist()
		},
		mounted() {
			this._inint()
			this._transactionlist()
		},
		computed: {
			...mapGetters([
				'user'
				])
		},
		methods: {
			async _transactionlist() {
				const ret = await transactionlist(this.user.username, this.num, this.page)
				if(ret.status == 200 && ret.data.code == 200) {
					if (ret.data.data.count) {
						this.list = [...this.list, ...this._formatdata(ret.data.data.ret)]
						this.totle = ret.data.data.count
					}
				}
			},
			_formatdata(list) {
				if(list.length) {
					list.forEach((item) => {
						item.createA = timeformat(item.create)
					})
					return list
				} else {
					return []
				}
			},
			_inint() {
				this.$refs.wrapper._initScroll()
			},
			_pulldown() {
				console.log('下拉刷新')
				this.num = 10
				this.page = 0
				this.list = []
				this._transactionlist()
			},
			_scrollToEnd(){
				console.log(this.list.length, this.totle)
				if (this.list.length < this.totle) {
					console.log('触底加载')
					this.page += 1
					this._transactionlist()
				}
			}
		},
		components: {
			betterscroll
		}
	}
</script>
<style scoped>
.body{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99998;
	background: #10111E;
}
.transcat-header{
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
	right: 0;
	height: 50px;
	background: #27283A;
}
.th-item{
	color: #727589;
	font-size: 13px;
	flex-grow: 1;
	border-right: 1px solid #424558;
}
.transcat-item{
	height: 80px;
	width: 100%;
	border-bottom: 1px solid #27283A;
	font-size: 10px;
	color: #727589;
	justify-content: flex-start;
}
.tran-line{
	flex-wrap: wrap;
	flex-grow: 1;
	height: 100%;
	text-align: center;
	line-height: 20px;
}
.color{
	color: #FF3535;
}
.active-tran .color{
	color: #58C96B;
}
.wrapper {
	width: 100%;
	position: absolute;
	top: 50px;
	bottom: 0;
}
.scroll{
	width: 100%;
	height: auto;
}
</style>