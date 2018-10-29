<template>
	<div class="music">
		<audio src="http://113.207.48.20/amobile.music.tc.qq.com/C400003bqDZy0otHox.m4a?guid=6488390561&vkey=0EC546B0F9EFB45573A357E589D0CDB5248537AFD23CF7F068E00A73508505D647BC28D68F2022E7CB436A06E0DFAF6D41017B37BC0A0D99&uin=0&fromtag=66" ref="audio"></audio>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {

		},
		mounted() {
			this.$refs.audio.loop=true;
			this.$refs.audio.autoplay=true;
			this.$root.eventHub.$on('audio', (data) => {
				if(data) {
					this._play()
				}else {
					this._pause()
				}
			})
    },
		methods: {
			_play(){
				this.$refs.audio.play()
			},
			_pause() {
				this.$refs.audio.pause()
			}
		}
	}
</script>
<style scoped>
.music{
	position: fixed;
	z-index: -99;
	opacity: 0;
}
</style>