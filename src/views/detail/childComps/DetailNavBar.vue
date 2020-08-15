<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/detail/back.png" />
      </div>
      <div class="title" slot="center">
        <div
          v-for="(item,index) in title"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
      // this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  padding: 0 15px;
  .title-item {
    flex: 1;
    font-size: 16px;
  }
  .active {
    color: deeppink;
  }
}
.back {
  img {
    width: 20px;
    margin-bottom: 5px;
  }
}
</style>
