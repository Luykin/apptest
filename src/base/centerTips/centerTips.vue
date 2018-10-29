<template>
  <transition name="tips">
    <div class="titpsBody flex" @click="_close" v-show="open">
      <slot></slot>
    </div>
  </transition>
</template>
<script type="text/javascript">
export default {
  props: {
    showTips: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    _close() {
      // this.$emit('close')
      this.open = false
    },
    _open() {
      this.open = true
      if (this.time) {
        clearTimeout(this.time)
      }
      this.time = setTimeout(() => {
        this.open = false
      }, 1200)
    }
  }
}

</script>
<style scoped>
.tips-enter-active,
.tips-leave-active {
  transition: all .3s;
  /*transform: translate3d(0, 0, 0);*/
  opacity: 1;
}

.tips-enter,
.tips-leave-to {
  transition: all .3s;
  /*transform: translate3d(0, -100%, 0);*/
  opacity: 0;
}

.titpsBody {
  height: auto;
  width: auto;
  min-height: 40px;
  min-width: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
/*  background: #444;*/
  opacity: .9;
}

</style>
