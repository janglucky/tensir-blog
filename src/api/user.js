import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/admin/logout',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/userInfo',
    method: 'post',
    data
  })
}
