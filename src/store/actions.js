export default {
  addCart(context, payload) {
    // 返回一个Promise，告知外界是否添加购物车成功
    return new Promise((resolve, reject) => {
      // 1. 查找之前的数组中是否已经存在该商品（通过对比 title 值是否相同；真实开发时要用 ID 值）
      // 在这里执行的时候，mutations中的addCounter函数已经执行？？why！
      let oldProduct = context.state.cartList.find(item => item.title === payload.title);
      // 2. 判断 oldProduct
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('向购物车添加了新商品')
      }
    })
  }
}
