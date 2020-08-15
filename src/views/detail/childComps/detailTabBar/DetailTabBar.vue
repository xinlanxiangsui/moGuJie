<template>
  <tab-bar>
    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <div slot="item-text">客服</div>
    </tab-bar-item>

    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
      <div slot="item-text">店铺</div>
    </tab-bar-item>

    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
      <div slot="item-text">收藏</div>
    </tab-bar-item>

    <tab-bar-item @click.native="addToCart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
      <div slot="item-text">加购</div>
    </tab-bar-item>

    <tab-bar-item>
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
      <div slot="item-text">购买</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "./tabbar/TabBar";
import TabBarItem from "./tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
  methods: {
    addToCart() {
      this.$emit("addToCartClick");
    },
  },
};
</script>

<style>
</style>
