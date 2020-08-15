<template>
  <div class="cart">
    <nav-bar class="cart-navbar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <scroll :probe-type="3" ref="scroll" @scroll="contentScroll" class="cart-scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
    <back-top @click.native="backTopClick" v-show="backTopIsShow"></back-top>
  </div>
</template>

<script>
import { backTopMixin } from "common/mixin.js";
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import { mapGetters } from "vuex";
export default {
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar,
  },
  mixins: [backTopMixin],
  methods: {
    contentScroll(position) {
      this.backTopShoW(position);
    },
  },

  activated() {
    this.$refs.scroll.refresh();
  },
  computed: {
    // cartCount() {
    //   return this.$store.state.cartList.length;
    // },
    // 第一种写法，直接使用getters中的属性
    ...mapGetters(["cartLength", "cartList"]),

    // 第二种写法，为getters中的属性赋别名
    // ...mapGetters({
    //   length: "cartLength",
    // }),
  },
};
</script>
<style lang="scss" scoped>
.cart-navbar {
  background-color: #ff8e97;
  color: white;
}
.cart-scroll {
  height: calc(100vh - 44px - 49px - 30px);
}
</style>
