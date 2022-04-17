import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/table/list',
    method: 'POST',
    data
  })
}

export function uploadArticle(data) {
  return request({
    url: '/table/list',
    method: 'POST',
    data
  })
}
