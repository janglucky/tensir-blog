import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/verify',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getInfo(data) {
  return request({
    url: '/admin/userInfo',
    method: 'post',
    data
  })
}
