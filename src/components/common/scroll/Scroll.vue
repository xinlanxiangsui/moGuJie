<template>
  <div class="wrapper" ref="wrapper">
    <!-- 因为只有第一个元素有滚动效果，所以在套一个div -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // 将scroll对象保存，方便以后调用
      scroll: null,
    };
  },
  mounted() {
    // 不要使用document.querySelector来获取DOM元素，因为重名的概率很高，可能获取到其他的DOM元素
    // this.scroll=new BScroll(document.querySelector('.wrapper'))

    // 使用this.$refs.wrapper来获取DOM元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 需要设置为true，因为有的标签会被影响，有的不会
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动位置，并传给调用了Scroll的组件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 上拉加载更多
    // 因为拉到底部后是由首页去请求数据，所以要发送事件给首页
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 为什么封装下面这些方法：其他组件调用的时候不需要先访问data中的scroll，再使用其对应方法；而是可以直接调用下面的两个方法

    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // 为什么使用&&，因为要等scroll加载出来了再调用后面的方法
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // 如果图片加载的特别快，可能scroll对象还没有创建好，因此先做判定再执行刷新
      this.scroll && this.scroll.refresh();
    },
    getCurrentY() {
      return this.scroll && this.scroll.y;
    },
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      defaule: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  // height: calc(100vh - 93px);
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>
