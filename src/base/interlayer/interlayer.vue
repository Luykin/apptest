<template>
  <div class="layer" :class="{layerIn:layerIn, layerOut:layerOut}" @click.stop.capture="_close(e)" ref='layer'>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      layerIn: false,
      layerOut: false
    }
  },
  methods: {
    _showLayer() {
      this.layerIn = true
      this.layerOut = false
      document.documentElement.style.overflowY = 'hidden'
    },
    _hiddenLayer() {
      this.layerIn = false
      this.layerOut = true
      document.documentElement.style.overflowY = 'auto'
    },
    _setZIndex(z) {
      this.$refs.layer.style.zIndex = z
    },
    _close(e) {
      if (e) {
        e.stopPropagation()
      }
      this.$emit('close')
    }
  }
}

</script>
<style type="text/css" scoped>
.layer {
  position: fixed;
  z-index: 1500;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: 0;
  display: none;
}

.layerIn {
  display: block;
  animation: layerIn .25s ease-in 1 forwards;
}

.layerOut {
  animation: layerOut .25s ease 1 forwards;
}

@keyframes layerIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: .5;
  }
}

@keyframes layerOut {
  0% {
    opacity: .5;
  }
  100% {
    display: none;
    z-index: -1;
    opacity: 0;
  }
}

</style>
