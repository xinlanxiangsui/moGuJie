export default {
  addCounter(state, payload) {
    // 这里的count+1为什么会影响state中的count？
    payload.count += 1


  },
  addToCart(state, payload) {
    // 这里添加一条属性，记录商品的选中状态，默认为true
    payload.checked = true
    state.cartList.push(payload)
  }
}
