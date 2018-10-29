import { getsubsite } from 'api/index'
import { SUCCESS_CODE } from 'api/config'
import punycode from 'punycode'

export const Judge = {
  created() {
    if (!this.$root.judge || this.judgeMust) {
      // console.log('__发起请求__')
      this._judge()
    }
  },
  methods: {
    _judge() {
      // console.log(window.location.href)
      const start = window.location.href.indexOf('://')
      const end = window.location.href.indexOf('.xkfans')
      const QZ = window.location.href.slice(start + 3, end)
      if (window.location.href.indexOf('.xkfans.com') > -1 && QZ != 'dev' &&  QZ != 'www') {
        let start = window.location.href.indexOf('://')
        let end = window.location.href.indexOf('.xkfans.com')
        let domain = window.location.href.slice(start + 3, end)
        // punycode.toUnicode('xn--44qr78f77h.xkfans.com')
        domain = punycode.toUnicode(domain + '.xkfans.com')
        const that = this
        getsubsite(domain).then((res) => {
          if (res.data.err_code === SUCCESS_CODE) {
            if (res.data.data) {
              document.title = res.data.data.site_name + res.data.data.title_suffix
              this.$root.eventHub.$emit('logo', res.data.data.icon)
              this.$root.eventHub.$emit('footername', res.data.data.contact)
              this.$root.eventHub.$emit('footeremail', res.data.data.email)
              this.$root.eventHub.$emit('announcement', res.data.data.announcement)
              this.Gdomain = domain
              this.$root.judge = true
              if (this.judgeMust) {
                this._getAppInfo(this)
              }
            }
          } else {
            if (res.data.err_code === 404) {
              window.location = 'http://xkfans.com'
            }
          }
        })
      } else {
        this.$root.judge = true
        if (this.judgeMust) {
          this._getAppInfo(this)
        }
      }
    },
  }
}
