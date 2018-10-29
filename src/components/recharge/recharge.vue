<template>
	<transition name="list">
		<div class="body">
			<div class="header flex">
				<userheader></userheader>
			</div>
			<div class="mg30"></div>
			<div class="goods-warp flex">
				<div class="gw-item flex fw" :class="{'active-gw-item': choseid == item.good_id}" v-for="item in goodslist" @click="choseid = item.good_id">
					<span class="flex xxxx gi-lable">{{item.label}}</span>
					<span class="flex s gi-price mg10">￥{{item.good.price}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import userheader from 'components/userheader/userheader'
	import { goodlist } from 'api/index'
	export default {
		data() {
			return {
				goodslist: [],
				choseid: null
			}
		},
		created() {
			this._initgoods()
		},
		mounted() {
		},
		computed: {
		},
		methods: {
			async _initgoods() {
				const ret = await goodlist()
				if (ret.status == 200 && ret.data.code == 200) {
					this.goodslist =  ret.data.data
					this.choseid = ret.data.data.length ? ret.data.data[0].good_id : null
				}
			}

		},
		components: {
			userheader
		}
	}
</script>
<style scoped>
.header{
	height: 100px;
	background: #27283A;
}
.body{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background: #10111E;
	overflow-y: scroll;
}
.goods-warp{
	flex-wrap: wrap;
	width: 97%;
	height: auto;
	margin-left: 3%;
	justify-content: flex-start;
}
.gw-item{
	height: 80px;
	width: 30%;
	flex-grow: 0;
	flex-shrink: 0;
	margin: 0 2% 15px 0;
	border:  2px solid #424360;
	border-radius: 6px;
}
.gi-lable{
	color: #F3A523;
}
.gi-price{
	color: #8284A0;
}
.active-gw-item{
	background: rgba(66,67,96,1);
}
</style>