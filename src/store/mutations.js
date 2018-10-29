import * as types from './mutation-types'
import CryptoJS from 'crypto-js'
import { encryptedStorage } from 'common/js/util'
const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
    encryptedStorage('token', token)
  },
  [types.SET_APP](state, app) {
    state.app = app
    encryptedStorage('app', app)
  },
  [types.SET_USER](state, user) {
    state.user = user
    encryptedStorage('user', user)
  },
  [types.SET_TOKENTIME](state, tokenTime) {
    state.tokenTime = tokenTime
    encryptedStorage('tokenTime', tokenTime)
  },
  [types.SET_SCORERATE](state, scorerate) {
    state.scorerate = scorerate
    encryptedStorage('scorerate', scorerate)
  }
}

export default mutations
