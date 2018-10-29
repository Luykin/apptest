import { decryptByDES } from 'common/js/util'

export function loadSearch(key) {
  let v = localStorage.getItem(key)
  if (v && decryptByDES(v, '')) {
    return JSON.parse(decryptByDES(v, '') || false)
  } else {
    return false
  }
}
