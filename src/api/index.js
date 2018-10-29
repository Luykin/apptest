import axios from 'axios'
import qs from 'qs'
import {
  PREFIX_URL,
  UAID
} from './config'
import {
  getTime,
  getSign
} from 'common/js/util'

export function login(nickname, avatar, wx_login_code) {
  const url = `${PREFIX_URL}/login`
  let data = {
    nickname,
    avatar,
    channel: 'wx',
    uaid: UAID,
    federated: 2,
    app_version: '1.0.0',
    wx_login_code,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}

export function transaction(direction, username, score) {
  const url = `${PREFIX_URL}/add/transaction`
  let data = {
    uaid: UAID,
    direction,
    username,
    score,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}

export function transactionlist(username, num, page) {
  const url = `${PREFIX_URL}/transaction_list`
  let data = {
    uaid: UAID,
    username,
    timestamp: getTime()
  }
  if (num && (page || page === 0)) {
    Object.assign(data, {
      num,
      page
    })
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}

export function goodlist() {
  const url = `${PREFIX_URL}/goods`
  let data = {
    uaid: UAID,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}

export function orders(username, num, page) {
  const url = `${PREFIX_URL}/orders`
  let data = {
    uaid: UAID,
    username,
    num,
    page,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}

export function withdrawlist(username, num, page) {
  const url = `${PREFIX_URL}/withdraw_list`
  let data = {
    uaid: UAID,
    username,
    num,
    page,
    timestamp: getTime()
  }
  return axios.post(url, qs.stringify(Object.assign({
    sign: getSign(data)
  }, data))).then(function(res) {
    return Promise.resolve(res)
  })
}