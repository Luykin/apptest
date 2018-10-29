<template>
	<transition name="list">
		<div class="body">
			<div class="record-header flex">
				<div class="flex rh-item" :class="{'ative-record':  ativerecord == 1}" @click="_choseitem(1)">
					<span class="flex">充值记录</span>
				</div>
				<div class="flex rh-item" :class="{'ative-record':  ativerecord == 2}" @click="_choseitem(2)">
					<span class="flex">提现记录</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import { withdrawlist, orders } from 'api/index'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				ativerecord: 1,
				page: 0,
				num: 10
			}
		},
		created() {
			if (this.ativerecord == 1) {
				this._orders()
			}
		},
		mounted() {
		},
		computed: {
			...mapGetters([
				'user'
				])
		},
		methods: {
			_choseitem(num){
				this.ativerecord = num
			},
			async _orders() {
				const ret = await orders(this.user.username, this.num, this.page)
				console.log(ret)
			}
		},
		components: {
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
	overflow-y: scroll;
}
.record-header{
	width: 100%;
	height: 60px;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 99999;
	background: #27283A;
}
.rh-item{
	height: 100%;
	flex-grow: 1;
	color: #727589;
}
.rh-item span{
	box-sizing: border-box;
	width: 25%;
	height: 100%;
	white-space: nowrap;
}
.ative-record span{
	color: #F3A523;
	border-bottom: 2px solid #F3A523;
}
</style>