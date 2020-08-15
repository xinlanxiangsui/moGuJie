<template>
  <swiper>
    <SwiperItem v-for="(item,index) in banners">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgLoaded" />
      </a>
    </SwiperItem>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    imgLoaded() {
      // 这个if判定是为了只向外发送一次事件就停止，因为有一张轮播图片加载好后便已经将轮播图容器撑大了，此时可以开始计算offsetTop的值了
      if (!this.isLoaded) {
        this.$emit("swiperImgLoaded");
        this.isLoaded = true;
      }
    },
  },
};
</script>

<style>
</style>
