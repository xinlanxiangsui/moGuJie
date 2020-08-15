<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="goodsItem.imgUrl" @load="imgLoaded" />
    <div>
      <p>{{goodsItem.title}}</p>
      <span>{{'$'+goodsItem.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听图片加载事件
    imgLoaded() {
      // 每加载完一张图片，就向事件总线发射一个事件
      this.$bus.$emit("imgLoaded");
    },
    itemClick() {
      // 因为首页、分类、购物车等界面不需要使用返回键，所以使用replace合适
      // 但是详情页需要使用返回键，因此使用push合适
      this.$router.push("/detail/" + 11); // 路由跳转时附带商品id(本项目未使用id获取数据)
    },
  },
};
</script>

<style lang="scss">
.goods-list-item {
  width: 47%;

  img {
    width: 100%;
  }
  div {
    font-size: 0;
    text-align: center;

    p {
      font-size: 16px;
    }
    span {
      font-size: 18px;
      color: red;
    }
  }
}
</style>
