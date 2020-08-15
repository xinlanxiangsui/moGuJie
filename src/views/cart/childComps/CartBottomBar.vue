<template>
  <div class="cart-bottom-bar">
    <div class="checkAll" @click="checkAllClick">
      <input type="checkbox" :checked="isCheckedAll" />
      全选
    </div>
    <div class="totalPrice">总价格：{{totalPrice}}</div>
    <div class="calculate">去结算（{{checkedLength}}）</div>
  </div>
</template>

<script>
export default {
  computed: {
    // 计算总价格
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    // 计算选中商品的数量
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    // 判断是否全选
    isCheckedAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        // 性能低，需要遍历所有
        // return !this.$store.state.cartList.filter((item) => !item.checked).length;
        // 性能高
        return !this.$store.state.cartList.find((item) => !item.checked);
      }
    },
  },
  methods: {
    // 全选按钮点击：
    // 如果被点击时全选按钮是选中状态，则将所有的复选框都取消选中
    // 如果被点击时不是被选中状态，则将所有复选框选中
    checkAllClick() {
      if (this.isCheckedAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }

      // 上面的代码可以这样简化吗？
      // 不可以！耦合度太高，在选中时全选复选会互相影响，都乱套了
      // this.$store.state.cartList.forEach(
      //   (item) => (item.checked = !this.isCheckedAll)
      // );
    },
  },
};
</script>
<style lang="scss" scoped>
.cart-bottom-bar {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 49px;
  .checkAll {
    font-size: 20px;
    flex: 1;
    input {
      width: 20px;
    }
  }
  .totalPrice {
    font-size: 20px;
    flex: 2;
  }
  .calculate {
    font-size: 20px;
    flex: 2;
    padding-left: 5px;
  }
}
</style>
