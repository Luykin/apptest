export const normalMixin = {
  data() {
    return {
      centerTips: false
    }
  },
  methods: {
    _verifyPhone(phone) {
      if (!phone) {
        this.$parent._open('请填手机号哦')
        return false
      }
      let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}|(19[0-9]{1})))+\d{8})$/
      if (!myreg.test(phone)) {
        this.$parent._open('请正确填写手机号哦')
        return false
      }
      return true
    },
    _verifyOldPassword(password) {
      if (!password) {
        this.$parent._open('请填写旧密码哦')
        return false
      }
      return true
    },
    _verifyPassword(password) {
      if (!password) {
        this.$parent._open('请填写密码哦')
        return false
      }
      if (password.length < 6) {
        this.$parent._open('密码必须大于等于6位')
        return false
      }
      return true
    },
    _verifyRePassword(password, rePassword) {
      if (password !== rePassword) {
        this.$parent._open('两次密码不一致')
        return false
      }
      return true
    },
    _verifyCode(code) {
      if (!code) {
        this.$parent._open('请填写验证码')
        return false
      }
      return true
    }
  }
}
