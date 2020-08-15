import {
  request
} from './request'

export function getHomeMultidata() {
  return request({
    url: `${process.env.BASE_URL}data/multidata.json`
  })
}

export function homeGetGoods() {
  return request({
    url: 'goods',
  })
}
