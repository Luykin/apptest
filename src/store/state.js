import {loadSearch} from 'common/js/cache'

const state = {
  user: loadSearch('user'),
  app: loadSearch('app'),
  token: loadSearch('token'),
  tokenTime: loadSearch('tokenTime'),
  scorerate: loadSearch('scorerate')
}
export default state
