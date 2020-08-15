<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :title="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControlA"
      :class="{'tabControlShow': tabControlShow}"
    ></tab-control>

    <!-- 为什么要传递probeType值？因为不是所有组件都要实时监听，如果默认都开启监听，会一直消耗资源 -->
    <scroll
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature></feature>
      <tab-control
        :title="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControlB"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="backTopIsShow"></back-top>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "common/utils.js";
import Feature from "./childComps/Feature";
import HomeSwiper from "./childComps/HomeSwiper";
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import HomeRecommend from "./childComps/HomeRecommend";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabControl/TabControl";
import { backTopMixin } from "common/mixin.js";
import {
  getHomeMultidata,
  getHomeGoods,
  homeGetGoods,
} from "../../network/home.js";
import "../../../public/data/goods.js";

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      // 等待接收数据
      banners: [],
      recommend: [],
      // 使用上拉加载更多的形式实现翻页
      // goods用来保存当前已经浏览的页数和已经请求到的数据量
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      goodsId: [],
      currentType: "pop",
      tabControlOffsetTop: 0,
      tabControlShow: true,
      currentOffsetTop: 0,

      // 保存scroll刷新函数，方便取消
      homeImgLoaded: null,
    };
  },
  created() {
    this.getHomeMultidata();
    // 先为每个分类存入1页数据
    this.homeGetGoods("pop");
    this.homeGetGoods("new");
    this.homeGetGoods("sell");
    // this.getHomeGoods("new");
    // this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata() {
      // 该函数返回promise，可以直接then
      getHomeMultidata().then((res) => {
        // 当前处于箭头函数内，箭头函数的this就是created()的this，而created()的this就是data
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },

    /**
     * 本方法会请求请求到mockjs模拟的goods中的所有数据，然后将type类型的数据存放到data的goods中
     * @params 类型，pop/new/sell
     *
     */
    homeGetGoods(type) {
      // 这里访问对象属性为什么用中括号[]？
      const currentPage = this.goods[type].page;
      // 这里可以判定一下有没有获取到数据，因为可能到最后一页了，没数据了；
      // 待完成
      homeGetGoods().then((res) => {
        // 如果服务器没有剩余数据可供请求，则会报错，因此我们在这里捕获异常
        try {
          res.goods[currentPage][type];
        } catch {
          alert("服务器没有数据了");
          return;
        }
        this.goods[type].list.push(...res.goods[currentPage][type]);
      });
      // 请求完成一页，page加一
      this.goods[type].page += 1;
      // 因为第一次获取数据是在created中，可能scroll还没加载出来，因此先判定一下
      if (this.$refs.scroll) {
        this.$refs.scroll.finishPullUp();
      }
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 保持两个tabControl的选中项一致
      this.$refs.tabControlA.currentIndex = index;
      this.$refs.tabControlB.currentIndex = index;
    },

    contentScroll(position) {
      // 通过判断
      this.tabControlShow = !(-position.y > 590);
      // 因为methods的混入必须以完整的方法混入，因此我们想混入backTopShow这段代码只好将其抽取出来单独混入（其实没必要混入，只是作为案例）
      this.backTopShoW(position);
    },

    loadMore() {
      this.homeGetGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    swiperImgLoaded() {
      this.tabControlOffsetTop = this.$refs.tabControlB.$el.offsetTop;
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted() {
    // 此段代码写在mounted中是正确的，不要写到created中，因为获取不到ref
    const refresh = debounce(this.$refs.scroll.refresh, 200);

    this.homeImgLoaded = () => {
      refresh();
    };
    this.$bus.$on("imgLoaded", this.homeImgLoaded);

    // 此段代码不能写到created中，因为组件还未加载好
    // 为什么下面这段代码获取到的offsetTop值那么小？因为图片还没加载好，丢掉了图片的高度
    // console.log(this.$refs.tabControl.$el.offsetTop);
    // 解决方案：监听swiper的图片加载事件，图片加载完成后获取offsetTop
    // 之所以只监听swiper图片的加载，因为一般swiper图片加载完成前，其他的图片早都加载好了（不够严谨，真是开发一定要监听它上面所有图片高度都加载完）
  },
  // 返回时将页面滚动到离开时的位置
  activated() {
    this.$refs.scroll.scrollTo(0, this.currentOffsetTop, 5000);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开时记录当前位置
    this.currentOffsetTop = this.$refs.scroll.getCurrentY();

    // 取消图片加载后的scroll.refresh()
    this.$bus.$off("imgLoaded", this.homeImgLoaded);
  },
};
</script>

<style lang="scss">
.home-nav {
  background-color: rgb(255, 142, 151);
  color: #fff;
}
#home {
  position: relative;
  height: 100vh;
}
.tabControlShow {
  display: none;
}
</style>
