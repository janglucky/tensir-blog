import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/article/list',
    method: 'POST',
    data
  })
}

export function uploadArticle(data) {
  return request({
    url: '/article/upload',
    method: 'POST',
    data
  })
}
