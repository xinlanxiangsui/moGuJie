<template>
  <div class="detail-img-list">
    <h2>{{imgList[1]}}</h2>
    当前时间：{{date}}
    <div class="img-list" v-for="item in imgList[0]">
      <img :src="item" alt @load="imgLoaded" />
    </div>
  </div>
</template>

<script>
import { dateFormat } from "common/utils.js";

export default {
  props: {
    imgList: {
      type: Array,
      default: [],
    },
  },
  data() {
    // 显示时间
    return {
      date: new Date(),
    };
  },
  methods: {
    imgLoaded() {
      this.$emit("imgLoaded");
    },
  },
  mounted() {
    // 先计算一遍时间，因为定时器会有1秒的延迟
    let date = new Date();
    let d = date.getTime();
    this.date = dateFormat(
      d,
      "YYYY-MM-DD HH" + "时" + "-mm" + "分" + "-ss" + "秒"
    );
    setInterval(() => {
      // 此处要重新new，因为上边的date从new出来便已经固定不变了
      let date = new Date();
      let d = date.getTime();
      this.date = dateFormat(
        d,
        "YYYY-MM-DD HH" + "时" + "-mm" + "分" + "-ss" + "秒"
      );
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.detail-img-list {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
