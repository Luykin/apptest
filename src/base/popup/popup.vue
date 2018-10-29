<template>
  <div class="popup" :class="{popupIn:popupIn, popupOut:popupOut, protocol:protocol}" v-if="show" ref='pop'>
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    protocol: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      popupIn: false,
      popupOut: false,
      show: false
    }
  },
  methods: {
    _showPopup() {
      this.show = true
      this.popupIn = true
      this.popupOut = false
    },
    _hiddenPopup() {
      this.popupIn = false
      this.popupOut = true
      let time = setTimeout(() => {
        this.show = false
        clearTimeout(time)
      }, 500)
    }
  }
}

</script>
<style type="text/css" scoped>
.popup {
  position: fixed;
  left: 50%;
  top: -50%;
  transform: translate3d(-50%, -50%, 0);
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  overflow: hidden;
  z-index: -999;
  opacity: 0;
  border-radius: 10px;
}

.popupIn {
  animation: popupIn .5s ease-in 1 forwards;
}

.popupOut {
  animation: popupOut .5s ease-out 1 forwards;
}

@keyframes popupIn {
  0% {
    opacity: 1;
    z-index: 99999;
    top: -50%;
    transform: translate3d(-50%, -50%, 0);
  }
  100% {
    opacity: 1;
    z-index: 99999;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}

@keyframes popupOut {
  0% {
    opacity: 1;
    z-index: 99999;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  100% {
    opacity: 0;
    z-index: -999;
    top: -50%;
    transform: translate3d(-50%, -50%, 0);
  }
}

</style>
