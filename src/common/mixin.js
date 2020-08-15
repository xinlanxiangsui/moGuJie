import {
  debounce
} from './utils.js'
import BackTop from "components/content/backTop/BackTop";

export const myMixin = {
  data() {
    return {
      detailImgLoaded: null,
      detailImgRefresh: null
    }
  },
  updated() {
    // 详情页图片加载后，scroll刷新防抖
    this.detailImgLoaded = debounce(this.$refs.scroll.refresh, 200)
    this.detailImgRefresh = () => {
      this.detailImgLoaded()
    }
  }

}

export const backTopMixin = {
  components: {
    BackTop,

  },
  data() {
    return {
      backTopIsShow: false,
    }
  },
  methods: {
    backTopClick() {
      // 返回顶部：scrollTo(),三个参数：x坐标，y坐标，所用时间
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 通过判断position的位置决定返回顶部按钮的显示与隐藏
    backTopShoW(position) {
      this.backTopIsShow = -position.y > 1000;
    },
  }
}
