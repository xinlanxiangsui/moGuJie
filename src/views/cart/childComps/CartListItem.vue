<template>
  <div class="cart-list-item">
    <div class="cart-list-item-left">
      <!-- 解释：这里为什么要用cartList[itemNumber] -->
      <!-- 因为我们这里直接从vuex获取了cartList属性，而cartList属性中可能有很多商品，因此要从父组件传递过来itemNumber值来决定渲染第几个商品 -->
      <!-- 其实本页面不需要获取vuex中的完整carList，直接让父组件在遍历时将它的cartList的第index个商品传递过来，我们这里就不需要再添加这么多[itemNumber]了，直接拿到的就是一个商品 -->
      <input type="checkbox" :checked="cartList[itemNumber].checked" @click="checkboxClick" />

      <img :src="cartList[itemNumber].img" alt />
    </div>
    <div class="cart-list-item-right">
      <p class="cart-list-item-title">{{cartList[itemNumber].title}}</p>
      <p class="cart-list-item-desc">{{cartList[itemNumber].description}}</p>
      <span class="cart-list-item-price">单价：{{cartList[itemNumber].price}}</span>
      <span class="cart-list-item-count">数量：{{cartList[itemNumber].count}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["cartList"]),
  },
  props: {
    // 记录这是购物车中第几个商品，从而获取对应的数据
    itemNumber: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    checkboxClick() {
      // 修改了通过getters获取到的商品选中状态，但是vuex中state的源商品选中状态没有改变，有改变的必要吗？
      this.cartList[this.itemNumber].checked = !this.cartList[this.itemNumber]
        .checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list-item {
  width: 100%;
  display: flex;
  background-color: #f3f3f3;
  .cart-list-item-left {
    flex: 1;
    input {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
  .cart-list-item-right {
    flex: 2;
    padding: 5px;

    .cart-list-item-title {
      font-size: 20px;
      font-weight: 700;
    }
    .cart-list-item-desc {
      white-space: nowrap;
      font-size: 16px;
      width: 250px;
    }
    .cart-list-item-price {
      color: red;
      font-weight: 700;
    }
    .cart-list-item-count {
      float: right;
      color: #000;
    }
  }
}
</style>
