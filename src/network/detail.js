import {
  request
} from './request'

export function getGoodsInfo() {
  return request({
    url: 'detail'
  })
}
export function detailGetGoods() {
  return request({
    url: 'goods',
  })
}


export class goodsInfo {
  constructor(res) {
    this.imgUrl = res.detail.imgUrl;
    this.title = res.detail.title;
    this.description = res.detail.description;
    this.price = res.detail.price;
    this.title = res.detail.title;
  }
}
