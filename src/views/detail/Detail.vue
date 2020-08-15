<template>
  <!-- 使用v-if判定一下有没有数据，有数据了再渲染，防止渲染空标签 -->
  <div class="detail" v-if="Object.keys(goodsInfo).length!==0">
    <detail-nav-bar @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="main" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <swiper class="detail-swiper">
        <swiper-item v-for="item in goodsInfo.imgUrl">
          <img :src="item" />
        </swiper-item>
      </swiper>
      <h3 class="detail-title">商品名称：{{goodsInfo.title}}</h3>
      <h5 class="detail-price">价格：{{goodsInfo.price|formatPrice}}</h5>
      <p class="detail-description">{{goodsInfo.description}}</p>
      <p class="detail-description">{{goodsInfo.description}}</p>
      <p class="detail-description">{{goodsInfo.description}}</p>
      <p class="detail-description">{{goodsInfo.description}}</p>
      <p class="detail-description">{{goodsInfo.description}}</p>
      <detail-img-list :imgList="imgList" @imgLoaded="imgLoaded" ref="params"></detail-img-list>
      <goods-list :goods="goodsList" ref="recommend"></goods-list>
    </scroll>
    <DetailTabBar @addToCartClick="addToCart" />
    <back-top @click.native="backTopClick" v-show="backTopIsShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import { Swiper, SwiperItem } from "components/common/swiper";
import { getGoodsInfo, goodsInfo, detailGetGoods } from "network/detail.js";
import Scroll from "components/common/scroll/Scroll";
import DetailImgList from "./childComps/DetailImgList";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils.js";
import { myMixin, backTopMixin } from "common/mixin.js";
import DetailTabBar from "./childComps/detailTabBar/DetailTabBar";
import { mapActions } from "vuex";

// 向使用mock，必须引入mock数据源文件，不然报404
import "../../../public/data/detail.js";
import "../../../public/data/goods.js";

export default {
  mixins: [myMixin, backTopMixin],

  data() {
    return {
      goodsInfo: {},
      imgList: [],
      goodsList: [],
      // 保存顶部tabbar对应四个组件的offsetTop值
      offsetTop: [],
      currentIndex: -1,
      // 防止offsetTop的值被push多次，因为是在updated方法中push的;如果是在mounted中，那么DOM都还没加载完，但也可以考虑使用$nextTick()，就是要想清楚放在哪
      a: true,
    };
  },
  filters: {
    // 使用过滤器，判断价格大于1000则返回1k、1.3k的形式，小于1000则返回原价格
    formatPrice(price) {
      if (price > 1000) {
        return price / 1000 + "k";
      } else {
        return price;
      }
    },
  },
  methods: {
    ...mapActions(["addCart"]),

    // 详情页加载完一张图片，就刷新一次scroll，并使用防抖函数（在mixin中）
    imgLoaded() {
      this.detailImgLoaded();
    },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.offsetTop[index], 500);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.offsetTop.length;

      // 首先要将详情页四个模块各自的offsetTop值都遍历出来才能做比较
      // length需要减一，不然最后一个元素比较的时候会越界
      for (let i = 0; i < length - 1; i++) {
        // hack做法
        if (
          this.currentIndex !== i &&
          positionY >= this.offsetTop[i] &&
          positionY < this.offsetTop[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
        // 普通做法：
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.offsetTop[i] &&
        //     positionY < this.offsetTop[i + 1]) ||
        //     (i === length - 1 && positionY >= this.offsetTop[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.navbar.currentIndex = this.currentIndex;
        // }
      }
      // 通过position控制返回顶部按钮的显示与隐藏
      this.backTopShoW(position);
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息，用一个对象来保存
      const product = {};
      product.description = this.goodsInfo.description;
      product.price = this.goodsInfo.price;
      product.title = this.goodsInfo.title;
      product.img = this.imgList[0]["1"];
      // 2. 将商品添加进购物车里
      // this.$store.carList.push(produce) // 对 Vuex 中任何数据的修改都需要经过 mutation
      // this.$store.commit("addCart", product);

      // 我们想知道是否添加成功，所以让actions给我们返回一个promise
      // 使用 mapActions 映射的方法
      this.addCart(product).then((res) => {
        /*
         *@param1 res：弹窗显示的文本
         *@param2 duration：持续时间
         */
        this.$toast.show(res, 2000);
      });
      // 没有导入mapActions时使用的方法：
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
  created() {
    // 拿到由home页路由跳转时传递给我们的商品id
    this.goodsId = this.$route.params.goodsId;
    getGoodsInfo().then((res) => {
      // 实例化对象
      this.goodsInfo = new goodsInfo(res);
      // 为需要向子组件发送的imgList赋值
      this.imgList.push(res.detail.imgList);
      this.imgList.push(res.detail.words);
    });
    // 详情页下面的商品列表
    detailGetGoods().then((res) => {
      this.goodsList = res.goods[1].new;
    });
  },
  updated() {
    // 因为使用了v-if，所以不能写到mounted中
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("imgLoaded", () => {
      refresh();
    });
    if (this.a) {
      // 按顺序添加offsetTop，正好和顶部4个tab对应
      // 商品模块是顶头的，所以给offsetTop添加为0，由于没有评论模块，所以借参数（图片详情）的offsetTop替代一下
      this.offsetTop.push(0);
      this.offsetTop.push(this.$refs.params.$el.offsetTop);
      this.offsetTop.push(this.$refs.params.$el.offsetTop);
      this.offsetTop.push(this.$refs.recommend.$el.offsetTop);
      // 最后添加一个最大值元素，方便通过判断offsetTop的值修改顶部tabbar的选中状态(详见本页contentScroll方法)
      this.offsetTop.push(Number.MAX_VALUE);
      this.a = false;
    }
  },
  mounted() {},
  components: {
    DetailNavBar,
    Swiper,
    SwiperItem,
    Scroll,
    DetailImgList,
    GoodsList,
    DetailTabBar,
  },
};
</script>
<style lang="scss" scoped>
.detail-swiper {
  height: 280px;
}

.detail-price {
  font-size: 16px;

  color: rgb(214, 55, 55);
}
.detail-description {
  margin-top: 20px;
  font-size: 15px;
}

// 为了隐藏底部的tabbar：
.detail {
  // 设置背景颜色，这样在向上拉的时候不会露出下面的tabbar内容
  background-color: #fff;
  // 因为tabbar是脱标的，因此我们也要脱标并添加z-index值
  position: relative;
  z-index: 111;
  // 不设置高度的话它只有44px高，下面的内容都显示不出来，因为他们都脱标了
  height: 100vh;
  // 设置滚动区域大小
  .main {
    // 用100vh-44px 样式会乱，不知道问什么
    height: calc(100% - 44px -49px);
  }
}
</style>
