<template>
	<transition name="list">
		<div class="body">
			<div class="header flex">
				<userheader></userheader>
			</div>
			<div class="mg30"></div>
			<div class="flex ll recharge-title">请输入提现金额</div>
			<div class="flex input-warp">
				<img src="https://cdn.xingkwh.com/%E6%8F%90%E7%8E%B0%E4%BA%BA%E5%90%8D%E5%B8%81icon@3x.png" class="recharge-img">
			</div>
			<div class="flex btn-buy xxxx">提现</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
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
.recharge-img{
	width: 40px;
	height: auto;
}
.recharge-title{
	width: 90%;
	height: 40px;
	margin: 0 auto;
	justify-content: flex-start;
}
.input-warp{
	height: 70px;
	width: 90%;
	margin: 10px auto;
	justify-content: flex-start;
	border-bottom: 2px solid #8284A0;
}
.btn-buy{
	width: 90%;
	margin: 20px auto;
	height: 50px;
	background: #F3A523;
	color: #10111E;
	border-radius: 10px;
}
</style>